import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <LinearGradient style={styles.container} colors={["#57C785", "#2A7B9B"]}>
      <View style={styles.circleTopLeft} />
      <View style={styles.circleBottomRight} />

      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Build Your Perfect CV</Text>
          <Text style={styles.subtitle}>
            Create a Professional resume in minute with our easy-to-easy
            template
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <Ionicons name="document-text-outline" size={80} color={"white"} />
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("TemplateTab", {
              screen: "Template",
            })
          }
          style={styles.createButton}
        >
          <LinearGradient
            style={styles.buttonGradient}
            colors={["#007AFF", "#005BB5"]}
          >
            <Ionicons
              name="add"
              size={28}
              color={"white"}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Create with Template</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("ResumeForm")}
          style={styles.manualButton}
        >
          <Text style={styles.manualButtonText}>Or Create Manually</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circleTopLeft: {
    position: "absolute",
    top: -50,
    left: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  circleBottomRight: {
    position: "absolute",
    bottom: -30,
    right: -30,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  contentContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 16,
    color: "#E0E0E0",
    lineHeight: 22,
    paddingHorizontal: 20,
    textAlign: "center",
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 8,
  },
  createButton: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
    shadowOpacity: 0.3,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  manualButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  manualButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
});
