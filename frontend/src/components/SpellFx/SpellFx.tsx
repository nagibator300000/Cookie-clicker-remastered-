import { CSSProperties, useState } from 'react';
import './SpellFx.scss';

import type { SpellFxData } from '../../stores/game';
import clsx from 'clsx';

interface SpellStyle extends CSSProperties {
  '--x': string;
  '--y': string;
}

interface SpellFxProps extends SpellFxData {
  onAnimationEnd: () => void;
}

export default function SpellFx({
  start,
  finish,
  onAnimationEnd,
}: SpellFxProps) {
  const [isCollide, setIsCollide] = useState(false);
  return (
    <div
      className={clsx('spell', isCollide && 'collide')}
      style={
        {
          '--x': start.x + 'px',
          '--y': start.y + 'px',
          '--target-x': finish.x + 'px',
          '--target-y': finish.y + 'px',
        } as SpellStyle
      }
      onAnimationEnd={() => {
        setIsCollide(true);
        if (isCollide) {
          onAnimationEnd();
        }
      }}
    ></div>
  );
}
