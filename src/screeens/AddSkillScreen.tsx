import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAppContext } from "../context/AppContext";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const AddSkillScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { addSkill } = useAppContext();

  const [skillName, setSkillName] = useState("");
  const [proficiency, setProficiency] = useState("");

  const handleSave = () => {
    if (skillName.trim()) {
      addSkill({ skillName, proficiency });
      navigation.goBack();
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor="#007AFF" />
      <LinearGradient colors={["#007AFF", "#00C6FF"]} style={styles.header}>
        <Animated.View
          entering={FadeInUp.duration(500)}
          style={styles.headerContent}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              style={{ paddingTop: 5 }}
              name="arrow-back"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
          <Text
            style={{
              paddingTop: 0,
              color: "white",
              fontWeight: "600",
              fontSize: 17,
            }}
          >
            Add Skill
          </Text>
          <View style={{ width: 24 }} />
        </Animated.View>
      </LinearGradient>

      <Animated.View
        entering={FadeInUp.duration(500).delay(200)}
        style={styles.formContainer}
      >
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Skill Name</Text>
          <TextInput
            style={styles.input}
            value={skillName}
            onChangeText={setSkillName}
            placeholder="enter skill name"
            placeholderTextColor={"#999"}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Proficiency Level</Text>
          <TextInput
            style={styles.input}
            value={proficiency}
            onChangeText={setProficiency}
            placeholder="e.g Expert, Intermediate"
            placeholderTextColor={"#999"}
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

export default AddSkillScreen;

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
    marginTop: 6,
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
