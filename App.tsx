import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppProvider } from "./src/context/AppContext";
import RootNavigator from "./src/navigation/RootNavigator";
import React from "react";

export default function App() {
  return (
    <GestureHandlerRootView>
      <AppProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AppProvider>
    </GestureHandlerRootView>
  );
}
