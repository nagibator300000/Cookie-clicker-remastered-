import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { InventoryContentProps, GridContext, GridMoveEvent } from "..";
import { restrictToFirstScrollableAncestor } from "@dnd-kit/modifiers";

type InventoryProviderProps = {
  verticalCellCount: number;
  horizontalCellCount: number;
  children: React.ReactNode;
};

type InventoryContext = {
  inventoryContent: InventoryContentProps[];
  setInventoryContent: Dispatch<SetStateAction<InventoryContentProps[]>>;
  dropTargetData: InventoryContentProps | null;
  overlap: InventoryContentProps | undefined;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
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
  >([
    { row: 1, col: 1, id: "blocker row:1 col:1", type: "blocker" },
    { row: 2, col: 1, id: "blocker row:2 col:1", type: "blocker" },
    { row: 3, col: 1, id: "blocker row:3 col:1", type: "blocker" },
    { row: 4, col: 1, id: "blocker row:4 col:1", type: "blocker" },
    { row: 5, col: 1, id: "blocker row:5 col:1", type: "blocker" },
    { row: 1, col: 2, id: "blocker row:1 col:2", type: "blocker" },
    { row: 2, col: 2, id: "blocker row:2 col:2", type: "blocker" },
    { row: 3, col: 2, id: "blocker row:3 col:2", type: "blocker" },
    { row: 4, col: 2, id: "blocker row:4 col:2", type: "blocker" },
    { row: 5, col: 2, id: "blocker row:5 col:2", type: "blocker" },
    { row: 1, col: 3, id: "blocker row:1 col:3", type: "blocker" },
    { row: 2, col: 3, id: "blocker row:2 col:3", type: "blocker" },
    { row: 3, col: 3, id: "blocker row:3 col:3", type: "blocker" },
    { row: 4, col: 3, id: "blocker row:4 col:3", type: "blocker" },
    { row: 5, col: 3, id: "blocker row:5 col:3", type: "blocker" },
    { row: 1, col: 4, id: "blocker row:1 col:4", type: "blocker" },
    { row: 2, col: 4, id: "blocker row:2 col:4", type: "blocker" },
    { row: 3, col: 4, id: "blocker row:3 col:4", type: "blocker" },
    { row: 4, col: 4, id: "blocker row:4 col:4", type: "blocker" },
    { row: 5, col: 4, id: "blocker row:5 col:4", type: "blocker" },
    { row: 1, col: 5, id: "blocker row:1 col:5", type: "blocker" },
    { row: 2, col: 5, id: "blocker row:2 col:5", type: "blocker" },
    { row: 3, col: 5, id: "blocker row:3 col:5", type: "blocker" },
    { row: 4, col: 5, id: "blocker row:4 col:5", type: "blocker" },
    { row: 5, col: 5, id: "blocker row:5 col:5", type: "blocker" },
  ]);
  const [isEditing, setIsEditing] = useState(false);

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
        setInventoryContent,
        dropTargetData,
        overlap,
        isEditing,
        setIsEditing,
      }}
    >
      <GridContext
        horizontalCellCount={horizontalCellCount}
        verticalCellCount={verticalCellCount}
        modifiers={[restrictToFirstScrollableAncestor]}
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
