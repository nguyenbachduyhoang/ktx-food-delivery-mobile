import React from "react";
import { View, Text, StyleSheet, ImageSourcePropType } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import FoodCard from "@components/FoodCard";
import { COLORS, TEXT_STYLES, SIZES } from "@constants/index";

export interface SuggestedItem {
  id: number;
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
  rating: number;
  ratingCount: string;
  time: string;
  kcal: string;
  price: string;
  isFavorite: boolean;
}

interface SuggestedItemsProps {
  items: SuggestedItem[];
  delay?: number;
}

const SuggestedItems: React.FC<SuggestedItemsProps> = ({ items, delay = 700 }) => {
  return (
    <Animated.View entering={FadeInDown.delay(delay)} style={styles.suggestedSection}>
      <Text style={styles.sectionTitle}>Gợi ý cho bạn</Text>
      <View style={styles.suggestedGrid}>
        {items.map((item, index) => (
          <Animated.View key={item.id} entering={FadeInDown.delay(delay + 50 + index * 50)}>
            <FoodCard
              image={item.image}
              title={item.title}
              subtitle={item.subtitle}
              rating={item.rating}
              ratingCount={item.ratingCount}
              time={item.time}
              kcal={item.kcal}
              price={item.price}
              isFavorite={item.isFavorite}
              onAdd={() => {}}
              onFavorite={() => {}}
            />
          </Animated.View>
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    ...TEXT_STYLES.H3,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "700",
    marginBottom: 16,
  },
  suggestedGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  suggestedSection: {
    paddingBottom: SIZES.SPACING.XL,
    paddingHorizontal: SIZES.SPACING.MD,
    paddingTop: SIZES.SPACING.LG,
  },
});

export default SuggestedItems;

