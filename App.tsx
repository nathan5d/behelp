import React, { useState } from "react";
import {
  StatusBar,
  Box,
  ColorMode,
  NativeBaseProvider,
  StorageManager,
  useColorMode,
  useColorModeValue,
} from "native-base";
import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular,
} from "@expo-google-fonts/roboto";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { theme } from "./src/styles/theme";

import { Loading } from "./src/components/Loading";

import { Routes } from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  const getColorMode = useColorMode();

  // Define the colorModeManager,
  // here we are using react-native-async-storage (https://react-native-async-storage.github.io/async-storage/)
  const colorModeManager: StorageManager = {
    get: async () => {
      try {
        let val = await AsyncStorage.getItem("@color-mode");
        return val === "dark" ? "dark" : "light";
      } catch (e) {
        return "light";
      }
    },
    set: async (value: ColorMode) => {
      try {
        await AsyncStorage.setItem("@color-mode", value);
      } catch (e) {
        console.log(e);
      }
    },
  };

  return (
    <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
      {fontsLoaded ? <Routes /> : <Loading />}
    </NativeBaseProvider>
  );
}
