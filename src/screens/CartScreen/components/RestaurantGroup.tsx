import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { COLORS, SIZES, TEXT_STYLES } from "@constants/index";

interface RestaurantGroupProps {
  restaurantName: string;
  distance: string;
  rating: string;
  totalItems: number;
  totalPrice: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const RestaurantGroup: React.FC<RestaurantGroupProps> = ({
  restaurantName,
  distance,
  rating,
  totalItems,
  totalPrice,
  isExpanded,
  onToggle,
  children,
}) => {
  return (
    <Animated.View entering={FadeInDown.duration(400)} style={styles.container}>
      {/* Restaurant Header */}
      <TouchableOpacity style={styles.header} onPress={onToggle} activeOpacity={0.8}>
        <View style={styles.headerLeft}>
          <View style={styles.restaurantIcon}>
            <Ionicons name="restaurant" size={20} color={COLORS.PRIMARY} />
          </View>
          <View style={styles.restaurantInfo}>
            <Text style={styles.restaurantName}>{restaurantName}</Text>
            <View style={styles.metaRow}>
              <Ionicons name="location-outline" size={14} color={COLORS.TEXT_LIGHT} />
              <Text style={styles.meta}>{distance}</Text>
              <Text style={styles.dot}>•</Text>
              <Ionicons name="star" size={14} color={COLORS.WARNING} />
              <Text style={styles.meta}>{rating}</Text>
            </View>
          </View>
        </View>

        <View style={styles.headerRight}>
          <View style={styles.priceInfo}>
            <Text style={styles.totalPrice}>{totalPrice}</Text>
            <Text style={styles.itemCount}>({totalItems} món)</Text>
          </View>
          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={20}
            color={COLORS.TEXT_LIGHT}
          />
        </View>
      </TouchableOpacity>

      {/* Restaurant Items */}
      {isExpanded && (
        <Animated.View entering={FadeInDown.duration(300)} style={styles.itemsContainer}>
          {children}
        </Animated.View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: SIZES.RADIUS.MEDIUM,
    elevation: 2,
    marginBottom: SIZES.SPACING.LG, // Tăng từ MD lên LG để có khoảng cách lớn hơn
    marginHorizontal: SIZES.SPACING.XS, // Thêm margin ngang để tạo không gian
    overflow: "hidden",
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  dot: {
    color: COLORS.TEXT_LIGHT,
    marginHorizontal: SIZES.SPACING.XS,
  },
  header: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: SIZES.SPACING.MD,
  },
  headerLeft: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  headerRight: {
    alignItems: "center",
    flexDirection: "row",
  },
  itemCount: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_LIGHT,
    marginTop: 2,
  },
  itemsContainer: {
    paddingBottom: SIZES.SPACING.MD,
    paddingHorizontal: SIZES.SPACING.MD,
    paddingTop: SIZES.SPACING.SM, // Thêm padding top để tạo khoảng cách với header
  },
  meta: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    marginLeft: SIZES.SPACING.XS / 2,
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  priceInfo: {
    alignItems: "flex-end",
    marginRight: SIZES.SPACING.SM,
  },
  restaurantIcon: {
    alignItems: "center",
    backgroundColor: COLORS.PRIMARY_LIGHT + "20",
    borderRadius: SIZES.RADIUS.SMALL,
    height: 36,
    justifyContent: "center",
    marginRight: SIZES.SPACING.SM,
    width: 36,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    ...TEXT_STYLES.BODY_LARGE,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "700",
    marginBottom: SIZES.SPACING.XS / 2,
  },
  totalPrice: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "700",
  },
});

export default RestaurantGroup;
