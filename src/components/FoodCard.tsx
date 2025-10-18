import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ImageSourcePropType } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import AnimatedPressable from "./AnimatedPressable";
import { COLORS, TEXT_STYLES, SIZES } from "@constants/index";

// Color constants
const COLOR_WHITE = COLORS.BACKGROUND;
const COLOR_BLACK = COLORS.TEXT_PRIMARY;
const COLOR_BORDER = COLORS.BORDER;
const COLOR_STAR = COLORS.WARNING;
const COLOR_TEXT_PRIMARY = COLORS.TEXT_PRIMARY;
const COLOR_TEXT_SECONDARY = COLORS.TEXT_SECONDARY;
const COLOR_DOT = COLORS.TEXT_LIGHT;
const COLOR_ADD_BTN = COLORS.PRIMARY;
const COLOR_HEART = COLORS.TEXT_LIGHT;

interface FoodCardProps {
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
  rating: number;
  ratingCount: string;
  isFavorite?: boolean;
  time: string;
  kcal: string;
  price: string;
  onAdd?: () => void;
  onFavorite?: () => void;
}

const FoodCard: React.FC<FoodCardProps> = ({
  image,
  title,
  subtitle,
  rating,
  ratingCount,
  isFavorite: initialFavorite = false,
  time,
  kcal,
  price,
  onAdd,
  onFavorite,
}) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const heartScale = useSharedValue(1);

  const heartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const handleFavorite = () => {
    heartScale.value = withSpring(1.3, {}, () => {
      heartScale.value = withSpring(1);
    });
    setIsFavorite(!isFavorite);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onFavorite?.();
  };

  const handleAdd = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onAdd?.();
  };

  return (
    <AnimatedPressable style={styles.card} enableHaptic={false}>
      {/* Top row: rating + heart */}
      <View style={styles.topRow}>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={18} color={COLOR_STAR} style={styles.iconMarginRight} />
          <Text style={styles.rating}>{rating}</Text>
          <Text style={styles.ratingCount}>({ratingCount})</Text>
        </View>
        <AnimatedPressable onPress={handleFavorite} enableHaptic={false}>
          <Animated.View style={heartAnimatedStyle}>
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={22}
              color={isFavorite ? COLORS.ERROR : COLOR_HEART}
            />
          </Animated.View>
        </AnimatedPressable>
      </View>
      {/* Image */}
      <Image source={image} style={styles.image} />
      {/* Title & subtitle */}
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Text style={styles.subtitle} numberOfLines={1}>
        {subtitle}
      </Text>
      {/* Info row */}
      <View style={styles.infoRow}>
        <Ionicons
          name="time-outline"
          size={16}
          color={COLOR_TEXT_SECONDARY}
          style={styles.iconMarginRight}
        />
        <Text style={styles.infoText}>{time}</Text>
        <Text style={styles.dot}>•</Text>
        <Text style={styles.infoText}>{kcal} Kcal</Text>
      </View>
      {/* Price & add button */}
      <View style={styles.bottomRow}>
        <Text style={styles.price}>{price}</Text>
        <AnimatedPressable
          style={styles.addBtn}
          onPress={handleAdd}
          scaleValue={0.85}
          enableHaptic={false}
        >
          <Ionicons name="add" size={22} color={COLOR_WHITE} />
        </AnimatedPressable>
      </View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  addBtn: {
    alignItems: "center",
    backgroundColor: COLOR_ADD_BTN,
    borderRadius: 999,
    justifyContent: "center",
    padding: 5,
  },
  bottomRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: COLOR_WHITE,
    borderColor: COLOR_BORDER,
    borderRadius: SIZES.RADIUS.LARGE,
    borderWidth: 1,
    elevation: 3,
    marginVertical: 6,
    padding: 10,
    shadowColor: COLOR_BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    width: 160,
  },
  dot: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLOR_DOT,
    marginHorizontal: 2,
  },
  iconMarginRight: {
    marginRight: 2,
  },
  image: {
    borderRadius: 8,
    height: 100,
    marginBottom: 7,
    resizeMode: "cover",
    width: "100%",
  },
  infoRow: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  infoText: {
    ...TEXT_STYLES.CAPTION,
    color: COLOR_TEXT_SECONDARY,
    marginRight: 3,
  },
  price: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLOR_TEXT_PRIMARY,
    fontWeight: "700",
  },
  rating: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLOR_TEXT_PRIMARY,
    fontWeight: "700",
    marginLeft: 2,
  },
  ratingCount: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLOR_TEXT_SECONDARY,
    marginLeft: 2,
  },
  ratingRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  subtitle: {
    ...TEXT_STYLES.CAPTION,
    color: COLOR_TEXT_SECONDARY,
    marginBottom: 4,
  },
  title: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLOR_TEXT_PRIMARY,
    fontWeight: "700",
    marginBottom: 2,
  },
  topRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
});

export default FoodCard;
