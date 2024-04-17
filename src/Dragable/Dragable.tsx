import type { ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface DraggableProps {
  id: string;
  children: ReactNode;
}
export default function Draggable(props: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });

  const style = { transform: CSS.Translate.toString(transform) };

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      {props.children}
    </div>
  );
}
