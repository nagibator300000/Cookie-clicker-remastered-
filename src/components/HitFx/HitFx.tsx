import { HitFxData } from "@/stores/effects";
import { CSSProperties } from "react";
import "./HitFx.scss";

interface HitFxProps extends HitFxData {
  onAnimationEnd: () => void;
}

interface HitStyle extends CSSProperties {
  "--x": string;
  "--y": string;
  "--rotation": string;
}

export default function SpellFx({ coordinates, onAnimationEnd }: HitFxProps) {
  return (
    <div
      className="hitFx"
      style={
        {
          "--x": coordinates.x + "px",
          "--y": coordinates.y + "px",
          "--rotation":
            Math.floor(Math.random() * (135 - -45 + 1) + -45) + "deg",
        } as HitStyle
      }
      onAnimationEnd={onAnimationEnd}
    ></div>
  );
}
