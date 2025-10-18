import React from "react";
import { Text, StyleSheet } from "react-native";
import { COLORS, TEXT_STYLES } from "@constants/index";

interface FoodDescriptionProps {
  description: string;
}

const FoodDescription: React.FC<FoodDescriptionProps> = ({ description }) => {
  return <Text style={styles.description}>{description}</Text>;
};

const styles = StyleSheet.create({
  description: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 20,
    marginBottom: 20,
  },
});

export default FoodDescription;
