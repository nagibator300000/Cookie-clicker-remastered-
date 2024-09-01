import {
  DndContext,
  type DndContextProps,
  type DragMoveEvent,
} from "@dnd-kit/core";

type Position = { col: number; row: number };

interface GridMoveEvent extends DragMoveEvent {
  position?: Position;
}

interface GridContextProps extends DndContextProps {
  verticalCellCount: number;
  horizontalCellCount: number;
  onGridMove?: (event: GridMoveEvent) => void;
}

export default function GridContext({
  verticalCellCount,
  horizontalCellCount,
  onGridMove,
  ...props
}: GridContextProps) {
  function onDragHandler(event: DragMoveEvent) {
    if (!props.onDragMove && !onGridMove) return;
    if (!event.over) {
      onMoveHandler(event);
      return;
    }
    const target = event.activatorEvent.target as HTMLElement;
    const inventoryRect = event.over.rect;
    const targetRect = target.getBoundingClientRect();
    const targetCenter = {
      x: targetRect.x + targetRect.width / 2,
      y: targetRect.y + targetRect.height / 2,
    };
    const localPosition = {
      x: targetCenter.x - inventoryRect.left,
      y: targetCenter.y - inventoryRect.top,
    };
    const cellSize = {
      width: inventoryRect.width / horizontalCellCount,
      height: inventoryRect.height / verticalCellCount,
    };
    const targetPosition = {
      col: Math.ceil(localPosition.x / cellSize.width),
      row: Math.ceil(localPosition.y / cellSize.height),
    };
    const fixedPosition = {
      col: targetPosition.col === 0 ? 1 : targetPosition.col,
      row: targetPosition.row === 0 ? 1 : targetPosition.row,
    };
    console.log(JSON.stringify(localPosition));
    onMoveHandler(event, fixedPosition);
  }

  function onMoveHandler(event: DragMoveEvent, position?: Position) {
    if (props.onDragMove) {
      props.onDragMove(event);
    }
    if (onGridMove) {
      const gridEvent = { ...event, position };
      onGridMove(gridEvent);
    }
  }

  return <DndContext {...props} onDragMove={onDragHandler}></DndContext>;
}

export type { GridMoveEvent };
