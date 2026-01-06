import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ResumeData } from "../types/types";

const TemplateSelectionScreen = () => {
  const templates = [
    {
      id: "modern",
      name: "Modern",
      color: "#007AFF",
    },
    {
      id: "classic",
      name: "Classic",
      color: "#4CAF50",
    },
    {
      id: "creative",
      name: "Creative",
      color: "#FF5722",
    },
  ];
  const navigation = useNavigation();
  const route = useRoute();
  const { resumeData } = route?.params as { resumeData: ResumeData };

  const selectTemplate = (template: string, color: string) => {
    navigation.navigate("ResumePreview", {
      resumeData: { ...resumeData, template, color },
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose a Temaplate</Text>
      {templates?.map((template, index) => (
        <TouchableOpacity
          onPress={() => selectTemplate(template.id, template.color)}
          key={index}
          style={[styles.templateButton, { backgroundColor: template.color }]}
        >
          <Text style={styles.templateText}>{template.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TemplateSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  templateButton: {
    paddingVertical: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: "center",
  },
  templateText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
