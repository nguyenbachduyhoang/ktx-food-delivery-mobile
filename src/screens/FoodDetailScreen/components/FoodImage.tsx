import React from "react";
import { Image, StyleSheet, ImageSourcePropType } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

interface FoodImageProps {
  source: ImageSourcePropType;
}

const FoodImage: React.FC<FoodImageProps> = ({ source }) => {
  return (
    <Animated.View entering={FadeIn.duration(600)}>
      <Image source={source} style={styles.heroImage} resizeMode="cover" />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  heroImage: {
    height: 250,
    width: "100%",
  },
});

export default FoodImage;

