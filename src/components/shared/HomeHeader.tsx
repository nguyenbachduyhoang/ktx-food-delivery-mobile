import React from "react";
import { View, StyleSheet, ImageSourcePropType } from "react-native";

import Avatar from "../Avatar";
import UserInfo from "../UserInfo";
import IconButton from "../IconButton";
import SearchBox from "../SearchBox";
import avatarImg from "../../../assets/avatar/avatar.png";
import { COLORS, SIZES } from "@constants/index";

interface HomeHeaderProps {
  userName?: string;
  avatarSource?: ImageSourcePropType;
  transparent?: boolean;
  onNotificationPress?: () => void;
  onCartPress?: () => void;
  onSearchPress?: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
  userName = "Đạt Nguyễn",
  avatarSource = avatarImg as ImageSourcePropType,
  transparent = false,
  onNotificationPress,
  onCartPress,
  onSearchPress,
}) => {
  // ScreenContainer already applies safe-area top padding. Keep header padding constant.
  return (
    <View style={[styles.container, transparent && styles.containerTransparent]}>
      <View style={styles.row}>
        <Avatar source={avatarSource} />
        <UserInfo name={userName} />
        <View style={styles.icons}>
          <IconButton name="notifications-outline" onPress={onNotificationPress} />
          <IconButton name="bag-handle-outline" onPress={onCartPress} />
        </View>
      </View>
      <SearchBox onPress={onSearchPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND,
    paddingBottom: SIZES.SPACING.SM,
    paddingHorizontal: SIZES.HEADER.PADDING_HORIZONTAL,
    paddingTop: SIZES.HEADER.PADDING_VERTICAL,
  },
  containerTransparent: {
    backgroundColor: COLORS.TRANSPARENT,
  },
  icons: {
    flexDirection: "row",
    gap: SIZES.SPACING.XS,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: SIZES.SPACING.SM,
    minHeight: SIZES.HEADER.HEIGHT - SIZES.HEADER.PADDING_VERTICAL * 2,
  },
});

export default HomeHeader;
