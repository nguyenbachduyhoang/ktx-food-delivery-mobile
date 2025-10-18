import React, { useState } from "react";
import { View, TextInput, StyleSheet, ViewStyle, TextStyle, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS, TEXT_STYLES } from "@constants/index";

import { TextInputProps } from "react-native";

interface InputProps {
  value: string;
  onChangeText: TextInputProps["onChangeText"];
  placeholder?: string;
  type?: "text" | "password" | "email";
  style?: ViewStyle | TextStyle;
  placeholderTextColor?: string;
}

const DARK_COLOR = COLORS.TEXT_PRIMARY;
const TRANSPARENT = "transparent";

const styles = StyleSheet.create({
  input: {
    ...TEXT_STYLES.BODY_LARGE,
    backgroundColor: TRANSPARENT,
    color: DARK_COLOR,
    flex: 1,
  },
  inputWrapper: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
});

export default function Input({
  value,
  onChangeText,
  placeholder,
  type = "text",
  style,
  placeholderTextColor = "#888",
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={[styles.input, style]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={isPassword && !showPassword}
        placeholderTextColor={placeholderTextColor}
        autoCapitalize={type === "email" ? "none" : "sentences"}
        keyboardType={type === "email" ? "email-address" : "default"}
      />
      {isPassword && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            size={22}
            color="#888"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
