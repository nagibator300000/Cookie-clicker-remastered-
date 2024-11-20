import type { StateCreator } from "zustand";
import { GameStatsSlice } from "./gameStats";
import { UniqueIdentifier } from "@dnd-kit/core";

type Coordinates = {
  x: number;
  y: number;
};

export interface SpellFxData {
  start: Coordinates;
  finish: Coordinates;
  key: UniqueIdentifier;
}

export interface SoulSlice {
  souls: number;
  add: (val: number) => void;
  spell: (data: SpellFxData) => void;
  spells: SpellFxData[];
  removeSpell: (key: UniqueIdentifier) => void;
}

const SoulSlice: StateCreator<SoulSlice & GameStatsSlice, [], [], SoulSlice> = (
  set
) => ({
  souls: 0,
  add: (val) =>
    set((state) => ({
      souls: state.souls + val > 100 ? 100 : state.souls + val,
    })),
  spell: (data) =>
    set((state) => ({
      souls: state.souls - 33,
      spells: [...state.spells, data],
    })),
  spells: [],
  removeSpell: (key) => {
    set((state) => ({
      count: state.count + 15,
      spells: state.spells.filter((e) => e.key !== key),
    }));
  },
});

export default SoulSlice;
