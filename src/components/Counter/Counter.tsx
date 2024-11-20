import { ReactNode, forwardRef } from "react";
import "./Counter.css";
type CounterProps = {
  onClick: (event: React.MouseEvent) => void;
  img: string;
  children: ReactNode;
};
const Counter = forwardRef<HTMLButtonElement, CounterProps>(
  ({ onClick, img, children }, ref) => {
    return (
      <button className="counter" ref={ref}>
        <img src={img} onClick={onClick} />
        {children}
      </button>
    );
  }
);

export default Counter;
