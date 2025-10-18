import React, { useState, useMemo, useEffect } from "react";
import { View, StyleSheet, FlatList, ImageSourcePropType, TextInput, Text, RefreshControl } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown, Layout } from "react-native-reanimated";
import AnimatedPressable from "@components/AnimatedPressable";
import { SkeletonListItem } from "@components/SkeletonLoader";
import withScreenContainer from "@components/layouts/withScreenContainer";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import MenuItemCard from "@components/MenuItemCard";
import { CategoryHeader, CategoryTabs, CategoryFilterModal, EmptyCategory, FilterOptions } from "./components";
import { COLORS, SIZES, TEXT_STYLES } from "@constants/index";

// Mock data
import food1 from "../../../assets/banner/food1.png";
import food2 from "../../../assets/banner/food2.png";
import defaultCategory from "../../../assets/category/pho.png";

type RootStackParamList = {
  CategoryDetail: {
    categoryName: string;
    categoryImage: ImageSourcePropType;
  };
};

interface CategoryDetailScreenProps {
  navigation: StackNavigationProp<RootStackParamList, "CategoryDetail">;
  route: RouteProp<RootStackParamList, "CategoryDetail">;
}

interface MenuItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: ImageSourcePropType;
  restaurant?: string;
  rating?: number;
  distance?: string;
  deliveryTime?: string;
  isAvailable?: boolean;
}

const mockMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Nem Lụi Nướng Phần 1 Người Ăn",
    price: 71250,
    originalPrice: 75000,
    image: food1,
    restaurant: "Quán Cô Sen",
    rating: 4.8,
    distance: "1.2 km",
    deliveryTime: "20-25 phút",
    isAvailable: true,
  },
  {
    id: "2",
    name: "Combo 2 Người Ăn",
    price: 118750,
    originalPrice: 125000,
    image: food2,
    restaurant: "Quán Cô Ốc",
    rating: 4.6,
    distance: "2.5 km",
    deliveryTime: "30-35 phút",
    isAvailable: true,
  },
  {
    id: "3",
    name: "Trà Xanh Sữa",
    price: 24000,
    image: food1,
    restaurant: "Trà Sữa Tùng",
    rating: 4.9,
    distance: "0.8 km",
    deliveryTime: "15-20 phút",
    isAvailable: true,
  },
  {
    id: "4",
    name: "Trà Sữa Đài Loan",
    price: 21000,
    image: food2,
    restaurant: "Trà Sữa Tùng",
    rating: 4.7,
    distance: "0.8 km",
    deliveryTime: "15-20 phút",
    isAvailable: true,
  },
  {
    id: "5",
    name: "Nem Nướng Đặc Biệt",
    price: 85000,
    originalPrice: 95000,
    image: food1,
    restaurant: "Quán Nem Ngon",
    rating: 4.5,
    distance: "3.2 km",
    deliveryTime: "25-30 phút",
    isAvailable: false,
  },
  {
    id: "6",
    name: "Bánh Mì Nem Nướng",
    price: 35000,
    image: food2,
    restaurant: "Bánh Mì 37",
    rating: 4.8,
    distance: "1.5 km",
    deliveryTime: "20-25 phút",
    isAvailable: true,
  },
  {
    id: "7",
    name: "Combo Gia Đình 4 Người",
    price: 220000,
    originalPrice: 250000,
    image: food1,
    restaurant: "Quán Cô Sen",
    rating: 4.8,
    distance: "1.2 km",
    deliveryTime: "20-25 phút",
    isAvailable: true,
  },
  {
    id: "8",
    name: "Trà Đào Cam Sả",
    price: 28000,
    image: food2,
    restaurant: "Trà Sữa Tùng",
    rating: 4.9,
    distance: "0.8 km",
    deliveryTime: "15-20 phút",
    isAvailable: true,
  },
];

const tabs = [
  { id: "ganToi", label: "Gần tôi" },
  { id: "monAn", label: "Món ăn" },
  { id: "banChay", label: "Bán chạy" },
  { id: "danhGia", label: "Đánh giá" },
];

