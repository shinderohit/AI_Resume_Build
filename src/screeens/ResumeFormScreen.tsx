import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ResumeData } from "../types/types";
import { Ionicons } from "@expo/vector-icons";

const ResumeFormScreen = () => {
  const navigation = useNavigation();
  const [resumeData, setResumeData] = useState<ResumeData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    experience: [
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [{ institution: "", degree: "", year: "" }],
    skills: [""],
    template: "modern",
    color: "#007AFF",
  });
  const [jobDescription, setJobDescription] = useState("");
  const [suggestionKeywords, setSuggestionKeywords] = useState<string[]>([]);

  const handleSubmit = () => {
    const cleanedResumeData = {
      ...resumeData,
      skills: resumeData.skills.filter((skill) => skill.trim() !== ""),
    };
    navigation.navigate("TemplateSelection", { resumeData: cleanedResumeData });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Enter your details</Text>

      <Text style={styles.label}>Full Name</Text>

      <TextInput
        style={styles.input}
        value={resumeData.fullName}
        onChangeText={(text) =>
          setResumeData({ ...resumeData, fullName: text })
        }
        placeholder="John Doe"
      />

      <Text style={styles.label}>Email</Text>

      <TextInput
        style={styles.input}
        value={resumeData.email}
        onChangeText={(text) => setResumeData({ ...resumeData, email: text })}
        placeholder="john@example.com"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Phone</Text>

      <TextInput
        style={styles.input}
        value={resumeData.phone}
        onChangeText={(text) => setResumeData({ ...resumeData, phone: text })}
        placeholder="+91 9349934939"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Address</Text>

      <TextInput
        style={styles.input}
        value={resumeData.address}
        onChangeText={(text) => setResumeData({ ...resumeData, address: text })}
        placeholder="123 Main ST, City, Country"
      />

      <Text style={styles.label}>Experience</Text>
      {resumeData.experience.map((exp, index) => (
        <View key={index} style={styles.experienceContainer}>
          <TextInput
            style={styles.input}
            value={exp.company}
            onChangeText={(text) => {
              const updated = [...resumeData.experience];
              updated[index].company = text;
              setResumeData({ ...resumeData, experience: updated });
            }}
            placeholder="Company Name"
          />
          <TextInput
            style={styles.input}
            value={exp.position}
            onChangeText={(text) => {
              const updated = [...resumeData.experience];
              updated[index].position = text;
              setResumeData({ ...resumeData, experience: updated });
            }}
            placeholder="Position"
          />
          <TextInput
            style={styles.input}
            value={exp.startDate}
            onChangeText={(text) => {
              const updated = [...resumeData.experience];
              updated[index].startDate = text;
              setResumeData({ ...resumeData, experience: updated });
            }}
            placeholder="Start Date (e.g., Jan 2020)"
          />
          <TextInput
            style={styles.input}
            value={exp.endDate}
            onChangeText={(text) => {
              const updated = [...resumeData.experience];
              updated[index].endDate = text;
              setResumeData({ ...resumeData, experience: updated });
            }}
            placeholder="End Date (e.g., Dec 2022)"
          />
          <TextInput
            style={styles.input}
            value={exp.description}
            onChangeText={(text) => {
              const updated = [...resumeData.experience];
              updated[index].description = text;
              setResumeData({ ...resumeData, experience: updated });
            }}
            placeholder="Job Description"
            multiline
          />
          {/* <TouchableOpacity
              style={styles.aiButton}
              onPress={() => handleGenerateDescription(index)}
            >
              <Text style={styles.aiButtonText}>Generate AI Description</Text>
            </TouchableOpacity> */}
        </View>
      ))}

      <Text style={styles.label}>Education</Text>
      {resumeData?.education.map((edu, index) => (
        <View key={index}>
          <TextInput
            style={styles.input}
            value={edu.institution}
            onChangeText={(text) => {
              const updated = [...resumeData.education];
              updated[index].institution = text;
              setResumeData({ ...resumeData, education: updated });
            }}
            placeholder="Institution name"
          />
          <TextInput
            style={styles.input}
            value={edu.degree}
            onChangeText={(text) => {
              const updated = [...resumeData.education];
              updated[index].degree = text;
              setResumeData({ ...resumeData, education: updated });
            }}
            placeholder="Degree"
          />
          <TextInput
            style={styles.input}
            value={edu.year}
            onChangeText={(text) => {
              const updated = [...resumeData.education];
              updated[index].year = text;
              setResumeData({ ...resumeData, education: updated });
            }}
            placeholder="Year (e.g,) 2022"
          />
        </View>
      ))}

      <Text style={styles.label}>Optimize for ATS</Text>
      <Text style={styles.sectionSubtitle}>
        Paste a job description to get keyword suggestions for ATS Optimization
      </Text>

      <TextInput
        style={[styles.input, styles.jobDescriptionInput]}
        placeholder="Paste the job description here..."
        value={jobDescription}
        onChangeText={setJobDescription}
        multiline
      />
      <TouchableOpacity
        style={styles.aiButton}
        // onPress={extractKeywords}
      >
        <Ionicons
          name="search"
          size={18}
          color="#fff"
          style={styles.buttonIcon}
        />
        <Text style={styles.aiButtonText}>Extract Keywords</Text>
      </TouchableOpacity>

      <Text>Skills</Text>

      <TextInput
        style={styles.input}
        value={resumeData.skills.join(", ")}
        onChangeText={(text) =>
          setResumeData({
            ...resumeData,
            skills: text
              .split(", ")
              .map((skill) => skill.trim())
              .filter((skill) => skill),
          })
        }
        placeholder="JavaScript, React, Node.js"
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Next: Choose template</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ResumeFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginTop: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  jobDescriptionInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  aiButton: {
    flexDirection: "row",
    backgroundColor: "#FF5722",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  buttonIcon: {
    marginRight: 8,
  },
  aiButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  experienceContainer: {
    marginBottom: 20,
  },
  keywordsContainer: {
    marginVertical: 10,
  },
  keywordItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0E0E0",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginRight: 10,
  },
  keywordText: {
    fontSize: 14,
    color: "#333",
    marginRight: 5,
  },
});
