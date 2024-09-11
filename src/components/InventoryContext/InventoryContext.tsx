import { createContext, useContext, useState } from "react";
import { InventoryContentProps, GridContext, GridMoveEvent } from "..";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

type InventoryProviderProps = {
  verticalCellCount: number;
  horizontalCellCount: number;
  children: React.ReactNode;
};

type InventoryContext = {
  inventoryContent: InventoryContentProps[];
  dropTargetData: InventoryContentProps | null;
  overlap: InventoryContentProps | undefined;
};

const inventoryContext = createContext<InventoryContext | null>(null);

export default function InventoryProvider({
  verticalCellCount,
  horizontalCellCount,
  children,
}: InventoryProviderProps) {
  const [dropTargetData, setDropTargetData] =
    useState<InventoryContentProps | null>(null);
  const [inventoryContent, setInventoryContent] = useState<
    InventoryContentProps[]
  >([]);

  const overlap = inventoryContent.find(
    (val) => val.col === dropTargetData?.col && val.row === dropTargetData?.row
  );

  function OnMove(event: GridMoveEvent) {
    if (event.position) {
      const newDropTargetData = {
        ...event.position,
        id: event.active.id,
        type: event.active.data.current?.type,
      };
      setDropTargetData(newDropTargetData);
    } else {
      setDropTargetData(null);
    }
  }

  function OnEnd() {
    if (!dropTargetData) return;
    if (overlap) {
      setDropTargetData(null);
      return;
    }
    setInventoryContent([
      ...inventoryContent.filter((el) => el.id !== dropTargetData.id),
      {
        ...dropTargetData,
        id: `col:${dropTargetData.col} row:${dropTargetData.row}`,
      },
    ]);
    setDropTargetData(null);
  }
  return (
    <inventoryContext.Provider
      value={{
        inventoryContent,
        dropTargetData,
        overlap,
      }}
    >
      <GridContext
        horizontalCellCount={horizontalCellCount}
        verticalCellCount={verticalCellCount}
        modifiers={[restrictToWindowEdges]}
        onGridMove={OnMove}
        onDragEnd={OnEnd}
      >
        {children}
      </GridContext>
    </inventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(inventoryContext);
  if (!context) {
    throw new Error("This hook shouldn't be used outside of ReducerProvider");
  }
  return context;
}
