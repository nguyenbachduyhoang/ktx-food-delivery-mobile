import React, { ReactNode } from "react";
import { Pressable, PressableProps, ViewStyle, GestureResponderEvent, StyleProp } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

interface AnimatedPressableProps extends PressableProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  scaleValue?: number;
  enableHaptic?: boolean;
  hapticType?: "light" | "medium" | "heavy";
}

const AnimatedPressable: React.FC<AnimatedPressableProps> = ({
  children,
  style,
  onPress,
  scaleValue = 0.95,
  enableHaptic = true,
  hapticType = "light",
  ...props
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(scaleValue, {
      damping: 15,
      stiffness: 150,
    });
    opacity.value = withTiming(0.8, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 150,
    });
    opacity.value = withTiming(1, { duration: 100 });
  };

  const handlePress = (e: GestureResponderEvent) => {
    if (enableHaptic) {
      switch (hapticType) {
        case "light":
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          break;
        case "medium":
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          break;
        case "heavy":
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          break;
      }
    }
    onPress?.(e);
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      {...props}
    >
      <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
    </Pressable>
  );
};

export default AnimatedPressable;
