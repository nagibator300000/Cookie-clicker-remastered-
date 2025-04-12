import { UniqueIdentifier, useDraggable } from '@dnd-kit/core';
import GeneralContent, { ChildProps } from './GeneralContent';
import { CSS } from '@dnd-kit/utilities';
import { getCharm } from '@data/items';
import type { CharmsTypes } from '@schemas/itemTypes';
import { Tooltip } from '..';
import clsx from 'clsx';
import styles from './InventoryContent.module.css';

export interface CharmProps extends ChildProps {
  id: UniqueIdentifier;
  durability?: number;
  isDropTarget?: boolean;
  type: CharmsTypes;
  price?: number;
  disabled?: boolean;
}

export default function Charm({
  row,
  col,
  id,
  durability,
  type,
  isDropTarget,
  disabled,
}: CharmProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { type, durability },
    disabled,
  });
  const content_data = getCharm(type);

  return (
    <GeneralContent
      row={row}
      col={col}
      img={content_data.img}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Translate.toString(transform),
      }}
      ref={setNodeRef}
      className={clsx(isDropTarget && styles.dropping)}
    >
      <Tooltip id={id.toString()} {...content_data.info}></Tooltip>
    </GeneralContent>
  );
}
