import React from "react";
import { Image, ImageSourcePropType, StyleSheet } from "react-native";
import { COLORS } from "@constants/index";

interface AvatarProps {
  source: ImageSourcePropType;
}

const AVATAR_SIZE = 48;

const Avatar: React.FC<AvatarProps> = ({ source }) => (
  <Image source={source} style={styles.avatar} />
);

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: COLORS.BACKGROUND_DARK,
    borderRadius: AVATAR_SIZE / 2,
    height: AVATAR_SIZE,
    width: AVATAR_SIZE,
  },
});

export default Avatar;
