import { UniqueIdentifier, useDraggable } from '@dnd-kit/core'
import GeneralContent, { ChildProps } from './GeneralContent'
import { CSS } from '@dnd-kit/utilities'
import CONTENT_INFO, { CharmInfo } from '../../../data/items'
import type { CharmsTypes } from '../../../schemas/itemTypes'
import { Tooltip } from '..'
import clsx from 'clsx'
import styles from './InventoryContent.module.css'

export interface CharmProps extends ChildProps {
  id: UniqueIdentifier
  durability?: number
  isDropTarget?: boolean
  type: CharmsTypes
}

export default function Charm({
  row,
  col,
  id,
  durability,
  type,
  isDropTarget,
}: CharmProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: { type, durability },
  })
  const content_data = CONTENT_INFO.find((e) => e.name === type) as CharmInfo

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
  )
}
