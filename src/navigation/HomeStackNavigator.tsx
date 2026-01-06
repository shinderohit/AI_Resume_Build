import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screeens/HomeScreen";
import React from "react";
import ResumeFormScreen from "../screeens/ResumeFormScreen";
import TemplateSelectionScreen from "../screeens/TemplateSelectionScreen";
import ResumePreviewScreen from "../screeens/ResumePreviewScreen";

const Stack = createNativeStackNavigator();
const HomestackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResumeForm"
        component={ResumeFormScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TemplateSelection"
        component={TemplateSelectionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResumePreview"
        component={ResumePreviewScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomestackNavigator;
