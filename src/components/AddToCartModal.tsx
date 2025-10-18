import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import AnimatedPressable from "@components/AnimatedPressable";
import Button from "@components/Button";
import Toast from "@components/Toast";
import { COLORS, TEXT_STYLES, SIZES } from "@constants/index";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface Topping {
  id: string;
  name: string;
  price: number;
}

interface AddToCartModalProps {
  visible: boolean;
  onClose: () => void;
  foodImage: ImageSourcePropType;
  foodName: string;
  foodPrice: string;
  restaurant: string;
  description?: string;
}

const TOPPINGS: Topping[] = [
  { id: "1", name: "Dưa leo 🥒", price: 7000 },
  { id: "2", name: "Đậu bắp 🥬", price: 7000 },
  { id: "3", name: "Cải chua 🥬", price: 7000 },
  { id: "4", name: "Cà rót 🍆", price: 7000 },
  { id: "5", name: "Rau muống 🌿", price: 7000 },
  { id: "6", name: "Giá đỗ 🌱", price: 5000 },
];

const SPICY_LEVELS = [
  { id: "1", name: "Không cay ❌", price: 0 },
  { id: "2", name: "Cay vừa 🔥", price: 0 },
  { id: "3", name: "Siêu cay 🌶️", price: 0 },
];

