import React from "react";
import { View, Text, StyleSheet } from "react-native";
import withScreenContainer from "@components/layouts/withScreenContainer";
import { COLORS, TEXT_STYLES } from "@constants/index";

const DatMonScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Đặt món</Text>
    <Text style={styles.subtitle}>Tính năng đang được phát triển</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  subtitle: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
    marginTop: 8,
    textAlign: "center",
  },
  title: {
    ...TEXT_STYLES.H2,
    color: COLORS.TEXT_PRIMARY,
    textAlign: "center",
  },
});

export default withScreenContainer(DatMonScreen);
