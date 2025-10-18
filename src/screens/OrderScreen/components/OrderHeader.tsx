import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES, TEXT_STYLES } from "@constants/index";

const OrderHeader: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đơn hàng</Text>
      <TouchableOpacity style={styles.searchButton}>
        <Ionicons name="search-outline" size={24} color={COLORS.PRIMARY} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: SIZES.SPACING.SM,
  },
  searchButton: {
    alignItems: "center",
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  title: {
    ...TEXT_STYLES.H3,
    color: COLORS.TEXT_PRIMARY,
  },
});

export default OrderHeader;
