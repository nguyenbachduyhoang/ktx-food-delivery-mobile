/* eslint-disable react-native/sort-styles */
import React from "react";
import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import AnimatedPressable from "@components/AnimatedPressable";
import { COLORS, SIZES, TEXT_STYLES } from "@constants/index";

interface CartItemProps {
  image: ImageSourcePropType;
  title: string;
  restaurant: string;
  distance?: string;
  rating?: string;
  price: string;
  quantity: number;
  checked?: boolean;
  onIncrease?: () => void;
  onDecrease?: () => void;
  onToggle?: () => void;
  onDelete?: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  image,
  title,
  restaurant,
  distance = "1.5 km",
  rating = "4.8",
  price,
  quantity,
  checked = false,
  onIncrease,
  onDecrease,
  onToggle,
  onDelete,
}) => {
  const translateX = useSharedValue(0);
  const SWIPE_THRESHOLD = -80;

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onUpdate((event) => {
      // Only allow left swipe
      if (event.translationX < 0) {
        translateX.value = Math.max(event.translationX, SWIPE_THRESHOLD);
      }
    })
    .onEnd(() => {
      if (translateX.value < SWIPE_THRESHOLD / 2) {
        translateX.value = withSpring(SWIPE_THRESHOLD);
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handleDelete = () => {
    translateX.value = withSpring(0);
    onDelete?.();
  };

  return (
    <View style={styles.wrapper}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.card, checked && styles.cardChecked, animatedStyle]}>
          <View style={styles.rowTop}>
            <AnimatedPressable
              style={[styles.checkbox, checked ? styles.checkboxChecked : styles.checkboxUnchecked]}
              onPress={onToggle}
              enableHaptic={true}
              hapticType="light"
            >
              {checked && <Ionicons name="checkmark" size={18} color={COLORS.BACKGROUND} />}
            </AnimatedPressable>

            <View style={styles.thumbWrap}>
              <Image source={image} style={styles.image} />
              {checked && (
                <View style={styles.imageOverlay}>
                  <Ionicons name="checkmark-circle" size={24} color={COLORS.PRIMARY} />
                </View>
              )}
            </View>

            <View style={styles.content}>
              <Text style={styles.restaurant} numberOfLines={1}>
                {restaurant}
              </Text>
              <Text style={styles.title} numberOfLines={2}>
                {title}
              </Text>
              <View style={styles.metaRow}>
                <Ionicons name="location-outline" size={14} color={COLORS.TEXT_LIGHT} />
                <Text style={styles.meta}>{distance}</Text>
                <Text style={styles.dot}>•</Text>
                <Ionicons name="star" size={14} color={COLORS.WARNING} />
                <Text style={styles.meta}>{rating}</Text>
              </View>
            </View>
          </View>

          <View style={styles.bottomRow}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{price}</Text>
            </View>

            <View style={styles.qtyPill}>
              <AnimatedPressable
                style={[styles.qtyPillBtn, quantity <= 1 ? styles.qtyPillBtnDisabled : null]}
                onPress={onDecrease}
                disabled={quantity <= 1}
                scaleValue={0.95}
                hapticType="light"
              >
                <Ionicons
                  name="remove"
                  size={18}
                  color={quantity <= 1 ? COLORS.TEXT_LIGHT : COLORS.PRIMARY}
                />
              </AnimatedPressable>

              <View style={styles.qtyPillDisplay}>
                <Text style={styles.qty}>{quantity}</Text>
              </View>

              <AnimatedPressable
                style={styles.qtyPillBtn}
                onPress={onIncrease}
                scaleValue={0.95}
                hapticType="light"
              >
                <Ionicons name="add" size={18} color={COLORS.PRIMARY} />
              </AnimatedPressable>
            </View>
          </View>

          {/* voucher UI removed */}
        </Animated.View>
      </GestureDetector>

      {/* Delete button (revealed on swipe) */}
      <View style={styles.deleteAction}>
        <AnimatedPressable style={styles.deleteButton} onPress={handleDelete} hapticType="medium">
          <Ionicons name="trash" size={20} color={COLORS.TEXT_WHITE} />
        </AnimatedPressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SIZES.SPACING.MD,
  },
  card: {
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: SIZES.RADIUS.MEDIUM,
    elevation: 2,
    padding: SIZES.SPACING.MD,
    position: "relative",
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  cardChecked: {
    borderColor: COLORS.PRIMARY,
    borderWidth: 2,
  },
  checkbox: {
    alignItems: "center",
    borderRadius: SIZES.RADIUS.SMALL / 2,
    borderWidth: 2,
    height: 24,
    justifyContent: "center",
    marginRight: SIZES.SPACING.SM,
    width: 24,
  },
  checkboxChecked: {
    backgroundColor: COLORS.PRIMARY,
    borderColor: COLORS.PRIMARY,
  },
  checkboxUnchecked: {
    backgroundColor: COLORS.BACKGROUND,
    borderColor: COLORS.BORDER,
  },
  content: {
    flex: 1,
  },
  deleteAction: {
    alignItems: "center",
    backgroundColor: COLORS.ERROR,
    borderRadius: SIZES.RADIUS.MEDIUM,
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    right: 0,
    top: 0,
    width: 72,
  },
  deleteButton: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },
  dot: {
    color: COLORS.TEXT_LIGHT,
    marginHorizontal: SIZES.SPACING.XS,
  },
  image: {
    height: "100%",
    resizeMode: "cover",
    width: "100%",
  },
  imageOverlay: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND + "E6", // 90% opacity
    bottom: 0,
    justifyContent: "center",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  meta: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    marginLeft: SIZES.SPACING.XS / 2,
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.SPACING.XS,
  },
  price: {
    ...TEXT_STYLES.H6,
    color: COLORS.PRIMARY,
    fontWeight: "700",
    fontSize: 18, // Tăng kích thước giá lên 2px
  },
  priceContainer: {
    alignItems: "flex-end",
    flex: 0,
  },
  qty: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "600",
    minWidth: 24,
    textAlign: "center",
  },
  /* pill style quantity */
  qtyPill: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    borderRadius: 20,
    flexDirection: "row",
    gap: SIZES.SPACING.SM,
    padding: 6,
  },
  qtyPillBtn: {
    alignItems: "center",
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  qtyPillBtnDisabled: {
    opacity: 0.5,
  },
  qtyPillDisplay: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 36,
  },
  restaurant: {
    ...TEXT_STYLES.BODY_LARGE,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "700",
    marginBottom: SIZES.SPACING.XS / 2,
  },
  rowTop: {
    alignItems: "flex-start",
    flexDirection: "row",
  },
  thumbWrap: {
    borderRadius: SIZES.RADIUS.MEDIUM,
    height: 64,
    marginRight: SIZES.SPACING.MD,
    overflow: "hidden",
    position: "relative",
    width: 64,
  },
  title: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "600",
  },
  // voucher styles removed
  wrapper: {
    marginBottom: SIZES.SPACING.MD,
    overflow: "hidden",
    position: "relative",
  },
});

export default CartItem;
