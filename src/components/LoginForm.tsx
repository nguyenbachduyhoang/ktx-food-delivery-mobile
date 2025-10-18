import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Input from "./Input";

const BG_COLOR = "#fff";
const BORDER_COLOR = "#eee";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <View style={styles.inputBox}>
        <Input value={email} onChangeText={setEmail} placeholder="Số điện thoại hoặc email..." />
      </View>
      <View style={styles.inputBox}>
        <Input value={password} onChangeText={setPassword} placeholder="Mật khẩu" type="password" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    alignItems: "center",
    backgroundColor: BG_COLOR,
    borderColor: BORDER_COLOR,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row", // chuyển lên đây
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: "100%",
  },
});
