import "./App.css";
import Counter from "./Counter/counter";
import Shop from "./shop/Shop";
import { useEffect, useState } from "react";
import { ProductArgs } from "./shop/Shop";
import ClearMenu from "./ClearMenu/ClearMenu";

function loadData(key: string, defValue: number) {
  return Number(localStorage.getItem(key) || defValue);
}

function App() {
  function upgradeClickHandler(
    method: (value: React.SetStateAction<number>) => void
  ) {
    return function (buff: number, price: number) {
      if (count >= price) {
        method((v) => v + buff);
        setCount(count - price);
      }
    };
  }

  function Save() {
    localStorage.setItem("count", count.toString());
    localStorage.setItem("perclick", perclick.toString());
    localStorage.setItem("periodTime", periodTime.toString());
    localStorage.setItem("periodPoints", periodPoints.toString());
  }

  function ClearProgress() {
    localStorage.setItem("count", "0");
    localStorage.setItem("perclick", "1");
    localStorage.setItem("periodTime", "15");
    localStorage.setItem("periodPoints", "0");
    setCount(0);
  }

  const [count, setCount] = useState(loadData("count", 0));
  const [perclick, setPerClick] = useState(loadData("perClick", 1));
  const [periodTime, setTime] = useState(loadData("periodTime", 15));
  const [periodPoints, setPoints] = useState(loadData("periodPoints", 0));
  const [hideMenu, setHide] = useState(true);

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
      onClick: upgradeClickHandler(setPerClick),
      active: count < 10 ? false : true,
    },
    {
      price: 100,
      name: "UPGRADE!!!!",
      buff: 12,
      onClick: upgradeClickHandler(setPerClick),
      active: count < 100 ? false : true,
    },
    {
      price: 50,
      name: "Points per period",
      buff: 1,
      onClick: upgradeClickHandler(setPoints),
      active: count < 50 ? false : true,
    },
    {
      price: 20,
      name: "Period Time",
      buff: -0.1,
      onClick: upgradeClickHandler(setTime),
      active: count < 20 ? false : true,
    },
  ];

  return (
    <div className="clicker">
      <div className="value">{count}</div>
      <Counter onClick={() => setCount(count + perclick)}></Counter>
      {Shop(products)}
      <button className="clear" onClick={() => setHide(false)}>
        Clear Progress
      </button>
      <ClearMenu
        isHided={hideMenu}
        OnAcept={() => {
          setHide(true);
          ClearProgress();
        }}
        OnCancellation={() => {
          setHide(true);
        }}
      />
    </div>
  );
}

export default App;
