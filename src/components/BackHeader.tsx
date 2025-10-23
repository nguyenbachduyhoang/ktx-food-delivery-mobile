import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES, TEXT_STYLES } from "@constants/index";

type Props = { title?: string; onBack?: () => void };

const BackHeader: React.FC<Props> = ({ title, onBack }) => {
  const navigation = useNavigation<any>();

  const goBack = () => {
    if (onBack) return onBack();
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("Home");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.backBtn}>
        <Ionicons name="chevron-back" size={24} color={COLORS.TEXT_PRIMARY} />
      </TouchableOpacity>
      {!!title && <Text style={styles.title}>{title}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: SIZES.SPACING.LG,
    paddingBottom: SIZES.SPACING.MD,
  },
  backBtn: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    borderRadius: 20,
    elevation: 2,
    height: 40,
    justifyContent: "center",
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    width: 40,
  },
  title: {
    ...TEXT_STYLES.H2,
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
    marginLeft: SIZES.SPACING.MD,
  },
});

export default BackHeader;
