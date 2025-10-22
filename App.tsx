import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { COLORS } from "./src/constants";
import AppNavigator from "./src/navigation/AppNavigator";
import { ToastContainer } from "./src/components/Toast";

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <StatusBar style="dark" translucent={false} />
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
        <ToastContainer />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND,
    flex: 1,
  },
});
