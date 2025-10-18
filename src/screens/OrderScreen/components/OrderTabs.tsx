import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, SIZES, TEXT_STYLES } from "@constants/index";

interface OrderTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void; // eslint-disable-line no-unused-vars
}

const tabs = [
  { key: "ongoing", label: "Đang đến" },
  { key: "completed", label: "Deal đã mua" },
  { key: "history", label: "Lịch sử" },
  { key: "rated", label: "Đánh giá" },
  { key: "received", label: "Đơn nhập" },
];

const OrderTabs: React.FC<OrderTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tab, activeTab === tab.key && styles.activeTab]}
          onPress={() => onTabChange(tab.key)}
        >
          <Text style={[styles.tabText, activeTab === tab.key && styles.activeTabText]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  activeTab: {
    borderBottomColor: COLORS.PRIMARY,
    borderBottomWidth: 2,
  },
  activeTabText: {
    ...TEXT_STYLES.TAB_ACTIVE,
    color: COLORS.PRIMARY,
  },
  container: {
    backgroundColor: COLORS.BACKGROUND,
    borderBottomColor: COLORS.BORDER,
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  tab: {
    alignItems: "center",
    borderBottomColor: COLORS.TRANSPARENT,
    borderBottomWidth: 2,
    flex: 1,
    paddingBottom: SIZES.SPACING.SM,
    paddingTop: SIZES.SPACING.SM,
  },
  tabText: {
    ...TEXT_STYLES.TAB_INACTIVE,
    color: COLORS.TEXT_SECONDARY,
    textAlign: "center",
  },
});

export default OrderTabs;
