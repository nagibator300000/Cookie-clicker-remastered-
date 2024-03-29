import "./Shop.css";
import { clsx } from "clsx";
export type ProductArgs = {
  price: number;
  name: string;
  buff: number;
  onClick: (buff: number, price: number) => void;
  type: "perClick" | "autoClick" | "autoSpeed";
  active: boolean;
};
type ShopArgs = ProductArgs[];
export default function Shop(products: ShopArgs) {
  const productsArr = products.map((product) => {
    return <Product {...product} />;
  });

  return <div className="shop">{productsArr}</div>;
}

function Product({ price, name, buff, onClick, type, active }: ProductArgs) {
  switch (type) {
    case "perClick":
      return (
        <div
          className={clsx("product", active && "active")}
          onClick={() => onClick(buff, price)}
        >
          <div className="price">{price}</div>
          <div className="name">{name}</div>
          <div className="buff">+{buff}</div>
        </div>
      );
    case "autoClick":
      return (
        <div
          className={clsx("product", active && "active")}
          onClick={() => onClick(buff, price)}
        >
          <div className="price">{price}</div>
          <div className="name">{name}</div>
          <div className="buff">+{buff}</div>
        </div>
      );
    case "autoSpeed":
      return (
        <div
          className={clsx("product", active && "active")}
          onClick={() => onClick(buff, price)}
        >
          <div className="price">{price}</div>
          <div className="name">{name}</div>
          <div className="buff">-{buff} time</div>
        </div>
      );
  }
}
