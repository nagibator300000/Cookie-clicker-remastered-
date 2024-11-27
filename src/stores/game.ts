import { create } from "zustand";
import createGameStatsSlice, { GameStatsSlice } from "./gameStats";
import createInventorySlice, { InventorySlice } from "./inventory";
import createSoulSlice, { SoulSlice } from "./soul";
import createEffectsSlice, { EffectsSlice } from "./effects";

const useGameStore = create<
  InventorySlice & GameStatsSlice & SoulSlice & EffectsSlice
>()((...state) => ({
  ...createGameStatsSlice(...state),
  ...createInventorySlice(...state),
  ...createSoulSlice(...state),
  ...createEffectsSlice(...state),
}));

export default useGameStore;
export type { SpellFxData } from "./soul";
