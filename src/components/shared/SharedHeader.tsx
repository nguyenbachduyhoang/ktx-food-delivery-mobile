import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES, TEXT_STYLES } from "@constants/index";

interface SharedHeaderProps {
  title: string;
  showSearch?: boolean;
  showNotificationBadge?: boolean;
  badgeCount?: number;
  rightButtonText?: string;
  onSearchPress?: () => void;
  onRightButtonPress?: () => void;
  rightIcon?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

const SharedHeader: React.FC<SharedHeaderProps> = ({
  title,
  showSearch = false,
  showNotificationBadge = false,
  badgeCount = 0,
  rightButtonText,
  onSearchPress,
  onRightButtonPress,
  rightIcon = "search-outline",
  showBackButton = false,
  onBackPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
            <Ionicons
              name="arrow-back"
              size={SIZES.HEADER.ICON_SIZE}
              color={COLORS.TEXT_PRIMARY}
            />
          </TouchableOpacity>
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {showNotificationBadge && badgeCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badgeCount}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.rightContainer}>
        {rightButtonText && (
          <TouchableOpacity style={styles.textButton} onPress={onRightButtonPress}>
            <Text style={styles.buttonText}>{rightButtonText}</Text>
          </TouchableOpacity>
        )}

        {showSearch && (
          <TouchableOpacity style={styles.iconButton} onPress={onSearchPress}>
            <Ionicons
              name={rightIcon as keyof typeof Ionicons.glyphMap}
              size={SIZES.HEADER.ICON_SIZE}
              color={COLORS.PRIMARY}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    alignItems: "center",
    height: SIZES.HEADER.BUTTON_SIZE,
    justifyContent: "center",
    marginRight: SIZES.SPACING.SM,
    width: SIZES.HEADER.BUTTON_SIZE,
  },
  badge: {
    alignItems: "center",
    backgroundColor: COLORS.ERROR,
    borderRadius: SIZES.RADIUS.LARGE,
    height: 20,
    justifyContent: "center",
    minWidth: 20,
    paddingHorizontal: SIZES.SPACING.XS,
  },
  badgeText: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_WHITE,
    fontWeight: "700",
  },
  buttonText: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.PRIMARY,
    fontWeight: "600",
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    height: SIZES.HEADER.HEIGHT,
    justifyContent: "space-between",
    paddingHorizontal: SIZES.HEADER.PADDING_HORIZONTAL,
    paddingVertical: SIZES.HEADER.PADDING_VERTICAL,
  },
  iconButton: {
    alignItems: "center",
    height: SIZES.HEADER.BUTTON_SIZE,
    justifyContent: "center",
    width: SIZES.HEADER.BUTTON_SIZE,
  },
  leftContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
  rightContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  textButton: {
    marginRight: SIZES.SPACING.SM,
    paddingHorizontal: SIZES.SPACING.XS,
    paddingVertical: SIZES.SPACING.XS,
  },
  title: {
    ...TEXT_STYLES.H5,
    color: COLORS.TEXT_PRIMARY,
    fontSize: SIZES.HEADER.TITLE_SIZE,
    fontWeight: "600",
  },
  titleContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
});

export default SharedHeader;
