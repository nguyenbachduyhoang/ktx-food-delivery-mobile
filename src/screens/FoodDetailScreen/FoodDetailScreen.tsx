import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { showToast } from "@components/Toast";
import withScreenContainer from "@components/layouts/withScreenContainer";
import { COLORS, SIZES } from "@constants/index";
import phoImg from "../../../assets/category/pho.png";
import banhmiImg from "../../../assets/category/banhmi.png";
import goicuonImg from "../../../assets/category/goicuon.png";
import capheImg from "../../../assets/category/caphe.png";
import {
  FoodDetailHeader,
  FoodImage,
  RestaurantInfo,
  FoodInfo,
  FoodStats,
  FoodDescription,
  QuantitySelector,
  ActionButtons,
  SuggestedItems,
  SuggestedItem,
} from "./components";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FoodDetailScreen = ({ navigation, route }: any) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const scrollY = useSharedValue(0);
  const [quantity, setQuantity] = useState(1);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 100], [0, 1], Extrapolate.CLAMP);

    return {
      opacity,
      backgroundColor: `rgba(255, 255, 255, ${opacity})`,
    };
  });

  // Sample data for suggested items
  const suggestedItems: SuggestedItem[] = [
    {
      id: 1,
      image: phoImg,
      title: "Phở bò",
      subtitle: "Cổ Sen",
      rating: 4.8,
      ratingCount: "1.5k",
      time: "15 phút",
      kcal: "350",
      price: "30.000đ",
      isFavorite: false,
    },
    {
      id: 2,
      image: banhmiImg,
      title: "Phở gà",
      subtitle: "Cổ Sen",
      rating: 4.6,
      ratingCount: "1.2k",
      time: "12 phút",
      kcal: "320",
      price: "30.000đ",
      isFavorite: false,
    },
    {
      id: 3,
      image: goicuonImg,
      title: "Phở bò đặc biệt",
      subtitle: "Cổ Sen",
      rating: 4.9,
      ratingCount: "2k",
      time: "18 phút",
      kcal: "400",
      price: "38.000đ",
      isFavorite: false,
    },
    {
      id: 4,
      image: capheImg,
      title: "Phở gà đặc biệt",
      subtitle: "Cổ Sen",
      rating: 4.7,
      ratingCount: "1.8k",
      time: "15 phút",
      kcal: "370",
      price: "38.000đ",
      isFavorite: false,
    },
  ];

  const handleAddToCart = () => {
    showToast({
      message: `Đã thêm ${quantity} món vào giỏ hàng`,
      type: "success",
      duration: 2000,
    });
  };

  const handleCheckout = () => {
    showToast({
      message: "Chuyển đến trang thanh toán",
      type: "info",
      duration: 2000,
    });
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    showToast({
      message: isFavorite ? "Đã bỏ yêu thích" : "Đã thêm vào yêu thích",
      type: isFavorite ? "info" : "success",
      duration: 2000,
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <FoodDetailHeader
        onBackPress={() => navigation.goBack()}
        onSharePress={() => console.log("Share")}
        onMorePress={() => console.log("More")}
        animatedStyle={headerAnimatedStyle}
      />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {/* Food Image */}
        <FoodImage source={phoImg} />

        {/* Info Card */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.infoCard}>
          {/* Restaurant Info */}
          <RestaurantInfo
            name="Cổ Sen"
            icon="🍜"
            isFavorite={isFavorite}
            onToggleFavorite={handleToggleFavorite}
          />

          {/* Food Title */}
          <FoodInfo title={route?.params?.itemName ?? "Phở bò"} label="Thô-bò" />

          {/* Stats */}
          <FoodStats rating={4.8} orderCount="300+" deliveryTime="15 phút" />

          {/* Description */}
          <FoodDescription description="Phở bò là món ăn truyền thống nổi tiếng của Việt Nam, với nước dùng được hầm từ xương bò cùng các gia vị như quế, hồi, gừng, tạo nên hương vị đậm đà. Bánh phở mềm mại, thịt bò tươi ngon, ăn kèm với rau thơm và sa tế làm món ăn này trở thành lựa chọn yêu thích." />

          {/* Quantity Selector */}
          <QuantitySelector
            quantity={quantity}
            onIncrease={() => setQuantity(quantity + 1)}
            onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
          />

          {/* Action Buttons */}
          <ActionButtons onAddToCart={handleAddToCart} onCheckout={handleCheckout} />
        </Animated.View>

        {/* Suggested Items */}
        <SuggestedItems items={suggestedItems} />
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND,
    flex: 1,
  },
  infoCard: {
    backgroundColor: COLORS.BACKGROUND,
    borderTopLeftRadius: SIZES.RADIUS.EXTRA_LARGE,
    borderTopRightRadius: SIZES.RADIUS.EXTRA_LARGE,
    marginTop: -SIZES.SPACING.LG,
    paddingBottom: SIZES.SPACING.MD,
    paddingHorizontal: SIZES.SPACING.MD,
    paddingTop: SIZES.SPACING.LG,
  },
});

// Disable the ScreenContainer ScrollView for this screen because it uses VirtualizedLists / Animated.ScrollView
type _StaticOpts = { useScreenScroll?: boolean };
(FoodDetailScreen as unknown as _StaticOpts).useScreenScroll = false;

export default withScreenContainer(FoodDetailScreen);
