import { UniqueIdentifier, useDraggable } from '@dnd-kit/core'
import GeneralContent from './GeneralContent'
import { CSS } from '@dnd-kit/utilities'
import { ItemTypes } from '../../../data/items'
import { Tooltip } from '..'

interface CharmProps {
  row?: number
  col?: number
  img: string
  id: UniqueIdentifier
  durability?: number
  type: Exclude<ItemTypes, 'blocker'>
  title: string
  description: string
}

export default function Charm({
  row,
  col,
  img,
  id,
  durability,
  type,
  title,
  description,
}: CharmProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: { type, durability },
  })
  return (
    <GeneralContent
      row={row}
      col={col}
      img={img}
      {...attributes}
      {...listeners}
      style={{ transform: CSS.Transform.toString(transform) }}
      ref={setNodeRef}
    >
      <Tooltip
        id={id.toString()}
        title={title}
        description={description}
      ></Tooltip>
    </GeneralContent>
  )
}
