import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TEXT_STYLES, COLORS, SIZES } from "@constants/index";

interface UserInfoProps {
  name: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ name }) => (
  <View style={styles.info}>
    <Text style={styles.greeting}>Xin Chào</Text>
    <View style={styles.nameRow}>
      <Text style={styles.name}>{name}</Text>
      <TouchableOpacity style={styles.dropdownButton}>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  arrow: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
  },
  dropdownButton: {
    marginLeft: SIZES.SPACING.XS,
    padding: SIZES.SPACING.XS,
  },
  greeting: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
  },
  info: {
    flex: 1,
    marginLeft: SIZES.SPACING.SM,
  },
  name: {
    ...TEXT_STYLES.H6,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "600",
  },
  nameRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});

export default UserInfo;
