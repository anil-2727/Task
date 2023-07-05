/** @format */

import "react-native-gesture-handler";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Routes from "./navigation/main";
import { enableScreens } from "react-native-screens";
import { NavigationContainer } from "@react-navigation/native";

enableScreens();
const App = () => {
  return (
    <SafeAreaProvider>
      <Routes />
    </SafeAreaProvider>
  );
};

export default App;
