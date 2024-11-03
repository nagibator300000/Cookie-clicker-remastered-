import "./SoulOrb.css";
import useSoulStore from "../../stores/soul";

export default function SoulOrb() {
  const souls = useSoulStore((state) => state.souls);
  return (
    <img
      className="soul_orb"
      src="soul orb.png"
      alt=""
      style={{ "--percentage": 100 - souls + "%" }}
    />
  );
}
