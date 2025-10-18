import React from "react";
import { View, StyleSheet, ImageSourcePropType } from "react-native";
import Avatar from "./Avatar";
import UserInfo from "./UserInfo";
import IconButton from "./IconButton";
import SearchBox from "./SearchBox";
import avatarImg from "../../assets/avatar/avatar.png";
import { COLORS } from "@constants/index";

const Header: React.FC = () => (
  <View style={styles.container}>
    <View style={styles.row}>
      <Avatar source={avatarImg as ImageSourcePropType} />
      <UserInfo name="Đạt Nguyễn" />
      <View style={styles.icons}>
        <IconButton name="notifications-outline" />
        <IconButton name="bag-handle-outline" />
      </View>
    </View>
    <SearchBox />
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND,
  },
  icons: { flexDirection: "row" },
  row: { alignItems: "center", flexDirection: "row" },
});

export default Header;
