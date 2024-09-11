import { createContext, useContext, useState } from "react";
import { CharmProps, GridContext, GridMoveEvent } from "..";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

type InventoryProviderProps = {
  verticalCellCount: number;
  horizontalCellCount: number;
  children: React.ReactNode;
};

type InventoryContext = {
  charms: CharmProps[];
  setCharms: React.Dispatch<React.SetStateAction<CharmProps[]>>;
  blanks: CharmProps[];
  setBlanks: React.Dispatch<React.SetStateAction<CharmProps[]>>;
  dropTargetData: CharmProps | null;
  setDropTargetData: React.Dispatch<React.SetStateAction<CharmProps | null>>;
  overlap: CharmProps | undefined;
};

const inventoryContext = createContext<InventoryContext | null>(null);

export default function InventoryProvider({
  verticalCellCount,
  horizontalCellCount,
  children,
}: InventoryProviderProps) {
  const [dropTargetData, setDropTargetData] = useState<CharmProps | null>(null);
  const [charms, setCharms] = useState<CharmProps[]>([]);
  const [blanks, setBlanks] = useState<CharmProps[]>([]);
  const overlap = charms.find(
    (val) => val.col === dropTargetData?.col && val.row === dropTargetData?.row
  );
  function OnMove(event: GridMoveEvent) {
    if (event.position) {
      const newDropTargetData = {
        ...event.position,
        id: event.active.id,
        url: event.active.data.current?.url,
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
    setCharms([
      ...charms.filter((el) => el.id !== dropTargetData.id),
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
        charms,
        setCharms,
        blanks,
        setBlanks,
        dropTargetData,
        setDropTargetData,
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
