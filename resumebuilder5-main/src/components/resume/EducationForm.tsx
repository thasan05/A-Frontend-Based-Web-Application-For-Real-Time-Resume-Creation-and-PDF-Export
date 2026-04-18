import { useResume } from "@/context/ResumeContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Education } from "@/types/resume";
import { Plus, Trash2, GraduationCap } from "lucide-react";
import { DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";

const EducationForm = () => {
  const { resumeData, setResumeData } = useResume();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const addEducation = () => {
    const newEdu: Education = {
      id: crypto.randomUUID(),
      institution: "", degree: "", field: "", startDate: "", endDate: "", gpa: "",
    };
    setResumeData((prev) => ({ ...prev, education: [...prev.education, newEdu] }));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({ ...prev, education: prev.education.filter((e) => e.id !== id) }));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setResumeData((prev) => {
        const oldIndex = prev.education.findIndex((e) => e.id === active.id);
        const newIndex = prev.education.findIndex((e) => e.id === over.id);
        return { ...prev, education: arrayMove(prev.education, oldIndex, newIndex) };
      });
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <GraduationCap className="h-4 w-4 text-primary" />
          </div>
          <h3 className="text-lg font-display font-semibold">Education</h3>
        </div>
        <Button onClick={addEducation} size="sm" className="gradient-bg text-primary-foreground rounded-full gap-1 shadow-soft">
          <Plus className="h-4 w-4" /> Add
        </Button>
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={resumeData.education.map((e) => e.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-5">
            {resumeData.education.map((edu, idx) => (
              <SortableItem
                key={edu.id}
                id={edu.id}
                className="relative pl-9 pr-4 sm:pr-5 py-4 sm:py-5 rounded-2xl border border-border/60 bg-card shadow-soft animate-fade-in space-y-3"
                handleClassName="!top-6 !translate-y-0"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">#{idx + 1}</span>
                  <Button variant="ghost" size="icon" onClick={() => removeEducation(edu.id)} className="h-8 w-8 hover:bg-destructive/10">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label className="text-xs text-muted-foreground">Institution</Label>
                    <Input value={edu.institution} onChange={(e) => updateEducation(edu.id, "institution", e.target.value)} placeholder="University name" className="rounded-xl bg-background" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Degree</Label>
                    <Input value={edu.degree} onChange={(e) => updateEducation(edu.id, "degree", e.target.value)} placeholder="Bachelor of Science" className="rounded-xl bg-background" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Field of Study</Label>
                    <Input value={edu.field} onChange={(e) => updateEducation(edu.id, "field", e.target.value)} placeholder="Computer Science" className="rounded-xl bg-background" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Start Date</Label>
                    <Input type="month" value={edu.startDate} onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)} className="rounded-xl bg-background" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">End Date</Label>
                    <Input type="month" value={edu.endDate} onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)} className="rounded-xl bg-background" />
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label className="text-xs text-muted-foreground">GPA (optional)</Label>
                    <Input value={edu.gpa} onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)} placeholder="3.8/4.0" className="rounded-xl bg-background" />
                  </div>
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
      {resumeData.education.length === 0 && (
        <div className="text-center py-10 px-4 rounded-2xl border-2 border-dashed border-border/60">
          <GraduationCap className="h-10 w-10 text-muted-foreground/40 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No education added yet. Click "Add" to get started.</p>
        </div>
      )}
    </div>
  );
};

export default EducationForm;
