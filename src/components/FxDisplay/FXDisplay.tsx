import useGameStore from "@/stores/game";
import { SpellFx } from "..";
import { HitFx } from "..";

export default function SpellDisplay() {
  const effects = useGameStore((state) => state.effects);
  const removeSpell = useGameStore((state) => state.removeSpell);
  const removeFX = useGameStore((state) => state.removeFX);

  return (
    <div className="effects">
      {effects.map((data) => {
        if (data.type === "spell")
          return (
            <SpellFx
              {...data}
              onAnimationEnd={() => {
                removeSpell(data.key);
              }}
            />
          );
        else
          return <HitFx {...data} onAnimationEnd={() => removeFX(data.key)} />;
      })}
    </div>
  );
}
