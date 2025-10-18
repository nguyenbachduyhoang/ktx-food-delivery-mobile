import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { COLORS, TEXT_STYLES } from "@constants/index";

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const MAIN_COLOR = COLORS.PRIMARY;

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
    backgroundColor: MAIN_COLOR,
    borderRadius: 24,
    justifyContent: "center",
    marginTop: 8,
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
  buttonText: {
    ...TEXT_STYLES.BUTTON_LARGE,
    color: COLORS.BACKGROUND,
  },
});
