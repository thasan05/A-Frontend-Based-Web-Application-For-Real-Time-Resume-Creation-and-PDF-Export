import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";

const ProfessionalTemplate = ({ data }: { data: ResumeData }) => {
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
    <div className="font-sans text-[11px] leading-relaxed text-gray-800 bg-white min-h-[842px]">
      {/* Header band */}
      <div className="bg-[#1f3a5f] text-white px-8 py-6">
        <h1 className="text-2xl font-bold tracking-tight">{personalInfo.fullName || "Your Name"}</h1>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-200">
          {personalInfo.email && <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{personalInfo.phone}</span>}
          {personalInfo.address && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{personalInfo.address}</span>}
          {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin className="h-3 w-3" />{personalInfo.linkedin}</span>}
          {personalInfo.website && <span className="flex items-center gap-1"><Globe className="h-3 w-3" />{personalInfo.website}</span>}
        </div>
      </div>

      {/* Two columns */}
      <div className="flex">
        {/* Left main column */}
        <div className="flex-1 px-8 py-6 space-y-5">
          {personalInfo.summary && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#1f3a5f] mb-2">Profile</h2>
              <div className="h-[2px] w-10 bg-[#c9a227] mb-2" />
              <p className="text-gray-700">{personalInfo.summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#1f3a5f] mb-2">Experience</h2>
              <div className="h-[2px] w-10 bg-[#c9a227] mb-3" />
              <div className="space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-gray-900">{exp.position}</span>
                      <span className="text-gray-500 text-[10px]">{exp.startDate} — {exp.current ? "Present" : exp.endDate}</span>
                    </div>
                    <p className="text-[#1f3a5f] font-medium text-[10px]">{exp.company}</p>
                    {exp.description && <p className="mt-1 text-gray-700 whitespace-pre-line">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#1f3a5f] mb-2">Education</h2>
              <div className="h-[2px] w-10 bg-[#c9a227] mb-3" />
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-gray-900">{edu.degree} in {edu.field}</span>
                      <span className="text-gray-500 text-[10px]">{edu.startDate} — {edu.endDate}</span>
                    </div>
                    <p className="text-gray-600">{edu.institution}{edu.gpa && ` • GPA: ${edu.gpa}`}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right sidebar */}
        <aside className="w-[34%] bg-slate-50 border-l border-slate-200 px-6 py-6 space-y-5">
          {skills.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#1f3a5f] mb-2">Skills</h2>
              <div className="h-[2px] w-10 bg-[#c9a227] mb-3" />
              <ul className="space-y-1.5">
                {skills.map((skill) => (
                  <li key={skill.id} className="text-[10px]">
                    <div className="flex justify-between mb-0.5">
                      <span className="font-medium text-gray-800">{skill.name}</span>
                      <span className="text-gray-500 capitalize">{skill.level}</span>
                    </div>
                    <div className="h-1 bg-slate-200 rounded">
                      <div
                        className="h-full bg-[#1f3a5f] rounded"
                        style={{ width: { beginner: "25%", intermediate: "50%", advanced: "75%", expert: "100%" }[skill.level] }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#1f3a5f] mb-2">Details</h2>
            <div className="h-[2px] w-10 bg-[#c9a227] mb-3" />
            <ul className="space-y-1 text-[10px] text-gray-700">
              {personalInfo.email && <li className="flex items-start gap-1.5"><Mail className="h-3 w-3 mt-0.5 text-[#1f3a5f]" />{personalInfo.email}</li>}
              {personalInfo.phone && <li className="flex items-start gap-1.5"><Phone className="h-3 w-3 mt-0.5 text-[#1f3a5f]" />{personalInfo.phone}</li>}
              {personalInfo.address && <li className="flex items-start gap-1.5"><MapPin className="h-3 w-3 mt-0.5 text-[#1f3a5f]" />{personalInfo.address}</li>}
              {personalInfo.linkedin && <li className="flex items-start gap-1.5"><Linkedin className="h-3 w-3 mt-0.5 text-[#1f3a5f]" />{personalInfo.linkedin}</li>}
              {personalInfo.website && <li className="flex items-start gap-1.5"><Globe className="h-3 w-3 mt-0.5 text-[#1f3a5f]" />{personalInfo.website}</li>}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
