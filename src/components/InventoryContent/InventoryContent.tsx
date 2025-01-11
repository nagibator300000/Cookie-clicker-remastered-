import { MouseEventHandler, useRef, type CSSProperties } from 'react'
import './InventoryContent.css'
import { useDraggable, type UniqueIdentifier } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import clsx from 'clsx'
import { Tooltip } from '..'
import type { ItemTypes } from '../../../data/items'
import CONTENT_INFO from '../../../data/items'

export type InventoryContentProps = {
  row?: number
  col?: number
  durability?: number
  id: UniqueIdentifier
  isDropTarget?: boolean
  isOverlaping?: boolean
  type: ItemTypes
  onClick?: MouseEventHandler<HTMLDivElement>
}

export default function InventoryContent({
  row,
  col,
  id,
  isDropTarget,
  isOverlaping,
  type,
  durability,
  onClick,
}: InventoryContentProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: { type, durability },
    disabled: type == 'blocker',
  })
  const tooltip_id = useRef(crypto.randomUUID())

  const content_data = CONTENT_INFO[type]

  const style = {
    transform: CSS.Translate.toString(transform),
    '--row': row,
    '--col': col,
    backgroundImage: `url("${content_data.img}")`,
  } as CSSProperties
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      data-tooltip-id={tooltip_id.current}
      data-charm-type={type}
      onClick={onClick}
      className={clsx(
        'charm',
        isDropTarget && 'dropping',
        isOverlaping && 'overlaping'
      )}
      style={style}
    >
      {content_data !== 'blocker'}
      <Tooltip id={tooltip_id.current} title={} description=""></Tooltip>
    </div>
  )
}
