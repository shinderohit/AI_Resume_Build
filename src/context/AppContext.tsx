import React, { createContext, useContext, useEffect, useState } from "react";
import { getData, saveData } from "../utils/storage";

type PersonalDetails = {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar?: string;
  title?: string;
};

type Objective = {
  text: string;
};

type Skill = {
  skillName: string;
  proficiency: string;
};

type Project = {
  projectName: string;
  description: string;
  role: string;
  duration: string;
};

type Experience = {
  jobTitle: string;
  companyName: string;
  location: string;
  duration: string;
  description: string;
  isCurrentlyWorking: string;
};

type Hobby = {
  hobby: string;
};

type Qualification = {
  degree: string;
  institution: string;
  duration: string;
  description?: string;
};

type Language = {
  language: string;
  proficiency: string;
};

type AppState = {
  personalDetails: PersonalDetails | null;
  objective: Objective | null;
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  hobbies: Hobby[];
  qualifications: Qualification[];
  languages: Language[];
};

type AppContextType = {
  state: AppState;
  updatePersonalDetails: (details: PersonalDetails) => void;
  updateObjective: (objective: Objective) => void;
  addSkill: (skill: Skill) => void;
  addProject: (project: Project) => void;
  addExperience: (experience: Experience) => void;
  addHobby: (hobby: Hobby) => void;
  addQualification: (qualification: Qualification) => void;
  addLanguage: (language: Language) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AppState>({
    personalDetails: null,
    objective: null,
    skills: [],
    projects: [],
    experiences: [],
    hobbies: [],
    qualifications: [],
    languages: [],
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const personalDetails = await getData("personalDetails");
        const objective = await getData("objective");
        const skills = (await getData("skills")) || [];
        const projects = (await getData("projects")) || [];
        const experiences = (await getData("experiences")) || [];
        const hobbies = (await getData("hobbies")) || [];
        const qualifications = (await getData("qualifications")) || [];
        const languages = (await getData("languages")) || [];

        setState({
          personalDetails,
          objective,
          skills,
          projects,
          experiences,
          hobbies,
          qualifications,
          languages,
        });
      } catch (error) {
        console.log("Error", error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const saveState = async () => {
      try {
        await saveData("personalDetails", state.personalDetails);
        await saveData("objectives", state.objective);
        await saveData("skills", state.skills);
        await saveData("projects", state.projects);
        await saveData("experiences", state.experiences);
        await saveData("hobbies", state.hobbies);
        await saveData("qualifications", state.qualifications);
        await saveData("languages", state.languages);
      } catch (error) {
        console.log("Error", error);
      }
    };

    saveState();
  }, [state]);

  //save details:
  const updatePersonalDetails = (details: PersonalDetails) => {
    setState((prev) => ({ ...prev, personalDetails: details }));
  };

  const updateObjective = (objective: Objective) => {
    setState((prev) => ({ ...prev, objective }));
  };

  const addSkill = (skill: Skill) => {
    setState((prev) => ({
      ...prev,
      skills: [...prev.skills, skill],
    }));
  };

  const addProject = (project: Project) => {
    setState((prev) => ({
      ...prev,
      projects: [...prev.projects, project],
    }));
  };

  const addExperience = (experience: Experience) => {
    setState((prev) => ({
      ...prev,
      experiences: [...prev.experiences, experience],
    }));
  };

  const addHobby = (hobby: Hobby) => {
    setState((prev) => ({
      ...prev,
      hobbies: [...prev.hobbies, hobby],
    }));
  };

  const addQualification = (qualification: Qualification) => {
    setState((prev) => ({
      ...prev,
      qualifications: [...prev.qualifications, qualification],
    }));
  };

  const addLanguage = (language: Language) => {
    setState((prev) => ({
      ...prev,
      languages: [...prev.languages, language],
    }));
  };

  const contextValue: AppContextType = {
    state,
    updatePersonalDetails,
    updateObjective,
    addSkill,
    addProject,
    addExperience,
    addHobby,
    addQualification,
    addLanguage,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Use app context must be used within a app provider");
  }

  return context;
};
