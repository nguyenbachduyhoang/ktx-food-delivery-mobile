import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" translucent={false} />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
