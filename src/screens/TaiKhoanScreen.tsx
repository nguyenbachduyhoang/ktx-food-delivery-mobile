import MenuItem from "../components/MenuItem";
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import avatar from "../../assets/avatar/avatar.png";
import { COLORS, TEXT_STYLES } from "@constants/index";
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

const TaiKhoanScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <SharedHeader
        title="Hồ sơ"
        showSearch={true}
        rightIcon="dots-horizontal"
        onSearchPress={() => console.log("More options")}
      />
      <View style={styles.profileRow}>
        <Image source={user.avatar} style={styles.avatar} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profilePhone}>{user.phone}</Text>
        </View>
        <TouchableOpacity>
          <Icon name="pencil" size={22} color={ICON_COLOR} />
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
                <Icon name={item.icon} size={24} color={ICON_COLOR} />
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={setIsDarkMode}
                trackColor={{ false: "#ccc", true: "#2ecc40" }}
                thumbColor={isDarkMode ? "#2ecc40" : "#f4f3f4"}
              />
            </View>
          ) : (
            <MenuItem key={item.label} icon={item.icon} label={item.label} color={ICON_COLOR} />
          )
        )}
      </View>
      <TouchableOpacity style={styles.logoutBtn}>
        <Icon name="logout" size={24} color={ICON_COLOR} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: AVATAR_BG,
    borderRadius: 30,
    height: 60,
    marginRight: 14,
    width: 60,
  },
  container: {
    backgroundColor: BG_COLOR,
    paddingBottom: 40,
  },
  logoutBtn: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingVertical: 4,
  },
  logoutText: {
    ...TEXT_STYLES.BUTTON_LARGE,
    color: LOGOUT_COLOR,
    marginLeft: 10,
  },
  menuItem: {
    alignItems: "center",
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 14,
  },
  menuLabel: {
    ...TEXT_STYLES.BODY_LARGE,
    color: TEXT_COLOR,
    marginLeft: 12,
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
    marginTop: 2,
  },
  profileRow: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 18,
  },
  scroll: {
    backgroundColor: BG_COLOR,
    flex: 1,
  },
  section: {
    backgroundColor: BG_COLOR,
    borderColor: BORDER_COLOR,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 18,
    overflow: "hidden",
  },
});

export default withScreenContainer(TaiKhoanScreen);
