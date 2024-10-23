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
  const remove = useInventoryStore((state) => state.remove);
  const setDropTarget = useInventoryStore((state) => state.setDropTarget);
  const add = useInventoryStore((state) => state.add);

  function OnMove(event: GridMoveEvent) {
    if (event.position) {
      const newdropTarget = {
        ...event.position,
        id: event.active.id,
        type: event.active.data.current?.type,
      };
      setDropTarget(newdropTarget);
    } else {
      setDropTarget(null);
    }
  }

  function OnEnd() {
    const dropTarget = useInventoryStore.getState().dropTarget;
    if (!dropTarget) return;
    if (useInventoryStore.getState().overlap) {
      setDropTarget(null);
      return;
    }
    remove(dropTarget.id),
      add({
        ...dropTarget,
        id: `col:${dropTarget.col} row:${dropTarget.row}`,
      }),
      setDropTarget(null);
  }
  return (
    <GridContext
      horizontalCellCount={horizontalCellCount}
      verticalCellCount={verticalCellCount}
      modifiers={[restrictToFirstScrollableAncestor]}
      onGridMove={OnMove}
      onDragEnd={OnEnd}
    >
      {children}
    </GridContext>
  );
}
