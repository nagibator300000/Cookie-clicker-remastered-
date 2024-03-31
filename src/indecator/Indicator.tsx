import { useEffect, useRef, useState } from "react";
import "./Indicator.css";

type Args = {
  position: { x: number; y: number };
};

const fps = 60;

function initialSpeed() {
  return Math.random() * 20 - 10;
}

export default function Indicator({ position }: Args) {
  const [ofs, setOfs] = useState({ x: 0, y: 0 });
  const verticalSpeed = useRef(-5);
  const horizontalSpeed = useRef(initialSpeed());
  useEffect(() => {
    let id: number;
    let prevTime = 0;
    function update(currentTime: number) {
      id = requestAnimationFrame(update);
      if (currentTime - prevTime < (1 / fps) * 1000) return;
      setOfs((ofset) => {
        const newOfs = { ...ofset };
        newOfs.y += verticalSpeed.current;
        newOfs.x += horizontalSpeed.current;
        return newOfs;
      });
      prevTime = currentTime;
    }
    id = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(id);
    };
  }, []);
  verticalSpeed.current += 0.1;
  return (
    <div
      className="indicator"
      style={{
        "--ofs": `calc(${ofs.x}px - 50%),calc(${ofs.y}px - 50%)`,
        left: position.x,
        top: position.y,
      }}
    ></div>
  );
}
