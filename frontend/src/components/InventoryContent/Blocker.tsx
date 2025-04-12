import { MouseEventHandler } from 'react';
import GeneralContent, { ChildProps } from './GeneralContent';
import { getCharm } from '@data/items';

export interface BlockerProps extends ChildProps {
  onClick: MouseEventHandler<HTMLDivElement>;
}

export default function Blocker({ row, col, onClick }: BlockerProps) {
  const content_data = getCharm('blocker');
  if (!content_data) {
    throw new Error('Check items.ts');
  }
  return (
    <GeneralContent
      row={row}
      col={col}
      img={content_data.img}
      onClick={onClick}
    />
  );
}
