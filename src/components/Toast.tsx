import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  runOnJS,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, TEXT_STYLES, SIZES } from "@constants/index";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onHide?: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = "info", duration = 3000, onHide }) => {
  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Show animation
    translateY.value = withSpring(0, {
      damping: 15,
      stiffness: 150,
    });
    opacity.value = withSpring(1);

    // Hide animation after duration
    translateY.value = withDelay(
      duration,
      withSpring(
        -100,
        {
          damping: 15,
          stiffness: 150,
        },
        () => {
          if (onHide) {
            runOnJS(onHide)();
          }
        }
      )
    );
    opacity.value = withDelay(duration, withSpring(0));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const getToastConfig = () => {
    switch (type) {
      case "success":
        return {
          icon: "checkmark-circle" as const,
          color: COLORS.SUCCESS,
          backgroundColor: COLORS.SUCCESS_LIGHT || "#E8F5E9",
        };
      case "error":
        return {
          icon: "close-circle" as const,
          color: COLORS.ERROR,
          backgroundColor: COLORS.ERROR_LIGHT || "#FFEBEE",
        };
      case "warning":
        return {
          icon: "warning" as const,
          color: COLORS.WARNING,
          backgroundColor: COLORS.WARNING_LIGHT || "#FFF4E6",
        };
      case "info":
      default:
        return {
          icon: "information-circle" as const,
          color: COLORS.SECONDARY,
          backgroundColor: COLORS.SECONDARY_LIGHT || "#E3F2FD",
        };
    }
  };

  const config = getToastConfig();

  return (
    <Animated.View
      style={[styles.container, { backgroundColor: config.backgroundColor }, animatedStyle]}
    >
      <Ionicons name={config.icon} size={24} color={config.color} />
      <Text style={[styles.message, { color: config.color }]}>{message}</Text>
    </Animated.View>
  );
};

// Toast Manager Hook
let toastCallback: ((toastProps: ToastProps) => void) | null = null;

export const showToast = (toastProps: ToastProps) => {
  if (toastCallback) {
    toastCallback(toastProps);
  }
};

export const ToastContainer: React.FC = () => {
  const [toast, setToast] = React.useState<ToastProps | null>(null);

  useEffect(() => {
    toastCallback = (toastProps: ToastProps) => {
      setToast(toastProps);
    };

    return () => {
      toastCallback = null;
    };
  }, []);

  if (!toast) return null;

  return (
    <View style={styles.toastContainer}>
      <Toast
        {...toast}
        onHide={() => {
          setToast(null);
          toast.onHide?.();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: SIZES.RADIUS.MEDIUM,
    elevation: 5,
    flexDirection: "row",
    marginHorizontal: SIZES.SPACING.MD,
    paddingHorizontal: SIZES.SPACING.MD,
    paddingVertical: SIZES.SPACING.SM,
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  message: {
    ...TEXT_STYLES.BODY_MEDIUM,
    flex: 1,
    fontWeight: "600",
    marginLeft: SIZES.SPACING.SM,
  },
  toastContainer: {
    left: 0,
    position: "absolute",
    right: 0,
    top: 50,
    zIndex: 9999,
  },
});

export default Toast;
