import type { StateCreator } from "zustand";
import { GameStatsSlice } from "./gameStats";

export interface SoulSlice {
  souls: number;
  add: (val: number) => void;
  spell: () => void;
}

const SoulSlice: StateCreator<SoulSlice & GameStatsSlice, [], [], SoulSlice> = (
  set
) => ({
  souls: 0,
  add: (val) =>
    set((state) => ({
      souls: state.souls + val > 100 ? 100 : state.souls + val,
    })),
  spell: () =>
    set((state) => ({ count: state.count + 15, souls: state.souls - 33 })),
});

export default SoulSlice;
