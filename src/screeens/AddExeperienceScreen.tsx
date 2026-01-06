import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Switch,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInUp } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { useAppContext } from "../context/AppContext";

const AddExperienceScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { addExperience } = useAppContext();
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [durationStart, setDurationStart] = useState("");
  const [durationEnd, setDurationEnd] = useState("");
  const [description, setDescription] = useState("");
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false);

  const handleSave = () => {
    const experience = {
      jobTitle,
      companyName,
      location,
      duration: `${durationStart} - ${
        isCurrentlyWorking ? "Present" : durationEnd
      }`,
      description,
      isCurrentlyWorking,
    };
    addExperience(experience);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
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
            <Text style={styles.headerTitle}>Add Experience</Text>
            <View style={{ width: 24 }} />
          </Animated.View>
        </LinearGradient>

        <Animated.View
          entering={FadeInUp.duration(500).delay(200)}
          style={styles.formContainer}
        >
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Job Title</Text>
            <LinearGradient
              colors={["#fff", "#f9f9f9"]}
              style={styles.inputWrapper}
            >
              <TextInput
                style={styles.input}
                value={jobTitle}
                onChangeText={setJobTitle}
                placeholder="e.g., Software Engineer"
                placeholderTextColor="#999"
              />
            </LinearGradient>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Company Name</Text>
            <LinearGradient
              colors={["#fff", "#f9f9f9"]}
              style={styles.inputWrapper}
            >
              <TextInput
                style={styles.input}
                value={companyName}
                onChangeText={setCompanyName}
                placeholder="e.g., Tech Corp"
                placeholderTextColor="#999"
              />
            </LinearGradient>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location</Text>
            <LinearGradient
              colors={["#fff", "#f9f9f9"]}
              style={styles.inputWrapper}
            >
              <TextInput
                style={styles.input}
                value={location}
                onChangeText={setLocation}
                placeholder="e.g., San Francisco, CA"
                placeholderTextColor="#999"
              />
            </LinearGradient>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Duration</Text>
            <View style={styles.durationRow}>
              <LinearGradient
                colors={["#fff", "#f9f9f9"]}
                style={[styles.inputWrapper, styles.durationInput]}
              >
                <TextInput
                  style={styles.input}
                  value={durationStart}
                  onChangeText={setDurationStart}
                  placeholder="Start (e.g., Jan 2023)"
                  placeholderTextColor="#999"
                />
              </LinearGradient>
              <Text style={styles.durationSeparator}>–</Text>
              <LinearGradient
                colors={["#fff", "#f9f9f9"]}
                style={[styles.inputWrapper, styles.durationInput]}
              >
                <TextInput
                  style={styles.input}
                  value={isCurrentlyWorking ? "Present" : durationEnd}
                  onChangeText={setDurationEnd}
                  placeholder="End (e.g., Mar 2024)"
                  placeholderTextColor="#999"
                  editable={!isCurrentlyWorking}
                />
              </LinearGradient>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.switchRow}>
              <Text style={styles.label}>Currently Working Here</Text>
              <Switch
                value={isCurrentlyWorking}
                onValueChange={(value) => setIsCurrentlyWorking(value)}
                trackColor={{ false: "#ccc", true: "#007AFF" }}
                thumbColor={isCurrentlyWorking ? "#fff" : "#f4f4f4"}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <LinearGradient
              colors={["#fff", "#f9f9f9"]}
              style={styles.inputWrapper}
            >
              <TextInput
                style={[styles.input, styles.multilineInput]}
                value={description}
                onChangeText={setDescription}
                placeholder="Describe your role and achievements"
                placeholderTextColor="#999"
                multiline
              />
            </LinearGradient>
          </View>

          <LinearGradient
            colors={["#007AFF", "#00C6FF"]}
            style={styles.saveButton}
          >
            <TouchableOpacity onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save Experience</Text>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

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
  inputWrapper: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  input: {
    backgroundColor: "transparent",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: "#333",
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
  },
  durationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  durationInput: {
    flex: 1,
  },
  durationSeparator: {
    fontSize: 16,
    color: "#333",
    marginHorizontal: 10,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  saveButton: {
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

export default AddExperienceScreen;
