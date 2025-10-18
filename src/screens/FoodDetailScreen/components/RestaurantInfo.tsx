import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AnimatedPressable from "@components/AnimatedPressable";
import { COLORS, TEXT_STYLES, SIZES } from "@constants/index";

interface RestaurantInfoProps {
  name: string;
  icon?: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const RestaurantInfo: React.FC<RestaurantInfoProps> = ({
  name,
  icon = "🍜",
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <View style={styles.restaurantRow}>
      <View style={styles.restaurantInfo}>
        <View style={styles.restaurantIcon}>
          <Text style={styles.restaurantIconText}>{icon}</Text>
        </View>
        <View style={styles.restaurantDetails}>
          <Text style={styles.restaurantName}>{name}</Text>
          <View style={styles.badgeContainer}>
            <View style={styles.badge}>
              <Ionicons name="location" size={12} color={COLORS.ERROR} />
            </View>
            <AnimatedPressable onPress={onToggleFavorite} hapticType="medium">
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={20}
                color={isFavorite ? COLORS.ERROR : COLORS.TEXT_LIGHT}
              />
            </AnimatedPressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignItems: "center",
    backgroundColor: COLORS.ERROR_LIGHT || "#FEE",
    borderRadius: 4,
    flexDirection: "row",
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  restaurantDetails: {
    flex: 1,
  },
  restaurantIcon: {
    alignItems: "center",
    backgroundColor: COLORS.WARNING_LIGHT || "#FFF4E6",
    borderRadius: SIZES.HEADER.BUTTON_SIZE / 2,
    height: SIZES.HEADER.BUTTON_SIZE,
    justifyContent: "center",
    marginRight: SIZES.SPACING.MD,
    width: SIZES.HEADER.BUTTON_SIZE,
  },
  restaurantIconText: {
    fontSize: 20,
  },
  restaurantInfo: {
    alignItems: "center",
    flexDirection: "row",
  },
  restaurantName: {
    ...TEXT_STYLES.BODY_LARGE,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "700",
    marginBottom: 4,
  },
  restaurantRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
});

export default RestaurantInfo;
