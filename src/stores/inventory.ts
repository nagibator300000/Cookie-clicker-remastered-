import { StateCreator } from "zustand";
import type { InventoryContentProps } from "../components";
import { UniqueIdentifier } from "@dnd-kit/core";

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
  findCharm: (type: string) => boolean;
}

const createInventorySlice: StateCreator<InventorySlice, [], []> = (set) => ({
  inventoryContent: defaultInventory,
  startEditing: () => set(() => ({ isEditing: true })),
  finishEditing: (itemId) =>
    set((state) => ({
      isEditing: false,
      inventoryContent: state.inventoryContent.filter((e) => e.id !== itemId),
    })),
  overlap: null,
  dropTarget: null,
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
    let isThereACharm = false;
    set((state) => {
      isThereACharm = !!state.inventoryContent.find((e) => e.type === type);
      return {};
    });
    return isThereACharm;
  },
  isEditing: false,
});

export default createInventorySlice;
