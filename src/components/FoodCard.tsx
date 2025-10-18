import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageSourcePropType } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS, TEXT_STYLES } from "@constants/index";

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
  isFavorite,
  time,
  kcal,
  price,
  onAdd,
  onFavorite,
}) => (
  <View style={styles.card}>
    {/* Top row: rating + heart */}
    <View style={styles.topRow}>
      <View style={styles.ratingRow}>
        <Ionicons name="star" size={18} color={COLOR_STAR} style={styles.iconMarginRight} />
        <Text style={styles.rating}>{rating}</Text>
        <Text style={styles.ratingCount}>({ratingCount})</Text>
      </View>
      <TouchableOpacity onPress={onFavorite}>
        <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={22} color={COLOR_HEART} />
      </TouchableOpacity>
    </View>
    {/* Image */}
    <Image source={image} style={styles.image} />
    {/* Title & subtitle */}
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
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
      <TouchableOpacity style={styles.addBtn} onPress={onAdd}>
        <Ionicons name="add" size={22} color={COLOR_WHITE} />
      </TouchableOpacity>
    </View>
  </View>
);

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
    borderRadius: 14,
    borderWidth: 1,
    elevation: 2,
    marginVertical: 6,
    padding: 10,
    shadowColor: COLOR_BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
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
