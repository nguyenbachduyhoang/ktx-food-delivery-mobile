import React from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { COLORS, TEXT_STYLES, SIZES } from "@constants/index";

interface LoadingOverlayProps {
  message?: string;
  visible?: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  message = "Đang xử lý...",
  visible = true,
}) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    backgroundColor: COLORS.OVERLAY || "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    zIndex: 9999,
  },
  content: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: SIZES.RADIUS.LARGE,
    padding: SIZES.SPACING.XL,
  },
  message: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    marginTop: SIZES.SPACING.MD,
  },
});

export default LoadingOverlay;
