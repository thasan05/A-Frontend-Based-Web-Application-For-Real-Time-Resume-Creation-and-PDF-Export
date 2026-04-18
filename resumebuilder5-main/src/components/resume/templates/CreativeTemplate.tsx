import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";

const CreativeTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo, education, experience, skills } = data;
  const hasContent = personalInfo.fullName || education.length || experience.length || skills.length;

  if (!hasContent) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <p>Start filling in your details to see the preview</p>
      </div>
    );
  }

  return (
    <div className="relative font-sans text-[11px] leading-relaxed text-gray-800 bg-white min-h-[842px] overflow-hidden">
      {/* Decorative accent shapes */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-br from-fuchsia-400 to-purple-600 opacity-90" />
      <div className="absolute top-32 -right-10 w-32 h-32 rounded-full bg-amber-300 opacity-80" />
      <div className="absolute -bottom-20 -left-16 w-64 h-64 rounded-full bg-gradient-to-tr from-cyan-400 to-sky-500 opacity-80" />
      <div className="absolute bottom-40 left-32 w-12 h-12 rotate-45 bg-emerald-400 opacity-80" />
      <div className="absolute top-1/2 left-1/3 w-3 h-3 rounded-full bg-rose-500" />

      <div className="relative px-8 py-8">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
            {personalInfo.fullName || "Your Name"}
          </h1>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-gray-600">
            {personalInfo.email && <span className="flex items-center gap-1"><Mail className="h-3 w-3 text-fuchsia-600" />{personalInfo.email}</span>}
            {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3 text-purple-600" />{personalInfo.phone}</span>}
            {personalInfo.address && <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-cyan-600" />{personalInfo.address}</span>}
            {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin className="h-3 w-3 text-sky-600" />{personalInfo.linkedin}</span>}
            {personalInfo.website && <span className="flex items-center gap-1"><Globe className="h-3 w-3 text-emerald-600" />{personalInfo.website}</span>}
          </div>
        </header>

        {personalInfo.summary && (
          <section className="mb-5 relative">
            <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white text-[10px] font-bold uppercase tracking-wider mb-2">
              About Me
            </div>
            <p className="text-gray-700 max-w-[85%]">{personalInfo.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section className="mb-5">
            <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-[10px] font-bold uppercase tracking-wider mb-3">
              Experience
            </div>
            <div className="space-y-3 relative pl-4 border-l-2 border-dashed border-purple-300 max-w-[85%]">
              {experience.map((exp) => (
                <div key={exp.id} className="relative">
                  <span className="absolute -left-[22px] top-1 w-3 h-3 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 ring-4 ring-white" />
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-gray-900">{exp.position}</span>
                    <span className="text-gray-500 text-[10px]">{exp.startDate} — {exp.current ? "Present" : exp.endDate}</span>
                  </div>
                  <p className="text-purple-600 font-semibold text-[10px]">{exp.company}</p>
                  {exp.description && <p className="mt-1 text-gray-700 whitespace-pre-line">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section className="mb-5">
            <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-sky-600 text-white text-[10px] font-bold uppercase tracking-wider mb-3">
              Education
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[85%]">
              {education.map((edu) => (
                <div key={edu.id} className="p-3 rounded-xl bg-white/80 backdrop-blur border border-purple-100 shadow-sm">
                  <p className="font-bold text-gray-900">{edu.degree}</p>
                  <p className="text-purple-600 text-[10px]">{edu.field}</p>
                  <p className="text-gray-600 text-[10px]">{edu.institution}</p>
                  <p className="text-gray-400 text-[10px]">{edu.startDate} — {edu.endDate}{edu.gpa && ` • GPA: ${edu.gpa}`}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white text-[10px] font-bold uppercase tracking-wider mb-3">
              Skills
            </div>
            <div className="flex flex-wrap gap-2 max-w-[85%]">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-3 py-1 rounded-full text-[10px] font-medium bg-gradient-to-r from-fuchsia-100 to-cyan-100 border border-purple-200 text-purple-800"
                >
                  {skill.name} <span className="text-purple-400">• {skill.level}</span>
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CreativeTemplate;
