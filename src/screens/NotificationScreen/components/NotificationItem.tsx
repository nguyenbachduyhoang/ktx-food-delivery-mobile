import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SIZES, TEXT_STYLES } from "@constants/index";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: "order" | "promotion" | "system";
}

interface NotificationItemProps {
  notification: Notification;
  onPress: () => void;
  onDelete: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onPress, onDelete }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "order":
        return "🍽️";
      case "promotion":
        return "🎁";
      case "system":
        return "🔔";
      default:
        return "📢";
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, !notification.isRead && styles.unreadContainer]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.typeIcon}>{getTypeIcon(notification.type)}</Text>
            <Text
              style={[styles.title, !notification.isRead && styles.unreadTitle]}
              numberOfLines={1}
            >
              {notification.title}
            </Text>
          </View>
          <Text style={styles.timestamp}>{notification.timestamp}</Text>
        </View>

        <Text
          style={[styles.message, !notification.isRead && styles.unreadMessage]}
          numberOfLines={2}
        >
          {notification.message}
        </Text>

        {!notification.isRead && <View style={styles.unreadDot} />}
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND,
    borderBottomColor: COLORS.BORDER,
    borderBottomWidth: 1,
    flexDirection: "row",
    paddingHorizontal: SIZES.SPACING.MD,
    paddingVertical: SIZES.SPACING.SM,
  },
  content: {
    flex: 1,
    position: "relative",
  },
  deleteButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: SIZES.SPACING.SM,
    width: 30,
  },
  deleteText: {
    ...TEXT_STYLES.BODY_LARGE,
    color: COLORS.TEXT_LIGHT,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SIZES.SPACING.XS,
  },
  message: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
  },
  timestamp: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_LIGHT,
  },
  title: {
    ...TEXT_STYLES.BODY_LARGE,
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
    fontWeight: "600",
    marginLeft: SIZES.SPACING.XS,
  },
  titleContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
  typeIcon: {
    ...TEXT_STYLES.BODY_LARGE,
  },
  unreadContainer: {
    backgroundColor: COLORS.UNREAD_BACKGROUND,
  },
  unreadDot: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 4,
    height: 8,
    position: "absolute",
    right: 0,
    top: 0,
    width: 8,
  },
  unreadMessage: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "500",
  },
  unreadTitle: {
    fontWeight: "700",
  },
});

export default NotificationItem;
