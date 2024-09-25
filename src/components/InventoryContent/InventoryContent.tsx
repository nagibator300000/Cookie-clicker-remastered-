import { useRef, type CSSProperties } from "react";
import "./InventoryContent.css";
import { useDraggable, type UniqueIdentifier } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { Tooltip } from "react-tooltip";

export type InventoryContentProps = {
  row?: number;
  col?: number;
  id: UniqueIdentifier;
  isDropTarget?: boolean;
  isOverlaping?: boolean;
  type: keyof typeof CONTENT_INFO;
};

type ContentTypes = "blocker" | "fragile_force" | "quick_slash" | "fury_of_the_fallen"

type ContentInfo = {
  [
    T in ContentTypes
  ]:{
    img:string,
    description?:string
  }
}

const CONTENT_INFO : ContentInfo=  {
  blocker: {
    img: "/Charms/Blocker.png",
  },
  fragile_force: {
    img: "/Charms/Fragile Strength.png",
    description:"Fragile Strength",
  },
  quick_slash: {
    img: "/Charms/Quick Slash.png",
    description:"Quick Slash",
  },
  fury_of_the_fallen: {
    img: "/Charms/Fury of the Fallen.png",
    description:"Fury of the Fallen",
  },
} ;

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
  const tooltip_id = useRef(crypto.randomUUID())

  const content_data = CONTENT_INFO[type];

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
      data-tooltip-id={tooltip_id.current}
      className={clsx(
        "charm",
        isDropTarget && "dropping",
        isOverlaping && "overlaping"
      )}
      style={style}
      >

        <Tooltip id={tooltip_id.current} content={!row ? content_data.description : ""}/>
      </div>
  );
}
