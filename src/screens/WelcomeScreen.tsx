import React from "react";
import { Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import withScreenContainer from "@components/layouts/withScreenContainer";
import Button from "../components/Button";
import deliveryImg from "../../assets/welcome/delivery.png"; // ✅ import thay cho require
import { StackNavigationProp } from "@react-navigation/stack";
import { COLORS, TEXT_STYLES } from "@constants/index";

const BG_GRADIENT = [COLORS.BACKGROUND_LIGHT, COLORS.BACKGROUND] as [string, string];
const MAIN_COLOR = COLORS.PRIMARY;
const TITLE_COLOR = COLORS.TEXT_PRIMARY;
const DESC_COLOR = COLORS.TEXT_SECONDARY;

type RootStackParamList = {
  Login: undefined;
};

interface WelcomeScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={BG_GRADIENT}
      style={[styles.container, { paddingTop: insets.top + 20 }]}
    >
      <Text style={styles.title}>
        Dorm
        <Text style={{ color: MAIN_COLOR }}>F</Text>
      </Text>

      <Image source={deliveryImg} style={styles.image} resizeMode="contain" />

      <Text style={styles.welcome}>Chào Mừng Đến Với DormF</Text>
      <Text style={styles.desc}>
        Khám phá, đặt hàng và thưởng thức món ăn yêu thích chỉ trong vài cú chạm!
      </Text>

      <Button
        title="Bắt đầu ngay"
        onPress={() => navigation.replace("Login")}
        textStyle={styles.buttonText}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    color: COLORS.BACKGROUND,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  desc: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: DESC_COLOR,
    marginBottom: 24,
    textAlign: "center",
  },
  image: {
    height: 180,
    marginBottom: 24,
    width: 180,
  },
  title: {
    ...TEXT_STYLES.H1,
    color: TITLE_COLOR,
    marginBottom: 16,
  },
  welcome: {
    ...TEXT_STYLES.H3,
    color: TITLE_COLOR,
    marginBottom: 8,
    textAlign: "center",
  },
});

export default withScreenContainer(WelcomeScreen);
