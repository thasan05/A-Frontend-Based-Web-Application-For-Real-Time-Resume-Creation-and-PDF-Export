import { useResume } from "@/context/ResumeContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skill } from "@/types/resume";
import { Plus, Trash2, Wrench } from "lucide-react";
import { DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";

const SkillsForm = () => {
  const { resumeData, setResumeData } = useResume();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const addSkill = () => {
    const newSkill: Skill = { id: crypto.randomUUID(), name: "", level: "intermediate" };
    setResumeData((prev) => ({ ...prev, skills: [...prev.skills, newSkill] }));
  };

  const updateSkill = (id: string, field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    }));
  };

  const removeSkill = (id: string) => {
    setResumeData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s.id !== id) }));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setResumeData((prev) => {
        const oldIndex = prev.skills.findIndex((s) => s.id === active.id);
        const newIndex = prev.skills.findIndex((s) => s.id === over.id);
        return { ...prev, skills: arrayMove(prev.skills, oldIndex, newIndex) };
      });
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Wrench className="h-4 w-4 text-primary" />
          </div>
          <h3 className="text-lg font-display font-semibold">Skills</h3>
        </div>
        <Button onClick={addSkill} size="sm" className="gradient-bg text-primary-foreground rounded-full gap-1 shadow-soft">
          <Plus className="h-4 w-4" /> Add
        </Button>
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={resumeData.skills.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {resumeData.skills.map((skill) => (
              <SortableItem
                key={skill.id}
                id={skill.id}
                className="relative flex flex-wrap sm:flex-nowrap items-center gap-2 pl-8 pr-2 py-2 rounded-xl border border-border/60 bg-card shadow-soft animate-fade-in"
              >
                <Input
                  value={skill.name}
                  onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                  placeholder="Skill name"
                  className="flex-1 min-w-[140px] rounded-lg border-0 bg-background"
                />
                <div className="flex items-center gap-2 ml-auto sm:ml-0">
                  <Select value={skill.level} onValueChange={(val) => updateSkill(skill.id, "level", val)}>
                    <SelectTrigger className="w-32 sm:w-36 rounded-lg border-0 bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="icon" onClick={() => removeSkill(skill.id)} className="h-9 w-9 shrink-0 hover:bg-destructive/10">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
      {resumeData.skills.length === 0 && (
        <div className="text-center py-10 px-4 rounded-2xl border-2 border-dashed border-border/60">
          <Wrench className="h-10 w-10 text-muted-foreground/40 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No skills added yet. Click "Add" to get started.</p>
        </div>
      )}
    </div>
  );
};

export default SkillsForm;
