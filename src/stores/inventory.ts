import { create } from "zustand";
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

interface InventoryStore {
  inventoryContent: InventoryContentProps[];
  overlap: InventoryContentProps | null;
  dropTarget: InventoryContentProps | null;
  isEditing: boolean;
  startEditing: () => void;
  finishEditing: (itemId: UniqueIdentifier) => void;
  hoverItem: (DropTarget: InventoryContentProps | null) => void;
  dropItem: () => void;
}

const useInventoryStore = create<InventoryStore>()((set) => ({
  inventoryContent: defaultInventory,
  startEditing: () => set(() => ({ isEditing: true })),
  finishEditing: () => set(() => ({ isEditing: false })),
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
  isEditing: false,
}));

export default useInventoryStore;
