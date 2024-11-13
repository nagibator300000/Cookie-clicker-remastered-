import useGameStore from "../../stores/game";
import { SpellFx } from "..";

export default function SpellDisplay() {
  const spells = useGameStore((state) => state.spells);

  return (
    <div className="spells">
      {spells.map((data) => (
        <SpellFx {...data} />
      ))}
    </div>
  );
}
