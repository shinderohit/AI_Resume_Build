import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../context/AppContext";
import Animated, { FadeInUp } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

type SectionScreenProps = {
  sectionName: string;
  section: string;
  iconName: keyof typeof Ionicons.glyphMap;
};

const SectionScreen: React.FC<SectionScreenProps> = ({
  sectionName,
  section,
  iconName,
}) => {
  const navigation = useNavigation();
  const { state } = useAppContext();

  const renderItem = ({ item }: { item: any }) => {
    if (section == "experience") {
      return (
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{item?.jobTitle}</Text>
          <Text style={styles.itemSubtitle}>
            {item?.companyName} • {item?.location}
          </Text>
          <Text style={styles.itemDetail}>{item?.duration}</Text>
          <Text style={styles.itemDescription}>{item?.description}</Text>
        </View>
      );
    } else if (section == "hobbies/interests") {
      return (
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{item?.hobby}</Text>
        </View>
      );
    } else if (section == "skills") {
      return (
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{item?.skillName}</Text>
          <Text style={styles.itemDetail}>
            Proficiecny: {item?.proficiency}
          </Text>
        </View>
      );
    } else if (section == "projects") {
      return (
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{item?.projectName}</Text>
          <Text style={styles.itemDetail}>Role: {item?.role}</Text>
          <Text style={styles.itemDetail}>
            Description: {item?.description}
          </Text>
          <Text style={styles.itemDetail}>Duration: {item?.duration}</Text>
        </View>
      );
    } else if (section === "qualifications") {
      return (
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{item.degree}</Text>
          <Text style={styles.itemSubtitle}>{item.institution}</Text>
          <Text style={styles.itemDetail}>Duration: {item.duration}</Text>
          {item.description && (
            <Text style={styles.itemDescription}>{item.description}</Text>
          )}
        </View>
      );
    } else if (section == "languages") {
      return (
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{item?.language}</Text>
          <Text style={styles.itemDetail}>
            Proficiecny: {item?.proficiency}
          </Text>
        </View>
      );
    }

    return null;
  };

  const getSectionData = () => {
    switch (section) {
      case "experience":
        return state.experiences;
      case "hobbies/interests":
        return state.hobbies;
      case "skills":
        return state.skills;
      case "projects":
        return state.projects;
      case "qualifications":
        return state.qualifications;
      case "languages":
        return state.languages;
      default:
        return [];
    }
  };

  const data = getSectionData();
  const handleAddPress = () => {
    console.log("hello");
    const sectionToRouteMap: { [key: string]: string } = {
      projects: "AddProject",
      skills: "AddSkill",
      "hobbies/interests": "AddHobby",
      qualifications: "AddQualification",
      organizations: "AddOrganization",
      certificates: "AddCertificate",
      "awards/scholarships": "AddAwardScholarship",
      languages: "AddLanguage",
      references: "AddReference",
      experience: "AddExeperience",
    };

    const routeName = sectionToRouteMap[section];
    console.log("data", routeName);
    if (routeName) {
      navigation.navigate(routeName as never, { section });
    } else {
      console.warn(`No route defined for section: ${section}`);
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
          <Text style={styles.headerTitle}>{sectionName}</Text>
          <View style={{ width: 24 }} />
        </Animated.View>
      </LinearGradient>

      {data.length == 0 ? (
        <Animated.View
          entering={FadeInUp.duration(500).delay(200)}
          style={styles.content}
        >
          <Ionicons name={iconName} size={24} color="#fff" />
          <Text style={styles.message}>No {section} added yet...</Text>
          <Text style={styles.subMessage}>
            Click on the plus button to add {section}
          </Text>
          <TouchableOpacity onPress={handleAddPress} style={styles.addButton}>
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <View style={styles.listContainer}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${section}-${index}`}
            contentContainerStyle={styles.listContent}
          />
          <TouchableOpacity
            onPress={handleAddPress}
            style={styles.addButtonFloating}
          >
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default SectionScreen;

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
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    paddingTop: 0,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 20,
  },
  message: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 20,
  },
  subMessage: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "#007AFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  listContainer: {
    flex: 1,
    padding: 20,
  },
  listContent: {
    paddingBottom: 80,
  },
  itemContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  itemSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  itemDetail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
  addButtonFloating: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007AFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
