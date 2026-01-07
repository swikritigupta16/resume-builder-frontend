import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

/* ---------- SORTABLE ITEM Component---------- */
function SortableItem({ id }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="list-group-item d-flex justify-content-between align-items-center"
    >
      {id.toUpperCase()}

      {/* Drag Handle */}
      <span
        {...attributes}
        {...listeners}
        className="drag-handle"
        style={{ cursor: "grab", fontSize: "1.2rem" }}
      >
        ☰
      </span>
    </li>
  );
}

/* ---------- MAIN COMPONENT ---------- */
export default function SectionReorder({ sections, setSections, darkMode }) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 10,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setSections((prev) => {
      const oldIndex = prev.indexOf(active.id);
      const newIndex = prev.indexOf(over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  return (
    <div
      className={
        darkMode
          ? "section-reorder-dark"
          : "section-reorder-light"
      }
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sections}
          strategy={verticalListSortingStrategy}
        >
          <ul className="list-group">
            {sections.map((section) => (
              <SortableItem key={section} id={section} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
}
