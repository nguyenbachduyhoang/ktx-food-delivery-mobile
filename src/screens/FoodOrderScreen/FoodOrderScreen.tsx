import React, { useState, useMemo } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import withScreenContainer from "@components/layouts/withScreenContainer";
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

const FoodOrderScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: "popular",
    distance: "all",
    priceRange: "all",
    openNow: false,
  });

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

  const handleCategoryPress = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
    }
    setCurrentPage(1);
  };

  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const hasActiveFilters =
    filters.sortBy !== "popular" ||
    filters.distance !== "all" ||
    filters.priceRange !== "all" ||
    filters.openNow;

  const renderHeader = () => (
    <View>
      {/* Top Rated Carousel */}
      <SectionHeader icon="trophy" iconColor={COLORS.WARNING} title="Món ăn được đánh giá cao nhất">
        <TopRatedCarousel foods={topRatedFoods} />
      </SectionHeader>

      {/* Search Bar */}
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onFilterPress={() => setFilterModalVisible(true)}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Quick Categories */}
      <QuickCategories
        categories={QUICK_CATEGORIES}
        selectedCategory={selectedCategory}
        onCategoryPress={handleCategoryPress}
      />

      {/* Results header */}
      <ResultsHeader
        totalResults={filteredFoods.length}
        selectedCategory={selectedCategory}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </View>
  );

  const renderFoodItem = ({ item, index }: { item: Food; index: number }) => (
    <Animated.View
      entering={FadeInUp.delay(700 + index * 50)
        .duration(500)
        .springify()}
    >
      <FoodItemCard
        image={item.image}
        title={item.title}
        restaurant={item.subtitle}
        address={item.address}
        rating={item.rating}
        ratingCount={item.ratingCount}
        price={item.price}
        isFavorite={item.isFavorite}
        onPress={() => console.log("View:", item.title)}
        onFavorite={() => console.log("Favorite:", item.title)}
        onAddToCart={() => console.log("Add to cart:", item.title)}
      />
    </Animated.View>
  );

  const renderFooter = () => (
    <PaginationFooter
      currentPage={currentPage}
      totalPages={totalPages}
      onPreviousPress={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
      onNextPress={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
    />
  );

  const renderEmpty = () => <EmptyState />;

  return (
    <View style={styles.container}>
      <FlatList
        data={paginatedFoods}
        renderItem={renderFoodItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
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

// Disable scroll since we're using FlatList
type _StaticOpts = { useScreenScroll?: boolean };
(FoodOrderScreen as unknown as _StaticOpts).useScreenScroll = false;

export default withScreenContainer(FoodOrderScreen);
