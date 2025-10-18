import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { COLORS, TEXT_STYLES } from "@constants/index";

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

const COLOR_LABEL = COLORS.PRIMARY;

const styles = StyleSheet.create({
  all: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLOR_LABEL,
    fontWeight: "700",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    marginHorizontal: 4,
  },
  title: {
    ...TEXT_STYLES.BODY_LARGE,
    fontWeight: "700",
  },
});

export default Label;
