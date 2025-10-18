import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import Button from "@components/Button";
import { COLORS, SIZES } from "@constants/index";

interface ActionButtonsProps {
  onAddToCart: () => void;
  onCheckout: () => void;
  delay?: number;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onAddToCart,
  onCheckout,
  delay = 600,
}) => {
  return (
    <Animated.View entering={FadeInDown.delay(delay)} style={styles.actionButtons}>
      <Button 
        title="Thêm vào đơn hàng" 
        onPress={onAddToCart} 
        style={styles.addButton} 
      />
      <Button
        title="Thanh toán"
        onPress={onCheckout}
        style={styles.payButton}
        textStyle={styles.payButtonText}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  actionButtons: {
    flexDirection: "row",
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: COLORS.ERROR_LIGHT || "#FEE",
    flex: 1,
    marginRight: 12,
    marginTop: 0,
  },
  payButton: {
    backgroundColor: COLORS.ERROR || COLORS.BUTTON_PRIMARY,
    flex: 1,
    marginTop: 0,
  },
  payButtonText: {
    color: COLORS.TEXT_WHITE,
  },
});

export default ActionButtons;

