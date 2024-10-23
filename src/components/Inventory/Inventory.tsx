import { useDroppable } from "@dnd-kit/core";
import "./Inventory.css";
import { InventoryContent } from "..";
import useInventoryStore from "../../stores/inventory";

export default function Inventory() {
  const { setNodeRef } = useDroppable({ id: "inventory" });
  const overlap = useInventoryStore((state) => state.overlap);
  const isEditing = useInventoryStore((state) => state.isEditing);
  const dropTarget = useInventoryStore((state) => state.dropTarget);
  const inventoryContent = useInventoryStore((state) => state.inventoryContent);
  const remove = useInventoryStore((state) => state.remove);
  const setIsEditing = useInventoryStore((state) => state.setIsEditing);
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
              el.type === "blocker"
                ? () => {
                    if (isEditing) {
                      remove(el.id);

                      setIsEditing(false);
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
