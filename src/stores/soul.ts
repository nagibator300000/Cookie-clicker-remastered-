import type { StateCreator } from "zustand";
import { GameStatsSlice } from "./gameStats";
import { UniqueIdentifier } from "@dnd-kit/core";
import type { EffectsSlice } from "./effects";
import { InventorySlice } from "./inventory";

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
  addSouls: (val: number) => void;
  spell: (data: Omit<SpellFxData, "key" | "type">) => void;
  removeSpell: (key: UniqueIdentifier) => void;
}

const SoulSlice: StateCreator<
  SoulSlice & GameStatsSlice & EffectsSlice & InventorySlice,
  [],
  [],
  SoulSlice
> = (set) => ({
  souls: 0,
  addSouls: (val) =>
    set((state) => {
      if (state.findCharm("fury_of_fallen")) return {};
      return { souls: state.souls + val > 100 ? 100 : state.souls + val };
    }),
  spell: (data) =>
    set((state) => {
      state.addFX({ ...data, type: "spell" });
      return {
        souls: state.souls - (state.findCharm("spell_twister") ? 25 : 33),
      };
    }),
  removeSpell: (key) => {
    set((state) => {
      state.removeFX(key);
      return {
        count: state.count + (state.findCharm("shaman_stone") ? 20 : 15),
      };
    });
  },
});

export default SoulSlice;
