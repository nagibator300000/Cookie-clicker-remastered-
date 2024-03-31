import "./Shop.css";
import { clsx } from "clsx";
export type ProductObj = {
  price: number;
  name: string;
  buff: number;
  type: "perClick" | "periodPoints" | "periodTime";
  hidden?: (periodTime: number) => boolean;
};

type ProductArgs = {
  price: number;
  name: string;
  buff: number;
  type: "perClick" | "periodPoints" | "periodTime";
  hidden?: boolean;
};

export default function Product({
  price,
  name,
  buff,
  onClick,
  active,
  hidden,
}: ProductArgs & {
  onClick: (price: number, buff: number) => void;
  active: boolean;
}) {
  if (!hidden) {
    return (
      <button
        className={clsx("product", active && "active")}
        onClick={() => onClick(buff, price)}
      >
        <div className="price">{price}</div>
        <div className="name">{name}</div>
        <div className="buff">{buff}</div>
      </button>
    );
  }
}
