import { GameStats } from "../../schemas/gameStats";
import type { StateCreator } from "zustand";
import { SoulSlice } from "./soul";
import { EffectsSlice, HitFxData } from "./effects";

export const defaultStats = {
  count: 0,
  perClick: 1,
  periodPoints: 0,
  periodTime: 5,
};

export interface GameStatsSlice extends GameStats {
  click: (data: Omit<HitFxData, "key" | "type">) => void;
  autoClick: () => void;
  reset: () => void;
  upgradePerClick: (cost: number) => void;
  upgradePeriodPoints: (cost: number) => void;
  upgradePeriodTime: (cost: number) => void;
  unlock: (cost: number) => void;
  init: (stats: GameStats) => void;
}

const createGameStatsSlice: StateCreator<
  GameStatsSlice & SoulSlice & EffectsSlice,
  [],
  [],
  GameStatsSlice
> = (set) => ({
  ...defaultStats,
  click: (data) => {
    set((state) => {
      state.addFX({ ...data, key: Date.now(), type: "hit" });
      return {
        count: state.count + state.perClick,
        souls: state.souls + 3 > 100 ? 100 : state.souls + 3,
      };
    });
  },
  autoClick: () => {
    set((state) => ({
      count: state.count + state.periodPoints,
    }));
  },
  reset: () => {
    set(() => defaultStats);
  },
  upgradePerClick: (cost) => {
    set((state) => ({
      count: state.count - cost,
      perClick: state.perClick + 1,
    }));
  },
  upgradePeriodPoints: (cost) => {
    set((state) => ({
      count: state.count - cost,
      periodPoints: state.periodPoints + 1,
    }));
  },
  upgradePeriodTime: (cost) => {
    set((state) => ({
      count: state.count - cost,
      periodPoints: state.periodTime + 0.1,
    }));
  },
  unlock: (cost) => {
    set((state) => ({ count: state.count - cost }));
  },
  init: (stats) => {
    set(() => stats);
  },
});

export default createGameStatsSlice;
