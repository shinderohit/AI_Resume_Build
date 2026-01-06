import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomestackNavigator from "./HomeStackNavigator";
import TemplateStackNavigator from "./TemplateStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const Tab = createBottomTabNavigator();

const RootNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;
          if (route.name === "HomeTab") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "TemplateTab") {
            iconName = focused ? "document-text" : "document-text-outline";
          } else if (route.name === "ProfileTab") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#2A7B9B",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "#f5f5f5" },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomestackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="TemplateTab"
        component={TemplateStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackNavigator}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default RootNavigator;
