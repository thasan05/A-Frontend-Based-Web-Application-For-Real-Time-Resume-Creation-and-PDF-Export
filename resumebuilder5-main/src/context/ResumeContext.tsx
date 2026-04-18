import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ResumeData, TemplateType } from "@/types/resume";

const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    website: "",
    summary: "",
  },
  education: [],
  experience: [],
  skills: [],
};

interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  template: TemplateType;
  setTemplate: (t: TemplateType) => void;
  resetResume: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

const STORAGE_KEY = "resume_builder_data";
const TEMPLATE_KEY = "resume_builder_template";

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultResumeData;
  });

  const [template, setTemplate] = useState<TemplateType>(() => {
    return (localStorage.getItem(TEMPLATE_KEY) as TemplateType) || "classic";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    localStorage.setItem(TEMPLATE_KEY, template);
  }, [template]);

  const resetResume = () => {
    setResumeData(defaultResumeData);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData, template, setTemplate, resetResume }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used within ResumeProvider");
  return ctx;
};
