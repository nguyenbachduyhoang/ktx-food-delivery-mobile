import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";
import { COLORS, TEXT_STYLES } from "@constants/index";

interface LabelTextProps {
  children: React.ReactNode;
  style?: TextStyle;
}

const LabelText: React.FC<LabelTextProps> = ({ children, style }) => (
  <Text style={[styles.text, style]}>{children}</Text>
);

const COLOR_TEXT = COLORS.TEXT_PRIMARY;

const styles = StyleSheet.create({
  text: {
    ...TEXT_STYLES.LABEL,
    color: COLOR_TEXT,
    fontWeight: "700",
  },
});

export default LabelText;
