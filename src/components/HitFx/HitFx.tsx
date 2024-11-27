import { HitFxData } from "@/stores/effects";
import { CSSProperties } from "react";

interface HitFxProps extends HitFxData {
  onAnimationEnd: () => void;
}

interface HitStyle extends CSSProperties {
  "--x": string;
  "--y": string;
}

export default function SpellFx({ coordinates, onAnimationEnd }: HitFxProps) {
  return (
    <div
      className="hitFx"
      style={
        {
          "--x": coordinates.x + "px",
          "--y": coordinates.y + "px",
        } as HitStyle
      }
      onAnimationEnd={onAnimationEnd}
    ></div>
  );
}
