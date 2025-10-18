import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { COLORS, SIZES, TEXT_STYLES } from "@constants/index";

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({ title, onPress, style, textStyle }: ButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: COLORS.BUTTON_PRIMARY,
    borderRadius: SIZES.RADIUS.EXTRA_LARGE,
    justifyContent: "center",
    marginTop: SIZES.SPACING.SM,
    paddingHorizontal: SIZES.SPACING.XL,
    paddingVertical: SIZES.SPACING.SM,
  },
  buttonText: {
    ...TEXT_STYLES.BUTTON_MEDIUM,
    color: COLORS.TEXT_WHITE,
  },
});
