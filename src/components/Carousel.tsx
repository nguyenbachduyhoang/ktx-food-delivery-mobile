import React, { useRef, useState, useEffect } from "react";
import {
  View,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  ImageSourcePropType,
  ViewStyle,
} from "react-native";

const { width } = Dimensions.get("window");

import food1 from "../../assets/banner/food1.png";
import food2 from "../../assets/banner/food2.png";

const images: ImageSourcePropType[] = [food1, food2];

interface CarouselProps {
  style?: ViewStyle;
}

const Carousel: React.FC<CarouselProps> = ({ style }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<ImageSourcePropType>>(null);

  const onScroll = (event: { nativeEvent: { contentOffset: { x: number } } }) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / (width - 32));
    setActiveIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = activeIndex + 1;
      if (nextIndex >= images.length) nextIndex = 0;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setActiveIndex(nextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <View style={[styles.container, style]}>
      <FlatList
        data={images}
        ref={flatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        onScroll={onScroll}
        renderItem={({ item }) => <Image source={item} style={styles.image} />}
      />

      {/* Indicator */}
      <View style={styles.indicatorContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[styles.indicator, activeIndex === index && styles.activeIndicator]}
          />
        ))}
      </View>
    </View>
  );
};

export default Carousel;

// Color constants
const COLOR_INDICATOR = "#ccc";
const COLOR_ACTIVE_INDICATOR = "#000";

const styles = StyleSheet.create({
  activeIndicator: {
    backgroundColor: COLOR_ACTIVE_INDICATOR,
    width: 16,
  },
  container: { position: "relative" },
  image: {
    borderRadius: 20,
    height: 200,
    resizeMode: "cover",
    width: width - 32,
  },
  indicator: {
    backgroundColor: COLOR_INDICATOR,
    borderRadius: 4,
    height: 8,
    margin: 4,
    width: 8,
  },
  indicatorContainer: {
    bottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    left: 0,
    position: "absolute",
    right: 0,
  },
});
