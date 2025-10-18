import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS, SIZES } from "@constants/index";

interface IconButtonProps {
  name: string;
  size?: number;
  color?: string;
  onPress?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  name,
  size = SIZES.HEADER.ICON_SIZE,
  color = COLORS.TEXT_PRIMARY,
  onPress,
}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Ionicons name={name} size={size} color={color} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    height: SIZES.HEADER.BUTTON_SIZE,
    justifyContent: "center",
    marginHorizontal: SIZES.SPACING.XS,
    width: SIZES.HEADER.BUTTON_SIZE,
  },
});

export default IconButton;
