import { StateCreator } from "zustand";
import type { ContentTypes, InventoryContentProps } from "../components";
import { UniqueIdentifier } from "@dnd-kit/core";
import useGameStore from "./game";

const defaultInventory: InventoryContentProps[] = Array.from({
  length: 25,
})
  .map((_el, index) => ({
    id: index,
    type: "blocker",
    col: (index % 5) + 1,
    row: Math.ceil((index + 1) / 5),
  }))
  .filter((el) => el.col !== 3 || el.row !== 3) as InventoryContentProps[];

export interface InventorySlice {
  inventoryContent: InventoryContentProps[];
  overlap: InventoryContentProps | null;
  dropTarget: InventoryContentProps | null;
  isEditing: boolean;
  startEditing: () => void;
  finishEditing: (itemId: UniqueIdentifier) => void;
  hoverItem: (DropTarget: InventoryContentProps | null) => void;
  dropItem: () => void;
  findCharm: (type: Exclude<ContentTypes, "blocker">) => boolean;
}

const createInventorySlice: StateCreator<
  InventorySlice,
  [["zustand/devtools", never]],
  []
> = (set) => ({
  inventoryContent: defaultInventory,
  overlap: null,
  dropTarget: null,
  isEditing: false,
  startEditing: () => set(() => ({ isEditing: true })),
  finishEditing: (itemId) =>
    set((state) => ({
      isEditing: false,
      inventoryContent: state.inventoryContent.filter((e) => e.id !== itemId),
    })),
  hoverItem: (dropTarget) =>
    set((state) => ({
      dropTarget,
      overlap: state.inventoryContent.find(
        (e) => e.col === dropTarget?.col && e.row === dropTarget?.row
      ),
    })),
  dropItem: () => {
    set((state) => {
      if (!state.dropTarget) return state;
      if (state.overlap) {
        return {
          dropTarget: null,
          overlap: null,
        };
      }

      return {
        dropTarget: null,
        inventoryContent: [
          ...state.inventoryContent.filter(
            (e) => e.id !== state.dropTarget?.id
          ),
          {
            ...state.dropTarget,
            id: `col:${state.dropTarget.col} row:${state.dropTarget.row}`,
          },
        ],
      };
    });
  },
  findCharm: (type) => {
    const state = useGameStore.getState();
    return !!state.inventoryContent.find((e) => e.type === type);
  },
});

export default createInventorySlice;
