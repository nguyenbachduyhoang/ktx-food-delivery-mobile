import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import AnimatedPressable from "@components/AnimatedPressable";
import { COLORS, TEXT_STYLES, SIZES } from "@constants/index";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  delay?: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  delay = 500,
}) => {
  return (
    <Animated.View entering={FadeInDown.delay(delay)} style={styles.quantitySection}>
      <Text style={styles.quantityLabel}>Số lượng:</Text>
      <View style={styles.quantityControl}>
        <AnimatedPressable style={styles.quantityBtn} onPress={onDecrease} hapticType="light">
          <Ionicons name="remove" size={20} color={COLORS.BACKGROUND} />
        </AnimatedPressable>
        <Text style={styles.quantityText}>{quantity}</Text>
        <AnimatedPressable style={styles.quantityBtn} onPress={onIncrease} hapticType="light">
          <Ionicons name="add" size={20} color={COLORS.BACKGROUND} />
        </AnimatedPressable>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  quantityBtn: {
    alignItems: "center",
    backgroundColor: COLORS.PRIMARY,
    borderRadius: SIZES.RADIUS.SMALL,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  quantityControl: {
    alignItems: "center",
    flexDirection: "row",
    gap: SIZES.SPACING.MD,
  },
  quantityLabel: {
    ...TEXT_STYLES.BODY_LARGE,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "700",
  },
  quantitySection: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SIZES.SPACING.MD,
  },
  quantityText: {
    ...TEXT_STYLES.H5,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "700",
    minWidth: 40,
    textAlign: "center",
  },
});

export default QuantitySelector;
