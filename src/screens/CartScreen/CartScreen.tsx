import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeOut, Layout } from "react-native-reanimated";
import AnimatedPressable from "@components/AnimatedPressable";
import { showToast } from "@components/Toast";
import withScreenContainer from "@components/layouts/withScreenContainer";
import { SharedHeader } from "@components/shared";
import { COLORS, SIZES, TEXT_STYLES } from "@constants/index";
import CartItem from "./components/CartItem";
import CartFooter from "./components/CartFooter";
import EmptyCart from "./components/EmptyCart";
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

  const toggleAll = () => {
    const allChecked = items.every((item) => item.checked);
    setItems((prev) => prev.map((item) => ({ ...item, checked: !allChecked })));
  };

  const deleteSelected = () => {
    const deletedCount = items.filter((item) => item.checked).length;
    setItems((prev) => prev.filter((item) => !item.checked));
    showToast({
      message: `Đã xóa ${deletedCount} món khỏi giỏ hàng`,
      type: "success",
      duration: 2000,
    });
  };

  const deleteItem = (id: string) => {
    const item = items.find((i) => i.id === id);
    setItems((prev) => prev.filter((item) => item.id !== id));
    if (item) {
      showToast({
        message: `Đã xóa "${item.title}" khỏi giỏ hàng`,
        type: "success",
        duration: 2000,
      });
    }
  };

  const itemCount = items.reduce((s, it) => (it.checked ? s + it.qty : s), 0);
  const checkedItems = items.filter((item) => item.checked);
  const checkedCount = checkedItems.length;
  const allChecked = items.length > 0 && items.every((item) => item.checked);

  // Tính tổng tiền các món đã chọn
  const calculateTotal = () => {
    return checkedItems.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[^\d]/g, ""));
      return total + price * item.qty;
    }, 0);
  };

  const subtotal = calculateTotal().toLocaleString("vi-VN") + "đ";

  // Empty state
  if (items.length === 0) {
    return (
      <View style={styles.wrapper}>
        <SharedHeader title="Giỏ hàng" />
        <EmptyCart onStartShopping={() => console.log("Go to home")} />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <SharedHeader title="Giỏ hàng" />
      <View style={styles.container}>
        {/* Select all header */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.selectAllRow}>
          <AnimatedPressable
            style={styles.selectAllButton}
            onPress={toggleAll}
            enableHaptic={true}
            hapticType="light"
          >
            <View
              style={[
                styles.checkbox,
                allChecked ? styles.checkboxChecked : styles.checkboxUnchecked,
              ]}
            >
              {allChecked && <Ionicons name="checkmark" size={16} color={COLORS.BACKGROUND} />}
            </View>
            <Text style={styles.selectAllText}>Chọn tất cả ({items.length})</Text>
          </AnimatedPressable>

          {checkedCount > 0 && (
            <Animated.View entering={FadeInDown} exiting={FadeOut}>
              <AnimatedPressable
                style={styles.deleteButton}
                onPress={deleteSelected}
                hapticType="medium"
              >
                <Ionicons name="trash-outline" size={20} color={COLORS.ERROR} />
                <Text style={styles.deleteText}>Xóa ({checkedCount})</Text>
              </AnimatedPressable>
            </Animated.View>
          )}
        </Animated.View>

        <Animated.FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Animated.View
              entering={FadeInDown.delay(index * 50).duration(400)}
              exiting={FadeOut.duration(300)}
              layout={Layout.springify()}
            >
              <CartItem
                image={sampleImage}
                title={item.title}
                restaurant={item.restaurant}
                price={item.price}
                quantity={item.qty}
                checked={item.checked}
                onIncrease={() => increase(item.id)}
                onDecrease={() => decrease(item.id)}
                onToggle={() => toggle(item.id)}
                onDelete={() => deleteItem(item.id)}
              />
            </Animated.View>
          )}
          style={styles.list}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        />
        <Animated.View entering={FadeInDown.delay(items.length * 50 + 200)}>
          <CartFooter itemCount={itemCount} subtotal={subtotal} shipping="Miễn phí" />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    alignItems: "center",
    borderRadius: SIZES.RADIUS.SMALL / 2,
    borderWidth: 2,
    height: 22,
    justifyContent: "center",
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
  container: {
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    flex: 1,
  },
  contentContainer: {
    paddingBottom: SIZES.SPACING.XL,
  },
  deleteButton: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: SIZES.SPACING.MD,
    paddingVertical: SIZES.SPACING.SM,
  },
  deleteText: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.ERROR,
    fontWeight: "600",
    marginLeft: SIZES.SPACING.XS,
  },
  list: {
    flex: 1,
    paddingHorizontal: SIZES.SPACING.MD,
  },
  selectAllButton: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    paddingVertical: SIZES.SPACING.SM,
  },
  selectAllRow: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND,
    borderBottomColor: COLORS.DIVIDER,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.SPACING.MD,
    paddingVertical: SIZES.SPACING.XS,
  },
  selectAllText: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "600",
    marginLeft: SIZES.SPACING.SM,
  },
  wrapper: {
    flex: 1,
  },
});

// Disable ScreenContainer's ScrollView because this screen uses VirtualizedLists (Animated.FlatList)
type _StaticOpts = { useScreenScroll?: boolean };
(CartScreen as unknown as _StaticOpts).useScreenScroll = false;

export default withScreenContainer(CartScreen);
