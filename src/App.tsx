import "./App.css";
import Counter from "./Counter/counter";
import Shop from "./shop/Shop";
import { useEffect, useState } from "react";
import { ProductArgs } from "./shop/Shop";

function App() {
  function PerClickBonus(buff: number, price: number) {
    if (count >= price) {
      setPerClick(perclick + buff);
      setCount(count - price);
    }
  }

  function PeriodPointsBonus(buff: number, price: number) {
    if (count >= price) {
      setPoints(periodPoints + buff);
      setCount(count - price);
    }
  }

  function PeriodTimeBonus(buff: number, price: number) {
    if (count >= price) {
      setTime(periodTime - buff);
      setCount(count - price);
    }
  }

  function Save() {
    localStorage.setItem("count", count.toString());
    localStorage.setItem("perclick", perclick.toString());
    localStorage.setItem("periodTime", periodTime.toString());
    localStorage.setItem("periodPoints", periodPoints.toString());
  }

  const [count, setCount] = useState(
    Number(localStorage.getItem("count") ? localStorage.getItem("count") : 0)
  );
  const [perclick, setPerClick] = useState(
    Number(
      localStorage.getItem("perClick") ? localStorage.getItem("perClick") : 1
    )
  );
  const [periodTime, setTime] = useState(
    Number(
      localStorage.getItem("periodTime")
        ? localStorage.getItem("periodTime")
        : 15
    )
  );
  const [periodPoints, setPoints] = useState(
    Number(
      localStorage.getItem("periodPoints")
        ? localStorage.getItem("periodPoints")
        : 0
    )
  );

  useEffect(() => {
    Save();
  }, [count]);

  useEffect(() => {
    const period = setInterval(
      () => setCount((val) => val + periodPoints),
      periodTime * 1000
    );
    return () => clearInterval(period);
  }, [periodPoints, periodTime]);

  const products: ProductArgs[] = [
    {
      price: 10,
      name: "UPGRADE!",
      buff: 1,
      onClick: PerClickBonus,
      type: "perClick",
      active: count < 10 ? false : true,
    },
    {
      price: 100,
      name: "UPGRADE!!!!",
      buff: 12,
      onClick: PerClickBonus,
      type: "perClick",
      active: count < 100 ? false : true,
    },
    {
      price: 50,
      name: "Points per period",
      buff: 1,
      onClick: PeriodPointsBonus,
      type: "autoClick",
      active: count < 50 ? false : true,
    },
    {
      price: 20,
      name: "Period Time",
      buff: 0.1,
      onClick: PeriodTimeBonus,
      type: "autoSpeed",
      active: count < 20 ? false : true,
    },
  ];

  return (
    <div className="clicker">
      <div className="value">{count}</div>
      <Counter onClick={() => setCount(count + perclick)}></Counter>
      {Shop(products)}
    </div>
  );
}

export default App;
