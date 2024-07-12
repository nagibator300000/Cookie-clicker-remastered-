import type { CSSProperties } from "react";
import "./Charm.css";
import { useDraggable, type UniqueIdentifier } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";

export type CharmProps = {
  row?: number;
  col?: number;
  id: UniqueIdentifier;
  isDropTarget?: boolean;
  isOverlaping?: boolean;
  url: string;
};

export default function Charm({
  row,
  col,
  id,
  isDropTarget,
  isOverlaping,
  url,
}: CharmProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: { url: url },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    "--row": row,
    "--col": col,
    backgroundImage: `url("${url}")`,
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
