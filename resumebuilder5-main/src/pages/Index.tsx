import { useState } from "react";
import { ResumeProvider, useResume } from "@/context/ResumeContext";
import PersonalInfoForm from "@/components/resume/PersonalInfoForm";
import EducationForm from "@/components/resume/EducationForm";
import ExperienceForm from "@/components/resume/ExperienceForm";
import SkillsForm from "@/components/resume/SkillsForm";
import ResumePreview from "@/components/resume/ResumePreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sparkles,
  RotateCcw,
  User,
  GraduationCap,
  Briefcase,
  Wrench,
  Eye,
  Pencil,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import html2pdf from "html2pdf.js";

const ResumeBuilderContent = () => {
  const { resetResume } = useResume();
  const { theme, toggleTheme } = useTheme();
  const [mobileView, setMobileView] = useState<"edit" | "preview">("edit");

  // ✅ PDF Export Function
  const handleExport = () => {
    const element = document.getElementById("resume-preview");

    if (!element) {
      alert("Resume preview not found!");
      return;
    }

    html2pdf()
      .from(element)
      .set({
        margin: 10,
        filename: "resume.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .save();
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 glass border-b border-border/50">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          {/* Left */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <div className="absolute inset-0 gradient-bg blur-md opacity-60 rounded-xl" />
              <div className="relative gradient-bg p-2 sm:p-2.5 rounded-xl shadow-elegant">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
              </div>
            </div>
            <div>
              <h1 className="text-base sm:text-xl font-display font-bold tracking-tight">
                <span className="gradient-text">Resume</span>
                <span className="text-foreground">Forge</span>
              </h1>
              <p className="hidden sm:block text-[11px] text-muted-foreground">
                Craft a stunning resume in minutes
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            {/* Theme */}
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full h-9 w-9"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* Reset */}
            <Button
              variant="outline"
              size="sm"
              onClick={resetResume}
              className="gap-1.5 rounded-full"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </Button>

            {/* ✅ Export PDF */}
            <Button
              onClick={handleExport}
              className="rounded-full bg-purple-500 text-white"
            >
              Export PDF
            </Button>
          </div>
        </div>

        {/* Mobile toggle */}
        <div className="lg:hidden flex border-t border-border/50">
          <button
            onClick={() => setMobileView("edit")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm ${
              mobileView === "edit"
                ? "text-primary border-b-2 border-primary bg-primary/5"
                : "text-muted-foreground"
            }`}
          >
            <Pencil className="h-4 w-4" /> Edit
          </button>

          <button
            onClick={() => setMobileView("preview")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm ${
              mobileView === "preview"
                ? "text-primary border-b-2 border-primary bg-primary/5"
                : "text-muted-foreground"
            }`}
          >
            <Eye className="h-4 w-4" /> Preview
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex flex-1 lg:overflow-hidden">
        {/* Left */}
        <aside
          className={`${
            mobileView === "edit" ? "flex" : "hidden"
          } lg:flex w-full lg:w-[45%] xl:w-[42%] flex-col`}
        >
          <ScrollArea className="flex-1">
            <div className="p-4 sm:p-6 lg:p-8">
              <Tabs defaultValue="personal">
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="personal">
                    <User /> Personal
                  </TabsTrigger>
                  <TabsTrigger value="education">
                    <GraduationCap /> Education
                  </TabsTrigger>
                  <TabsTrigger value="experience">
                    <Briefcase /> Work
                  </TabsTrigger>
                  <TabsTrigger value="skills">
                    <Wrench /> Skills
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="personal">
                  <PersonalInfoForm />
                </TabsContent>
                <TabsContent value="education">
                  <EducationForm />
                </TabsContent>
                <TabsContent value="experience">
                  <ExperienceForm />
                </TabsContent>
                <TabsContent value="skills">
                  <SkillsForm />
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </aside>

        {/* Right Preview */}
        <section
          className={`${
            mobileView === "preview" ? "flex" : "hidden"
          } lg:flex flex-1`}
        >
          {/* ✅ IMPORTANT ID */}
          <div id="resume-preview" className="w-full">
            <ResumePreview />
          </div>
        </section>
      </div>
    </div>
  );
};

const Index = () => (
  <ResumeProvider>
    <ResumeBuilderContent />
  </ResumeProvider>
);

export default Index;