import React from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import AnimatedPressable from "@components/AnimatedPressable";
import { COLORS, SIZES } from "@constants/index";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  onFilterPress: () => void;
  hasActiveFilters: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  onFilterPress,
  hasActiveFilters,
}) => {
  return (
    <Animated.View style={styles.container} entering={FadeInDown.delay(300).duration(500)}>
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color={COLORS.TEXT_LIGHT} />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm món ăn, quán..."
          placeholderTextColor={COLORS.TEXT_LIGHT}
          value={searchQuery}
          onChangeText={onSearchChange}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => onSearchChange("")}>
            <Ionicons name="close-circle" size={20} color={COLORS.TEXT_LIGHT} />
          </TouchableOpacity>
        )}
      </View>

      <AnimatedPressable style={styles.filterButton} onPress={onFilterPress} scaleValue={0.9}>
        <Ionicons name="options" size={22} color={COLORS.BACKGROUND} />
        {hasActiveFilters && <View style={styles.filterBadge} />}
      </AnimatedPressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: SIZES.SPACING.MD,
    paddingVertical: SIZES.SPACING.SM,
  },
  filterBadge: {
    backgroundColor: COLORS.ERROR,
    borderRadius: 4,
    height: 8,
    position: "absolute",
    right: 8,
    top: 8,
    width: 8,
  },
  filterButton: {
    alignItems: "center",
    backgroundColor: COLORS.PRIMARY,
    borderRadius: SIZES.RADIUS.MEDIUM,
    elevation: 3,
    height: 44,
    justifyContent: "center",
    marginLeft: SIZES.SPACING.SM,
    shadowColor: COLORS.PRIMARY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    width: 44,
  },
  searchBox: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: SIZES.RADIUS.MEDIUM,
    elevation: 2,
    flex: 1,
    flexDirection: "row",
    height: 44,
    paddingHorizontal: SIZES.SPACING.MD,
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  searchInput: {
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
    fontSize: 14,
    marginLeft: SIZES.SPACING.SM,
  },
});

export default SearchBar;

