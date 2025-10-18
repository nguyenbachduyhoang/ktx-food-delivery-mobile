import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LoginForm from "../../components/LoginForm";
import SocialLoginButtons from "../../components/SocialLoginButtons";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { StackNavigationProp } from "@react-navigation/stack";
import { COLORS, TEXT_STYLES } from "@constants/index";
import withScreenContainer from "@components/layouts/withScreenContainer";

const MAIN_COLOR = COLORS.PRIMARY;
const TITLE_COLOR = COLORS.TEXT_PRIMARY;
const INPUT_BG_COLOR = COLORS.BACKGROUND;
const INPUT_BORDER_COLOR = COLORS.BORDER;
const FORGOT_COLOR = COLORS.PRIMARY;
const LINE_COLOR = COLORS.BORDER;
const POLICY_COLOR = COLORS.TEXT_SECONDARY;
const BTN_TEXT_COLOR = COLORS.BACKGROUND;
const TAB_BORDER_COLOR = "transparent";
const TAB_COLOR = COLORS.TEXT_SECONDARY;

type RootStackParamList = {
  Home: undefined;
  VerifyCode: undefined;
};

interface LoginScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

function LoginScreen({ navigation }: LoginScreenProps) {
  const [activeTab, setActiveTab] = useState("login");
  const [confirmPassword, setConfirmPassword] = useState("");
  const insets = useSafeAreaInsets();

  const tabItems = [
    { id: "login", label: "Đăng nhập" },
    { id: "register", label: "Đăng ký" },
  ];

  const renderTab = (
    <View style={styles.tabRow}>
      {tabItems.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          onPress={() => setActiveTab(tab.id)}
          style={styles.tabButton}
        >
          <Text
            style={{
              ...styles.tabText,
              borderBottomColor: tab.id === activeTab ? MAIN_COLOR : TAB_BORDER_COLOR,
              color: tab.id === activeTab ? MAIN_COLOR : TAB_COLOR,
            }}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <LinearGradient colors={[COLORS.BACKGROUND_LIGHT, COLORS.BACKGROUND]} style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top }]}
        showsVerticalScrollIndicator={false}
      >
        {renderTab}
        <Text style={styles.title}>{activeTab === "login" ? "Đăng nhập" : "Đăng ký"}</Text>

        {/* Xác nhận mật khẩu khi đăng ký */}
        <View style={activeTab !== "register" ? styles.inputBoxHidden : styles.inputBox}>
          <Input
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Xác nhận mật khẩu"
            type="password"
          />
        </View>

        <LoginForm />

        <TouchableOpacity style={styles.forgotBtn}>
          <Text style={styles.forgotText}>Quên mật khẩu?</Text>
        </TouchableOpacity>

        <Button
          title="Tiếp tục"
          onPress={() => {
            if (activeTab === "register") {
              navigation.replace("VerifyCode");
            } else {
              navigation.replace("Home");
            }
          }}
          style={styles.loginBtn}
          textStyle={styles.loginBtnText}
        />

        <View style={styles.orRow}>
          <View style={styles.line} />
          <Text style={styles.orText}>hoặc</Text>
          <View style={styles.line} />
        </View>

        <SocialLoginButtons />

        <Text style={styles.policy}>
          Bằng cách nhấp vào tiếp tục, bạn đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của
          chúng tôi
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}

export default withScreenContainer(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  forgotBtn: {
    alignSelf: "flex-end",
    marginBottom: 16,
  },
  forgotText: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: FORGOT_COLOR,
    fontWeight: "700",
  },
  inputBox: {
    alignItems: "center",
    backgroundColor: INPUT_BG_COLOR,
    borderColor: INPUT_BORDER_COLOR,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: "100%",
  },
  inputBoxHidden: {
    alignItems: "center",
    backgroundColor: INPUT_BG_COLOR,
    borderColor: INPUT_BORDER_COLOR,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    height: 0,
    marginBottom: 0,
    opacity: 0,
    paddingHorizontal: 16,
    paddingVertical: 0,
    width: "100%",
  },
  line: {
    backgroundColor: LINE_COLOR,
    flex: 1,
    height: 1,
  },
  loginBtn: {
    alignItems: "center",
    backgroundColor: MAIN_COLOR,
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 0,
    paddingVertical: 14,
    width: "100%",
  },
  loginBtnText: {
    ...TEXT_STYLES.BUTTON_LARGE,
    color: BTN_TEXT_COLOR,
  },
  orRow: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 16,
    width: "100%",
  },
  orText: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: POLICY_COLOR,
    marginHorizontal: 8,
  },
  policy: {
    ...TEXT_STYLES.BODY_SMALL,
    color: POLICY_COLOR,
    textAlign: "center",
  },
  scrollContent: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  tabButton: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 4,
    minWidth: 120,
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
    marginTop: 40,
    width: "100%",
  },
  tabText: {
    ...TEXT_STYLES.H4,
    borderBottomWidth: 2,
    paddingBottom: 4,
    textAlign: "center",
    width: "100%",
  },
  title: {
    ...TEXT_STYLES.H2,
    color: TITLE_COLOR,
    marginBottom: 24,
    textAlign: "center",
  },
});
