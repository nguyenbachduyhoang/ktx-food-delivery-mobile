/* eslint-disable react-native/sort-styles */
import MenuItem from "../../components/MenuItem";
import React, { useEffect, useState } from "react";
import withScreenContainer from "@components/layouts/withScreenContainer";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import authService from "@services/authService";
import { ROUTES } from "@constants/index";
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch, Modal } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import avatar from "../../../assets/avatar/avatar.png";
import { COLORS, TEXT_STYLES, SIZES } from "@constants/index";
import { SharedHeader } from "@components/shared";
import Input from "@components/Input";

const ICON_COLOR = COLORS.PRIMARY;
const BG_COLOR = COLORS.BACKGROUND;
const BORDER_COLOR = COLORS.BORDER;
const TEXT_COLOR = COLORS.TEXT_PRIMARY;
const SUBTEXT_COLOR = COLORS.TEXT_SECONDARY;
const AVATAR_BG = COLORS.BACKGROUND_LIGHT;
const LOGOUT_COLOR = COLORS.TEXT_PRIMARY;

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
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [displayNameVal, setDisplayNameVal] = useState("");
  const [phoneVal, setPhoneVal] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [dateOfBirthVal, setDateOfBirthVal] = useState("");
  const [genderVal, setGenderVal] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  type ProfileStackParamList = {
    Welcome: undefined;
    Login: undefined;
    Home: undefined;
  };
  const navigation = useNavigation<StackNavigationProp<ProfileStackParamList>>();

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const me = await authService.getUser();
        if (!mounted) return;
        setDisplayNameVal(me.displayName || "");
        setPhoneVal(me.phone || "");
        setEmailVal(me.email || "");
        setDateOfBirthVal(me.birthDate || me.dateOfBirth || "");
        // server may return gender as string or boolean
        if (typeof me.gender === "number") setGenderVal(me.gender as number);
        else if (typeof me.gender === "string")
          setGenderVal(me.gender.toLowerCase().startsWith("f") ? 1 : 0);
      } catch (err) {
        console.warn("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <SharedHeader
        title="Hồ sơ"
        showSearch={true}
        rightIcon="ellipsis-horizontal"
        onSearchPress={() => console.log("More options")}
      />
      <View style={styles.container}>
        <View style={styles.profileRow}>
          <Image source={user.avatar} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{displayNameVal || user.name}</Text>
            <Text style={styles.profilePhone}>{phoneVal || user.phone}</Text>
          </View>
          <TouchableOpacity onPress={() => setShowEditModal(true)}>
            <Icon name="pencil" size={SIZES.HEADER.ICON_SIZE - 2} color={ICON_COLOR} />
          </TouchableOpacity>
        </View>

        {/* compact read-only summary */}
        <View style={styles.section}>
          <View style={{ padding: SIZES.SPACING.MD }}>
            <Text style={{ ...TEXT_STYLES.BODY_MEDIUM, marginBottom: 8 }}>{displayNameVal}</Text>
            <Text style={{ ...TEXT_STYLES.BODY_MEDIUM, color: SUBTEXT_COLOR, marginBottom: 8 }}>
              {phoneVal}
            </Text>
            <Text style={{ ...TEXT_STYLES.BODY_MEDIUM, color: SUBTEXT_COLOR, marginBottom: 8 }}>
              {emailVal}
            </Text>
            <Text style={{ ...TEXT_STYLES.BODY_MEDIUM, color: SUBTEXT_COLOR }}>
              {dateOfBirthVal}
            </Text>
          </View>
        </View>

        {/* Edit modal (hidden by default) */}
        <Modal visible={showEditModal} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.profileName}>Chỉnh sửa hồ sơ</Text>
              <View style={styles.formRowSmall}>
                <Input
                  value={displayNameVal}
                  onChangeText={setDisplayNameVal}
                  placeholder="Tên hiển thị"
                />
              </View>
              <View style={styles.formRowSmall}>
                <Input value={phoneVal} onChangeText={setPhoneVal} placeholder="Số điện thoại" />
              </View>
              <View style={styles.formRowSmall}>
                <Input
                  value={emailVal}
                  onChangeText={setEmailVal}
                  placeholder="Email"
                  type="email"
                />
              </View>
              <View style={styles.formRowSmall}>
                <Input
                  value={dateOfBirthVal}
                  onChangeText={setDateOfBirthVal}
                  placeholder="Ngày sinh (YYYY-MM-DD)"
                />
              </View>
              <View style={{ flexDirection: "row", marginTop: SIZES.SPACING.SM }}>
                <TouchableOpacity
                  style={[styles.genderBtn, genderVal === 0 && styles.genderBtnActive]}
                  onPress={() => setGenderVal(0)}
                >
                  <Text style={styles.genderText}>Nam</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.genderBtn, genderVal === 1 && styles.genderBtnActive]}
                  onPress={() => setGenderVal(1)}
                >
                  <Text style={styles.genderText}>Nữ</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: SIZES.SPACING.MD,
                }}
              >
                <TouchableOpacity onPress={() => setShowEditModal(false)} style={styles.modalBtn}>
                  <Text>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={async () => {
                    setSaving(true);
                    try {
                      const payload: Record<string, unknown> = {
                        displayName: displayNameVal,
                        phone: phoneVal,
                        email: emailVal,
                        dateOfBirth: dateOfBirthVal,
                        birthDate: dateOfBirthVal,
                        avatarUrl: null,
                        gender: genderVal ?? 0,
                      };
                      await authService.updateUser(payload);
                      setShowEditModal(false);
                    } catch (err) {
                      console.warn("Failed to update profile", err);
                    } finally {
                      setSaving(false);
                    }
                  }}
                  style={[styles.modalBtn, { backgroundColor: COLORS.PRIMARY }]}
                >
                  <Text style={{ color: COLORS.TEXT_WHITE }}>Lưu</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={async () => {
            if (isLoggingOut) return;
            setIsLoggingOut(true);
            try {
              await authService.logout();
            } catch {
              // ignore or show a message
            } finally {
              setIsLoggingOut(false);
              // Navigate to Login (replace so user cannot go back)
              navigation.replace(ROUTES.LOGIN);
            }
          }}
        >
          <Icon name="logout" size={SIZES.HEADER.ICON_SIZE} color={ICON_COLOR} />
          <Text style={styles.logoutText}>{isLoggingOut ? "Đang đăng xuất..." : "Đăng xuất"}</Text>
        </TouchableOpacity>
      </View>
    </>
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
    flex: 1,
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
  formRow: {
    marginTop: SIZES.SPACING.MD,
    width: "100%",
  },
  formRowFlex: {
    flexDirection: "row",
    marginTop: SIZES.SPACING.SM,
    width: "100%",
  },
  formRowSmall: {
    marginTop: SIZES.SPACING.SM,
    width: "100%",
  },
  genderBtn: {
    alignItems: "center",
    backgroundColor: BG_COLOR,
    borderColor: BORDER_COLOR,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 10,
  },
  genderBtnActive: {
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    borderColor: COLORS.PRIMARY,
  },
  genderText: {
    color: COLORS.TEXT_PRIMARY,
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
  section: {
    backgroundColor: BG_COLOR,
    borderColor: BORDER_COLOR,
    borderRadius: SIZES.RADIUS.MEDIUM,
    borderWidth: 1,
    marginBottom: SIZES.SPACING.MD,
    overflow: "hidden",
  },
  modalOverlay: {
    alignItems: "center",
    backgroundColor: COLORS.OVERLAY,
    flex: 1,
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: 12,
    padding: 16,
    width: "92%",
  },
  modalBtn: {
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default withScreenContainer(ProfileScreen, {
  center: false,
  scrollable: true,
});
