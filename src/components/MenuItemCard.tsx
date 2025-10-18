import React from "react";
import { View, Text, StyleSheet, Image, ImageSourcePropType } from "react-native";
import AnimatedPressable from "./AnimatedPressable";
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
  const discountPercent = hasDiscount 
    ? Math.round(((originalPrice - price) / originalPrice) * 100) 
    : 0;

  return (
    <AnimatedPressable 
      style={styles.container} 
      onPress={onPress}
      scaleValue={0.97}
      hapticType="light"
    >
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode="cover" />
        {hasDiscount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{discountPercent}%</Text>
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{formatPrice(price)}</Text>
          {hasDiscount && <Text style={styles.originalPrice}>{formatPrice(originalPrice)}</Text>}
        </View>
      </View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: SIZES.RADIUS.MEDIUM,
    elevation: 2,
    flexDirection: "row",
    marginBottom: SIZES.SPACING.SM,
    padding: SIZES.SPACING.SM,
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  content: {
    flex: 1,
    marginLeft: SIZES.SPACING.SM,
  },
  discountBadge: {
    backgroundColor: COLORS.ERROR,
    borderRadius: SIZES.RADIUS.SMALL,
    paddingHorizontal: 6,
    paddingVertical: 2,
    position: "absolute",
    right: 4,
    top: 4,
  },
  discountText: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_WHITE,
    fontSize: 10,
    fontWeight: "700",
  },
  image: {
    borderRadius: SIZES.RADIUS.SMALL,
    height: 60,
    width: 60,
  },
  imageContainer: {
    position: "relative",
  },
  name: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "600",
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
    fontWeight: "700",
  },
  priceContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
});

export default MenuItemCard;
