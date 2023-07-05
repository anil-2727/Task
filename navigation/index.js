import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Reactjs from "../src/React";
import ReactNative from "../src/ReactNative";
import Node from "../src/Node";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Reactjs" component={Reactjs} />
      <Tab.Screen name="ReactNative" component={ReactNative} />
      <Tab.Screen name="Node" component={Node} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
