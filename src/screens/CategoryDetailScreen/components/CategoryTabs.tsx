import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { COLORS, TEXT_STYLES, SIZES } from "@constants/index";

interface Tab {
  id: string;
  label: string;
}

interface CategoryTabsProps {
  tabs: Tab[];
  activeTab: string;
  // eslint-disable-next-line no-unused-vars
  onTabChange: OnTabChange;
}

// eslint-disable-next-line no-unused-vars
type OnTabChange = (tabId: string) => void;

const CategoryTabs: React.FC<CategoryTabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => onTabChange(tab.id)}
          >
            <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
              {tab.label}
            </Text>
            {activeTab === tab.id && <View style={styles.underline} />}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  activeTab: {
    // stronger fill for active
    backgroundColor: COLORS.BACKGROUND,
    borderWidth: 0,
  },
  activeTabText: {
    color: COLORS.PRIMARY,
    fontWeight: "600",
  },
  container: {
    backgroundColor: COLORS.BACKGROUND,
    marginBottom: SIZES.SPACING.SM,
    paddingVertical: SIZES.SPACING.SM,
  },
  tab: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND_LIGHT + "CC", // translucent pill
    borderRadius: 999,
    elevation: 6,
    marginRight: SIZES.SPACING.MD,
    paddingHorizontal: SIZES.SPACING.MD,
    paddingVertical: SIZES.SPACING.SM,
    position: "relative",
    // subtle shadow to make pill float (iOS)
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },
  tabText: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
  },
  tabsContainer: {
    alignItems: "center",
    paddingHorizontal: SIZES.SPACING.MD,
  },
  underline: {
    backgroundColor: COLORS.PRIMARY,
    bottom: 0,
    height: 2,
    left: 0,
    position: "absolute",
    right: 0,
  },
});

export default CategoryTabs;
