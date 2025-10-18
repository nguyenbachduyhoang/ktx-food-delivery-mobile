import React from "react";
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
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
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.rowTop}>
        <TouchableOpacity
          style={[styles.checkbox, checked ? styles.checkboxChecked : styles.checkboxUnchecked]}
          onPress={onToggle}
          activeOpacity={0.7}
        >
          {checked && <Ionicons name="checkmark" size={16} color={COLORS.BACKGROUND} />}
        </TouchableOpacity>

        <View style={styles.thumbWrap}>
          <Image source={image} style={styles.image} />
        </View>

        <View style={styles.content}>
          <Text style={styles.restaurant} numberOfLines={1}>
            {restaurant}
          </Text>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <View style={styles.metaRow}>
            <Text style={styles.meta}>{distance}</Text>
            <Text style={styles.dot}>•</Text>
            <Ionicons name="star" size={12} color="#FFA500" />
            <Text style={styles.meta}>{rating} (1.2k)</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <Text style={styles.price}>{price}</Text>
          <View style={styles.qtyRow}>
            <TouchableOpacity style={styles.qtyBtn} onPress={onDecrease} activeOpacity={0.7}>
              <Ionicons name="remove" size={14} color={COLORS.TEXT_PRIMARY} />
            </TouchableOpacity>
            <Text style={styles.qty}>{quantity}</Text>
            <TouchableOpacity style={styles.qtyBtn} onPress={onIncrease} activeOpacity={0.7}>
              <Ionicons name="add" size={14} color={COLORS.TEXT_PRIMARY} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.voucherRow} activeOpacity={0.8}>
        <Ionicons name="pricetag-outline" size={14} color={COLORS.ERROR} />
        <Text style={styles.voucherText}>Thêm Quán Voucher</Text>
      </TouchableOpacity>

      <Text style={styles.voucherDesc}>Miễn phí ship(áp dụng cho sinh viên trong kí túc xá)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  actions: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: COLORS.BACKGROUND,
    borderColor: COLORS.DIVIDER,
    borderRadius: 14,
    borderWidth: 1,
    elevation: 2,
    marginBottom: SIZES.SPACING.MD,
    padding: SIZES.SPACING.MD,
    shadowColor: COLORS.TEXT_PRIMARY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  checkbox: {
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 1,
    height: 22,
    justifyContent: "center",
    marginRight: SIZES.SPACING.SM,
    width: 22,
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
  dot: {
    color: COLORS.TEXT_LIGHT,
    marginHorizontal: 6,
  },
  image: {
    height: "100%",
    resizeMode: "cover",
    width: "100%",
  },
  meta: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    marginLeft: 6,
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  price: {
    ...TEXT_STYLES.BODY_MEDIUM,
    alignSelf: "flex-end",
    color: COLORS.ERROR,
    fontWeight: "700",
    marginBottom: 2,
  },
  qty: {
    ...TEXT_STYLES.BODY_MEDIUM,
    marginHorizontal: SIZES.SPACING.SM,
    minWidth: 20,
    textAlign: "center",
  },
  qtyBtn: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND,
    borderColor: COLORS.BORDER,
    borderRadius: 4,
    borderWidth: 1,
    height: 24,
    justifyContent: "center",
    padding: 2,
    width: 24,
  },
  qtyRow: {
    alignItems: "center",
    alignSelf: "flex-end",
    flexDirection: "row",
    marginTop: 4,
  },
  restaurant: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "700",
    marginBottom: 2,
  },
  rowTop: {
    alignItems: "center",
    flexDirection: "row",
  },
  thumbWrap: {
    borderRadius: 10,
    height: 60,
    marginRight: SIZES.SPACING.MD,
    overflow: "hidden",
    width: 60,
  },
  title: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: 6,
  },
  voucherDesc: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SIZES.SPACING.SM,
  },
  voucherRow: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.SPACING.SM,
  },
  voucherText: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.ERROR,
    fontWeight: "600",
    marginLeft: SIZES.SPACING.SM,
  },
});

export default CartItem;
