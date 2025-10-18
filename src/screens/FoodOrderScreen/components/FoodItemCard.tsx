import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ImageSourcePropType } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import AnimatedPressable from "@components/AnimatedPressable";
import { COLORS, TEXT_STYLES, SIZES } from "@constants/index";

interface FoodItemCardProps {
  image: ImageSourcePropType;
  title: string;
  restaurant: string;
  address: string;
  rating: number;
  ratingCount: string;
  price: string;
  isFavorite?: boolean;
  onPress?: () => void;
  onFavorite?: () => void;
  onAddToCart?: () => void;
}

const FoodItemCard: React.FC<FoodItemCardProps> = ({
  image,
  title,
  restaurant,
  address,
  rating,
  ratingCount,
  price,
  isFavorite: initialFavorite = false,
  onPress,
  onFavorite,
  onAddToCart,
}) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const heartScale = useSharedValue(1);
  const shimmerTranslate = useSharedValue(-1);

  // Shimmer effect on mount
  React.useEffect(() => {
    shimmerTranslate.value = withTiming(1, { duration: 2000 });
  }, []);

  const heartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(shimmerTranslate.value, [-1, 1], [-300, 300]),
      },
    ],
  }));

  const handleFavorite = () => {
    heartScale.value = withSpring(1.3, {}, () => {
      heartScale.value = withSpring(1);
    });
    setIsFavorite(!isFavorite);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onFavorite?.();
  };

  const handleAddToCart = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onAddToCart?.();
  };

  return (
    <AnimatedPressable style={styles.card} onPress={onPress} scaleValue={0.98}>
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
        
        {/* Shimmer overlay effect */}
        <Animated.View style={[styles.shimmer, shimmerStyle]} />

        {/* Favorite Button */}
        <AnimatedPressable style={styles.favoriteButton} onPress={handleFavorite} scaleValue={0.8}>
          <Animated.View style={heartAnimatedStyle}>
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={22}
              color={isFavorite ? COLORS.ERROR : COLORS.BACKGROUND}
            />
          </Animated.View>
        </AnimatedPressable>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        {/* Top Row: Restaurant Name + Rating */}
        <View style={styles.topRow}>
          <Text style={styles.restaurant} numberOfLines={1}>
            {restaurant}
          </Text>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={14} color={COLORS.WARNING} />
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        {/* Address */}
        <View style={styles.addressRow}>
          <Ionicons name="location" size={14} color={COLORS.TEXT_LIGHT} />
          <Text style={styles.address} numberOfLines={1}>
            {address}
          </Text>
        </View>

        {/* Rating Count */}
        <View style={styles.ratingRow}>
          <Ionicons name="people" size={14} color={COLORS.TEXT_SECONDARY} />
          <Text style={styles.ratingCount}>{ratingCount} đánh giá</Text>
        </View>

        {/* Bottom Row: Price + Add Button */}
        <View style={styles.bottomRow}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{price}</Text>
          </View>

          <AnimatedPressable
            style={styles.addButton}
            onPress={handleAddToCart}
            scaleValue={0.85}
            hapticType="medium"
          >
            <Ionicons name="add" size={20} color={COLORS.BACKGROUND} />
          </AnimatedPressable>
        </View>
      </View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  address: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_LIGHT,
    flex: 1,
    marginLeft: SIZES.SPACING.XS / 2,
  },
  addressRow: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.SPACING.XS,
  },
  addButton: {
    alignItems: "center",
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 999,
    elevation: 3,
    height: 36,
    justifyContent: "center",
    shadowColor: COLORS.PRIMARY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    width: 36,
  },
  bottomRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SIZES.SPACING.SM,
  },
  card: {
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: SIZES.RADIUS.LARGE,
    elevation: 3,
    flexDirection: "row",
    marginBottom: SIZES.SPACING.MD,
    overflow: "hidden",
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  content: {
    flex: 1,
    padding: SIZES.SPACING.MD,
  },
  favoriteButton: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND + "E6",
    borderRadius: 999,
    elevation: 2,
    height: 32,
    justifyContent: "center",
    position: "absolute",
    right: SIZES.SPACING.SM,
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    top: SIZES.SPACING.SM,
    width: 32,
  },
  image: {
    height: "100%",
    resizeMode: "cover",
    width: "100%",
  },
  imageContainer: {
    height: 140,
    overflow: "hidden",
    position: "relative",
    width: 120,
  },
  price: {
    ...TEXT_STYLES.H6,
    color: COLORS.PRIMARY,
    fontWeight: "700",
  },
  priceContainer: {
    flex: 1,
  },
  ratingBadge: {
    alignItems: "center",
    backgroundColor: COLORS.WARNING + "15",
    borderRadius: SIZES.RADIUS.SMALL,
    flexDirection: "row",
    marginLeft: SIZES.SPACING.SM,
    paddingHorizontal: SIZES.SPACING.SM,
    paddingVertical: SIZES.SPACING.XS / 2,
  },
  ratingCount: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    marginLeft: SIZES.SPACING.XS / 2,
  },
  ratingRow: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.SPACING.XS / 2,
  },
  ratingText: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "700",
    marginLeft: 2,
  },
  restaurant: {
    ...TEXT_STYLES.BODY_LARGE,
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
    fontWeight: "700",
  },
  topRow: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: SIZES.SPACING.XS / 2,
  },
  shimmer: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    height: "100%",
    left: 0,
    position: "absolute",
    top: 0,
    width: 100,
  },
  title: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SIZES.SPACING.XS / 2,
  },
});

export default FoodItemCard;

