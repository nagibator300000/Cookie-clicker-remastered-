import useGameStore from "@/stores/game";
import { SpellFx } from "..";

export default function SpellDisplay() {
  const spells = useGameStore((state) => state.spells);
  const removeSpell = useGameStore((state) => state.removeSpell);

  return (
    <div className="spells">
      {spells.map((data) => (
        <SpellFx
          {...data}
          onAnimationEnd={() => {
            removeSpell(data.key);
          }}
        />
      ))}
    </div>
  );
}
