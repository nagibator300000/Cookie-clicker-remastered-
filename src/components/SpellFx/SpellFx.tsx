import { CSSProperties } from "react";
import "./SpellFx.css";

import type { SpellFxData } from "../../stores/game";

interface SpellStyle extends CSSProperties {
  "--x": string;
  "--y": string;
}

export default function SpellFx({ start, finish }: SpellFxData) {
  return (
    <div
      className="spell"
      style={
        {
          "--x": start.x + "px",
          "--y": start.y + "px",
          "--target-x": finish.x + "px",
          "--target-y": finish.y + "px",
        } as SpellStyle
      }
    ></div>
  );
}
