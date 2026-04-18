import { useResume } from "@/context/ResumeContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User } from "lucide-react";

const PersonalInfoForm = () => {
  const { resumeData, setResumeData } = useResume();
  const { personalInfo } = resumeData;

  const update = (field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const fields = [
    { key: "fullName", label: "Full Name", placeholder: "John Doe" },
    { key: "email", label: "Email", placeholder: "john@example.com", type: "email" },
    { key: "phone", label: "Phone", placeholder: "+1 234 567 890" },
    { key: "address", label: "Location", placeholder: "City, Country" },
    { key: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/in/johndoe" },
    { key: "website", label: "Website", placeholder: "johndoe.com" },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-lg bg-primary/10">
          <User className="h-4 w-4 text-primary" />
        </div>
        <h3 className="text-lg font-display font-semibold">Personal Information</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((f) => (
          <div key={f.key} className="space-y-1.5">
            <Label htmlFor={f.key} className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{f.label}</Label>
            <Input
              id={f.key}
              type={f.type || "text"}
              value={(personalInfo as any)[f.key]}
              onChange={(e) => update(f.key, e.target.value)}
              placeholder={f.placeholder}
              className="rounded-xl border-border/60 bg-card focus:border-primary transition-colors"
            />
          </div>
        ))}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="summary" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Professional Summary</Label>
        <Textarea
          id="summary"
          value={personalInfo.summary}
          onChange={(e) => update("summary", e.target.value)}
          placeholder="A brief, compelling summary about yourself..."
          rows={4}
          className="rounded-xl border-border/60 bg-card focus:border-primary transition-colors resize-none"
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;
