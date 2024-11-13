import type { StateCreator } from "zustand";
import { GameStatsSlice } from "./gameStats";

type Coordinates = {
  x: number;
  y: number;
};

export interface SpellFxData {
  start: Coordinates;
  finish: Coordinates;
}

export interface SoulSlice {
  souls: number;
  add: (val: number) => void;
  spell: (data: SpellFxData) => void;
  spells: SpellFxData[];
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
      count: state.count + 15,
      souls: state.souls - 33,
      spells: [...state.spells, data],
    })),
  spells: [],
});

export default SoulSlice;
