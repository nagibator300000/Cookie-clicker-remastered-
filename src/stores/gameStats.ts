import { GameStats } from "../../schemas/gameStats";
import type { StateCreator } from "zustand";

export const defaultStats = {
  count: 0,
  perClick: 1,
  periodPoints: 0,
  periodTime: 5,
};

export interface GameStatsSlice extends GameStats {
  click: () => void;
  autoClick: () => void;
  reset: () => void;
  upgradePerClick: (cost: number) => void;
  upgradePeriodPoints: (cost: number) => void;
  upgradePeriodTime: (cost: number) => void;
  unlock: (cost: number) => void;
  init: (stats: GameStats) => void;
}

const createGameStatsSlice: StateCreator<
  GameStatsSlice,
  [],
  [],
  GameStatsSlice
> = (set) => ({
  ...defaultStats,
  click: () => {
    set((state) => ({
      count: state.count + state.perClick,
    }));
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
