import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "@components/ui/Button";
import { COLORS, SIZES, TEXT_STYLES } from "@constants/index";

interface CartFooterProps {
  itemCount: number;
  subtotal: string;
  shipping: string;
  onCheckout?: () => void;
}

const CartFooter: React.FC<CartFooterProps> = ({ itemCount, subtotal, shipping, onCheckout }) => {
  const total = subtotal; // In real app, calculate: subtotal + shipping - discount

  return (
    <View style={styles.container}>
      {/* Voucher Section */}
      <TouchableOpacity style={styles.voucherSection} activeOpacity={0.8}>
        <View style={styles.voucherLeft}>
          <View style={styles.voucherIcon}>
            <Ionicons name="pricetags" size={20} color={COLORS.PRIMARY} />
          </View>
          <View style={styles.voucherContent}>
            <Text style={styles.voucherTitle}>Mã giảm giá</Text>
            <Text style={styles.voucherSubtitle}>Chọn hoặc nhập mã</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={24} color={COLORS.TEXT_LIGHT} />
      </TouchableOpacity>

      <View style={styles.divider} />

      {/* Price Summary */}
      <View style={styles.summarySection}>
        <View style={styles.row}>
          <Text style={styles.label}>Tổng tiền hàng</Text>
          <Text style={styles.value}>{subtotal}</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.shippingLabel}>
            <Text style={styles.label}>Phí giao hàng</Text>
            <Ionicons
              name="information-circle-outline"
              size={16}
              color={COLORS.TEXT_LIGHT}
              style={styles.infoIcon}
            />
          </View>
          <Text style={[styles.value, styles.free]}>{shipping}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Total */}
      <View style={styles.totalSection}>
        <View style={styles.totalRow}>
          <View style={styles.totalLeft}>
            <Text style={styles.totalLabel}>Tổng thanh toán</Text>
            <Text style={styles.itemsText}>({itemCount} món)</Text>
          </View>
          <Text style={styles.totalValue}>{total}</Text>
        </View>
      </View>

      {/* Checkout Button */}
      <Button
        title="Tiến hành đặt hàng"
        onPress={onCheckout || (() => {})}
        style={styles.checkoutButton}
        textStyle={styles.checkoutButtonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  checkoutButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: SIZES.RADIUS.MEDIUM,
    marginTop: SIZES.SPACING.SM,
    paddingVertical: SIZES.SPACING.SM,
  },
  checkoutButtonText: {
    ...TEXT_STYLES.BUTTON_LARGE,
    color: COLORS.BACKGROUND,
    fontSize: 16,
    fontWeight: "700",
  },
  container: {
    backgroundColor: COLORS.BACKGROUND,
    borderTopColor: COLORS.DIVIDER,
    borderTopWidth: 1,
    elevation: 8,
    paddingBottom: SIZES.SPACING.SM,
    paddingHorizontal: SIZES.SPACING.SM,
    paddingTop: SIZES.SPACING.SM,
    shadowColor: COLORS.TEXT_PRIMARY,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  divider: {
    backgroundColor: COLORS.DIVIDER,
    height: 1,
    marginVertical: SIZES.SPACING.SM,
  },
  free: {
    color: COLORS.SUCCESS,
  },
  infoIcon: {
    marginLeft: SIZES.SPACING.XS / 2,
  },
  itemsText: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_LIGHT,
    marginTop: 0,
  },
  label: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SIZES.SPACING.SM,
  },
  shippingLabel: {
    alignItems: "center",
    flexDirection: "row",
  },
  summarySection: {
    marginBottom: 0,
  },
  totalLabel: {
    ...TEXT_STYLES.BODY_LARGE,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "600",
  },
  totalLeft: {
    flex: 1,
  },
  totalRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalSection: {
    marginBottom: 0,
  },
  totalValue: {
    ...TEXT_STYLES.H3,
    color: COLORS.PRIMARY,
    fontWeight: "700",
  },
  value: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "600",
  },
  voucherContent: {
    flex: 1,
    marginLeft: SIZES.SPACING.SM,
  },
  voucherIcon: {
    alignItems: "center",
    backgroundColor: COLORS.PRIMARY_LIGHT + "20",
    borderRadius: SIZES.RADIUS.SMALL,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  voucherLeft: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
  voucherSection: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    borderRadius: SIZES.RADIUS.MEDIUM,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: SIZES.SPACING.SM,
  },
  voucherSubtitle: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_LIGHT,
    marginTop: 0,
  },
  voucherTitle: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "600",
  },
});

export default CartFooter;
