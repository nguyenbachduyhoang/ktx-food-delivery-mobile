import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
  ViewStyle,
} from "react-native";
import LabelText from "./LabelText";
import { TEXT_STYLES } from "@constants/index";

export interface CategoryItem {
  label: string;
  icon: ImageSourcePropType;
  onPress?: () => void;
}

interface CategoryGridProps {
  data: CategoryItem[];
  style?: ViewStyle;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ data, style }) => (
  <View style={[styles.grid, style]}>
    {data.map((item) => (
      <TouchableOpacity
        key={item.label}
        style={styles.item}
        onPress={item.onPress}
        activeOpacity={0.7}
      >
        <Image source={item.icon} style={styles.icon} resizeMode="contain" />
        <LabelText style={styles.label}>{item.label}</LabelText>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 8,
  },
  icon: {
    height: 48,
    marginBottom: 4,
    width: 48,
  },
  item: {
    alignItems: "center",
    marginBottom: 16,
    width: "23%",
  },
  label: {
    ...TEXT_STYLES.BODY_MEDIUM,
    textAlign: "center",
  },
});

export default CategoryGrid;
