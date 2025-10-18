import React, { useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import withScreenContainer from "@components/layouts/withScreenContainer";
import { SharedHeader } from "@components/shared";
import { NotificationItem, EmptyNotification } from "./components";
import { SIZES } from "@constants/index";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: "order" | "promotion" | "system";
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Đơn hàng đã được xác nhận",
    message: "Đơn hàng #12345 đã được xác nhận và đang chuẩn bị",
    timestamp: "2024-10-09 10:30",
    isRead: false,
    type: "order",
  },
  {
    id: "2",
    title: "Khuyến mãi đặc biệt",
    message: "Giảm 30% cho đơn hàng từ 150k. Áp dụng từ hôm nay!",
    timestamp: "2024-10-09 09:15",
    isRead: true,
    type: "promotion",
  },
  {
    id: "3",
    title: "Đơn hàng đang giao",
    message: "Shipper đang trên đường giao đơn hàng #12344 của bạn",
    timestamp: "2024-10-09 08:45",
    isRead: false,
    type: "order",
  },
];

const NotificationScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  const renderNotificationItem = ({ item }: { item: Notification }) => (
    <NotificationItem
      notification={item}
      onPress={() => markAsRead(item.id)}
      onDelete={() => deleteNotification(item.id)}
    />
  );

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  if (notifications.length === 0) {
    return (
      <View style={styles.container}>
        <SharedHeader
          title="Thông báo"
          showNotificationBadge={false}
          rightButtonText="Đánh dấu đã đọc"
          onRightButtonPress={markAllAsRead}
        />
        <EmptyNotification />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SharedHeader
        title="Thông báo"
        showNotificationBadge={true}
        badgeCount={unreadCount}
        rightButtonText={unreadCount > 0 ? "Đánh dấu đã đọc" : undefined}
        onRightButtonPress={unreadCount > 0 ? markAllAsRead : undefined}
      />
      <View style={styles.flexFill}>
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexFill: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: SIZES.SPACING.LG,
  },
});

export default withScreenContainer(NotificationScreen);

type _StaticOpts = { useScreenScroll?: boolean };
(NotificationScreen as unknown as _StaticOpts).useScreenScroll = false;
