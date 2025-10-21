import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "@components/Button";
import { COLORS, SIZES, TEXT_STYLES } from "@constants/index";

interface EmptyCartProps {
  onStartShopping?: () => void;
}

const EmptyCart: React.FC<EmptyCartProps> = ({ onStartShopping }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="restaurant-outline" size={60} color={COLORS.PRIMARY} />
        <View style={styles.cartIcon}>
          <Ionicons name="cart-outline" size={40} color={COLORS.TEXT_LIGHT} />
        </View>
      </View>
      <Text style={styles.title}>Giỏ hàng trống</Text>
      <Text style={styles.description}>
        Bạn chưa có món ăn nào trong giỏ hàng.{"\n"}
        Hãy khám phá và thêm món yêu thích của bạn!
      </Text>
      <Button title="Khám phá ngay" onPress={onStartShopping || (() => {})} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: SIZES.SPACING.LG,
    paddingHorizontal: SIZES.SPACING.XL * 2,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: SIZES.SPACING.XL,
  },
  description: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SIZES.SPACING.SM,
    textAlign: "center",
  },
  iconContainer: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    borderRadius: 80,
    height: 160,
    justifyContent: "center",
    marginBottom: SIZES.SPACING.LG,
    width: 160,
    position: "relative",
  },
  cartIcon: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.PRIMARY_LIGHT + "30",
    borderRadius: 20,
    padding: 8,
  },
  title: {
    ...TEXT_STYLES.H3,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "700",
  },
});

export default EmptyCart;
