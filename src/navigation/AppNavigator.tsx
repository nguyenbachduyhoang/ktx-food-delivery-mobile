import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/WelcomeScreen/WelcomeScreen";
import BottomTabs from "./BottomTabs";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import SearchScreen from "../screens/SearchScreen/SearchScreen";
import { ROUTES } from "@constants/index";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName={ROUTES.WELCOME} screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.WELCOME} component={WelcomeScreen} />
      <Stack.Screen name={ROUTES.HOME} component={BottomTabs} />
      <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}
