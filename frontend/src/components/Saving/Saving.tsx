import { useEffect, useRef, useState } from 'react';
import './Saving.scss';
import clsx from 'clsx';

type SavingProps = {
  isSaving: boolean;
};
type Timeout = ReturnType<typeof setTimeout>;

export default function Saving({ isSaving }: SavingProps) {
  const [isTimeoutEnd, setIsTimeoutEnd] = useState(true);
  const isShown = !isTimeoutEnd || isSaving;
  const timeout = useRef<null | Timeout>(null);

  useEffect(() => {
    if (isSaving && !timeout.current) {
      setIsTimeoutEnd(false);
      timeout.current = setTimeout(() => {
        setIsTimeoutEnd(true);
        timeout.current = null;
      }, 500);
    }
  }, [isSaving]);
  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);
  return <div className={clsx('saving', isShown && 'visible')}></div>;
}
