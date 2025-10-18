import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { COLORS, TEXT_STYLES, SIZES } from "@constants/index";

interface ResultsHeaderProps {
  totalResults: number;
  selectedCategory?: string | null;
  currentPage?: number;
  totalPages?: number;
}

const ResultsHeader: React.FC<ResultsHeaderProps> = ({
  totalResults,
  selectedCategory,
  currentPage,
  totalPages,
}) => {
  return (
    <Animated.View entering={FadeIn.delay(600).duration(400)} style={styles.container}>
      <Text style={styles.resultsText}>
        {totalResults} món ăn {selectedCategory ? `• ${selectedCategory}` : ""}
      </Text>
      {totalPages && totalPages > 1 && (
        <Text style={styles.pageText}>
          Trang {currentPage}/{totalPages}
        </Text>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SIZES.SPACING.SM,
    marginTop: SIZES.SPACING.MD,
    paddingHorizontal: SIZES.SPACING.MD,
  },
  pageText: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_SECONDARY,
  },
  resultsText: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
    fontWeight: "600",
  },
});

export default ResultsHeader;

