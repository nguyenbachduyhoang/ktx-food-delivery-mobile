import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES, TEXT_STYLES } from "@constants/index";

interface Props {
  placeholder?: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

const CategorySearchBar: React.FC<Props> = ({ placeholder, value, onChange }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={18} color={COLORS.TEXT_LIGHT} />
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={COLORS.TEXT_HINT}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND,
    borderColor: COLORS.BORDER,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: SIZES.SPACING.MD,
    paddingVertical: SIZES.SPACING.SM,
  },
  input: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
    marginLeft: SIZES.SPACING.SM,
  },
});

export default CategorySearchBar;
