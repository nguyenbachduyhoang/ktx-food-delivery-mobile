import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { COLORS, SIZES, TEXT_STYLES } from "@constants/index";
import { MerchantCategory } from "../../../types/menu";

interface CategoryGridProps {
  categories: MerchantCategory[];
  // eslint-disable-next-line no-unused-vars
  onCategoryPress: (_category: MerchantCategory) => void;
  // eslint-disable-next-line no-unused-vars
  onViewAllPress: () => void;
}

interface CategoryItemProps {
  category: MerchantCategory;
  // eslint-disable-next-line no-unused-vars
  onPress: (_category: MerchantCategory) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, onPress }) => {
  const getImageSource = () => {
    if (category.imageUrl) {
      return { uri: category.imageUrl };
    }
    // Fallback image nếu không có ảnh
    return { uri: "https://via.placeholder.com/80x80/cccccc/666666?text=🏪" };
  };

  return (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => onPress(category)}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image source={getImageSource()} style={styles.categoryImage} resizeMode="cover" />
      </View>
      <Text style={styles.categoryName} numberOfLines={2}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, onCategoryPress }) => {
  const renderCategoryItem = ({ item }: { item: MerchantCategory }) => (
    <CategoryItem category={item} onPress={onCategoryPress} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Danh mục</Text>
      </View>

      <FlatList
        data={categories.slice(0, 8)} // Chỉ hiển thị 8 categories đầu tiên
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.merchantCategoryId.toString()}
        numColumns={4}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false} // Disable scroll để fit trong HomeScreen
      />
    </View>
  );
};

const styles = StyleSheet.create({
  categoryImage: {
    height: "100%",
    width: "100%",
  },
  categoryItem: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    borderRadius: SIZES.RADIUS.MEDIUM,
    elevation: 2,
    padding: SIZES.SPACING.SM,
    shadowColor: COLORS.SHADOW,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    width: "23%", // 4 columns
  },
  categoryName: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "500",
    textAlign: "center",
  },
  container: {
    marginVertical: SIZES.SPACING.SM,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SIZES.SPACING.MD,
    paddingHorizontal: SIZES.SPACING.MD,
  },
  imageContainer: {
    borderRadius: 30,
    height: 60,
    marginBottom: SIZES.SPACING.XS,
    overflow: "hidden",
    width: 60,
  },
  listContent: {
    paddingHorizontal: SIZES.SPACING.MD,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: SIZES.SPACING.MD,
  },
  title: {
    ...TEXT_STYLES.H3,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "600",
  },
});

export default CategoryGrid;
