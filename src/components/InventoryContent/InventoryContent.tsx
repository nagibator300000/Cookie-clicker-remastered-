import { ItemTypes } from '../../../schemas/itemTypes'
import Charm, { CharmProps } from './Charm'
import Blocker, { BlockerProps } from './Blocker'

type CharmPart = Omit<CharmProps, 'type'>
type BlockerPart = Omit<BlockerProps, 'onClick'>
export interface InventoryContentProps extends BlockerPart, CharmPart {
  type: ItemTypes
  onClick?: BlockerProps['onClick']
}

function InventoryContent({
  row,
  col,
  id,
  type,
  durability,
  onClick,
  isDropTarget,
  isOverlaping,
}: InventoryContentProps) {
  if (type === 'blocker' && onClick) {
    return (
      <Blocker
        row={row}
        col={col}
        onClick={onClick}
        isOverlaping={isOverlaping}
      />
    )
  }
  if (type !== 'blocker')
    return (
      <Charm
        durability={durability}
        type={type}
        row={row}
        col={col}
        id={id}
        isOverlaping={isOverlaping}
        isDropTarget={isDropTarget}
      />
    )
}

export default InventoryContent
