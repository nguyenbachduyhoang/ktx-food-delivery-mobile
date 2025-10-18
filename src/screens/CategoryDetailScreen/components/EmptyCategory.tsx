import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "@components/Button";
import { COLORS, SIZES, TEXT_STYLES } from "@constants/index";

interface EmptyCategoryProps {
  categoryName: string;
  onGoBack?: () => void;
}

const EmptyCategory: React.FC<EmptyCategoryProps> = ({ categoryName, onGoBack }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="search-outline" size={80} color={COLORS.TEXT_LIGHT} />
      </View>
      <Text style={styles.title}>Không tìm thấy {categoryName}</Text>
      <Text style={styles.description}>
        Hiện chưa có món {categoryName} nào ở gần bạn.{"\n"}
        Hãy thử danh mục khác nhé!
      </Text>
      <Button 
        title="Quay lại trang chủ" 
        onPress={onGoBack || (() => {})}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: SIZES.SPACING.LG,
    paddingHorizontal: SIZES.SPACING.XL * 2,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: SIZES.SPACING.XL,
  },
  description: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SIZES.SPACING.SM,
    textAlign: "center",
  },
  iconContainer: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    borderRadius: 80,
    height: 160,
    justifyContent: "center",
    marginBottom: SIZES.SPACING.LG,
    width: 160,
  },
  title: {
    ...TEXT_STYLES.H3,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "700",
  },
});

export default EmptyCategory;

