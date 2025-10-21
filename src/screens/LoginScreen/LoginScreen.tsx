import React, { useState } from "react";
import withScreenContainer from "@components/layouts/withScreenContainer";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import LoginForm from "../../components/LoginForm";
import SocialLoginButtons from "../../components/SocialLoginButtons";
import { StackNavigationProp } from "@react-navigation/stack";
import { COLORS, TEXT_STYLES } from "@constants/index";

const MAIN_COLOR = COLORS.PRIMARY;
const FORGOT_COLOR = COLORS.PRIMARY;
const LINE_COLOR = COLORS.BORDER;
const POLICY_COLOR = COLORS.TEXT_SECONDARY;
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

  const tabItems = [
    { id: "login", label: "Đăng\u00A0nhập" },
    { id: "register", label: "Đăng\u00A0ký" },
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
    <LinearGradient colors={[COLORS.BACKGROUND, COLORS.BACKGROUND]} style={styles.container}>
      <View style={styles.scrollContent}>
        {renderTab}
        <LoginForm
          mode={activeTab === "login" ? "login" : "register"}
          onSuccess={() => navigation.replace("Home")}
        />

        <TouchableOpacity style={styles.forgotBtn}>
          <Text style={styles.forgotText}>Quên mật khẩu?</Text>
        </TouchableOpacity>

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
      </View>
    </LinearGradient>
  );
}
export default withScreenContainer(LoginScreen, {
  center: true,
  scrollable: true,
  keyboardAvoidingView: true,
});

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
  line: {
    backgroundColor: LINE_COLOR,
    flex: 1,
    height: 1,
  },
  // login button styles removed (button moved into LoginForm)
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
    flex: 1,
    justifyContent: "center",
    paddingBottom: 40,
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
  // title and inputBox styles removed (form and inputs are handled in LoginForm)
});
