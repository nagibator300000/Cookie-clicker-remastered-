import { GridContext, GridMoveEvent } from "..";
import { restrictToFirstScrollableAncestor } from "@dnd-kit/modifiers";
import useInventoryStore from "../../stores/inventory";

type InventoryProviderProps = {
  verticalCellCount: number;
  horizontalCellCount: number;
  children: React.ReactNode;
};

export default function InventoryProvider({
  verticalCellCount,
  horizontalCellCount,
  children,
}: InventoryProviderProps) {
  const dropItem = useInventoryStore((state) => state.dropItem);
  const hoverItem = useInventoryStore((state) => state.hoverItem);

  function OnMove(event: GridMoveEvent) {
    if (event.position) {
      const newdropTarget = {
        ...event.position,
        id: event.active.id,
        type: event.active.data.current?.type,
      };
      hoverItem(newdropTarget);
    } else {
      hoverItem(null);
    }
  }
  return (
    <GridContext
      horizontalCellCount={horizontalCellCount}
      verticalCellCount={verticalCellCount}
      modifiers={[restrictToFirstScrollableAncestor]}
      onGridMove={OnMove}
      onDragEnd={dropItem}
    >
      {children}
    </GridContext>
  );
}
