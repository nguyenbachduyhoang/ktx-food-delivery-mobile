import MenuItem from "../../components/MenuItem";
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import avatar from "../../../assets/avatar/avatar.png";
import { COLORS, TEXT_STYLES, SIZES } from "@constants/index";
import { SharedHeader } from "@components/shared";
import withScreenContainer from "@components/layouts/withScreenContainer";

const ICON_COLOR = COLORS.PRIMARY;
const BG_COLOR = COLORS.BACKGROUND;
const BORDER_COLOR = COLORS.BORDER;
const TEXT_COLOR = COLORS.TEXT_PRIMARY;
const SUBTEXT_COLOR = COLORS.TEXT_SECONDARY;
const AVATAR_BG = COLORS.BACKGROUND_LIGHT;
const LOGOUT_COLOR = COLORS.ERROR;

const user = {
  name: "Nguyễn Thành Đạt",
  phone: "+84 787358358",
  avatar: avatar,
};

const menuItems = [
  { icon: "food", label: "Quán ăn yêu thích của tôi" },
  { icon: "history", label: "Lịch sử đặt món" },
  { icon: "account", label: "Hồ sơ" },
  { icon: "map-marker", label: "Địa chỉ" },
  { icon: "bell", label: "Thông báo" },
];

const supportItems = [
  { icon: "eye", label: "Đổi nền", isSwitch: true },
  { icon: "alert-circle-outline", label: "Trung tâm hỗ trợ" },
];

const ProfileScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.wrapper}>
      <SharedHeader
        title="Hồ sơ"
        showSearch={true}
        rightIcon="ellipsis-horizontal"
        onSearchPress={() => console.log("More options")}
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.container, { paddingBottom: insets.bottom + 80 }]}
      >
        <View style={styles.profileRow}>
          <Image source={user.avatar} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profilePhone}>{user.phone}</Text>
          </View>
          <TouchableOpacity>
            <Icon name="pencil" size={SIZES.HEADER.ICON_SIZE - 2} color={ICON_COLOR} />
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          {menuItems.map((item) => (
            <MenuItem key={item.label} icon={item.icon} label={item.label} color={ICON_COLOR} />
          ))}
        </View>
        <View style={styles.section}>
          {supportItems.map((item) =>
            item.isSwitch ? (
              <View key={item.label} style={styles.menuItem}>
                <View style={styles.menuLeft}>
                  <Icon name={item.icon} size={SIZES.HEADER.ICON_SIZE} color={ICON_COLOR} />
                  <Text style={styles.menuLabel}>{item.label}</Text>
                </View>
                <Switch
                  value={isDarkMode}
                  onValueChange={setIsDarkMode}
                  trackColor={{ false: COLORS.BORDER, true: COLORS.SUCCESS }}
                  thumbColor={isDarkMode ? COLORS.SUCCESS : COLORS.BACKGROUND_DARK}
                />
              </View>
            ) : (
              <MenuItem key={item.label} icon={item.icon} label={item.label} color={ICON_COLOR} />
            )
          )}
        </View>
        <TouchableOpacity style={styles.logoutBtn}>
          <Icon name="logout" size={SIZES.HEADER.ICON_SIZE} color={ICON_COLOR} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: AVATAR_BG,
    borderRadius: 30,
    height: 60,
    marginRight: SIZES.SPACING.MD,
    width: 60,
  },
  container: {
    backgroundColor: BG_COLOR,
    paddingBottom: SIZES.SPACING.LG,
    paddingHorizontal: SIZES.SPACING.MD,
    paddingTop: SIZES.SPACING.MD,
  },
  logoutBtn: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: SIZES.SPACING.SM,
    paddingTop: SIZES.SPACING.SM,
    paddingVertical: SIZES.SPACING.XS,
  },
  logoutText: {
    ...TEXT_STYLES.BUTTON_LARGE,
    color: LOGOUT_COLOR,
    marginLeft: SIZES.SPACING.SM,
  },
  menuItem: {
    alignItems: "center",
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.SPACING.SM,
    paddingVertical: SIZES.SPACING.MD,
  },
  menuLabel: {
    ...TEXT_STYLES.BODY_LARGE,
    color: TEXT_COLOR,
    marginLeft: SIZES.SPACING.MD,
  },
  menuLeft: {
    alignItems: "center",
    flexDirection: "row",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    ...TEXT_STYLES.H4,
    color: TEXT_COLOR,
  },
  profilePhone: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: SUBTEXT_COLOR,
    marginTop: SIZES.SPACING.XS,
  },
  profileRow: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: SIZES.SPACING.MD,
  },
  scroll: {
    backgroundColor: BG_COLOR,
    flex: 1,
  },
  section: {
    backgroundColor: BG_COLOR,
    borderColor: BORDER_COLOR,
    borderRadius: SIZES.RADIUS.MEDIUM,
    borderWidth: 1,
    marginBottom: SIZES.SPACING.MD,
    overflow: "hidden",
  },
  wrapper: {
    flex: 1,
  },
});

export default withScreenContainer(ProfileScreen);
