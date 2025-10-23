import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import withScreenContainer from "@components/layouts/withScreenContainer";
import { View, StyleSheet, FlatList, ImageSourcePropType } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SharedHeader } from "@components/shared";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useFocusEffect, useScrollToTop } from "@react-navigation/native";
import AddToCartModal from "@components/AddToCartModal";
import { COLORS, SIZES } from "@constants/index";
import { useMenuItems } from "@hooks/useMenuItems";
import { useMenuCategories } from "@hooks/useApiData";
import { convertMenuItemsToFoods, getTopRatedFoods } from "@utils/menuAdapter";
import {
  TopRatedCarousel,
  FilterModal,
  FoodItemCard,
  SearchBar,
  QuickCategories,
  ResultsHeader,
  EmptyState,
  PaginationFooter,
  SectionHeader,
} from "@screens/FoodOrderScreen/components";
import type { Food, FilterOptions } from "@screens/FoodOrderScreen/types";

const ITEMS_PER_PAGE = 15;

const QUICK_CATEGORIES = [
  { id: "com", label: "Cơm", icon: "restaurant" as const },
  { id: "bun", label: "Bún", icon: "flame" as const },
  { id: "pho", label: "Phở", icon: "cafe" as const },
  { id: "mi", label: "Mì", icon: "fast-food" as const },
  { id: "trasua", label: "Trà sữa", icon: "beer" as const },
  { id: "caphe", label: "Cà phê", icon: "cafe-outline" as const },
  { id: "anvat", label: "Ăn vặt", icon: "pizza" as const },
  { id: "banhmi", label: "Bánh mì", icon: "nutrition" as const },
];

// Memoized Header Component để animation không re-trigger
interface FoodListHeaderProps {
  searchQuery: string;
  // eslint-disable-next-line no-unused-vars
  onSearchChange: (_text: string) => void;
  onFilterPress: () => void;
  hasActiveFilters: boolean;
  selectedCategory: string | null;
  // eslint-disable-next-line no-unused-vars
  onCategoryPress: (_categoryId: string) => void;
  filteredCount: number;
  currentPage: number;
  totalPages: number;
  // eslint-disable-next-line no-unused-vars
  onFoodPress: (_food: Food) => void;
  topRatedFoods: Food[];
  quickCategories: Array<{
    id: string;
    label: string;
    icon:
      | "restaurant"
      | "flame"
      | "cafe"
      | "fast-food"
      | "beer"
      | "cafe-outline"
      | "pizza"
      | "nutrition";
  }>;
}

// Memoized Header Component để animation không re-trigger
/* eslint-disable react/prop-types */
const FoodListHeader = React.memo<FoodListHeaderProps>(
  ({
    searchQuery,
    onSearchChange,
    onFilterPress,
    hasActiveFilters,
    selectedCategory,
    onCategoryPress,
    filteredCount,
    currentPage,
    totalPages,
    onFoodPress,
    topRatedFoods,
    quickCategories,
  }) => {
    return (
      <View>
        {/* Top Rated Carousel */}
        <SectionHeader
          icon="trophy"
          iconColor={COLORS.WARNING}
          title="Món ăn được đánh giá cao nhất"
        >
          <TopRatedCarousel foods={topRatedFoods} onFoodPress={onFoodPress} />
        </SectionHeader>

        {/* Search Bar */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          onFilterPress={onFilterPress}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Quick Categories */}
        <QuickCategories
          categories={quickCategories}
          selectedCategory={selectedCategory}
          onCategoryPress={onCategoryPress}
        />

        {/* Results header */}
        <ResultsHeader
          totalResults={filteredCount}
          selectedCategory={selectedCategory}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </View>
    );
  }
);
/* eslint-enable react/prop-types */

FoodListHeader.displayName = "FoodListHeader";

