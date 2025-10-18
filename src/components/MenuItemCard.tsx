import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType } from "react-native";
import { COLORS, TEXT_STYLES, SIZES } from "@constants/index";

export interface MenuItemCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: ImageSourcePropType;
  onPress?: () => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  name,
  price,
  originalPrice,
  image,
  onPress,
}) => {
  const formatPrice = (price: number) => {
    return `${price.toLocaleString("vi-VN")}đ`;
  };

  const hasDiscount = originalPrice && originalPrice > price;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <Image source={image} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{formatPrice(price)}</Text>
          {hasDiscount && <Text style={styles.originalPrice}>{formatPrice(originalPrice)}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: SIZES.SPACING.SM,
    paddingVertical: SIZES.SPACING.XS,
  },
  content: {
    flex: 1,
    marginLeft: SIZES.SPACING.SM,
  },
  image: {
    borderRadius: SIZES.RADIUS.SMALL,
    height: 60,
    width: 60,
  },
  name: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    lineHeight: 20,
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
});

export default MenuItemCard;
