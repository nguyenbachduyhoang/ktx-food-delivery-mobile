import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SIZES, TEXT_STYLES } from "@constants/index";

const EmptyOrder: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={styles.iconBox}>
          <View style={styles.iconLines}>
            <View style={[styles.line, styles.line1]} />
            <View style={[styles.line, styles.line2]} />
            <View style={[styles.line, styles.line3]} />
          </View>
          <View style={styles.pencil}>
            <View style={styles.pencilTip} />
            <View style={styles.pencilBody} />
          </View>
        </View>
      </View>

      <Text style={styles.title}>Quên chưa đặt món rồi nè bạn ơi?</Text>
      <Text style={styles.subtitle}>
        Bạn sẽ nhìn thấy các món đang được chuẩn bị hoặc giao đi tại đây để kiểm tra đơn hàng nhanh
        hơn!
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
  iconBox: {
    backgroundColor: COLORS.WARNING,
    borderRadius: SIZES.RADIUS.MEDIUM,
    height: 80,
    position: "relative",
    width: 60,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SIZES.SPACING.LG,
  },
  iconLines: {
    left: 8,
    position: "absolute",
    top: 12,
  },
  line: {
    backgroundColor: COLORS.WARNING, // thay thế bằng màu cảnh báo
    height: 2,
    marginBottom: 4,
  },
  line1: {
    width: 6,
  },
  line2: {
    width: 20,
  },
  line3: {
    width: 16,
  },
  pencil: {
    bottom: 15,
    position: "absolute",
    right: 8,
    transform: [{ rotate: "45deg" }],
  },
  pencilBody: {
    backgroundColor: COLORS.PRIMARY, // thay thế bằng màu chính
    height: 20,
    width: 4,
  },
  pencilTip: {
    backgroundColor: COLORS.SECONDARY, // thay thế bằng màu phụ
    height: 6,
    width: 4,
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

export default EmptyOrder;
