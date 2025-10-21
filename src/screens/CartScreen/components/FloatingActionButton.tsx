import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import Animated, { FadeIn, FadeOut, SlideInUp, SlideOutDown } from "react-native-reanimated";
import { COLORS, SIZES, TEXT_STYLES } from "@constants/index";

interface FloatingActionButtonProps {
  totalPrice: string;
  itemCount: number;
  onCheckout: () => void;
  visible: boolean;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  totalPrice,
  itemCount,
  onCheckout,
  visible,
}) => {
  if (!visible) return null;

  return (
    <Animated.View
      entering={SlideInUp.duration(300)}
      exiting={SlideOutDown.duration(300)}
      style={styles.container}
    >
      <BlurView intensity={20} style={styles.blurContainer}>
        <View style={styles.content}>
          {/* Price Info */}
          <View style={styles.priceSection}>
            <View style={styles.priceContainer}>
              <Text style={styles.totalLabel}>Tổng thanh toán</Text>
              <Text style={styles.itemCount}>({itemCount} món)</Text>
            </View>
            <Text style={styles.totalPrice}>{totalPrice}</Text>
          </View>

          {/* Checkout Button */}
          <TouchableOpacity style={styles.checkoutButton} onPress={onCheckout} activeOpacity={0.8}>
            <Text style={styles.checkoutText}>Đặt hàng</Text>
            <Ionicons name="arrow-forward" size={20} color={COLORS.BACKGROUND} />
          </TouchableOpacity>
        </View>
      </BlurView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  blurContainer: {
    borderTopLeftRadius: SIZES.RADIUS.LARGE,
    borderTopRightRadius: SIZES.RADIUS.LARGE,
    overflow: "hidden",
  },
  content: {
    backgroundColor: COLORS.BACKGROUND + "F0", // 94% opacity
    borderTopLeftRadius: SIZES.RADIUS.LARGE,
    borderTopRightRadius: SIZES.RADIUS.LARGE,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SIZES.SPACING.MD,
    paddingVertical: SIZES.SPACING.MD,
    paddingBottom: SIZES.SPACING.MD + 8, // Extra padding for safe area
  },
  priceSection: {
    flex: 1,
    marginRight: SIZES.SPACING.MD,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 2,
  },
  totalLabel: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "600",
    marginRight: SIZES.SPACING.XS,
  },
  itemCount: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_LIGHT,
  },
  totalPrice: {
    ...TEXT_STYLES.H3,
    color: COLORS.PRIMARY,
    fontWeight: "700",
    fontSize: 20,
  },
  checkoutButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: SIZES.RADIUS.MEDIUM,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SIZES.SPACING.LG,
    paddingVertical: SIZES.SPACING.MD,
    minHeight: 56,
    elevation: 4,
    shadowColor: COLORS.PRIMARY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  checkoutText: {
    ...TEXT_STYLES.BUTTON_LARGE,
    color: COLORS.BACKGROUND,
    fontWeight: "700",
    marginRight: SIZES.SPACING.XS,
  },
});

export default FloatingActionButton;
