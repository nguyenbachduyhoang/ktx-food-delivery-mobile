import React from "react";
import { Image, ImageSourcePropType, StyleSheet } from "react-native";

const COLORS = {
  avatarBg: "#E0E0E0",
};

interface AvatarProps {
  source: ImageSourcePropType;
}

const Avatar: React.FC<AvatarProps> = ({ source }) => (
  <Image source={source} style={styles.avatar} />
);

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: COLORS.avatarBg,
    borderRadius: 24,
    height: 48,
    width: 48,
  },
});

export default Avatar;
