import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Details from "../screens/Details";
import Create from "../screens/Create";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";

const { Navigator, Screen } = createNativeStackNavigator();

export function SignRoutes() {
  return (
    <Navigator initialRouteName="signin" screenOptions={{ headerShown: false }}>
      <Screen name="signin" component={SignIn} />
      <Screen name="signup" component={SignUp} />
    </Navigator>
  );
}
