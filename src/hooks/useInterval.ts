import { useEffect, useRef } from "react";

export default function useInterval(
  callback: () => void,
  interval: number | null
) {
  const func = useRef(callback);
  useEffect(() => {
    if (!interval) return;
    const id = setInterval(func.current, interval);
    return () => clearInterval(id);
  }, [interval]);
  useEffect(() => {
    func.current = callback;
  }, [callback]);
}
