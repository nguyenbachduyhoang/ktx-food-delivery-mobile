import React, { useEffect } from "react";
import { View, StyleSheet, ViewStyle, DimensionValue } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { COLORS } from "@constants/index";

interface SkeletonLoaderProps {
  width?: DimensionValue;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = "100%",
  height = 20,
  borderRadius = 4,
  style,
}) => {
  const shimmer = useSharedValue(0);

  useEffect(() => {
    shimmer.value = withRepeat(withTiming(1, { duration: 1500 }), -1, false);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(shimmer.value, [0, 0.5, 1], [0.3, 0.6, 0.3]);

    return {
      opacity,
    };
  });

  return (
    <View style={[styles.container, { width, height, borderRadius }, style]}>
      <Animated.View style={[styles.shimmer, animatedStyle]} />
    </View>
  );
};

// Preset skeletons
export const SkeletonCard: React.FC = () => (
  <View style={styles.skeletonCard}>
    <SkeletonLoader width="100%" height={100} borderRadius={8} />
    <View style={styles.skeletonContent}>
      <SkeletonLoader width="80%" height={16} />
      <SkeletonLoader width="60%" height={14} style={styles.skeletonMargin} />
      <SkeletonLoader width="40%" height={14} style={styles.skeletonMargin} />
    </View>
  </View>
);

export const SkeletonListItem: React.FC = () => (
  <View style={styles.skeletonListItem}>
    <SkeletonLoader width={60} height={60} borderRadius={8} />
    <View style={styles.skeletonListContent}>
      <SkeletonLoader width="70%" height={16} />
      <SkeletonLoader width="50%" height={14} style={styles.skeletonMargin} />
      <SkeletonLoader width="30%" height={14} style={styles.skeletonMargin} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    overflow: "hidden",
  },
  shimmer: {
    backgroundColor: COLORS.BORDER,
    flex: 1,
  },
  skeletonCard: {
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: 14,
    marginVertical: 6,
    overflow: "hidden",
    padding: 10,
    width: 160,
  },
  skeletonContent: {
    marginTop: 8,
  },
  skeletonListContent: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 12,
  },
  skeletonListItem: {
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: 12,
    flexDirection: "row",
    marginVertical: 8,
    padding: 12,
  },
  skeletonMargin: {
    marginTop: 8,
  },
});

export default SkeletonLoader;
