import { ReactNode } from "react";
import "./Counter.css";
type args = {
  onClick: (event: React.MouseEvent) => void;
  img: string;
  children: ReactNode;
};
export default function Counter({ onClick, img, children }: args) {
  return (
    <button className="counter">
      <img src={img} onClick={onClick} />
      {children}
    </button>
  );
}
