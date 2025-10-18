import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { AnimatedStyle } from "react-native-reanimated";
import { ViewStyle } from "react-native";
import AnimatedPressable from "@components/AnimatedPressable";
import { COLORS, SIZES } from "@constants/index";

interface FoodDetailHeaderProps {
  onBackPress: () => void;
  onSharePress?: () => void;
  onMorePress?: () => void;
  animatedStyle?: AnimatedStyle<ViewStyle>;
}

const FoodDetailHeader: React.FC<FoodDetailHeaderProps> = ({
  onBackPress,
  onSharePress,
  onMorePress,
  animatedStyle,
}) => {
  return (
    <Animated.View style={[styles.header, animatedStyle]}>
      <AnimatedPressable onPress={onBackPress} style={styles.headerBtn} hapticType="light">
        <Ionicons name="arrow-back" size={SIZES.HEADER.ICON_SIZE} color={COLORS.TEXT_PRIMARY} />
      </AnimatedPressable>
      <View style={styles.headerRight}>
        <AnimatedPressable style={styles.headerBtn} hapticType="light" onPress={onSharePress}>
          <Ionicons
            name="share-social-outline"
            size={SIZES.HEADER.ICON_SIZE}
            color={COLORS.TEXT_PRIMARY}
          />
        </AnimatedPressable>
        <AnimatedPressable style={styles.headerBtn} hapticType="light" onPress={onMorePress}>
          <Ionicons
            name="ellipsis-horizontal"
            size={SIZES.HEADER.ICON_SIZE}
            color={COLORS.TEXT_PRIMARY}
          />
        </AnimatedPressable>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
    height: SIZES.HEADER.HEIGHT,
    justifyContent: "space-between",
    left: 0,
    paddingHorizontal: SIZES.HEADER.PADDING_HORIZONTAL,
    paddingVertical: SIZES.HEADER.PADDING_VERTICAL,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 10,
  },
  headerBtn: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: SIZES.HEADER.BUTTON_SIZE / 2,
    elevation: 3,
    height: SIZES.HEADER.BUTTON_SIZE,
    justifyContent: "center",
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: SIZES.HEADER.BUTTON_SIZE,
  },
  headerRight: {
    alignItems: "center",
    flexDirection: "row",
    gap: SIZES.SPACING.SM,
  },
});

export default FoodDetailHeader;
