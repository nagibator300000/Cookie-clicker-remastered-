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
  add: (charm: InventoryContentProps) => void;
  remove: (id: UniqueIdentifier) => void;
  overlap: InventoryContentProps | null;
  dropTarget: InventoryContentProps | null;
  setDropTarget: (targetData: InventoryContentProps | null) => void;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
}

const useInventoryStore = create<InventoryStore>()((set) => ({
  inventoryContent: defaultInventory,
  add: (charm) =>
    set((state) => ({
      inventoryContent: [...state.inventoryContent, charm],
    })),
  remove: (id) =>
    set((state) => ({
      inventoryContent: state.inventoryContent.filter((e) => e.id !== id),
    })),
  overlap: null,
  dropTarget: null,
  setDropTarget: (dropTarget) =>
    set((state) => ({
      dropTarget,
      overlap: state.inventoryContent.find(
        (e) => e.col === dropTarget?.col && e.row === dropTarget?.row
      ),
    })),
  isEditing: false,
  setIsEditing: (val) => {
    set(() => ({ isEditing: val }));
  },
}));

export default useInventoryStore;
