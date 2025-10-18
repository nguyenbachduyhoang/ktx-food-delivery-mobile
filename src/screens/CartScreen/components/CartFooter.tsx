import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "@components/ui/Button";
import { COLORS, SIZES, TEXT_STYLES } from "@constants/index";

interface CartFooterProps {
  itemCount: number;
  subtotal: string;
  shipping: string;
  onCheckout?: () => void;
}

const CartFooter: React.FC<CartFooterProps> = ({ itemCount, subtotal, shipping, onCheckout }) => {
  // Tính tổng thanh toán (nếu cần logic phức tạp hơn)
  const total = subtotal;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Tổng cộng ({itemCount} món)</Text>
        <Text style={styles.value}>{subtotal}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Phí giao hàng</Text>
        <Text style={[styles.value, styles.free]}>{shipping}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.totalRow}>
        <View style={styles.totalInfo}>
          <Text style={styles.totalLabel}>Tổng thanh toán</Text>
          <Text style={styles.totalValue}>{total}</Text>
        </View>
        <Button title="Đặt hàng ngay" onPress={onCheckout || (() => {})} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND,
    borderColor: COLORS.DIVIDER,
    borderTopWidth: 1,
    padding: SIZES.SPACING.MD,
  },
  divider: {
    backgroundColor: COLORS.DIVIDER,
    height: 1,
    marginVertical: SIZES.SPACING.SM,
  },
  free: {
    color: COLORS.SUCCESS,
  },
  label: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SIZES.SPACING.SM,
  },
  totalInfo: {
    flex: 1,
  },
  totalLabel: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: 4,
  },
  totalRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalValue: {
    ...TEXT_STYLES.H4,
    color: COLORS.PRIMARY,
    fontWeight: "700",
  },
  value: {
    ...TEXT_STYLES.BODY_MEDIUM,
    fontWeight: "700",
  },
});

export default CartFooter;
