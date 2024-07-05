import { useDroppable } from "@dnd-kit/core";
import "./Inventory.css";

interface DroppableProps {
  children?: React.ReactNode;
}

export default function Inventory({ children }: DroppableProps) {
  const { setNodeRef } = useDroppable({ id: "inventory" });
  return (
    <div ref={setNodeRef} className="inventory">
      {children}
    </div>
  );
}
