import "./Shop.css";
import { clsx } from "clsx";
export type ProductArgs = {
  price: number;
  name: string;
  buff: number;
  onClick: (buff: number, price: number) => void;
  active: boolean;
};
type ShopArgs = ProductArgs[];
export default function Shop(products: ShopArgs) {
  const productsArr = products.map((product) => {
    return <Product {...product} />;
  });

  return <div className="shop">{productsArr}</div>;
}

function Product({ price, name, buff, onClick, active }: ProductArgs) {
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
