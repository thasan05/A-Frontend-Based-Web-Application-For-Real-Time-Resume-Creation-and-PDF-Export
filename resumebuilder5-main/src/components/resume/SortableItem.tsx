import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { ReactNode } from "react";

interface SortableItemProps {
  id: string;
  children: ReactNode;
  className?: string;
  handleClassName?: string;
}

export const SortableItem = ({ id, children, className, handleClassName }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : "auto" as const,
  };

  return (
    <div ref={setNodeRef} style={style} className={className}>
      <button
        type="button"
        {...attributes}
        {...listeners}
        className={`absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-muted cursor-grab active:cursor-grabbing touch-none text-muted-foreground hover:text-foreground transition-colors ${handleClassName ?? ""}`}
        aria-label="Drag to reorder"
      >
        <GripVertical className="h-4 w-4" />
      </button>
      {children}
    </div>
  );
};
