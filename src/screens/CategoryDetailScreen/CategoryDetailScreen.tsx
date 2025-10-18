import React, { useState } from "react";
import { View, StyleSheet, FlatList, ImageSourcePropType } from "react-native";
// safe area handled by HOC ScreenContainer
import withScreenContainer from "@components/layouts/withScreenContainer";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import MenuItemCard from "@components/MenuItemCard";
import { CategoryHeader, CategoryTabs } from "./components";
import { COLORS, SIZES } from "@constants/index";

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
}

const mockMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Nem Lụi Nướng Phần 1 Người Ăn",
    price: 71250,
    originalPrice: 75000,
    image: food1,
  },
  {
    id: "2",
    name: "Combo 2 Người Ăn",
    price: 118750,
    originalPrice: 125000,
    image: food2,
  },
  {
    id: "3",
    name: "Trà Xanh Sữa",
    price: 24000,
    image: food1,
  },
  {
    id: "4",
    name: "Trà Sữa Đài Loan",
    price: 21000,
    image: food2,
  },
  {
    id: "5",
    name: "Nem Nướng Đặc Biệt",
    price: 85000,
    originalPrice: 95000,
    image: food1,
  },
  {
    id: "6",
    name: "Bánh Mì Nem Nướng",
    price: 35000,
    image: food2,
  },
  {
    id: "7",
    name: "Combo Gia Đình 4 Người",
    price: 220000,
    originalPrice: 250000,
    image: food1,
  },
  {
    id: "8",
    name: "Trà Đào Cam Sả",
    price: 28000,
    image: food2,
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
  console.log("CategoryDetail route params:", route.params);
  const [activeTab, setActiveTab] = useState("monAn");
  // safe area handled by HOC ScreenContainer

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleMenuItemPress = (item: MenuItem) => {
    console.log("Menu item pressed:", item.name);
  };

  const renderItem = ({ item }: { item: MenuItem }) => {
    return (
      <MenuItemCard
        id={item.id}
        name={item.name}
        price={item.price}
        originalPrice={item.originalPrice}
        image={item.image}
        onPress={() => handleMenuItemPress(item)}
      />
    );
  };

  const getCurrentData = (): MenuItem[] => {
    // All tabs show menu items now
    return mockMenuItems;
  };

  return (
    <View style={styles.container}>
      <View>
        <CategoryHeader
          title={`Quán Ngon Danh Bất Hư ${categoryName}`}
          description="Tuyển chọn quán ngon trứ danh được yêu thích, hương vị chuẩn, ăn là ghiền. Khám phá & đặt món liền tay!"
          backgroundImage={categoryImage}
          onBackPress={handleBackPress}
          onSharePress={() => console.log("Share category")}
        />
      </View>

      <CategoryTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <View style={styles.listWrap}>
        <FlatList
          data={getCurrentData()}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
  },
  listWrap: {
    flex: 1,
  },
});

export default withScreenContainer(CategoryDetailScreen);

type _StaticOpts = { useScreenScroll?: boolean };
(CategoryDetailScreen as unknown as _StaticOpts).useScreenScroll = false;
