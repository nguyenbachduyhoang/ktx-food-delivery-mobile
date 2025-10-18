import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, TEXT_STYLES, SIZES } from "@constants/index";

interface CategoryHeaderProps {
  title: string;
  description: string;
  backgroundImage: ImageSourcePropType;
  onBackPress: () => void;
  onSharePress?: () => void;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  title,
  description,
  backgroundImage,
  onBackPress,
  onSharePress,
}) => {
  return (
    <View style={styles.container}>
      <Image source={backgroundImage} style={styles.backgroundImage} resizeMode="cover" />
      <View style={styles.overlay}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
            <Ionicons name="arrow-back" size={SIZES.HEADER.ICON_SIZE} color={COLORS.BACKGROUND} />
          </TouchableOpacity>
          {onSharePress && (
            <TouchableOpacity style={styles.shareButton} onPress={onSharePress}>
              <Ionicons
                name="share-outline"
                size={SIZES.HEADER.ICON_SIZE}
                color={COLORS.BACKGROUND}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    alignItems: "center",
    backgroundColor: COLORS.OVERLAY,
    borderRadius: SIZES.HEADER.BUTTON_SIZE / 2,
    height: SIZES.HEADER.BUTTON_SIZE,
    justifyContent: "center",
    width: SIZES.HEADER.BUTTON_SIZE,
  },
  backgroundImage: {
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  container: {
    height: 200,
    position: "relative",
  },
  content: {
    bottom: SIZES.SPACING.LG,
    left: SIZES.HEADER.PADDING_HORIZONTAL,
    position: "absolute",
    right: SIZES.HEADER.PADDING_HORIZONTAL,
  },
  description: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.BACKGROUND,
    marginTop: SIZES.SPACING.XS,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.HEADER.PADDING_HORIZONTAL,
    paddingTop: SIZES.HEADER.PADDING_VERTICAL,
  },
  overlay: {
    backgroundColor: COLORS.OVERLAY,
    flex: 1,
  },
  shareButton: {
    alignItems: "center",
    backgroundColor: COLORS.OVERLAY,
    borderRadius: SIZES.HEADER.BUTTON_SIZE / 2,
    height: SIZES.HEADER.BUTTON_SIZE,
    justifyContent: "center",
    width: SIZES.HEADER.BUTTON_SIZE,
  },
  title: {
    ...TEXT_STYLES.H4,
    color: COLORS.BACKGROUND,
    fontWeight: "bold",
  },
});

export default CategoryHeader;
