import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SIZES, TEXT_STYLES } from "@constants/index";

interface NotificationHeaderProps {
  unreadCount: number;
  onMarkAllRead: () => void;
}

const NotificationHeader: React.FC<NotificationHeaderProps> = ({ unreadCount, onMarkAllRead }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Thông báo</Text>
        {unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{unreadCount}</Text>
          </View>
        )}
      </View>

      {unreadCount > 0 && (
        <TouchableOpacity style={styles.markAllButton} onPress={onMarkAllRead}>
          <Text style={styles.markAllText}>Đánh dấu đã đọc</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignItems: "center",
    backgroundColor: COLORS.ERROR,
    borderRadius: SIZES.RADIUS.LARGE,
    height: 20,
    justifyContent: "center",
    minWidth: 20,
    paddingHorizontal: SIZES.SPACING.XS,
  },
  badgeText: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_WHITE,
    fontWeight: "700",
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: SIZES.SPACING.SM,
  },
  markAllButton: {
    paddingHorizontal: SIZES.SPACING.SM,
    paddingVertical: SIZES.SPACING.XS,
  },
  markAllText: {
    ...TEXT_STYLES.BUTTON_MEDIUM,
    color: COLORS.PRIMARY,
  },
  title: {
    ...TEXT_STYLES.H3,
    color: COLORS.TEXT_PRIMARY,
    marginRight: SIZES.SPACING.SM,
  },
  titleContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
});

export default NotificationHeader;
