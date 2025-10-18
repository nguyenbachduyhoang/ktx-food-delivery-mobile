import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType } from "react-native";
import { COLORS, TEXT_STYLES, SIZES } from "@constants/index";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: ImageSourcePropType;
}

interface MenuListProps {
  title: string;
  items: MenuItem[];
  // eslint-disable-next-line no-unused-vars
  onItemPress?: (item: MenuItem) => void;
}

const MenuList: React.FC<MenuListProps> = ({ title, items, onItemPress }) => {
  const formatPrice = (price: number) => {
    return `${price.toLocaleString("vi-VN")}đ`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.itemContainer}
          onPress={() => onItemPress?.(item)}
        >
          <Image source={item.image} style={styles.itemImage} resizeMode="cover" />
          <View style={styles.itemContent}>
            <Text style={styles.itemName} numberOfLines={1}>
              {item.name}
            </Text>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{formatPrice(item.price)}</Text>
              {item.originalPrice && (
                <Text style={styles.originalPrice}>{formatPrice(item.originalPrice)}</Text>
              )}
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND,
    marginBottom: SIZES.SPACING.MD,
    paddingHorizontal: SIZES.SPACING.MD,
    paddingVertical: SIZES.SPACING.SM,
  },
  itemContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: SIZES.SPACING.SM,
    paddingBottom: SIZES.SPACING.SM,
  },
  itemContent: {
    flex: 1,
    marginLeft: SIZES.SPACING.SM,
  },
  itemImage: {
    borderRadius: SIZES.RADIUS.SMALL,
    height: 60,
    width: 60,
  },
  itemName: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SIZES.SPACING.XS,
  },
  originalPrice: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.TEXT_LIGHT,
    marginLeft: SIZES.SPACING.XS,
    textDecorationLine: "line-through",
  },
  price: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.ERROR,
    fontWeight: "600",
  },
  priceContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    ...TEXT_STYLES.H6,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SIZES.SPACING.SM,
  },
});

export default MenuList;
