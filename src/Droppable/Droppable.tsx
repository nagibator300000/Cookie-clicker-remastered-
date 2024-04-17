import { useDroppable } from "@dnd-kit/core";

interface DroppableProps {
  children?: React.ReactNode;
}

export default function Droppable({ children }: DroppableProps) {
  const { setNodeRef } = useDroppable({ id: "inventory" });
  return <div ref={setNodeRef}>{children}</div>;
}
