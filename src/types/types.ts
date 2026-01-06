export interface ResumeData {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    experience: Experience[];
    education: Education[];
    skills: string[];
    template: string;
    color: string;
  }
  
  export interface Experience {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }
  
  export interface Education {
    institution: string;
    degree: string;
    year: string;
  }

//   export type RootStackParamList = {
//     TemplatePreview: {
//       template: string;
//       color: string;
//     }};