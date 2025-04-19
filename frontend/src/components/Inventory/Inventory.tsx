import { useDroppable } from '@dnd-kit/core';
import './Inventory.css';
import { InventoryContent } from '..';
import useGameStore from '../../stores/game';

export default function Inventory() {
  const { setNodeRef } = useDroppable({ id: 'inventory' });
  const overlap = useGameStore((state) => state.overlap);
  const isEditing = useGameStore((state) => state.isEditing);
  const dropTarget = useGameStore((state) => state.dropTarget);
  const inventoryContent = useGameStore((state) => state.inventoryContent);
  const finishEditing = useGameStore((state) => state.finishEditing);
  return (
    <div ref={setNodeRef} className="inventory">
      {dropTarget && (
        <InventoryContent
          type={dropTarget.type}
          row={dropTarget.row}
          col={dropTarget.col}
          id="Abob"
          isDropTarget
        ></InventoryContent>
      )}
      {inventoryContent.map((el) => {
        return (
          <InventoryContent
            {...el}
            key={el.id}
            isOverlaping={el === overlap && el.id !== dropTarget?.id}
            onClick={
              el.type === 'blocker'
                ? () => {
                    if (isEditing) {
                      finishEditing(el.id);
                    }
                  }
                : undefined
            }
          ></InventoryContent>
        );
      })}
    </div>
  );
}
