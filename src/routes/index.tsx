
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import SignIn from "../screens/SignIn";

import { AppRoutes } from "./app.routes";
import { useState, useEffect } from "react";
import { Loading } from "../components/Loading";
import { StatusBar, useColorMode, useColorModeValue } from "native-base";

export function Routes() {
  const [loading, setLoading] = useState(true);
  const getColorMode = useColorMode();
  const [user, setUser] = useState<FirebaseAuthTypes.User>();
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((response) => {
      setUser(response);
      setLoading(false);
    });

    return subscriber;1
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
   
    <NavigationContainer>
      <StatusBar
        barStyle={getColorMode.colorMode === "dark" ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent
      />
     {user ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  );
}
