import React from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import Animated, { SlideInRight } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import AnimatedPressable from "@components/AnimatedPressable";
import { COLORS, TEXT_STYLES, SIZES } from "@constants/index";

interface Category {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}

interface QuickCategoriesProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryPress: (categoryId: string) => void;
}

const QuickCategories: React.FC<QuickCategoriesProps> = ({
  categories,
  selectedCategory,
  onCategoryPress,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category, index) => (
        <Animated.View
          key={category.id}
          entering={SlideInRight.delay(300 + index * 50)
            .duration(400)
            .springify()}
        >
          <AnimatedPressable
            style={[styles.chip, selectedCategory === category.id && styles.chipActive]}
            onPress={() => onCategoryPress(category.id)}
            scaleValue={0.95}
          >
            <Ionicons
              name={category.icon}
              size={18}
              color={selectedCategory === category.id ? COLORS.BACKGROUND : COLORS.PRIMARY}
            />
            <Text
              style={[styles.chipText, selectedCategory === category.id && styles.chipTextActive]}
            >
              {category.label}
            </Text>
          </AnimatedPressable>
        </Animated.View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  chip: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND,
    borderColor: COLORS.PRIMARY,
    borderRadius: SIZES.RADIUS.EXTRA_LARGE,
    borderWidth: 1.5,
    elevation: 2,
    flexDirection: "row",
    marginRight: SIZES.SPACING.SM,
    paddingHorizontal: SIZES.SPACING.MD,
    paddingVertical: SIZES.SPACING.SM,
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  chipActive: {
    backgroundColor: COLORS.PRIMARY,
    borderColor: COLORS.PRIMARY,
  },
  chipText: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.PRIMARY,
    fontWeight: "600",
    marginLeft: SIZES.SPACING.XS,
  },
  chipTextActive: {
    color: COLORS.BACKGROUND,
  },
  container: {
    paddingHorizontal: SIZES.SPACING.MD,
    paddingVertical: SIZES.SPACING.SM,
  },
});

export default QuickCategories;
