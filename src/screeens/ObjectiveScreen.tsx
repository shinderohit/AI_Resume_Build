import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import Animated, { FadeInUp } from "react-native-reanimated";
import { useAppContext } from "../context/AppContext";
import { LinearGradient } from "expo-linear-gradient";

const ObjectiveScreen = () => {
  const navigation = useNavigation();
  const { state, updateObjective } = useAppContext();
  const [text, setText] = useState(state.objective?.text);

  const handleSave = () => {
    if (text.trim()) {
      updateObjective({ text });
      navigation.goBack();
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
      <LinearGradient colors={["#007AFF", "#00C6FF"]} style={styles.header}>
        <Animated.View
          entering={FadeInUp.duration(500)}
          style={styles.headerContent}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back"
              size={24}
              color="#fff"
              style={{ paddingTop: 5 }}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Objective</Text>
          <View style={{ width: 24 }} />
        </Animated.View>
      </LinearGradient>

      <Animated.View
        entering={FadeInUp.duration(500).delay(200)}
        style={styles.formContainer}
      >
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Objective</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            value={text}
            onChangeText={setText}
            placeholder="Enter your career objective"
            placeholderTextColor="#999"
            multiline
          />
        </View>
        <LinearGradient
          colors={["#007AFF", "#00C6FF"]}
          style={styles.saveButton}
        >
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

export default ObjectiveScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 15,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    paddingTop: 0,
  },
  formContainer: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: "#333",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  multilineInput: {
    height: 80,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
