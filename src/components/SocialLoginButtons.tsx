import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { COLORS, TEXT_STYLES } from "@constants/index";

const BG_COLOR = COLORS.BACKGROUND_LIGHT;
const ICON_COLOR = COLORS.TEXT_PRIMARY;

import googleIcon from "../../assets/login/google.png";
import appleIcon from "../../assets/login/apple.png";

export default function SocialLoginButtons() {
  return (
    <>
      <TouchableOpacity style={styles.socialBtn}>
        <Image source={googleIcon} style={styles.socialIcon} />
        <Text style={styles.socialText}>Tiếp tục với Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialBtn}>
        <Image source={appleIcon} style={styles.socialIcon} />
        <Text style={styles.socialText}>Tiếp tục với Apple</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  socialBtn: {
    alignItems: "center",
    backgroundColor: BG_COLOR,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: "100%",
  },
  socialIcon: {
    height: 22,
    marginRight: 10,
    width: 22,
  },
  socialText: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: ICON_COLOR,
    fontWeight: "500",
  },
});
