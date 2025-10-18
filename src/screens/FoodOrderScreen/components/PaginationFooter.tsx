import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import AnimatedPressable from "@components/AnimatedPressable";
import { COLORS, TEXT_STYLES, SIZES } from "@constants/index";

interface PaginationFooterProps {
  currentPage: number;
  totalPages: number;
  onPreviousPress: () => void;
  onNextPress: () => void;
}

const PaginationFooter: React.FC<PaginationFooterProps> = ({
  currentPage,
  totalPages,
  onPreviousPress,
  onNextPress,
}) => {
  if (totalPages <= 1) return null;

  return (
    <Animated.View entering={FadeIn.duration(400)} style={styles.container}>
      <AnimatedPressable
        style={[styles.button, currentPage === 1 && styles.buttonDisabled]}
        onPress={onPreviousPress}
        disabled={currentPage === 1}
        scaleValue={0.9}
      >
        <Ionicons
          name="chevron-back"
          size={20}
          color={currentPage === 1 ? COLORS.TEXT_LIGHT : COLORS.PRIMARY}
        />
      </AnimatedPressable>

      <View style={styles.info}>
        <Text style={styles.text}>
          Trang {currentPage} / {totalPages}
        </Text>
      </View>

      <AnimatedPressable
        style={[styles.button, currentPage === totalPages && styles.buttonDisabled]}
        onPress={onNextPress}
        disabled={currentPage === totalPages}
        scaleValue={0.9}
      >
        <Ionicons
          name="chevron-forward"
          size={20}
          color={currentPage === totalPages ? COLORS.TEXT_LIGHT : COLORS.PRIMARY}
        />
      </AnimatedPressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND,
    borderColor: COLORS.PRIMARY,
    borderRadius: SIZES.RADIUS.MEDIUM,
    borderWidth: 1.5,
    elevation: 2,
    height: 40,
    justifyContent: "center",
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: 40,
  },
  buttonDisabled: {
    borderColor: COLORS.BORDER,
    opacity: 0.5,
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: SIZES.SPACING.LG,
    paddingBottom: SIZES.SPACING.MD,
  },
  info: {
    marginHorizontal: SIZES.SPACING.LG,
  },
  text: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "600",
  },
});

export default PaginationFooter;

