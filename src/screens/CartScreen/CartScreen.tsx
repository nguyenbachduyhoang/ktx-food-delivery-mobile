import React from "react";
import { View, Text, StyleSheet } from "react-native";
import withScreenContainer from "@components/layouts/withScreenContainer";
import { COLORS, SIZES, TEXT_STYLES } from "@constants/index";

const CartScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ hàng</Text>
      <Text style={styles.empty}>Chưa có sản phẩm trong giỏ.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-start",
    padding: SIZES.SPACING.MD,
  },
  empty: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: SIZES.FONT.MEDIUM,
  },
  title: {
    ...TEXT_STYLES.H3,
    marginBottom: SIZES.SPACING.SM,
  },
});

export default withScreenContainer(CartScreen);