const FoodOrderScreen: React.FC = () => {
  const flatListRef = useRef<FlatList>(null);
  const isFirstMount = useRef(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [addToCartModalVisible, setAddToCartModalVisible] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: "popular",
    distance: "all",
    priceRange: "all",
    openNow: false,
  });

  // Get safe area insets for proper spacing
  const { bottom: bottomInset } = useSafeAreaInsets();

  // Fetch data from API
  const { menuItems } = useMenuItems();
  // const { categories: apiCategories } = useMenuCategories(); // Disabled due to 401 error

  // Create categories from menuItems data
  const quickCategories = useMemo(() => {
    // Extract unique categories from menuItems
    const uniqueCategories = new Map();
    menuItems.forEach((item) => {
      if (item.categoryId && !uniqueCategories.has(item.categoryId)) {
        uniqueCategories.set(item.categoryId, {
          id: item.categoryId,
          label: `Category ${item.categoryId.slice(0, 8)}`, // Use first 8 chars as label
          icon: "restaurant" as const,
        });
      }
    });

    const apiCategories = Array.from(uniqueCategories.values());
    
    if (apiCategories.length === 0) {
      // Fallback to static categories if no categories found
      return QUICK_CATEGORIES;
    }

    return apiCategories;
  }, [menuItems]);

  // Convert API data to Food format
  const apiFoods = useMemo(() => {
    return convertMenuItemsToFoods(menuItems);
  }, [menuItems]);

  // Get top rated foods from API
  const topRatedFoods = useMemo(() => {
    return getTopRatedFoods(menuItems);
  }, [menuItems]);

  // Enable scroll-to-top when re-tapping the active bottom tab icon
  useScrollToTop(flatListRef);

  // Scroll to top function - tối ưu cho bottom tab navigation
  const scrollToTop = useCallback(() => {
    // Sử dụng requestAnimationFrame thay vì setTimeout
    requestAnimationFrame(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({ offset: 0, animated: true });
      }
    });
  }, []);

  // Scroll to top when screen is focused (when user taps bottom tab icon)
  useFocusEffect(
    React.useCallback(() => {
      if (!isFirstMount.current) {
        scrollToTop();
      } else {
        isFirstMount.current = false;
      }
    }, [scrollToTop])
  );

  // Filter and sort foods
  const filteredFoods = useMemo(() => {
    let result = [...apiFoods];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (food) =>
          food.title.toLowerCase().includes(query) || food.subtitle.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter((food) => food.category === selectedCategory);
    }

    // Price range filter
    if (filters.priceRange !== "all") {
      result = result.filter((food) => {
        const price = parseInt(food.price.replace(/[^\d]/g, ""));
        if (filters.priceRange === "under50") return price < 50000;
        if (filters.priceRange === "50to100") return price >= 50000 && price <= 100000;
        if (filters.priceRange === "over100") return price > 100000;
        return true;
      });
    }

    // Sort
    switch (filters.sortBy) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "priceAsc":
        result.sort(
          (a, b) =>
            parseInt(a.price.replace(/[^\d]/g, "")) - parseInt(b.price.replace(/[^\d]/g, ""))
        );
        break;
      case "priceDesc":
        result.sort(
          (a, b) =>
            parseInt(b.price.replace(/[^\d]/g, "")) - parseInt(a.price.replace(/[^\d]/g, ""))
        );
        break;
      default:
        // Keep original order for "popular"
        break;
    }

    return result;
  }, [apiFoods, searchQuery, selectedCategory, filters]);

  // Paginated foods
  const paginatedFoods = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredFoods.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredFoods, currentPage]);

  const totalPages = Math.ceil(filteredFoods.length / ITEMS_PER_PAGE);

  // Scroll to top khi data thay đổi (pagination, category, filter)
  useEffect(() => {
    // Skip scroll lần đầu mount
    if (isFirstMount.current) {
      return;
    }

    // Sử dụng requestAnimationFrame để đảm bảo DOM đã render xong
    const frameId = requestAnimationFrame(() => {
      if (flatListRef.current) {
        // Scroll ngay lập tức (animated: false) để UX tốt hơn
        flatListRef.current.scrollToOffset({
          offset: 0,
          animated: false,
        });
      }
    });

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [currentPage, selectedCategory, filters.sortBy, filters.priceRange]);

  const handleCategoryPress = useCallback(
    (categoryId: string) => {
      if (selectedCategory === categoryId) {
        setSelectedCategory(null);
      } else {
        setSelectedCategory(categoryId);
      }
      setCurrentPage(1);
      // useEffect sẽ xử lý scroll sau khi data đã render
    },
    [selectedCategory]
  );

  const handleApplyFilters = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
    setCurrentPage(1);
    // useEffect sẽ xử lý scroll sau khi data đã render
  }, []);

  const handleAddToCart = (food: Food) => {
    // Ensure selectedFood is applied before showing the modal on native.
    // If the modal mounts while selectedFood is still null, the <Image>
    // inside the modal may receive an undefined source and crash on mobile.
    setSelectedFood(food);
    // Defer opening the modal to the next frame so the state update has applied.
    requestAnimationFrame(() => setAddToCartModalVisible(true));
  };

  const hasActiveFilters =
    filters.sortBy !== "popular" ||
    filters.distance !== "all" ||
    filters.priceRange !== "all" ||
    filters.openNow;

  // Memoize handlers to prevent re-renders
  const keyExtractor = useCallback((item: Food) => item.id, []);

  // Memoize renderItem to prevent unnecessary re-renders
  const renderFoodItem = useCallback(({ item, index }: { item: Food; index: number }) => {
    const handlePress = () => handleAddToCart(item);
    const handleFavorite = () => {
      // TODO: Implement favorite functionality
    };

    return (
      <Animated.View entering={FadeInUp.delay(1000 + index * 100).duration(500)}>
        <FoodItemCard
          image={item.image}
          title={item.title}
          restaurant={item.subtitle}
          address={item.address}
          rating={item.rating}
          ratingCount={item.ratingCount}
          price={item.price}
          isFavorite={item.isFavorite}
          onPress={handlePress}
          onFavorite={handleFavorite}
          onAddToCart={handlePress}
        />
      </Animated.View>
    );
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
    // useEffect sẽ xử lý scroll sau khi data đã render
  }, []);

  const renderFooter = () => (
    <PaginationFooter
      currentPage={currentPage}
      totalPages={totalPages}
      onPreviousPress={() => handlePageChange(Math.max(1, currentPage - 1))}
      onNextPress={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
    />
  );

  const renderEmpty = () => <EmptyState />;

  return (
    <View style={styles.container}>
      <SharedHeader title="Thực đơn" />
      <FlatList
        ref={flatListRef}
        data={paginatedFoods}
        renderItem={renderFoodItem}
        keyExtractor={keyExtractor}
        removeClippedSubviews={false}
        maxToRenderPerBatch={10}
        windowSize={5}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={
          <FoodListHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onFilterPress={() => setFilterModalVisible(true)}
            hasActiveFilters={hasActiveFilters}
            selectedCategory={selectedCategory}
            onCategoryPress={handleCategoryPress}
            filteredCount={filteredFoods.length}
            currentPage={currentPage}
            totalPages={totalPages}
            onFoodPress={handleAddToCart}
            topRatedFoods={topRatedFoods}
            quickCategories={quickCategories}
          />
        }
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={[
          styles.listContent,
          {
            paddingTop: SIZES.SPACING.MD,
            // Tab bar height (62) + bottom inset + extra spacing
            paddingBottom: 80 + bottomInset,
          },
        ]}
        showsVerticalScrollIndicator={false}
      />

      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={handleApplyFilters}
        currentFilters={filters}
      />

      {/* Render modal whenever it's requested to open. Use optional chaining so
          we don't crash if selectedFood hasn't been set yet due to batching. */}
      {(selectedFood || addToCartModalVisible) && (
        <AddToCartModal
          visible={addToCartModalVisible}
          onClose={() => setAddToCartModalVisible(false)}
          foodImage={selectedFood?.image as ImageSourcePropType}
          foodName={selectedFood?.title ?? ""}
          foodPrice={selectedFood?.price ?? "0đ"}
          restaurant={selectedFood?.subtitle ?? ""}
          description={selectedFood?.description}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND,
    flex: 1,
  },
  listContent: {
    paddingHorizontal: SIZES.SPACING.MD,
  },
});

export default withScreenContainer(FoodOrderScreen, { center: false, scrollable: false });
