import React from "react";
import { Text, StyleSheet } from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, TEXT_STYLES, SIZES } from "@constants/index";

const EmptyState: React.FC = () => {
  return (
    <Animated.View entering={ZoomIn.delay(300).duration(600).springify()} style={styles.container}>
      <Ionicons name="restaurant-outline" size={64} color={COLORS.TEXT_LIGHT} />
      <Text style={styles.title}>Không tìm thấy món ăn</Text>
      <Text style={styles.subtitle}>Thử tìm kiếm với từ khóa khác</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: SIZES.SPACING.XL * 2,
    paddingHorizontal: SIZES.SPACING.MD,
  },
  subtitle: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SIZES.SPACING.XS,
    textAlign: "center",
  },
  title: {
    ...TEXT_STYLES.H5,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "600",
    marginTop: SIZES.SPACING.MD,
  },
});

export default EmptyState;
