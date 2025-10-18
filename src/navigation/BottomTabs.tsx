/* eslint-disable react-native/sort-styles */
import React from "react";
import { createBottomTabNavigator, BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import {
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import HomeScreen from "@screens/HomeScreen/HomeScreen";
import OrderScreen from "@screens/OrderScreen/OrderScreen";
import DatMonScreen from "@screens/FoodOrderScreen/FoodOrderScreen";
import NotificationScreen from "@screens/NotificationScreen/NotificationScreen";
import ProfileScreen from "@screens/ProfileScreen/ProfileScreen";
import CartScreen from "@screens/CartScreen/CartScreen";
import withScreenContainer from "@components/layouts/withScreenContainer";
import { COLORS, SIZES, TEXT_STYLES } from "@constants/index";

const Tab = createBottomTabNavigator();

function CustomTabBarButton({
  children,
  style,
  onPress,
  accessibilityLabel,
  accessibilityRole,
  accessibilityState,
  testID,
}: BottomTabBarButtonProps) {
  if (Platform.OS === "android") {
    return (
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple("rgba(0,0,0,0.08)", true)} // ripple rất nhạt
        accessibilityLabel={accessibilityLabel}
        accessibilityRole={accessibilityRole}
        accessibilityState={accessibilityState}
        testID={testID}
      >
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    );
  }
  return (
    <TouchableOpacity
      style={style}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      accessibilityState={accessibilityState}
      testID={testID}
    >
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: "center",
    backgroundColor: COLORS.TRANSPARENT,
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  iconWrapperActive: {
    backgroundColor: COLORS.PRIMARY,
  },
});

export default function BottomTabs() {
  const insets = useSafeAreaInsets();
  // TODO: replace these placeholders with real state (Redux / Context / hook)
  const notifCount = 0; // e.g. useNotifications().unreadCount

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            let iconName: keyof typeof Ionicons.glyphMap = "home-outline";
            if (route.name === "Trang chủ") iconName = focused ? "home" : "home-outline";
            if (route.name === "Đơn hàng")
              iconName = focused ? "document-text" : "document-text-outline";
            if (route.name === "Đặt món") iconName = focused ? "clipboard" : "clipboard-outline";
            if (route.name === "Thông báo")
              iconName = focused ? "notifications" : "notifications-outline";
            if (route.name === "Tài khoản") iconName = focused ? "person" : "person-outline";

            return (
              <View style={[styles.iconWrapper, focused && styles.iconWrapperActive]}>
                <Ionicons
                  name={iconName}
                  size={20}
                  color={focused ? COLORS.BACKGROUND : COLORS.ICON_PRIMARY}
                />
              </View>
            );
          },
          tabBarBadgeStyle: {
            backgroundColor: COLORS.PRIMARY,
            color: COLORS.BACKGROUND,
          },
          tabBarActiveTintColor: COLORS.TAB_ACTIVE,
          tabBarInactiveTintColor: COLORS.TAB_INACTIVE,
          tabBarLabelStyle: {
            ...TEXT_STYLES.CAPTION,
            paddingBottom: Platform.OS === "ios" ? 0 : 4,
          },
          tabBarStyle: {
            backgroundColor: COLORS.TAB_BACKGROUND,
            // compact tab bar height when FAB is used
            height: 62 + insets.bottom,
            paddingBottom: insets.bottom > 0 ? insets.bottom + 8 : SIZES.SPACING.SM,
            paddingTop: SIZES.SPACING.SM,
            borderTopLeftRadius: SIZES.RADIUS.EXTRA_LARGE,
            borderTopRightRadius: SIZES.RADIUS.EXTRA_LARGE,
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            elevation: 8,
            shadowOpacity: 0.08,
            shadowRadius: 8,
            borderTopWidth: 0,
            overflow: "hidden",
          },
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        })}
      >
        <Tab.Screen name="Trang chủ" component={withScreenContainer(HomeScreen)} />
        {/* FoodOrderScreen tự quản lý SafeAreaView, không cần wrap */}
        <Tab.Screen name="Đặt món" component={DatMonScreen} />
        {/* Cart tab (center) */}
        <Tab.Screen
          name="Giỏ hàng"
          component={withScreenContainer(CartScreen)}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <Ionicons name={focused ? "cart" : "cart-outline"} size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen name="Đơn hàng" component={withScreenContainer(OrderScreen)} />
        <Tab.Screen
          name="Thông báo"
          component={withScreenContainer(NotificationScreen)}
          options={{
            tabBarBadge: notifCount > 0 ? String(notifCount) : undefined,
          }}
        />
        <Tab.Screen name="Tài khoản" component={withScreenContainer(ProfileScreen)} />
      </Tab.Navigator>
      {/* Center Cart exists as a regular tab now */}
    </>
  );
}
