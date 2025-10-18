import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SIZES, TEXT_STYLES } from "@constants/index";

const EmptyNotification: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>🔔</Text>
      </View>
      <Text style={styles.title}>Chưa có thông báo nào</Text>
      <Text style={styles.subtitle}>
        Các thông báo về đơn hàng, khuyến mãi và cập nhật hệ thống sẽ hiển thị tại đây
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: SIZES.SPACING.LG,
  },
  icon: {
    ...TEXT_STYLES.H1,
    fontSize: 60,
    opacity: 0.3,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SIZES.SPACING.LG,
  },
  subtitle: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
    textAlign: "center",
  },
  title: {
    ...TEXT_STYLES.H4,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SIZES.SPACING.SM,
    textAlign: "center",
  },
});

export default EmptyNotification;
