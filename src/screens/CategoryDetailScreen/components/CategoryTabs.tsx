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
    borderBottomWidth: 0,
  },
  activeTabText: {
    color: COLORS.PRIMARY,
    fontWeight: "600",
  },
  container: {
    backgroundColor: COLORS.BACKGROUND,
    borderBottomColor: COLORS.BORDER,
    borderBottomWidth: 1,
  },
  tab: {
    alignItems: "center",
    marginRight: SIZES.SPACING.LG,
    paddingBottom: SIZES.SPACING.SM,
    paddingTop: SIZES.SPACING.MD,
    position: "relative",
  },
  tabText: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
  },
  tabsContainer: {
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
