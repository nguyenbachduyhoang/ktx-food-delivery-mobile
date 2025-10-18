import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, TEXT_STYLES } from "@constants/index";

interface FoodInfoProps {
  title: string;
  label?: string;
}

const FoodInfo: React.FC<FoodInfoProps> = ({ title, label }) => {
  return (
    <View>
      <Text style={styles.foodTitle}>{title}</Text>
      {label && <Text style={styles.foodLabel}>{label}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  foodLabel: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.ERROR,
    marginBottom: 12,
  },
  foodTitle: {
    ...TEXT_STYLES.H2,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "700",
    marginBottom: 4,
  },
});

export default FoodInfo;

