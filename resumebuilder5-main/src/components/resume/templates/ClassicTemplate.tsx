import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";

const ClassicTemplate = ({ data }: { data: ResumeData }) => {
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
    <div className="font-serif text-[11px] leading-relaxed text-gray-900 p-8 bg-white min-h-[842px]">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-4 mb-4">
        <h1 className="text-2xl font-bold tracking-wide uppercase">{personalInfo.fullName || "Your Name"}</h1>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2 text-[10px] text-gray-600">
          {personalInfo.email && <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{personalInfo.phone}</span>}
          {personalInfo.address && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{personalInfo.address}</span>}
          {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin className="h-3 w-3" />{personalInfo.linkedin}</span>}
          {personalInfo.website && <span className="flex items-center gap-1"><Globe className="h-3 w-3" />{personalInfo.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase border-b border-gray-400 pb-1 mb-2">Professional Summary</h2>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase border-b border-gray-400 pb-1 mb-2">Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between">
                <span className="font-bold">{exp.position}</span>
                <span className="text-gray-500 text-[10px]">{exp.startDate} — {exp.current ? "Present" : exp.endDate}</span>
              </div>
              <div className="text-gray-600 italic">{exp.company}</div>
              {exp.description && <p className="mt-1 text-gray-700 whitespace-pre-line">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase border-b border-gray-400 pb-1 mb-2">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between">
                <span className="font-bold">{edu.degree} in {edu.field}</span>
                <span className="text-gray-500 text-[10px]">{edu.startDate} — {edu.endDate}</span>
              </div>
              <div className="text-gray-600">{edu.institution}{edu.gpa && ` • GPA: ${edu.gpa}`}</div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h2 className="text-sm font-bold uppercase border-b border-gray-400 pb-1 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill.id} className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-[10px]">
                {skill.name} <span className="text-gray-400">• {skill.level}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassicTemplate;
