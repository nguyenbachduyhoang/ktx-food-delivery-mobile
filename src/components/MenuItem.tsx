import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, TEXT_STYLES, SIZES } from "@constants/index";

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
      <Icon name={icon} size={SIZES.HEADER.ICON_SIZE} color={color} />
      <Text style={styles.menuLabel}>{label}</Text>
    </View>
    <Icon name={rightIcon} size={SIZES.HEADER.ICON_SIZE} color={color} />
  </View>
);

const styles = StyleSheet.create({
  menuItem: {
    alignItems: "center",
    borderBottomColor: COLORS.BORDER,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.SPACING.SM,
    paddingVertical: SIZES.SPACING.MD,
  },
  menuLabel: {
    ...TEXT_STYLES.BODY_LARGE,
    color: COLORS.TEXT_PRIMARY,
    marginLeft: SIZES.SPACING.MD,
  },
  menuLeft: {
    alignItems: "center",
    flexDirection: "row",
  },
});

export default MenuItem;
