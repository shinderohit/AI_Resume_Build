import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screeens/ProfileScreen";
import PersonalDetailsScreen from "../screeens/PersonalDetailsScreen";
import ObjectiveScreen from "../screeens/ObjectiveScreen";
import ExperienceScreen from "../screeens/ExperienceScreen";
import QualificationScreen from "../screeens/QualificationsScreen";
import QualificationsScreen from "../screeens/QualificationsScreen";
import OrganizationsScreen from "../screeens/OrganizationsScreen";
import ProjectsScreen from "../screeens/ProjectsScreen";
import CertificatesScreen from "../screeens/CertificatesScreen";
import AwardsScholarshipsScreen from "../screeens/AwardsScholarshipsScreen";
import SkillsScreen from "../screeens/SkillsScreen";
import LanguagesScreen from "../screeens/LanguagesScreen";
import HobbiesInterestsScreen from "../screeens/HobbiesInterestsScreen";
import ReferencesScreen from "../screeens/ReferencesScreen";
import AddExeperienceScreen from "../screeens/AddExeperienceScreen";
import AddOrganizationScreen from "../screeens/AddOrganizationScreen";
import AddQualificationScreen from "../screeens/AddQualificationScreen";
import AddProjectScreen from "../screeens/AddProjectScreen";
import AddAwardScholarshipScreen from "../screeens/AddAwardScholarshipScreen";
import AddSkillScreen from "../screeens/AddSkillScreen";
import AddLanguageScreen from "../screeens/AddLanguageScreen";
import AddHobbyScreen from "../screeens/AddHobbyScreen";
import AddCertificateScreen from "../screeens/AddCertificateScreen";
import React from "react";

const Stack = createNativeStackNavigator();
const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PersonalDetails"
        component={PersonalDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Objective"
        component={ObjectiveScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Experience"
        component={ExperienceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Qualifications"
        component={QualificationsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Organizations"
        component={OrganizationsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Projects"
        component={ProjectsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Certificates"
        component={CertificatesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AwardsScholarships"
        component={AwardsScholarshipsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Skills"
        component={SkillsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Languages"
        component={LanguagesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HobbiesInterests"
        component={HobbiesInterestsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="References"
        component={ReferencesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddExeperience"
        component={AddExeperienceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddOrganization"
        component={AddOrganizationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddQualification"
        component={AddQualificationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddProject"
        component={AddProjectScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddCertificate"
        component={AddCertificateScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddAwardScholarship"
        component={AddAwardScholarshipScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddSkill"
        component={AddSkillScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddLanguage"
        component={AddLanguageScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddHobby"
        component={AddHobbyScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
