import React, { useRef, useState, useEffect } from "react";
import {
  View,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Animated, { FadeInRight, FadeInUp } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES, TEXT_STYLES } from "@constants/index";
import type { Food } from "@screens/FoodOrderScreen/types";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - SIZES.SPACING.MD * 4;
const CARD_SPACING = SIZES.SPACING.MD;

interface TopRatedCarouselProps {
  foods: Food[];
  // eslint-disable-next-line no-unused-vars
  onFoodPress?: (food: Food) => void;
}

const TopRatedCarousel: React.FC<TopRatedCarouselProps> = ({ foods, onFoodPress }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<Food>>(null);

  const onScroll = (event: { nativeEvent: { contentOffset: { x: number } } }) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / (CARD_WIDTH + CARD_SPACING));
    setActiveIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = activeIndex + 1;
      if (nextIndex >= foods.length) nextIndex = 0;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setActiveIndex(nextIndex);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeIndex, foods.length]);

  const renderItem = ({ item, index }: { item: Food; index: number }) => (
    <Animated.View entering={FadeInUp.delay(index * 150).duration(600)}>
      <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={() => onFoodPress?.(item)}>
        <Image source={item.image} style={styles.image} />

        {/* Badge */}
        <Animated.View
          entering={FadeInRight.delay(index * 100 + 200)
            .duration(400)
            .springify()}
          style={styles.badge}
        >
          <Ionicons name="trophy" size={16} color={COLORS.WARNING} />
          <Text style={styles.badgeText}>Top Rated</Text>
        </Animated.View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.topRow}>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={18} color={COLORS.WARNING} />
              <Text style={styles.rating}>{item.rating}</Text>
              <Text style={styles.ratingCount}>({item.ratingCount})</Text>
            </View>
            <View style={styles.timeContainer}>
              <Ionicons name="time-outline" size={16} color={COLORS.TEXT_LIGHT} />
              <Text style={styles.time}>{item.time} phút</Text>
            </View>
          </View>

          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {item.subtitle}
          </Text>

          <View style={styles.bottomRow}>
            <Text style={styles.price}>{item.price}</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={(e) => {
                e.stopPropagation();
                onFoodPress?.(item);
              }}
            >
              <Ionicons name="add" size={20} color={COLORS.BACKGROUND} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={foods}
        ref={flatListRef}
        horizontal
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onScroll={onScroll}
        renderItem={renderItem}
        snapToInterval={CARD_WIDTH + CARD_SPACING}
        decelerationRate="fast"
        contentContainerStyle={styles.listContainer}
        scrollEventThrottle={16}
      />

      {/* Indicators */}
      <View style={styles.indicatorContainer}>
        {foods.map((_, index) => (
          <View
            key={index}
            style={[styles.indicator, activeIndex === index && styles.activeIndicator]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  activeIndicator: {
    backgroundColor: COLORS.PRIMARY,
    width: 24,
  },
  addButton: {
    alignItems: "center",
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 999,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  badge: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND + "F0",
    borderRadius: SIZES.RADIUS.MEDIUM,
    elevation: 2,
    flexDirection: "row",
    left: SIZES.SPACING.SM,
    paddingHorizontal: SIZES.SPACING.SM,
    paddingVertical: SIZES.SPACING.XS,
    position: "absolute",
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    top: SIZES.SPACING.SM,
  },
  badgeText: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.WARNING,
    fontWeight: "700",
    marginLeft: SIZES.SPACING.XS / 2,
  },
  bottomRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SIZES.SPACING.SM,
  },
  card: {
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: SIZES.RADIUS.LARGE,
    elevation: 4,
    marginHorizontal: SIZES.SPACING.SM,
    overflow: "hidden",
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    width: CARD_WIDTH,
  },
  container: {
    position: "relative",
  },
  content: {
    padding: SIZES.SPACING.MD,
  },
  image: {
    height: 160,
    resizeMode: "cover",
    width: "100%",
  },
  indicator: {
    backgroundColor: COLORS.BORDER,
    borderRadius: 4,
    height: 6,
    marginHorizontal: 3,
    width: 6,
  },
  indicatorContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: SIZES.SPACING.MD,
  },
  listContainer: {
    paddingHorizontal: SIZES.SPACING.SM,
  },
  price: {
    ...TEXT_STYLES.H6,
    color: COLORS.PRIMARY,
    fontWeight: "700",
  },
  rating: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "700",
    marginHorizontal: SIZES.SPACING.XS / 2,
  },
  ratingContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  ratingCount: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_SECONDARY,
  },
  subtitle: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SIZES.SPACING.XS / 2,
  },
  time: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_LIGHT,
    marginLeft: SIZES.SPACING.XS / 2,
  },
  timeContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    ...TEXT_STYLES.BODY_LARGE,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "700",
    marginTop: SIZES.SPACING.SM,
  },
  topRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default TopRatedCarousel;
