import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SIZES, TEXT_STYLES } from "@constants/index";
import Ionicons from "react-native-vector-icons/Ionicons";

interface OrderCardProps {
  shopName: string;
  items: number;
  total: string;
  status: string;
  onPress?: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ shopName, items, total, status, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.shopInfo}>
          <View style={styles.logoPlaceholder} />
          <View style={styles.shopText}>
            <Text style={styles.shopName} numberOfLines={1}>
              {shopName}
            </Text>
            <Text style={styles.itemsText}>{items} món</Text>
          </View>
        </View>

        <View style={styles.statusWrap}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.totalLabel}>Tổng đơn</Text>
        <Text style={styles.totalValue}>{total}</Text>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8}>
          <Ionicons name="chatbubble-outline" size={18} color={COLORS.PRIMARY} />
          <Text style={styles.actionText}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionBtn, styles.primaryAction]} activeOpacity={0.85}>
          <Text style={[styles.actionText, styles.primaryActionText]}>Xem chi tiết</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionBtn: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    borderRadius: SIZES.RADIUS.SMALL,
    flexDirection: "row",
    gap: SIZES.SPACING.SM,
    justifyContent: "center",
    paddingHorizontal: SIZES.SPACING.SM,
    paddingVertical: SIZES.SPACING.XS,
  },
  actionText: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.PRIMARY,
    marginLeft: SIZES.SPACING.XS,
  },
  actionsRow: {
    flexDirection: "row",
    gap: SIZES.SPACING.SM,
    justifyContent: "flex-end",
  },
  body: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SIZES.SPACING.SM,
  },
  card: {
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: SIZES.RADIUS.MEDIUM,
    elevation: 4,
    marginBottom: SIZES.SPACING.MD,
    padding: SIZES.SPACING.MD,
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SIZES.SPACING.SM,
  },
  itemsText: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_LIGHT,
    marginTop: 2,
  },
  logoPlaceholder: {
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    borderRadius: 10,
    height: 44,
    marginRight: SIZES.SPACING.MD,
    width: 44,
  },
  primaryAction: {
    backgroundColor: COLORS.PRIMARY,
  },
  primaryActionText: {
    color: COLORS.BACKGROUND,
    fontWeight: "700",
  },
  shopInfo: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
  shopName: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "700",
  },
  shopText: {
    flex: 1,
  },
  statusText: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.PRIMARY,
    fontWeight: "700",
  },
  statusWrap: {
    alignItems: "flex-end",
  },
  totalLabel: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_LIGHT,
  },
  totalValue: {
    ...TEXT_STYLES.H6,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "700",
  },
});

export default OrderCard;
