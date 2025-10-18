import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, TEXT_STYLES } from "@constants/index";

interface FoodStatsProps {
  rating: number;
  orderCount: string;
  deliveryTime: string;
}

const FoodStats: React.FC<FoodStatsProps> = ({ rating, orderCount, deliveryTime }) => {
  return (
    <View style={styles.statsRow}>
      <View style={styles.statItem}>
        <Ionicons name="star" size={16} color={COLORS.WARNING} />
        <Text style={styles.statText}>{rating} Rating</Text>
      </View>
      <View style={styles.statItem}>
        <Ionicons name="bag-outline" size={16} color={COLORS.TEXT_SECONDARY} />
        <Text style={styles.statText}>{orderCount} Đơn</Text>
      </View>
      <View style={styles.statItem}>
        <Ionicons name="time-outline" size={16} color={COLORS.TEXT_SECONDARY} />
        <Text style={styles.statText}>{deliveryTime}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statItem: {
    alignItems: "center",
    flexDirection: "row",
    marginRight: 12,
  },
  statText: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_SECONDARY,
  },
  statsRow: {
    alignItems: "center",
    borderBottomColor: COLORS.BORDER,
    borderBottomWidth: 1,
    flexDirection: "row",
    marginBottom: 16,
    paddingBottom: 16,
  },
});

export default FoodStats;
