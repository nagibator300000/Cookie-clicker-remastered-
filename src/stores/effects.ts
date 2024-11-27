import { StateCreator } from "zustand";
import { SpellFxData } from "./soul";
import { UniqueIdentifier } from "@dnd-kit/core";

export type HitFxData = {
  coordinates: { x: number; y: number };
  key: UniqueIdentifier;
  type: "hit";
};

type Effect = SpellFxData | HitFxData;

export type EffectsSlice = {
  effects: Effect[];
  addFX: (data: Effect) => void;
  removeFX: (key: UniqueIdentifier) => void;
};

const createEffectsSlice: StateCreator<EffectsSlice, [], [], EffectsSlice> = (
  set
) => ({
  effects: [],
  addFX: (data) => {
    set((state) => ({
      effects: [...state.effects, data],
    }));
  },
  removeFX: (key) => {
    set((state) => ({
      effects: state.effects.filter((e) => {
        e.key !== key;
      }),
    }));
  },
});

export default createEffectsSlice;
