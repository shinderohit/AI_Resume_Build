import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TemplateScreen from "../screeens/TemplateScreen";
import TemplatePreviewScreen from "../screeens/TemplatePreviewScreen";
import React from "react";
const Stack = createNativeStackNavigator();
const TemplateStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Template"
        component={TemplateScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TemplatePreview"
        component={TemplatePreviewScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default TemplateStackNavigator;
