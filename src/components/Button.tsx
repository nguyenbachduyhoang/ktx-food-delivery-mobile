import React from "react";
import { Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from "react-native";
import AnimatedPressable from "./AnimatedPressable";
import { COLORS, SIZES, TEXT_STYLES } from "@constants/index";

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary" | "outline";
}

export default function Button({ 
  title, 
  onPress, 
  style, 
  textStyle,
  disabled = false,
  loading = false,
  variant = "primary",
}: ButtonProps) {
  const getButtonStyle = () => {
    switch (variant) {
      case "secondary":
        return styles.buttonSecondary;
      case "outline":
        return styles.buttonOutline;
      default:
        return styles.buttonPrimary;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case "outline":
        return styles.textOutline;
      default:
        return styles.buttonText;
    }
  };

  return (
    <AnimatedPressable 
      style={[
        styles.button, 
        getButtonStyle(),
        disabled && styles.buttonDisabled,
        style
      ]} 
      onPress={onPress}
      disabled={disabled || loading}
      enableHaptic={!disabled && !loading}
      hapticType="medium"
    >
      {loading ? (
        <ActivityIndicator color={variant === "outline" ? COLORS.PRIMARY : COLORS.TEXT_WHITE} />
      ) : (
        <Text style={[getTextStyle(), textStyle, disabled && styles.textDisabled]}>
          {title}
        </Text>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: SIZES.RADIUS.EXTRA_LARGE,
    justifyContent: "center",
    marginTop: SIZES.SPACING.SM,
    minHeight: 48,
    paddingHorizontal: SIZES.SPACING.XL,
    paddingVertical: SIZES.SPACING.SM,
  },
  buttonDisabled: {
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    opacity: 0.6,
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderColor: COLORS.PRIMARY,
    borderWidth: 2,
  },
  buttonPrimary: {
    backgroundColor: COLORS.BUTTON_PRIMARY,
  },
  buttonSecondary: {
    backgroundColor: COLORS.SECONDARY,
  },
  buttonText: {
    ...TEXT_STYLES.BUTTON_MEDIUM,
    color: COLORS.TEXT_WHITE,
    fontWeight: "600",
  },
  textDisabled: {
    color: COLORS.TEXT_LIGHT,
  },
  textOutline: {
    ...TEXT_STYLES.BUTTON_MEDIUM,
    color: COLORS.PRIMARY,
    fontWeight: "600",
  },
});
