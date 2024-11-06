import "./SoulOrb.css";
import useGameStore from "../../stores/game";
import { CSSProperties } from "react";

interface SoulOrbCSS extends CSSProperties {
  "--percentage": string;
}

export default function SoulOrb() {
  const souls = useGameStore((state) => state.souls);
  return (
    <img
      className="soul_orb"
      src="soul orb.png"
      alt=""
      style={{ "--percentage": 100 - souls + "%" } as SoulOrbCSS}
    />
  );
}
