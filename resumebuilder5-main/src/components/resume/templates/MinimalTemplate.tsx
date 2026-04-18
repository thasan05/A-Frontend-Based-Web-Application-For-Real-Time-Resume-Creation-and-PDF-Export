import { ResumeData } from "@/types/resume";

const MinimalTemplate = ({ data }: { data: ResumeData }) => {
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
    <div className="font-sans text-[11px] leading-relaxed text-gray-800 p-10 bg-white min-h-[842px]">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-light tracking-tight text-gray-900">{personalInfo.fullName || "Your Name"}</h1>
        <div className="flex flex-wrap gap-x-3 mt-1 text-[10px] text-gray-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.address && <span>• {personalInfo.address}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
        </div>
      </div>

      {personalInfo.summary && (
        <div className="mb-5">
          <p className="text-gray-600 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3">Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <span className="font-medium text-gray-900">{exp.position} <span className="text-gray-400 font-normal">at {exp.company}</span></span>
                <span className="text-gray-400 text-[10px]">{exp.startDate} — {exp.current ? "Present" : exp.endDate}</span>
              </div>
              {exp.description && <p className="mt-1 text-gray-600 whitespace-pre-line">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between items-baseline">
                <span className="font-medium text-gray-900">{edu.degree} in {edu.field}</span>
                <span className="text-gray-400 text-[10px]">{edu.startDate} — {edu.endDate}</span>
              </div>
              <p className="text-gray-500">{edu.institution}{edu.gpa && ` — GPA: ${edu.gpa}`}</p>
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div>
          <h2 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3">Skills</h2>
          <p className="text-gray-700">{skills.map((s) => s.name).join(" · ")}</p>
        </div>
      )}
    </div>
  );
};

export default MinimalTemplate;