const CategoryDetailScreen: React.FC<CategoryDetailScreenProps> = ({ navigation, route }) => {
  // defensive: route.params may be undefined when navigating from some places
  const params =
    route.params ?? ({} as Partial<{ categoryName: string; categoryImage: ImageSourcePropType }>);
  const categoryName = params.categoryName ?? "Danh mục";
  const categoryImage = params.categoryImage ?? defaultCategory;
  
  const [activeTab, setActiveTab] = useState("monAn");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: "popular",
    distance: "all",
    priceRange: "all",
    openNow: false,
  });

  // Simulate loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleMenuItemPress = (item: MenuItem) => {
    console.log("Menu item pressed:", item.name);
    // TODO: Navigate to FoodDetail screen
  };

  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  // Filter and sort data
  const filteredData = useMemo(() => {
    let data = [...mockMenuItems];

    // Search filter
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase();
      data = data.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.restaurant?.toLowerCase().includes(query)
      );
    }

    // Distance filter
    if (filters.distance !== "all") {
      const maxDistance = filters.distance === "1km" ? 1 : filters.distance === "3km" ? 3 : 5;
      data = data.filter((item) => {
        const dist = parseFloat(item.distance?.replace(" km", "") || "0");
        return dist <= maxDistance;
      });
    }

    // Price range filter
    if (filters.priceRange !== "all") {
      data = data.filter((item) => {
        if (filters.priceRange === "under50") return item.price < 50000;
        if (filters.priceRange === "50to100") return item.price >= 50000 && item.price <= 100000;
        if (filters.priceRange === "over100") return item.price > 100000;
        return true;
      });
    }

    // Open now filter
    if (filters.openNow) {
      data = data.filter((item) => item.isAvailable);
    }

    // Sort
    switch (filters.sortBy) {
      case "distance":
        data.sort((a, b) => {
          const distA = parseFloat(a.distance?.replace(" km", "") || "999");
          const distB = parseFloat(b.distance?.replace(" km", "") || "999");
          return distA - distB;
        });
        break;
      case "priceAsc":
        data.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        data.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        data.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "popular":
      default:
        // Keep default order
        break;
    }

    return data;
  }, [debouncedSearchQuery, filters]);

  const renderItem = ({ item, index }: { item: MenuItem; index: number }) => {
    return (
      <Animated.View 
        entering={FadeInDown.delay(index * 50).duration(400)}
        layout={Layout.springify()}
      >
        <MenuItemCard
          id={item.id}
          name={item.name}
          price={item.price}
          originalPrice={item.originalPrice}
          image={item.image}
          onPress={() => handleMenuItemPress(item)}
        />
      </Animated.View>
    );
  };

  const renderLoadingSkeleton = () => (
    <View style={styles.listWrap}>
      <View style={styles.listContainer}>
        {[1, 2, 3, 4, 5].map((i) => (
          <SkeletonListItem key={i} />
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with image background */}
      <View>
        <CategoryHeader
          title={`Quán Ngon Danh Bất Hư ${categoryName}`}
          description="Tuyển chọn quán ngon trứ danh được yêu thích, hương vị chuẩn, ăn là ghiền. Khám phá & đặt món liền tay!"
          backgroundImage={categoryImage}
          onBackPress={handleBackPress}
          onSharePress={() => console.log("Share category")}
          onFilterPress={() => setShowFilterModal(true)}
        />
      </View>

      {/* Search Bar */}
      <Animated.View entering={FadeInDown.delay(100)} style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color={COLORS.TEXT_LIGHT} />
          <TextInput
            style={styles.searchInput}
            placeholder={`Tìm món hoặc quán có ${categoryName}...`}
            placeholderTextColor={COLORS.TEXT_LIGHT}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <Animated.View entering={FadeInDown}>
              <AnimatedPressable 
                onPress={() => setSearchQuery("")}
                enableHaptic={false}
              >
                <Ionicons name="close-circle" size={20} color={COLORS.TEXT_LIGHT} />
              </AnimatedPressable>
            </Animated.View>
          )}
        </View>
      </Animated.View>

      {/* Tabs */}
      <Animated.View entering={FadeInDown.delay(200)}>
        <CategoryTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </Animated.View>

      {/* Results count */}
      {!isLoading && filteredData.length > 0 && (
        <Animated.View entering={FadeInDown.delay(300)} style={styles.resultCount}>
          <Text style={styles.resultCountText}>
            Tìm thấy {filteredData.length} {filteredData.length === 1 ? "món" : "món"}
          </Text>
        </Animated.View>
      )}

      {/* List or Empty State */}
      {isLoading ? (
        renderLoadingSkeleton()
      ) : filteredData.length > 0 ? (
        <View style={styles.listWrap}>
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[COLORS.PRIMARY]}
                tintColor={COLORS.PRIMARY}
              />
            }
          />
        </View>
      ) : (
        <Animated.View entering={FadeInDown}>
          <EmptyCategory categoryName={categoryName} onGoBack={handleBackPress} />
        </Animated.View>
      )}

      {/* Filter Modal */}
      <CategoryFilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
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
  listContainer: {
    padding: SIZES.SPACING.MD,
    paddingBottom: SIZES.SPACING.XL,
  },
  listWrap: {
    flex: 1,
  },
  resultCount: {
    backgroundColor: COLORS.BACKGROUND,
    borderBottomColor: COLORS.DIVIDER,
    borderBottomWidth: 1,
    paddingHorizontal: SIZES.SPACING.MD,
    paddingVertical: SIZES.SPACING.SM,
  },
  resultCountText: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
  },
  searchBox: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND,
    borderColor: COLORS.BORDER,
    borderRadius: SIZES.RADIUS.MEDIUM,
    borderWidth: 1,
    elevation: 2,
    flexDirection: "row",
    paddingHorizontal: SIZES.SPACING.MD,
    paddingVertical: SIZES.SPACING.SM,
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  searchContainer: {
    backgroundColor: COLORS.BACKGROUND,
    borderBottomColor: COLORS.DIVIDER,
    borderBottomWidth: 1,
    paddingHorizontal: SIZES.SPACING.MD,
    paddingVertical: SIZES.SPACING.MD,
  },
  searchInput: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
    marginLeft: SIZES.SPACING.SM,
    padding: 0,
  },
});

export default withScreenContainer(CategoryDetailScreen);

type _StaticOpts = { useScreenScroll?: boolean };
(CategoryDetailScreen as unknown as _StaticOpts).useScreenScroll = false;
