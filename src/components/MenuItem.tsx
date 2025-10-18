import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, TEXT_STYLES } from "@constants/index";

const BORDER_COLOR = COLORS.BORDER;
const TEXT_COLOR = COLORS.TEXT_PRIMARY;

interface MenuItemProps {
  icon: string;
  label: string;
  color?: string;
  rightIcon?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  label,
  color = COLORS.PRIMARY,
  rightIcon = "chevron-right",
}) => (
  <View style={styles.menuItem}>
    <View style={styles.menuLeft}>
      <Icon name={icon} size={24} color={color} />
      <Text style={styles.menuLabel}>{label}</Text>
    </View>
    <Icon name={rightIcon} size={24} color={color} />
  </View>
);

const styles = StyleSheet.create({
  menuItem: {
    alignItems: "center",
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 14,
  },
  menuLabel: {
    ...TEXT_STYLES.BODY_LARGE,
    color: TEXT_COLOR,
    marginLeft: 12,
  },
  menuLeft: {
    alignItems: "center",
    flexDirection: "row",
  },
});

export default MenuItem;
