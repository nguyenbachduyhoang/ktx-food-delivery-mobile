import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import withScreenContainer from "@components/layouts/withScreenContainer";
import { COLORS, SIZES, TEXT_STYLES } from "@constants/index";
import CartItem from "./components/CartItem";
import CartFooter from "./components/CartFooter";
import sampleImage from "../../../assets/card/01.png";

const CartScreen: React.FC = () => {
  const [items, setItems] = useState([
    {
      id: "1",
      title: "Mỳ Ý sốt cà chua",
      restaurant: "Quán Cô Sen",
      price: "30.000đ",
      qty: 1,
      checked: true,
    },
    {
      id: "2",
      title: "Bánh mì thịt",
      restaurant: "Quán Cô Ốc",
      price: "30.000đ",
      qty: 1,
      checked: false,
    },
  ]);

  const increase = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));
  };

  const decrease = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i)));
  };

  const toggle = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)));
  };

  const itemCount = items.reduce((s, it) => s + it.qty, 0);
  const subtotal = "30.000đ"; // placeholder

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ hàng</Text>
      <ScrollView style={styles.list} contentContainerStyle={styles.contentContainer}>
        {items.map((item) => (
          <CartItem
            key={item.id}
            image={sampleImage}
            title={item.title}
            restaurant={item.restaurant}
            price={item.price}
            quantity={item.qty}
            checked={item.checked}
            onIncrease={() => increase(item.id)}
            onDecrease={() => decrease(item.id)}
            onToggle={() => toggle(item.id)}
          />
        ))}
      </ScrollView>
      <CartFooter itemCount={itemCount} subtotal={subtotal} shipping="Miễn phí" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 16,
  },
  list: {
    padding: SIZES.SPACING.MD,
  },
  title: {
    ...TEXT_STYLES.H3,
    marginBottom: SIZES.SPACING.SM,
    marginLeft: SIZES.SPACING.MD,
    marginTop: SIZES.SPACING.MD,
  },
});

export default withScreenContainer(CartScreen);