const AddToCartModal: React.FC<AddToCartModalProps> = ({
  visible,
  onClose,
  foodImage,
  foodName,
  foodPrice,
  restaurant,
  description,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [selectedSpicy, setSelectedSpicy] = useState<string>("1");
  const [note, setNote] = useState("");
  const [showToast, setShowToast] = useState(false);

  const translateY = useSharedValue(SCREEN_HEIGHT);
  const backdropOpacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(0, { duration: 350 });
      backdropOpacity.value = withTiming(1, { duration: 300 });
    }
  }, [visible]);

  const handleClose = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    translateY.value = withTiming(SCREEN_HEIGHT, { duration: 300 }, () => {
      runOnJS(onClose)();
    });
    backdropOpacity.value = withTiming(0, { duration: 300 });

    // Reset state sau khi đóng
    setTimeout(() => {
      setQuantity(1);
      setSelectedToppings([]);
      setSelectedSpicy("1");
      setNote("");
    }, 300);
  };

  const modalAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const handleToppingToggle = (toppingId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedToppings((prev) => {
      if (prev.includes(toppingId)) {
        return prev.filter((id) => id !== toppingId);
      } else if (prev.length < 3) {
        return [...prev, toppingId];
      }
      return prev;
    });
  };

  const handleSpicySelect = (spicyId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedSpicy(spicyId);
  };

  const calculateTotal = () => {
    const basePrice = parseInt(foodPrice.replace(/[^\d]/g, ""));
    const toppingPrice = selectedToppings.reduce((sum, id) => {
      const topping = TOPPINGS.find((t) => t.id === id);
      return sum + (topping?.price || 0);
    }, 0);
    return (basePrice + toppingPrice) * quantity;
  };

  const handleAddToCart = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setShowToast(true);
    setTimeout(() => {
      handleClose();
    }, 1500);
  };

  const handleQuantityChange = (delta: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={handleClose}>
      <View style={styles.modalWrapper}>
        {/* Backdrop */}
        <Animated.View style={[styles.backdrop, backdropAnimatedStyle]}>
          <TouchableOpacity 
            style={styles.backdropTouchable} 
            activeOpacity={1} 
            onPress={handleClose} 
          />
        </Animated.View>

        {/* Modal Content */}
        <Animated.View style={[styles.modalContainer, modalAnimatedStyle]}>
          <View style={styles.modal}>
            {/* Close Button - Floating */}
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <Ionicons name="close" size={28} color={COLORS.BACKGROUND} />
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
              {/* Food Image - Large Hero */}
              <View style={styles.imageContainer}>
                <Image source={foodImage} style={styles.foodImage} />
              </View>

              {/* Content */}
              <View style={styles.contentContainer}>
                {/* Drag Indicator */}
                <View style={styles.dragIndicator} />

                {/* Food Info */}
                <View style={styles.foodInfo}>
                  <Text style={styles.foodName}>{foodName}</Text>
                  <Text style={styles.restaurantName}>{restaurant}</Text>
                  <Text style={styles.basePrice}>{foodPrice}</Text>
                  {description && (
                    <Text style={styles.foodDescription}>{description}</Text>
                  )}
                </View>

            {/* Quantity */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Số lượng</Text>
              <View style={styles.quantityContainer}>
                <AnimatedPressable
                  style={[styles.quantityButton, quantity <= 1 && styles.quantityButtonDisabled]}
                  onPress={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  scaleValue={0.9}
                >
                  <Ionicons
                    name="remove"
                    size={20}
                    color={quantity <= 1 ? COLORS.TEXT_LIGHT : COLORS.PRIMARY}
                  />
                </AnimatedPressable>
                <Text style={styles.quantityText}>{quantity}</Text>
                <AnimatedPressable
                  style={styles.quantityButton}
                  onPress={() => handleQuantityChange(1)}
                  scaleValue={0.9}
                >
                  <Ionicons name="add" size={20} color={COLORS.PRIMARY} />
                </AnimatedPressable>
              </View>
            </View>

            {/* Toppings */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Topping</Text>
                <Text style={styles.sectionNote}>Không bắt buộc, tối đa 3</Text>
              </View>
              <View style={styles.optionsList}>
                {TOPPINGS.map((topping) => {
                  const isSelected = selectedToppings.includes(topping.id);
                  return (
                    <TouchableOpacity
                      key={topping.id}
                      style={styles.checkboxOption}
                      onPress={() => handleToppingToggle(topping.id)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.checkboxContainer}>
                        <View style={[styles.checkbox, isSelected && styles.checkboxChecked]}>
                          {isSelected && (
                            <Ionicons name="checkmark" size={16} color={COLORS.BACKGROUND} />
                          )}
                        </View>
                        <Text style={styles.optionLabel}>{topping.name}</Text>
                      </View>
                      <Text style={styles.optionPrice}>+{topping.price.toLocaleString()}đ</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Drinks */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Mức độ cay</Text>
                <Text style={styles.sectionNote}>Chọn 1</Text>
              </View>
              <View style={styles.optionsList}>
                {SPICY_LEVELS.map((spicy) => {
                  const isSelected = selectedSpicy === spicy.id;
                  return (
                    <TouchableOpacity
                      key={spicy.id}
                      style={styles.checkboxOption}
                      onPress={() => handleSpicySelect(spicy.id)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.checkboxContainer}>
                        <View style={[styles.radio, isSelected && styles.radioSelected]}>
                          {isSelected && <View style={styles.radioDot} />}
                        </View>
                        <Text style={styles.optionLabel}>{spicy.name}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Note */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Thêm lưu ý cho quán</Text>
                <Text style={styles.sectionNote}>Không bắt buộc</Text>
              </View>
              <TextInput
                style={styles.noteInput}
                placeholder="Việc thực hiện yêu cầu còn tùy thuộc vào khả năng của quán."
                placeholderTextColor={COLORS.TEXT_LIGHT}
                value={note}
                onChangeText={setNote}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
                </View>
              </View>
            </ScrollView>

            {/* Footer - Fixed at bottom */}
            <View style={styles.footer}>
              <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Tổng cộng</Text>
                <Text style={styles.totalPrice}>{calculateTotal().toLocaleString()}đ</Text>
              </View>
              <Button
                title="Thêm vào giỏ hàng"
                onPress={handleAddToCart}
                style={styles.addButton}
                textStyle={styles.addButtonText}
              />
            </View>
          </View>
        </Animated.View>

        {/* Toast */}
        {showToast && (
          <Toast
            message="Đã thêm vào giỏ hàng!"
            type="success"
            onHide={() => setShowToast(false)}
          />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  addButton: {
    flex: 1,
    marginLeft: SIZES.SPACING.MD,
  },
  addButtonText: {
    color: COLORS.BACKGROUND,
    fontWeight: "700",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  backdropTouchable: {
    flex: 1,
  },
  basePrice: {
    ...TEXT_STYLES.H5,
    color: COLORS.PRIMARY,
    fontWeight: "800",
    marginTop: SIZES.SPACING.XS,
  },
  foodDescription: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 20,
    marginTop: SIZES.SPACING.MD,
  },
  checkbox: {
    alignItems: "center",
    borderColor: COLORS.BORDER,
    borderRadius: 4,
    borderWidth: 2,
    height: 22,
    justifyContent: "center",
    marginRight: SIZES.SPACING.SM,
    width: 22,
  },
  checkboxChecked: {
    backgroundColor: COLORS.PRIMARY,
    borderColor: COLORS.PRIMARY,
  },
  checkboxContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
  checkboxOption: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: SIZES.SPACING.MD,
  },
  closeButton: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 999,
    height: 40,
    justifyContent: "center",
    position: "absolute",
    right: SIZES.SPACING.MD,
    top: SIZES.SPACING.MD,
    width: 40,
    zIndex: 10,
  },
  contentContainer: {
    backgroundColor: COLORS.BACKGROUND,
    borderTopLeftRadius: SIZES.RADIUS.EXTRA_LARGE,
    borderTopRightRadius: SIZES.RADIUS.EXTRA_LARGE,
    marginTop: -SIZES.RADIUS.EXTRA_LARGE,
    paddingHorizontal: SIZES.SPACING.LG,
    paddingTop: SIZES.SPACING.MD,
  },
  dragIndicator: {
    alignSelf: "center",
    backgroundColor: COLORS.TEXT_LIGHT,
    borderRadius: 3,
    height: 5,
    marginBottom: SIZES.SPACING.LG,
    width: 50,
  },
  foodImage: {
    height: 250,
    resizeMode: "cover",
    width: "100%",
  },
  foodInfo: {
    marginBottom: SIZES.SPACING.XL,
  },
  foodName: {
    ...TEXT_STYLES.H4,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "800",
    marginBottom: SIZES.SPACING.XS,
  },
  footer: {
    backgroundColor: COLORS.BACKGROUND,
    borderTopColor: COLORS.BORDER,
    borderTopWidth: 1.5,
    elevation: 8,
    flexDirection: "row",
    paddingBottom: SIZES.SPACING.XL,
    paddingHorizontal: SIZES.SPACING.LG,
    paddingTop: SIZES.SPACING.MD,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  imageContainer: {
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    height: 250,
    width: "100%",
  },
  modal: {
    backgroundColor: COLORS.BACKGROUND,
    flex: 1,
    overflow: "hidden",
  },
  modalContainer: {
    backgroundColor: COLORS.BACKGROUND,
    borderTopLeftRadius: SIZES.RADIUS.EXTRA_LARGE,
    borderTopRightRadius: SIZES.RADIUS.EXTRA_LARGE,
    elevation: 20,
    maxHeight: "92%",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  modalWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
  noteInput: {
    ...TEXT_STYLES.BODY_MEDIUM,
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    borderColor: COLORS.BORDER,
    borderRadius: SIZES.RADIUS.MEDIUM,
    borderWidth: 1,
    color: COLORS.TEXT_PRIMARY,
    minHeight: 90,
    padding: SIZES.SPACING.MD,
  },
  optionLabel: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
  },
  optionPrice: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
  },
  optionsList: {
    borderTopColor: COLORS.BORDER,
    borderTopWidth: 1,
  },
  quantityButton: {
    alignItems: "center",
    backgroundColor: COLORS.PRIMARY_LIGHT + "20",
    borderColor: COLORS.PRIMARY_LIGHT,
    borderRadius: SIZES.RADIUS.MEDIUM,
    borderWidth: 1.5,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  quantityButtonDisabled: {
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    borderColor: COLORS.BORDER,
    opacity: 0.5,
  },
  quantityContainer: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    borderRadius: SIZES.RADIUS.LARGE,
    flexDirection: "row",
    gap: SIZES.SPACING.LG,
    justifyContent: "center",
    marginTop: SIZES.SPACING.SM,
    paddingHorizontal: SIZES.SPACING.LG,
    paddingVertical: SIZES.SPACING.MD,
  },
  quantityText: {
    ...TEXT_STYLES.H4,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "700",
    minWidth: 50,
    textAlign: "center",
  },
  radio: {
    alignItems: "center",
    borderColor: COLORS.BORDER,
    borderRadius: 999,
    borderWidth: 2,
    height: 22,
    justifyContent: "center",
    marginRight: SIZES.SPACING.SM,
    width: 22,
  },
  radioDot: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 999,
    height: 12,
    width: 12,
  },
  radioSelected: {
    borderColor: COLORS.PRIMARY,
  },
  restaurantName: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SIZES.SPACING.XS / 2,
  },
  section: {
    marginBottom: SIZES.SPACING.XL,
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SIZES.SPACING.SM,
  },
  sectionNote: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
  },
  sectionTitle: {
    ...TEXT_STYLES.H6,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "700",
  },
  totalContainer: {
    alignItems: "flex-start",
    flex: 1,
    justifyContent: "center",
  },
  totalLabel: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
    fontWeight: "600",
  },
  totalPrice: {
    ...TEXT_STYLES.H4,
    color: COLORS.PRIMARY,
    fontWeight: "800",
    marginTop: SIZES.SPACING.XS / 2,
  },
});

export default AddToCartModal;

