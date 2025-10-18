import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS, TEXT_STYLES } from "@constants/index";

interface SearchBoxProps {
  onPress?: () => void;
  placeholder?: string;
  editable?: boolean;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  onPress,
  placeholder = "Bạn muốn ăn gì ?",
  editable = false,
}) => {
  if (!editable && onPress) {
    return (
      <TouchableOpacity style={styles.searchBox} onPress={onPress} activeOpacity={0.8}>
        <Ionicons name="search" size={22} color={COLORS.TEXT_LIGHT} style={styles.searchIcon} />
        <Text style={styles.placeholderText}>{placeholder}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.searchBox}>
      <Ionicons name="search" size={22} color={COLORS.TEXT_LIGHT} style={styles.searchIcon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={COLORS.TEXT_LIGHT}
        editable={editable}
      />
    </View>
  );
};

const COLOR_WHITE = COLORS.BACKGROUND;

const styles = StyleSheet.create({
  input: {
    ...TEXT_STYLES.BODY_LARGE,
    flex: 1,
    marginLeft: 8,
  },
  placeholderText: {
    ...TEXT_STYLES.BODY_LARGE,
    color: COLORS.TEXT_LIGHT,
    flex: 1,
    marginLeft: 8,
  },
  searchBox: {
    alignItems: "center",
    backgroundColor: COLOR_WHITE,
    borderRadius: 16,
    flexDirection: "row",
    height: 44,
    marginTop: 16,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 4,
  },
});

export default SearchBox;
