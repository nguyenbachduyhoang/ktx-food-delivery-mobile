import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { COLORS, TEXT_STYLES, SIZES } from "@constants/index";

interface LabelProps {
  title: string;
  allText?: string;
  onPressAll?: () => void;
  style?: ViewStyle | TextStyle;
  titleStyle?: TextStyle;
  allStyle?: TextStyle;
}

const Label: React.FC<LabelProps> = ({
  title,
  allText = "Tất cả",
  onPressAll,
  style,
  titleStyle,
  allStyle,
}) => (
  <View style={[styles.header, style]}>
    <Text style={[styles.title, titleStyle]}>{title}</Text>
    <TouchableOpacity onPress={onPressAll}>
      <Text style={[styles.all, allStyle]}>{allText}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  all: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.PRIMARY,
    fontWeight: "700",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SIZES.SPACING.SM,
    paddingHorizontal: SIZES.SPACING.MD,
  },
  title: {
    ...TEXT_STYLES.H6,
    fontWeight: "700",
  },
});

export default Label;
