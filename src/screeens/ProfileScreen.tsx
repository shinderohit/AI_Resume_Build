import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "../context/AppContext";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const profileSections = [
    {
      id: "0",
      title: "Personal Details",
      icon: "person-outline",
      screen: "PersonalDetails",
    },
    { id: "1", title: "Objective", icon: "flag-outline", screen: "Objective" },
    {
      id: "2",
      title: "Experience",
      icon: "briefcase-outline",
      screen: "Experience",
    },
    {
      id: "3",
      title: "Qualifications",
      icon: "school-outline",
      screen: "Qualifications",
    },
    {
      id: "4",
      title: "Organizations",
      icon: "book-outline",
      screen: "Organizations",
    },
    {
      id: "5",
      title: "Projects",
      icon: "code-working-outline",
      screen: "Projects",
    },
    {
      id: "6",
      title: "Certificates",
      icon: "document-outline",
      screen: "Certificates",
    },
    {
      id: "7",
      title: "Awards/Scholarships",
      icon: "trophy-outline",
      screen: "AwardsScholarships",
    },
    { id: "8", title: "Skills", icon: "key-outline", screen: "Skills" },
    {
      id: "9",
      title: "Languages",
      icon: "language-outline",
      screen: "Languages",
    },
    {
      id: "10",
      title: "Hobbies/Interests",
      icon: "hourglass-outline",
      screen: "HobbiesInterests",
    },
    {
      id: "11",
      title: "References",
      icon: "people-outline",
      screen: "References",
    },
  ];

  const { state } = useAppContext();

  console.log("data", state);

  const hasDataForSection = (screen: string) => {
    switch (screen) {
      case "PersonalDetails":
        return !!state.personalDetails;
      case "Objective":
        return !!state.objective;
      case "Experience":
        return state.experiences.length > 0;
      case "Qualifications":
        return state.qualifications.length > 0;
      case "Skills":
        return state.skills.length > 0;
      case "Languages":
        return state.languages.length > 0;
      case "Projects":
        return state.projects.length > 0;
      case "HobbiesInterests":
        return state.hobbies.length > 0;
      case "Organizations":
        return state.projects.length > 0;
      case "Certificates":
        return state.projects.length > 0;
      case "AwardsScholarships":
        return state.projects.length > 0;
      default:
        return false;
    }
  };

  const renderSection = ({
    item,
    index,
  }: {
    item: (typeof profileSections)[0];
    index: number;
  }) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen)}
          style={styles.section}
        >
          <Ionicons name={item.icon} size={24} color="#007AFF" />
          <Text style={styles.sectionTitle}>{item?.title}</Text>
          {hasDataForSection(item.screen) ? (
            <Ionicons
              name="checkmark-circle"
              size={24}
              color="#28a745"
              style={styles.tickIcon}
            />
          ) : (
            <Ionicons name="chevron-forward" size={24} color="#ccc" />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle={"light-content"} backgroundColor="#fff" /> */}
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={{
            uri: "https://lh3.googleusercontent.com/ogw/AF2bZyi09EC0vkA0pKVqrtBq0Y-SLxZc0ynGmNrVKjvV66i3Yg=s64-c-mo",
          }}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.title}>Professional Title</Text>
        </View>
      </View>

      <FlatList
        data={profileSections}
        renderItem={renderSection}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    marginTop: 0,
  },
  header: {
    alignItems: "center",
    padding: 20,
    paddingTop: StatusBar.currentHeight || 5,
    backgroundColor: "white",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 10,
  },
  headerTextContainer: {
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#007AFF",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    color: "#666",
    fontStyle: "italic",
  },
  list: {
    padding: 15,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginLeft: 15,
  },
  tickIcon: {
    marginLeft: 10,
  },
});
