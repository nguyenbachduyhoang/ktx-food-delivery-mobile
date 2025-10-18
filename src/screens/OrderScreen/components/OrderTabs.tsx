import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.activeTab]}
            onPress={() => onTabChange(tab.key)}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, activeTab === tab.key && styles.activeTabText]}>
              {tab.label}
            </Text>
            {activeTab === tab.key && <View style={styles.underline} />}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  activeTab: {
    // no-op for pill style
  },
  activeTabText: {
    ...TEXT_STYLES.TAB_ACTIVE,
    color: COLORS.PRIMARY,
    fontWeight: "700",
  },
  container: {
    backgroundColor: COLORS.BACKGROUND,
    borderBottomColor: COLORS.BORDER,
    borderBottomWidth: 1,
  },
  scrollContent: {
    alignItems: "center",
    paddingHorizontal: SIZES.SPACING.MD,
  },
  tab: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: 999,
    marginRight: SIZES.SPACING.SM,
    paddingHorizontal: SIZES.SPACING.MD,
    paddingVertical: SIZES.SPACING.SM,
    position: "relative",
  },
  tabText: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
  },
  underline: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 2,
    height: 3,
    marginTop: SIZES.SPACING.XS,
    width: "60%",
  },
});

export default OrderTabs;
