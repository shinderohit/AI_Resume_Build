import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAppContext } from "../context/AppContext";
import { Ionicons } from "@expo/vector-icons";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import Modal from "react-native-modal";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as Print from "expo-print";

type SectionKey =
  | "profile"
  | "experience"
  | "education"
  | "projects"
  | "skills"
  | "languages"
  | "hobbies"
  | "contact";

type SectionItem = {
  key: SectionKey;
  render: () => JSX.Element;
};

const TemplatePreviewScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { template, color } = route?.params as {
    template: string;
    color: string;
  };
  const { state } = useAppContext();
  const [visibleSections, setVisibleSections] = useState<
    Record<SectionKey, boolean>
  >({
    profile: true,
    experience: true,
    education: true,
    projects: true,
    skills: true,
    languages: true,
    hobbies: true,
    contact: true,
  });

  const [leftSections, setLeftSections] = useState<SectionItem[]>([
    {
      key: "profile",
      render: () => (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Profile</Text>
            <TouchableOpacity onPress={() => hideSection("profile")}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          <Text style={styles.description}>
            {state.objective?.text ||
              "A dedicated professional developer with extensive experience in their field"}
          </Text>
        </View>
      ),
    },
    {
      key: "experience",
      render: () => (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Experience</Text>
            <TouchableOpacity onPress={() => hideSection("experience")}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          {state.experiences.map((exp, index) => (
            <View style={styles.experienceItem}>
              <Text style={styles.date}>{exp.duration}</Text>
              <Text style={styles.subTitle}>{exp.jobTitle}</Text>
              <Text style={styles.subtext}>{exp.companyName}</Text>
              <Text style={styles.description}>{exp.description}</Text>
            </View>
          ))}
        </View>
      ),
    },
    {
      key: "education",
      render: () => (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Education</Text>
            <TouchableOpacity onPress={() => hideSection("education")}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          {state.qualifications.map((qual, index) => (
            <View style={styles.experienceItem}>
              <Text style={styles.date}>{qual.duration}</Text>
              <Text style={styles.subTitle}>{qual.degree}</Text>
              <Text style={styles.subtext}>{qual.institution}</Text>
              {qual.description && (
                <Text style={styles.description}>{qual.description}</Text>
              )}
            </View>
          ))}
        </View>
      ),
    },
    {
      key: "projects",
      render: () => (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Projects</Text>
            <TouchableOpacity onPress={() => hideSection("projects")}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          {state.projects.map((proj, index) => (
            <View style={styles.experienceItem}>
              <Text style={styles.date}>{proj.duration}</Text>
              <Text style={styles.subTitle}>{proj.projectName}</Text>
              <Text style={styles.subtext}>{proj.role}</Text>
              <Text style={styles.description}>{proj.description}</Text>
            </View>
          ))}
        </View>
      ),
    },
  ]);

  const [rightSections, setRightSections] = useState<SectionItem[]>([
    {
      key: "skills",
      render: () => (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <TouchableOpacity onPress={() => hideSection("skills")}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          {state.skills.map((skill, index) => (
            <Text key={index} style={styles.skill}>
              {skill.skillName}{" "}
              {skill.proficiency ? `(${skill.proficiency})` : ""}
            </Text>
          ))}
        </View>
      ),
    },
    {
      key: "languages",
      render: () => (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Languages</Text>
            <TouchableOpacity onPress={() => hideSection("languages")}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          {state.languages.map((lang, index) => (
            <Text key={index} style={styles.skill}>
              {lang.language} {lang.proficiency}
            </Text>
          ))}
        </View>
      ),
    },
    {
      key: "hobbies",
      render: () => (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Hobbies</Text>
            <TouchableOpacity onPress={() => hideSection("hobbies")}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          {state.hobbies.map((hobby, index) => (
            <Text key={index} style={styles.skill}>
              {hobby.hobby}
            </Text>
          ))}
        </View>
      ),
    },
    {
      key: "contact",
      render: () => (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Contact</Text>
            <TouchableOpacity onPress={() => hideSection("contact")}>
              <Ionicons name="close" size={18} color="#666" />
            </TouchableOpacity>
          </View>
          {state.personalDetails?.phone && (
            <Text style={styles.contactText}>
              Phone: {state.personalDetails.phone}
            </Text>
          )}
          {state.personalDetails?.email && (
            <Text style={styles.contactText}>
              Email: {state.personalDetails.email}
            </Text>
          )}
          {state.personalDetails?.address && (
            <Text style={styles.contactText}>
              Address: {state.personalDetails.address}
            </Text>
          )}
        </View>
      ),
    },
  ]);

  const filteredLeftSections = leftSections.filter(
    (section) => visibleSections[section.key]
  );
  const filteredRightSections = rightSections.filter(
    (section) => visibleSections[section.key]
  );

  const hideSection = (section: SectionKey) => {
    setVisibleSections((prev) => ({
      ...prev,
      [section]: false,
    }));
  };

  const renderItem = ({
    item,
    drag,
  }: {
    item: SectionItem;
    drag: () => void;
  }) => (
    <ScaleDecorator>
      <TouchableOpacity onLongPress={drag} activeOpacity={0.8}>
        {item.render()}
      </TouchableOpacity>
    </ScaleDecorator>
  );

  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);
  const [resumeScore, setResumeScore] = useState(0);
  const [feedback, setFeedback] = useState<string[]>([]);

  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [customizationModalVisible, setCustomizationModalVisible] =
    useState(false);
  const [selectedJobRole, setSelectedJobRole] =
    useState<string>("Software Engineer");
  const [customizationSuggestions, setCustomizationsSuggestions] = useState<
    string[]
  >([]);

  const jobRoleTemplates: Record<
    string,
    {
      objectiveKeywords: string[];
      keySkills: string[];
      experienceKeywords: string[];
    }
  > = {
    "Software Engineer": {
      objectiveKeywords: [
        "software development",
        "coding",
        "problem-solving",
        "technical skills",
      ],
      keySkills: [
        "JavaScript",
        "Python",
        "React",
        "problem-solving",
        "teamwork",
      ],
      experienceKeywords: [
        "developed",
        "engineered",
        "implemented",
        "debugged",
      ],
    },
    "Marketing Intern": {
      objectiveKeywords: ["marketing", "branding", "social media", "creative"],
      keySkills: [
        "social media marketing",
        "content creation",
        "SEO",
        "communication",
      ],
      experienceKeywords: ["created", "promoted", "analyzed", "designed"],
    },
    "Data Analyst": {
      objectiveKeywords: [
        "data analysis",
        "insights",
        "statistics",
        "analytical",
      ],
      keySkills: [
        "Excel",
        "Python",
        "SQL",
        "data visualization",
        "critical thinking",
      ],
      experienceKeywords: ["analyzed", "visualized", "interpreted", "modeled"],
    },
  };

  const containsActionVerbs = (description: string) => {
    const actionsVerbs = [
      "developed",
      "led",
      "managed",
      "created",
      "implemented",
      "improved",
      "designed",
    ];
    return actionsVerbs.some((verb) =>
      description.toLowerCase().includes(verb)
    );
  };
  const escapeHtml = (text: string) => {
    if (!text) return "N/A";
    return text
      .replace(/&/g, "&")
      .replace(/</g, "<")
      .replace(/>/g, ">")
      .replace(/"/g, "")
      .replace(/'/g, "'");
  };

  const generateHtmlContent = () => {
    return `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 20px;
                color: #333;
                background-color: ${color};
                min-height: 100vh;
              }
              .header {
                text-align: center;
                margin-bottom: 20px;
                padding-bottom: 15px;
                border-bottom: 1px solid #ddd;
              }
              .name {
                font-size: 24px;
                font-weight: bold;
                color: #000;
              }
              .title {
                font-size: 16px;
                color: #666;
                margin-bottom: 5px;
              }
              .about {
                font-size: 14px;
                color: #333;
                line-height: 1.4;
              }
              .columns-container {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
              }
              .left-column, .right-column {
                flex: 1;
                min-width: 300px;
                padding: 0 10px;
              }
              .section {
                margin-bottom: 20px;
              }
              .section-title {
                font-size: 18px;
                font-weight: bold;
                color: #000;
                border-bottom: 1px solid #007AFF;
                padding-bottom: 2px;
                margin-bottom: 8px;
              }
              .description {
                font-size: 14px;
                color: #333;
                line-height: 1.4;
              }
              .experience-item {
                margin-bottom: 10px;
              }
              .date {
                font-size: 12px;
                color: #666;
                margin-bottom: 2px;
              }
              .subtitle {
                font-size: 14px;
                font-weight: 600;
                color: #000;
              }
              .subtext {
                font-size: 12px;
                color: #666;
                margin-bottom: 2px;
              }
              .skill, .contact-text {
                font-size: 14px;
                color: #333;
                margin-bottom: 4px;
              }
            </style>
          </head>
          <body>
            <!-- Header Section -->
            <div class="header">
              <div class="name">${escapeHtml(
                state.personalDetails?.name || "John Doe"
              )}</div>
              <div class="title">${escapeHtml(
                state.personalDetails?.title || "Professional"
              )}</div>
              <div class="about">${escapeHtml(
                state.objective?.text ||
                  "A dedicated professional with extensive experience in their field."
              )}</div>
            </div>
  
            <!-- Two-column layout -->
            <div class="columns-container">
              <!-- Left Column -->
              <div class="left-column">
                ${filteredLeftSections
                  .map((section) => {
                    switch (section.key) {
                      case "profile":
                        return `
                          <div class="section">
                            <div class="section-title">Profile</div>
                            <div class="description">${escapeHtml(
                              state.objective?.text ||
                                "A dedicated professional with extensive experience in their field."
                            )}</div>
                          </div>
                        `;
                      case "experience":
                        return state.experiences.length > 0
                          ? `
                            <div class="section">
                              <div class="section-title">Experience</div>
                              ${state.experiences
                                .map(
                                  (exp) => `
                                    <div class="experience-item">
                                      <div class="date">${escapeHtml(
                                        exp.duration
                                      )}</div>
                                      <div class="subtitle">${escapeHtml(
                                        exp.jobTitle
                                      )}</div>
                                      <div class="subtext">${escapeHtml(
                                        exp.companyName
                                      )}</div>
                                      <div class="description">${escapeHtml(
                                        exp.description
                                      )}</div>
                                    </div>
                                  `
                                )
                                .join("")}
                            </div>
                          `
                          : "";
                      case "education":
                        return state.qualifications.length > 0
                          ? `
                            <div class="section">
                              <div class="section-title">Education</div>
                              ${state.qualifications
                                .map(
                                  (qual) => `
                                    <div class="experience-item">
                                      <div class="date">${escapeHtml(
                                        qual.duration
                                      )}</div>
                                      <div class="subtitle">${escapeHtml(
                                        qual.degree
                                      )}</div>
                                      <div class="subtext">${escapeHtml(
                                        qual.institution
                                      )}</div>
                                      ${
                                        qual.description
                                          ? `<div class="description">${escapeHtml(
                                              qual.description
                                            )}</div>`
                                          : ""
                                      }
                                    </div>
                                  `
                                )
                                .join("")}
                            </div>
                          `
                          : "";
                      case "projects":
                        return state.projects.length > 0
                          ? `
                            <div class="section">
                              <div class="section-title">Projects</div>
                              ${state.projects
                                .map(
                                  (proj) => `
                                    <div class="experience-item">
                                      <div class="date">${escapeHtml(
                                        proj.duration
                                      )}</div>
                                      <div class="subtitle">${escapeHtml(
                                        proj.projectName
                                      )}</div>
                                      <div class="subtext">${escapeHtml(
                                        proj.role
                                      )}</div>
                                      <div class="description">${escapeHtml(
                                        proj.description
                                      )}</div>
                                    </div>
                                  `
                                )
                                .join("")}
                            </div>
                          `
                          : "";
                      default:
                        return "";
                    }
                  })
                  .join("")}
              </div>
  
              <!-- Right Column -->
              <div class="right-column">
                ${filteredRightSections
                  .map((section) => {
                    switch (section.key) {
                      case "skills":
                        return state.skills.length > 0
                          ? `
                            <div class="section">
                              <div class="section-title">Skills</div>
                              ${state.skills
                                .map(
                                  (skill) => `
                                    <div class="skill">${escapeHtml(
                                      skill.skillName
                                    )} ${
                                    skill.proficiency
                                      ? `(${escapeHtml(skill.proficiency)})`
                                      : ""
                                  }</div>
                                  `
                                )
                                .join("")}
                            </div>
                          `
                          : "";
                      case "languages":
                        return state.languages.length > 0
                          ? `
                            <div class="section">
                              <div class="section-title">Languages</div>
                              ${state.languages
                                .map(
                                  (lang) => `
                                    <div class="skill">${escapeHtml(
                                      lang.language
                                    )} (${escapeHtml(lang.proficiency)})</div>
                                  `
                                )
                                .join("")}
                            </div>
                          `
                          : "";
                      case "hobbies":
                        return state.hobbies.length > 0
                          ? `
                            <div class="section">
                              <div class="section-title">Hobbies</div>
                              ${state.hobbies
                                .map(
                                  (hobby) => `
                                    <div class="skill">${escapeHtml(
                                      hobby.hobby
                                    )}</div>
                                  `
                                )
                                .join("")}
                            </div>
                          `
                          : "";
                      case "contact":
                        return `
                          <div class="section">
                            <div class="section-title">Contact</div>
                            ${
                              state.personalDetails?.phone
                                ? `<div class="contact-text">Phone: ${escapeHtml(
                                    state.personalDetails.phone
                                  )}</div>`
                                : ""
                            }
                            ${
                              state.personalDetails?.email
                                ? `<div class="contact-text">Email: ${escapeHtml(
                                    state.personalDetails.email
                                  )}</div>`
                                : ""
                            }
                            ${
                              state.personalDetails?.address
                                ? `<div class="contact-text">Address: ${escapeHtml(
                                    state.personalDetails.address
                                  )}</div>`
                                : ""
                            }
                          </div>
                        `;
                      default:
                        return "";
                    }
                  })
                  .join("")}
              </div>
            </div>
          </body>
        </html>
      `;
  };

  const getCustomizationSuggestions = () => {
    const suggestions: string[] = [];
    const template = jobRoleTemplates[selectedJobRole];

    const objectiveText = state?.objective?.text.toLowerCase() || "";
    const hasObjectiveKeywords = template.objectiveKeywords.some((keyword) =>
      objectiveText.includes(keyword.toLowerCase())
    );
    if (!hasObjectiveKeywords) {
      suggestions.push(
        `Update your objective to align with a ${selectedJobRole} role. Include keywords like: ${template.objectiveKeywords.join(
          ", "
        )}. ` +
          `For example: "Aspiring ${selectedJobRole} with a passion for ${template.objectiveKeywords[0]} and ${template.objectiveKeywords[1]}."`
      );
    }

    const currentSkills = state.skills.map(
      (skill) => skill.skillName?.toLowerCase() || ""
    );
    const missingSkills = template.keySkills.filter(
      (skill) => !currentSkills.includes(skill.toLowerCase())
    );
    if (missingSkills.length > 0) {
      suggestions.push(
        `Add or prioritize these skills relevant to a ${selectedJobRole} : ${missingSkills.join(
          ", "
        )}`
      );
    } else {
      suggestions.push(
        `Your skills section looks good for a ${selectedJobRole}! Consider adding more advanced skills if applicable`
      );
    }

    const hasExperienceKeywords = state.experiences.some((exp) =>
      template.experienceKeywords.some((keyword) =>
        exp.description?.toLowerCase().includes(keyword.toLowerCase())
      )
    );
    if (!hasExperienceKeywords) {
      suggestions.push(
        `Incorporate these keywords in your experience descriptions to appeal to ${selectedJobRole} roles: ${template.experienceKeywords.join(
          ", "
        )}` +
          `For example, instead of "worked on a project", say "developed a project using modern tools"`
      );
    }

    setCustomizationsSuggestions(suggestions);
    setCustomizationModalVisible(true);
  };

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      setProgress(0);

      const simulateProgress = () => {
        let currentProgress = 0;
        const interval = setInterval(() => {
          currentProgress += 20;
          setProgress(currentProgress);
          if (currentProgress >= 100) {
            clearInterval(interval);
          }
        }, 600);
        return interval;
      };

      const htmlContent = generateHtmlContent();
      setProgress(40);

      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false,
      });
      setProgress(60);

      const pdfFilePath = `${FileSystem.documentDirectory}resume.pdf`;
      await FileSystem.moveAsync({
        from: uri,
        to: pdfFilePath,
      });
      setProgress(80);

      const isSharingAvailable = await Sharing.isAvailableAsync();
      if (!isSharingAvailable) {
        throw new Error("Sharing is not available on this device");
      }
      await Sharing.shareAsync(pdfFilePath, {
        mimeType: "application/json",
        dialogTitle: "Save or share resume PDF",
      });

      setProgress(100);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsDownloading(false);
      setProgress(0);
    }
  };

  const getResumeFeedback = () => {
    let score = 0;
    const feedbackList: string[] = [];
    const maxScore = 100;
    const sectionWeights: Record<SectionKey, number> = {
      profile: 15,
      experience: 20,
      education: 15,
      projects: 10,
      skills: 15,
      languages: 5,
      hobbies: 5,
      contact: 15,
    };

    if (visibleSections.profile) {
      const objectiveText = state.objective?.text || "";
      if (objectiveText && objectiveText.split("").length >= 10) {
        score += sectionWeights.profile;
      } else {
        feedbackList.push(
          "Your objective is too short or missing. Aim for at least 10 words to make a strong introduction"
        );
      }
    } else {
      feedbackList.push(
        "Profile Section is hidden. consider adding a brief objective to introduce yourself"
      );
    }

    if (visibleSections.experience) {
      if (state.experiences.length >= 2) {
        score += 15;
      } else if (state.experiences.length == 1) {
        score += 7;
        feedbackList.push(
          "you have only 1 experience. Add at least one more to showcase your work history"
        );
      } else {
        feedbackList.push(
          "Experience section is empty. add at least 2 experiences"
        );
      }

      const hasActiveVerbs = state.experiences.some((exp) =>
        containsActionVerbs(exp.description || "")
      );
      if (hasActiveVerbs) {
        score += 5;
      } else if (state.experiences.length > 0) {
        feedbackList.push(
          "Use strong action verbs like 'developed', 'led', 'managed, in your experience description "
        );
      }
    } else {
      feedbackList.push(
        "Experience section is hidden. This is a critical section—consider adding your work history."
      );
    }

    console.log("Running getResumeFeedback");
    console.log("visibleSections:", visibleSections);
    console.log("state:", state);
    console.log("state.personalDetails:", state.personalDetails);
    console.log("state.experiences:", state.experiences);

    if (visibleSections.education) {
      if (state.qualifications.length >= 1) {
        score += sectionWeights.education;
      } else {
        feedbackList.push(
          "Education section is empty. Add at least 1 educational qualification"
        );
      }
    } else {
      feedbackList.push(
        "education section is hidden. Consider adding your educational background"
      );
    }

    if (visibleSections.projects) {
      if (state.projects.length >= 1) {
        score += sectionWeights.projects;
      } else {
        feedbackList.push(
          "Projects section is empty. Add at least 1 project to highlight your work"
        );
      }
    }

    if (visibleSections.skills) {
      if (state.skills.length >= 3) {
        score += sectionWeights.skills;
      } else if (state.skills.length > 0) {
        score += 5;
        feedbackList.push(
          `You only have ${state.skills.length} skills. include at least 3 skills to highlight your abilities`
        );
      } else {
        feedbackList.push(
          "Skills section is empty. include at least 3 skills to highlight your abilities"
        );
      }
    } else {
      feedbackList.push(
        "Skills section is hidden. consider adding skills to showcase your strength"
      );
    }

    if (visibleSections.languages) {
      if (state.languages.length >= 1) {
        score += sectionWeights.languages;
      } else {
        feedbackList.push(
          "Languages section is empty. Add at least 1 language to enhance your profile."
        );
      }
    }

    if (visibleSections.hobbies) {
      if (state.hobbies.length >= 1) {
        score += sectionWeights.hobbies;
      } else {
        feedbackList.push(
          "Hobbies section is empty. Add at least 1 hobby to show your personality."
        );
      }
    }

    if (visibleSections.contact) {
      const hasEmail = !!state.personalDetails?.email;
      const hasPhone = !!state.personalDetails?.phone;
      const hasAddress = !!state.personalDetails?.address;

      if (hasEmail && hasPhone) {
        score += 10;
      } else {
        feedbackList.push(
          "Add both your email and phone number to the Contact section for better reachability."
        );
      }

      if (hasAddress) {
        score += 5;
      } else {
        feedbackList.push(
          "Consider adding your address to the Contact section for completeness."
        );
      }
    } else {
      feedbackList.push(
        "Contact section is hidden. This is critical—ensure your email and phone are visible."
      );
    }

    if (score == 0) {
      feedbackList.push(
        "Your resume is empty or all sections are hidden. Add content to key sections like Experience, Projects, and skills"
      );
    } else if (score === maxScore) {
      feedbackList.push(
        "Great job! your resume is well rounded and complete. Consider tailoring it further for specific job roles"
      );
    }

    setResumeScore(score);
    setFeedback(feedbackList);
    setFeedbackModalVisible(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <StatusBar barStyle={"dark-content"} backgroundColor={color} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{template} template</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={() => setCustomizationModalVisible(true)}>
            <Ionicons name="sparkles-outline" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity onPress={getResumeFeedback}>
            <Ionicons name="analytics-outline" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDownload}>
            <Ionicons name="download-outline" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.templateHeader}>
          <Image
            style={styles.avatar}
            source={{
              uri:
                state?.personalDetails?.avatar &&
                state.personalDetails.avatar !== ""
                  ? state.personalDetails.avatar
                  : "https://lh3.googleusercontent.com/ogw/AF2bZyi09EC0vkA0pKVqrtBq0Y-SLxZc0ynGmNrVKjvV66i3Yg=s64-c-mo",
            }}
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.name}>
              {state.personalDetails?.name || "Sujan Anand"}
            </Text>
            <Text style={styles.title}>
              {state.personalDetails?.title || "Professional title"}
            </Text>
            <Text style={styles.about}>
              {state.objective?.text ||
                "A dedicated professional with extensive experience in their field."}
            </Text>
          </View>
        </View>

        <View style={styles.columnsContainer}>
          <View style={styles.leftColumn}>
            <DraggableFlatList
              data={filteredLeftSections}
              keyExtractor={(item) => item.key}
              renderItem={renderItem}
              scrollEnabled={false}
              onDragEnd={({ data }) => setLeftSections(data)}
            />
          </View>

          <View style={styles.rightColumn}>
            <DraggableFlatList
              data={filteredRightSections}
              keyExtractor={(item) => item.key}
              renderItem={renderItem}
              scrollEnabled={false}
              onDragEnd={({ data }) => setRightSections(data)}
            />
          </View>
        </View>
      </ScrollView>

      <Modal isVisible={isDownloading} backdropOpacity={0.5}>
        <View style={styles.modalContent}>
          <ActivityIndicator size={"large"} color="#007AFF" />
          <Text style={styles.modalText}>Generating PDF...</Text>
          <Text style={styles.progressText}>{progress}%</Text>
        </View>
      </Modal>

      <Modal
        backdropOpacity={0.5}
        isVisible={feedbackModalVisible}
        onBackdropPress={() => setFeedbackModalVisible(false)}
      >
        <View style={styles.feedbackModalContent}>
          <Text style={styles.feedbackModalTitle}>Resume Feedback</Text>
          {resumeScore > 0 && (
            <Text style={styles.feedbackScore}>Score: {resumeScore}</Text>
          )}
          <Text style={styles.feedbackSubtitle}>
            Suggestions for improvement:{" "}
          </Text>
          <FlatList
            style={styles.feedbackList}
            data={feedback}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={styles.feedbackItem}>• {item}</Text>
            )}
          />

          <TouchableOpacity
            onPress={() => setFeedbackModalVisible(false)}
            style={styles.closeButton}
          >
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        isVisible={customizationModalVisible}
        onBackdropPress={() => setCustomizationModalVisible(false)}
        backdropOpacity={0.5}
      >
        <View style={styles.customizationModalContent}>
          <Text style={styles.customizationModalTitle}>
            Customize Resume for JobRole
          </Text>
          <Text style={styles.customizationModalSubtitle}>
            Select a job role to tailor your resume
          </Text>
          <TouchableOpacity
            onPress={() => {
              getCustomizationSuggestions();
            }}
            style={styles.analyzeButton}
          >
            <Text style={{ color: "white" }}>Get Suggestions</Text>
          </TouchableOpacity>
          {customizationSuggestions.length > 0 && (
            <>
              <Text style={styles.suggestionItem}>Suggestions</Text>
              <FlatList
                data={customizationSuggestions}
                keyExtractor={(item, index) => `suggestion-${index}`}
                renderItem={({ item }) => (
                  <Text style={styles.suggestionItem}>• {item}</Text>
                )}
                style={styles.suggestionList}
              />
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default TemplatePreviewScreen;

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    borderBottomWidth: 1,
    borderBottomColor: "#007AFF",
    paddingBottom: 2,
  },
  description: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  experienceItem: {
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  subtext: {
    fontSize: 14,
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
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: (StatusBar.currentHeight || 40) + 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    paddingTop: 20,
  },
  headerButtons: {
    flexDirection: "row",
    paddingTop: 20,
    gap: 8,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  templateHeader: {
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
    borderColor: "#007AFF",
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
  columnsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  leftColumn: {
    flex: 1,
    paddingRight: 10,
    minWidth: 150,
  },
  rightColumn: {
    flex: 1,
    paddingLeft: 10,
    minWidth: 150,
  },
  feedbackModalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    maxHeight: "80%",
  },
  feedbackModalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  feedbackScore: {
    fontSize: 18,
    fontWeight: "600",
    color: "#007AFF",
    marginBottom: 15,
    textAlign: "center",
  },
  feedbackSubtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  feedbackList: {
    marginBottom: 20,
  },
  feedbackItem: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
    marginBottom: 5,
  },
  closeButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  progressText: {
    marginTop: 5,
    fontSize: 14,
    color: "#666",
  },
  customizationModalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    maxHeight: "80%",
  },
  customizationModalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  customizationModalSubtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 20,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
    color: "#333",
  },
  analyzeButton: {
    backgroundColor: "#FF5722",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  analyzeButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  suggestionList: {
    marginBottom: 20,
  },
  suggestionItem: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
    marginBottom: 5,
  },
  editButton: {
    backgroundColor: "#FF5722",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  editButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },

  closeButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
});
