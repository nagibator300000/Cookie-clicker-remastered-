import { useEffect, useState } from "react";
import "./Saving.scss";
import clsx from "clsx";

type SavingProps = {
  isSaving: boolean;
};

export default function Saving({ isSaving }: SavingProps) {
  const [isTimeoutEnd, setIsTimeoutEnd] = useState(false);
  const isShown = !isTimeoutEnd || isSaving;
  useEffect(() => {
    console.log(isSaving + " saving");
    console.log(isTimeoutEnd + " timeout end");
    if (isSaving) {
      setIsTimeoutEnd(false);
      const timeout = setTimeout(() => {
        setIsTimeoutEnd(true), 6000;
      });
      return () => clearTimeout(timeout);
    }
  }, [isSaving]);
  return <div className={clsx("saving", isShown && "visible")}></div>;
}
