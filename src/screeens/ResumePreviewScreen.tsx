import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { ResumeData } from "../types/types";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ResumePreviewScreen = () => {
  const route = useRoute();
  const { resumeData } = route?.params as { resumeData: ResumeData };

  const saveResume = async () => {
    try {
      const resume = await AsyncStorage.getItem("resumes");
      const resumeList = resume ? JSON.parse(resume) : [];
      resumeList.push(resumeData);
      await AsyncStorage.setItem("resumes", JSON.stringify(resumeList));
      Alert.alert("success", "resume saved locally");
    } catch (error) {
      console.log("Error", error);
    }
  };

  const generatePDF = async () => {
    try {
      const pdfContent = `
        %PDF-1.4
        1 0 obj
        << /Type /Catalog /Pages 2 0 R >>
        endobj
        2 0 obj
        << /Type /Pages /Kids [3 0 R] /Count 1 >>
        endobj
        3 0 obj
        << /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 595 842] /Contents 5 0 R >>
        endobj
        4 0 obj
        << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
        endobj
        5 0 obj
        << /Length 44 >>
        stream
        BT /F1 12 Tf 100 700 Td (${resumeData.fullName}) Tj ET
        endstream
        endobj
        xref
        0 6
        0000000000 65535 f 
        0000000010 00000 n 
        0000000056 00000 n 
        0000000102 00000 n 
        0000000179 00000 n 
        0000000225 00000 n 
        trailer
        << /Size 6 /Root 1 0 R >>
        startxref
        300
        %%EOF
      `;
      const fileUri = `${FileSystem.documentDirectory}resume.pdf`;
      await FileSystem.writeAsStringAsync(fileUri, pdfContent, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      await Sharing.shareAsync(fileUri);
      Alert.alert("Success", "PDF generated and shared!");
    } catch (error) {
      Alert.alert("Error", "Failed to generate PDF.");
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: "#fff" }]}>
      <View style={[styles.header, { backgroundColor: resumeData.color }]}>
        <Text style={styles.name}>{resumeData.fullName}</Text>
        <Text style={styles.contact}>
          {resumeData.email} | {resumeData.phone} | {resumeData.address}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        {resumeData.skills.map((skill, index) => (
          <Text key={index} style={styles.sectionText}>
            • {skill}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {resumeData.experience.map((exp, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemTitle}>
              {exp.position} at {exp.company}
            </Text>
            <Text style={styles.itemSubtitle}>
              {exp.startDate} - {exp.endDate}
            </Text>
            <Text style={styles.sectionText}>{exp.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {resumeData.education.map((edu, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemTitle}>{edu.degree}</Text>
            <Text style={styles.itemSubtitle}>
              {edu.institution}, {edu.year}
            </Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={saveResume}>
        <Text style={styles.buttonText}>Save Resume</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={generatePDF}>
        <Text style={styles.buttonText}>Export as PDF</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ResumePreviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  header: {
    padding: 20,
    alignItems: "center",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  contact: {
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    marginVertical: 2,
  },
  item: {
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  itemSubtitle: {
    fontSize: 14,
    color: "#666",
    marginVertical: 2,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    margin: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
