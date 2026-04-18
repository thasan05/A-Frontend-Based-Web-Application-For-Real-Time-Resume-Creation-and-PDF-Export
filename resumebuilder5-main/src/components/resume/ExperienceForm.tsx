import { useResume } from "@/context/ResumeContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Experience } from "@/types/resume";
import { Plus, Trash2, Briefcase } from "lucide-react";
import { DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";

const ExperienceForm = () => {
  const { resumeData, setResumeData } = useResume();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const addExperience = () => {
    const newExp: Experience = {
      id: crypto.randomUUID(),
      company: "", position: "", startDate: "", endDate: "", current: false, description: "",
    };
    setResumeData((prev) => ({ ...prev, experience: [...prev.experience, newExp] }));
  };

  const updateExperience = (id: string, field: string, value: string | boolean) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({ ...prev, experience: prev.experience.filter((e) => e.id !== id) }));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setResumeData((prev) => {
        const oldIndex = prev.experience.findIndex((e) => e.id === active.id);
        const newIndex = prev.experience.findIndex((e) => e.id === over.id);
        return { ...prev, experience: arrayMove(prev.experience, oldIndex, newIndex) };
      });
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Briefcase className="h-4 w-4 text-primary" />
          </div>
          <h3 className="text-lg font-display font-semibold">Work Experience</h3>
        </div>
        <Button onClick={addExperience} size="sm" className="gradient-bg text-primary-foreground rounded-full gap-1 shadow-soft">
          <Plus className="h-4 w-4" /> Add
        </Button>
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={resumeData.experience.map((e) => e.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-5">
            {resumeData.experience.map((exp, idx) => (
              <SortableItem
                key={exp.id}
                id={exp.id}
                className="relative pl-9 pr-4 sm:pr-5 py-4 sm:py-5 rounded-2xl border border-border/60 bg-card shadow-soft animate-fade-in space-y-3"
                handleClassName="!top-6 !translate-y-0"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">#{idx + 1}</span>
                  <Button variant="ghost" size="icon" onClick={() => removeExperience(exp.id)} className="h-8 w-8 hover:bg-destructive/10">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Company</Label>
                    <Input value={exp.company} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} placeholder="Company name" className="rounded-xl bg-background" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Position</Label>
                    <Input value={exp.position} onChange={(e) => updateExperience(exp.id, "position", e.target.value)} placeholder="Software Engineer" className="rounded-xl bg-background" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Start Date</Label>
                    <Input type="month" value={exp.startDate} onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)} className="rounded-xl bg-background" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">End Date</Label>
                    <Input type="month" value={exp.endDate} onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)} disabled={exp.current} className="rounded-xl bg-background" />
                  </div>
                </div>
                <div className="flex items-center space-x-2 px-1">
                  <Checkbox id={`current-${exp.id}`} checked={exp.current} onCheckedChange={(checked) => updateExperience(exp.id, "current", !!checked)} />
                  <Label htmlFor={`current-${exp.id}`} className="text-sm cursor-pointer">Currently working here</Label>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Description</Label>
                  <Textarea value={exp.description} onChange={(e) => updateExperience(exp.id, "description", e.target.value)} placeholder="Describe your responsibilities and achievements..." rows={3} className="rounded-xl bg-background resize-none" />
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
      {resumeData.experience.length === 0 && (
        <div className="text-center py-10 px-4 rounded-2xl border-2 border-dashed border-border/60">
          <Briefcase className="h-10 w-10 text-muted-foreground/40 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No experience added yet. Click "Add" to get started.</p>
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
