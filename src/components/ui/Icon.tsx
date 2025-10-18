import * as React from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface IconProps {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

const Icon: React.FC<IconProps> = ({ name, size = 24, color = "#333", onPress, style }) => {
  const IconElement = <Ionicons name={name} size={size} color={color} />;

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={style}>
        {IconElement}
      </TouchableOpacity>
    );
  }

  return IconElement;
};

export default Icon;
