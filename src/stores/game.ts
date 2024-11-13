import { create } from "zustand";
import createGameStatsSlice, { GameStatsSlice } from "./gameStats";
import createInventorySlice, { InventorySlice } from "./inventory";
import createSoulSlice, { SoulSlice } from "./soul";

const useGameStore = create<InventorySlice & GameStatsSlice & SoulSlice>()(
  (...state) => ({
    ...createGameStatsSlice(...state),
    ...createInventorySlice(...state),
    ...createSoulSlice(...state),
  })
);

export default useGameStore;
export type { SpellFxData } from "./soul";
