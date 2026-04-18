export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  website: string;
  summary: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
}

export type TemplateType = "classic" | "modern" | "minimal" | "professional" | "creative";
