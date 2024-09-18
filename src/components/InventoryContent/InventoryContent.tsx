import type { CSSProperties } from "react";
import "./InventoryContent.css";
import { useDraggable, type UniqueIdentifier } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";

export type InventoryContentProps = {
  row?: number;
  col?: number;
  id: UniqueIdentifier;
  isDropTarget?: boolean;
  isOverlaping?: boolean;
  type: keyof typeof CONTENT_TYPES;
};

const CONTENT_TYPES = {
  blocker: {
    img: "/Charms/Blocker.png",
  },
  fragile_force: {
    img: "/Charms/Fragile Strength.png",
  },
  quick_slash: {
    img: "/Charms/Quick Slash.png",
  },
  fury_of_the_fallen: {
    img: "/Charms/Fury of the Fallen.png",
  },
} as const;

export default function InventoryContent({
  row,
  col,
  id,
  isDropTarget,
  isOverlaping,
  type,
}: InventoryContentProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: { type: type },
    disabled: type == "blocker",
  });

  const content_data = CONTENT_TYPES[type];

  const style = {
    transform: CSS.Translate.toString(transform),
    "--row": row,
    "--col": col,
    backgroundImage: `url("${content_data.img}")`,
  } as CSSProperties;
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={clsx(
        "charm",
        isDropTarget && "dropping",
        isOverlaping && "overlaping"
      )}
      style={style}
    ></div>
  );
}
