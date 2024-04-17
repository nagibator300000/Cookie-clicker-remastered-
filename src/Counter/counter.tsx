import { ReactNode } from "react";
import "./counter.css";
type args = {
  onClick: (event: React.MouseEvent) => void;
  img: string;
  children: ReactNode;
};
export default function Counter({ onClick, img, children }: args) {
  img = "/" + img + ".png";
  return (
    <button className="counter">
      <img src={img} onClick={onClick} />
      {children}
    </button>
  );
}
