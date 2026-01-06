import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const TemplateScreen = () => {
  const navigation = useNavigation();
  const templates = [
    { id: "1", name: "Professional", color: "white", layout: "two-column" },
    { id: "2", name: "Modern", color: "#E5E7EB", layout: "single-column" },
    { id: "3", name: "Creative", color: "#FEE2E2", layout: "two-column" },
    { id: "4", name: "Classic", color: "#E0F2FE", layout: "single-column" },
    { id: "5", name: "Elegant", color: "#ECFDF5", layout: "two-column" },
    { id: "6", name: "Minimalist", color: "#FEF3C7", layout: "single-column" },
  ];

  const renderTemplate = ({ item }: { item: any }) => (
    <View style={[styles.templateContainer, { backgroundColor: item.color }]}>
      <View style={styles.template}>
        <View style={styles.header}>
          <Image
            style={styles.avatar}
            source={{
              uri: "https://lh3.googleusercontent.com/ogw/AF2bZyi09EC0vkA0pKVqrtBq0Y-SLxZc0ynGmNrVKjvV66i3Yg=s64-c-mo",
            }}
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.name}>Alex Samuel</Text>
            <Text style={styles.title}>Graphic Designer</Text>
            <Text style={styles.about}>
              Alex is a passionate graphic designer with over 5 years of
              experience in creating stunning visuals. He specializes in digital
              and print media, delivering innovative designs that captivate
              audiences. His expertise includes branding, UI/UX, and
              illustration.
            </Text>
          </View>
        </View>

        <View style={styles.coloumnsContainer}>
          {/* left coloumns */}
          <View style={styles.leftColumn}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Profile</Text>
              <Text style={styles.description}>
                Creative and detail-oriented Graphic Designer with 5+ years of
                experience in digital and print design.
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              <Text style={styles.date}>2020 - Present</Text>
              <Text style={styles.subtitle}>Senior Designer</Text>
              <Text style={styles.subtext}>Creative Minds Agency</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              <Text style={styles.date}>2015 - 2019</Text>
              <Text style={styles.subtitle}>Masters in Graphic Design</Text>
              <Text style={styles.subtext}>University of Arts, London</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Certificates</Text>
              <Text style={styles.subtitle}>
                Adobe Creative Suite Masterclass
              </Text>
              <Text style={styles.subtext}>Adobe Training center</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projects</Text>
              <Text style={styles.date}>2021 - 2022</Text>
              <Text style={styles.subtitle}>Branding Campaign</Text>
              <Text style={styles.subtext}>Lead Designer</Text>
              <Text style={styles.description}>
                Designed a full branding Campaign for a tech startup
              </Text>
            </View>
          </View>

          <View style={styles.rightColoumn}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <Text style={styles.skill}>Illustrator</Text>
              <Text style={styles.skill}>Photoshop</Text>
              <Text style={styles.skill}>UX/UI Design</Text>
              <Text style={styles.skill}>3D Modeling</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Languages</Text>
              <Text style={styles.skill}>English (native)</Text>
              <Text style={styles.skill}>French (fluent)</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Awards</Text>
              <Text style={styles.subtitle}>Best Graphic Designer 2022</Text>
              <Text style={styles.subtext}>Creative Awards</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Hobbies</Text>
              <Text style={styles.skill}>Photography</Text>
              <Text style={styles.skill}>Sketching</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>References</Text>
              <Text style={styles.subtitle}>John Doe</Text>
              <Text style={styles.subtext}>Art Director at Creative minds</Text>
              <Text style={styles.subtext}>johndoea@gmail.com</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contact</Text>
              <Text style={styles.contactText}>Phone: +1234567890</Text>
              <Text style={styles.contactText}>
                Email: alexsamual@example.com
              </Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("TemplatePreview", {
            template: item?.name,
            color: item?.color,
          })
        }
        style={styles.useButton}
      >
        <Text style={styles.useButtonText}>Use This Template</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={templates}
      renderItem={renderTemplate}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
    />
  );
};

export default TemplateScreen;

const styles = StyleSheet.create({
  list: {
    padding: 20,
  },
  templateContainer: {
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden",
  },
  template: {
    padding: 15,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTextContainer: {
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#007Aff",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  title: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 5,
  },
  about: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    lineHeight: 20,
  },
  coloumnsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  leftColumn: {
    flex: 1,
    paddingRight: 10,
    minWidth: 150,
  },
  rightColoumn: {
    flex: 1,
    paddingRight: 10,
    minWidth: 150,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#007AFF",
    paddingBottom: 2,
  },
  description: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  date: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  subtext: {
    fontSize: 13,
    color: "#666",
    marginBottom: 2,
  },
  contactText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 2,
  },
  skill: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  useButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    alignItems: "center",
  },
  useButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
