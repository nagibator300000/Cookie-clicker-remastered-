import {
  MouseEventHandler,
  ReactNode,
  useRef,
  type CSSProperties,
} from "react";
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
  onClick?: MouseEventHandler<HTMLDivElement>;
};

type ContentTypes =
  | "blocker"
  | "fragile_force"
  | "quick_slash"
  | "fury_of_the_fallen"
  | "shaman_stone"
  | "soul_catcher"
  | "soul_eater"
  | "spell_twister";

type ContentInfo = {
  [T in ContentTypes]: {
    img: string;
    description?: ReactNode;
  };
};

const CONTENT_INFO: ContentInfo = {
  blocker: {
    img: "/Charms/Blocker.png",
  },
  fragile_force: {
    img: "/Charms/Fragile Strength.png",
    description: (
      <>
        <div>
          Strengthens the bearer, increasing the damage they deal to enemies
          with their nail
        </div>
        <br />
        <div>This charm is fragile, and will break if its bearer is killed</div>
      </>
    ),
  },
  quick_slash: {
    img: "/Charms/Quick Slash.png",
    description: (
      <>
        <div>Born from imperfect, discarded nails that have fused together</div>
        <br />
        <div>
          The nails still long to be wielded. Allows the bearer to slash much
          more rapidly with their nail
        </div>
      </>
    ),
  },
  fury_of_the_fallen: {
    img: "/Charms/Fury of the Fallen.png",
    description: (
      <>
        <div>
          Embodies the fury and heroism that comes upon those who are about to
          die
        </div>
        <br />
        <div>When close to death, the bearer's strength will increase</div>
      </>
    ),
  },
  spell_twister: {
    img: "/Charms/Spell Twister.png",
    description: (
      <>
        <div>
          Reflecting the desires of the Soul Sanctum for mastery over SOUL, it
          improves the bearer's ability to cast spells
        </div>
        <br />
        <div>Reduces the SOUL cost of casting spells</div>
      </>
    ),
  },
  shaman_stone: {
    img: "/Charms/Shaman Stone.png",
    description: (
      <>
        <div>Said to contain the knowledge of past generations of shaman</div>
        <br />
        <div>Increases the power of spells, dealing more damage to foes</div>
      </>
    ),
  },
  soul_catcher: {
    img: "/Charms/Soul Catcher.png",
    description: (
      <>
        <div>Used by shamans to draw more SOUL from the world around them</div>
        <br />
        <div>
          Increases the amount of SOUL gained when striking an enemy with the
          nail
        </div>
      </>
    ),
  },
  soul_eater: {
    img: "/Charms/Soul Eater.png",
    description: (
      <>
        <div>
          Forgotten shaman artifact, used to draw SOUL from still-living
          creatures
        </div>
        <br />
        <div>
          Greatly increases the amount of SOUL gained when striking an enemy
          with the nail
        </div>
      </>
    ),
  },
};

export default function InventoryContent({
  row,
  col,
  id,
  isDropTarget,
  isOverlaping,
  type,
  onClick,
}: InventoryContentProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: { type: type },
    disabled: type == "blocker",
  });
  const tooltip_id = useRef(crypto.randomUUID());

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
      onClick={onClick}
      className={clsx(
        "charm",
        isDropTarget && "dropping",
        isOverlaping && "overlaping"
      )}
      style={style}
    >
      <Tooltip id={tooltip_id.current} place="top">
        {!row ? content_data.description : ""}
      </Tooltip>
    </div>
  );
}
