import { MouseEventHandler } from 'react'
import CONTENT_INFO from '../../../data/items'
import GeneralContent, { ChildProps } from './GeneralContent'

export interface BlockerProps extends ChildProps {
  onClick: MouseEventHandler<HTMLDivElement>
}

export default function Blocker({ row, col, onClick }: BlockerProps) {
  const content_data = CONTENT_INFO['blocker']
  return (
    <GeneralContent
      row={row}
      col={col}
      img={content_data.img}
      onClick={onClick}
    />
  )
}
