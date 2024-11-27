import type { StateCreator } from "zustand";
import { GameStatsSlice } from "./gameStats";
import { UniqueIdentifier } from "@dnd-kit/core";
import type { EffectsSlice } from "./effects";

type Coordinates = {
  x: number;
  y: number;
};

export interface SpellFxData {
  start: Coordinates;
  finish: Coordinates;
  key: UniqueIdentifier;
  type: "spell";
}

export interface SoulSlice {
  souls: number;
  add: (val: number) => void;
  spell: (data: Exclude<SpellFxData, "type">) => void;
  removeSpell: (key: UniqueIdentifier) => void;
}

const SoulSlice: StateCreator<
  SoulSlice & GameStatsSlice & EffectsSlice,
  [],
  [],
  SoulSlice
> = (set) => ({
  souls: 0,
  add: (val) =>
    set((state) => ({
      souls: state.souls + val > 100 ? 100 : state.souls + val,
    })),
  spell: (data) =>
    set((state) => {
      state.addFX({ ...data, type: "spell" });
      return { souls: state.souls - 33 };
    }),
  removeSpell: (key) => {
    set((state) => {
      state.removeFX(key);
      return {
        count: state.count + 15,
      };
    });
  },
});

export default SoulSlice;
