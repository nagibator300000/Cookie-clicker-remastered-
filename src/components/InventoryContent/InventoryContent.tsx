import { MouseEventHandler, useRef, type CSSProperties } from 'react'
import './InventoryContent.css'
import { useDraggable, type UniqueIdentifier } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import clsx from 'clsx'
import { Tooltip } from '..'
import type { ItemTypes } from '../../../data/items'
import CONTENT_INFO from '../../../data/items'
import GeneralContent from './GeneralContent'
import Charm from './Charm'

export type InventoryContentProps = {
  row?: number
  col?: number
  id: UniqueIdentifier
  durability?: number
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
  const content_data = CONTENT_INFO[type]
  if (type === 'blocker')
    return <GeneralContent row={row} col={col} img={content_data.img} />
  return (
    <Charm
      row={row}
      col={col}
      img={content_data.img}
      id={id}
      title={content_data.title}
      description={content_data.description}
    />
  )
}
