import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";

const levelWidth = { beginner: "25%", intermediate: "50%", advanced: "75%", expert: "100%" };

const ModernTemplate = ({ data }: { data: ResumeData }) => {
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
    <div className="text-[11px] leading-relaxed text-gray-900 bg-white min-h-[842px] flex">
      {/* Sidebar */}
      <div className="w-1/3 bg-slate-800 text-white p-6 space-y-5">
        <div>
          <h1 className="text-xl font-bold">{personalInfo.fullName || "Your Name"}</h1>
        </div>

        {/* Contact */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-300 border-b border-slate-600 pb-1">Contact</h3>
          {personalInfo.email && <p className="flex items-center gap-2 text-[10px]"><Mail className="h-3 w-3 text-sky-400" />{personalInfo.email}</p>}
          {personalInfo.phone && <p className="flex items-center gap-2 text-[10px]"><Phone className="h-3 w-3 text-sky-400" />{personalInfo.phone}</p>}
          {personalInfo.address && <p className="flex items-center gap-2 text-[10px]"><MapPin className="h-3 w-3 text-sky-400" />{personalInfo.address}</p>}
          {personalInfo.linkedin && <p className="flex items-center gap-2 text-[10px]"><Linkedin className="h-3 w-3 text-sky-400" />{personalInfo.linkedin}</p>}
          {personalInfo.website && <p className="flex items-center gap-2 text-[10px]"><Globe className="h-3 w-3 text-sky-400" />{personalInfo.website}</p>}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-300 border-b border-slate-600 pb-1">Skills</h3>
            {skills.map((skill) => (
              <div key={skill.id}>
                <div className="flex justify-between text-[10px] mb-0.5">
                  <span>{skill.name}</span>
                  <span className="text-slate-400 capitalize">{skill.level}</span>
                </div>
                <div className="h-1.5 bg-slate-600 rounded-full">
                  <div className="h-full bg-sky-400 rounded-full" style={{ width: levelWidth[skill.level] }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-300 border-b border-slate-600 pb-1">Education</h3>
            {education.map((edu) => (
              <div key={edu.id} className="text-[10px]">
                <p className="font-semibold">{edu.degree}</p>
                <p className="text-slate-300">{edu.field}</p>
                <p className="text-slate-400">{edu.institution}</p>
                <p className="text-slate-500">{edu.startDate} — {edu.endDate}{edu.gpa && ` • GPA: ${edu.gpa}`}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-4">
        {personalInfo.summary && (
          <div>
            <h2 className="text-sm font-bold text-slate-800 border-b-2 border-sky-500 pb-1 mb-2">PROFILE</h2>
            <p className="text-gray-700">{personalInfo.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-slate-800 border-b-2 border-sky-500 pb-1 mb-2">EXPERIENCE</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-800">{exp.position}</span>
                  <span className="text-gray-400 text-[10px]">{exp.startDate} — {exp.current ? "Present" : exp.endDate}</span>
                </div>
                <p className="text-sky-600 font-medium">{exp.company}</p>
                {exp.description && <p className="mt-1 text-gray-600 whitespace-pre-line">{exp.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernTemplate;
