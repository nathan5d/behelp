import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { Box, NativeBaseProvider } from "native-base";
import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular,
} from "@expo-google-fonts/roboto";

import { theme } from "./src/styles/theme";
import { Loading } from "./src/components/Loading";

import { Routes } from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {fontsLoaded ? <Routes /> : Loading}
    </NativeBaseProvider>
  );
}
