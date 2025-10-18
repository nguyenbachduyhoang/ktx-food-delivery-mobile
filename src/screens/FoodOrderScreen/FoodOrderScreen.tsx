/* eslint-disable react/prop-types */
import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useFocusEffect, useScrollToTop } from "@react-navigation/native";
import withScreenContainer from "@components/layouts/withScreenContainer";
import AddToCartModal from "@components/AddToCartModal";
import { COLORS, SIZES } from "@constants/index";
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
import { mockFoodData, topRatedFoods } from "@screens/FoodOrderScreen/data/mockData";
import type { Food, FilterOptions } from "@screens/FoodOrderScreen/types";

const ITEMS_PER_PAGE = 30;

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
  onSearchChange: (text: string) => void;
  onFilterPress: () => void;
  hasActiveFilters: boolean;
  selectedCategory: string | null;
  onCategoryPress: (categoryId: string) => void;
  filteredCount: number;
  currentPage: number;
  totalPages: number;
  onFoodPress: (food: Food) => void;
}

// eslint-disable-next-line react/display-name
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
          categories={QUICK_CATEGORIES}
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

  // Enable scroll-to-top when re-tapping the active bottom tab icon
  useScrollToTop(flatListRef);

  // Scroll to top function - improved for better reliability
  const scrollToTop = useCallback(async () => {
    try {
      // Đợi một frame để đảm bảo state và layout đã update
      await new Promise((resolve) => requestAnimationFrame(resolve));
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({ offset: 0, animated: true });
      }
    } catch (error) {
      console.warn("Scroll to top error:", error);
    }
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
    let result = [...mockFoodData];

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
  }, [searchQuery, selectedCategory, filters]);

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

    let isMounted = true;

    const handleDataChange = async () => {
      // Đợi React re-render với data mới
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Đợi thêm một animation frame để đảm bảo layout đã hoàn tất
      await new Promise((resolve) => requestAnimationFrame(resolve));

      if (isMounted && flatListRef.current) {
        flatListRef.current.scrollToOffset({ offset: 0, animated: true });
      }
    };

    handleDataChange();

    return () => {
      isMounted = false;
    };
  }, [paginatedFoods, selectedCategory, filters]);

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
    setSelectedFood(food);
    setAddToCartModalVisible(true);
  };

  const hasActiveFilters =
    filters.sortBy !== "popular" ||
    filters.distance !== "all" ||
    filters.priceRange !== "all" ||
    filters.openNow;

  // Memoize handlers to prevent re-renders
  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: 140 + SIZES.SPACING.MD, // height of FoodItemCard + marginBottom
      offset: (140 + SIZES.SPACING.MD) * index,
      index,
    }),
    []
  );

  const keyExtractor = useCallback((item: Food) => item.id, []);

  // Memoize renderItem to prevent unnecessary re-renders
  const renderFoodItem = useCallback(({ item, index }: { item: Food; index: number }) => {
    const handlePress = () => handleAddToCart(item);
    const handleFavorite = () => console.log("Favorite:", item.title);

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
      <FlatList
        ref={flatListRef}
        data={paginatedFoods}
        renderItem={renderFoodItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={5}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
          autoscrollToTopThreshold: 10,
        }}
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
          />
        }
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={handleApplyFilters}
        currentFilters={filters}
      />

      {selectedFood && (
        <AddToCartModal
          visible={addToCartModalVisible}
          onClose={() => setAddToCartModalVisible(false)}
          foodImage={selectedFood.image}
          foodName={selectedFood.title}
          foodPrice={selectedFood.price}
          restaurant={selectedFood.subtitle}
          description={selectedFood.description}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    flex: 1,
  },
  listContent: {
    paddingBottom: SIZES.SPACING.XL,
    paddingHorizontal: SIZES.SPACING.MD,
    paddingTop: SIZES.SPACING.MD,
  },
});

export default withScreenContainer(FoodOrderScreen);

// Disable scroll since we're using FlatList
type _StaticOpts = { useScreenScroll?: boolean };
(FoodOrderScreen as unknown as _StaticOpts).useScreenScroll = false;
