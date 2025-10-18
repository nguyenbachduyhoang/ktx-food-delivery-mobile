import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, TEXT_STYLES, SIZES } from "@constants/index";

interface SectionHeaderProps {
  icon: any;
  iconColor: string;
  title: string;
  children?: React.ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ icon, iconColor, title, children }) => {
  return (
    <View style={styles.section}>
      <Animated.View style={styles.header} entering={FadeInDown.duration(500)}>
        <Ionicons name={icon} size={20} color={iconColor} />
        <Text style={styles.title}>{title}</Text>
      </Animated.View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: SIZES.SPACING.MD,
    paddingHorizontal: SIZES.SPACING.MD,
  },
  section: {
    marginBottom: SIZES.SPACING.MD,
  },
  title: {
    ...TEXT_STYLES.H6,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "700",
    marginLeft: SIZES.SPACING.SM,
  },
});

export default SectionHeader;

