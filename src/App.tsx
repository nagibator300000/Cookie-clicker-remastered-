import "./App.css";
import Counter from "./Counter/counter";
import { Key, ReactNode, useEffect, useState } from "react";
import type { ProductObj } from "./shop/Shop";
import ClearMenu from "./ClearMenu/ClearMenu";
import Product from "./shop/Shop";
import Notification from "./Notification/Notification";
import "./Notification/Notification.css";

function loadData(key: string, defValue: GameStats): GameStats {
  const item = localStorage.getItem(key);
  if (item) {
    return JSON.parse(item);
  }
  return defValue;
}

function saveData(val: GameStats) {
  localStorage.setItem("gameData", JSON.stringify(val));
}

const defaulStats = {
  count: 0,
  perClick: 1,
  periodPoints: 0,
  periodTime: 5,
};

type GameStats = typeof defaulStats;

type Notification = {
  key: string;
  children: ReactNode;
  data?: "info" | "success" | "error" | "warning";
};

const products: ProductObj[] = [
  {
    price: 10,
    name: "UPGRADE!",
    buff: 1,
    type: "perClick",
  },
  {
    price: 100,
    name: "UPGRADE!!!!",
    buff: 12,
    type: "perClick",
  },
  {
    price: 50,
    name: "Points per period",
    buff: 1,
    type: "periodPoints",
  },
  {
    price: 20,
    name: "Period Time",
    buff: -0.1,
    type: "periodTime",
    hidden: (periodTime: number) => Math.round(periodTime * 10) === 1,
  },
];

let appInit = false;

function App() {
  const [indicator, setIndicator] = useState<
    { key: Key; inner: number; top: number; left: number }[]
  >([]);
  const [gameData, setData] = useState(loadData("gameData", defaulStats));
  const [hideMenu, setHide] = useState(true);
  const [notifications, setNotif] = useState<Notification[]>([]);

  function upgradeClickHandler(key: keyof GameStats) {
    return function (buff: number, price: number) {
      if (gameData.count >= price) {
        setData((data) => {
          return {
            ...data,
            [key]: data[key] + buff,
            count: data.count - price,
          };
        });
      }
    };
  }

  function ClearProgress() {
    localStorage.clear();
    setData(defaulStats);
  }

  function indicatorWrapper() {
    return indicator.map((i) => (
      <div
        className="indecator"
        key={i.key}
        style={{ top: i.top, left: i.left }}
      >
        +{i.inner}
      </div>
    ));
  }

  useEffect(() => {
    saveData(gameData);
  }, [gameData]);

  useEffect(() => {
    const period = setInterval(() => {
      setData((data) => {
        return {
          ...data,
          count: data.count + data.periodPoints,
        };
      });
    }, gameData.periodTime * 1000);
    return () => clearInterval(period);
  }, [gameData.periodPoints, gameData.periodTime]);

  useEffect(() => {
    if (!appInit) {
      appInit = true;

      const key = crypto.randomUUID();
      setNotif((arr) => [
        ...arr,
        {
          key,
          children: "Click on coockie to get points",
        },
      ]);
      setTimeout(
        () => setNotif((arr) => arr.filter((item) => item.key !== key)),
        1000
      );
    }
  }, []);

  return (
    <div className="clicker">
      <div className="value">
        <div>{gameData.count}</div>
        <div className="perSecond">
          points per second:
          {(
            gameData.periodPoints / Number(gameData.periodTime.toFixed(1))
          ).toFixed(2)}
        </div>
      </div>
      <Counter
        onClick={(event) => {
          {
            setData({ ...gameData, count: gameData.count + gameData.perClick });
            const newIndicator = {
              key: crypto.randomUUID(),
              inner: gameData.perClick,
              top: event.clientY,
              left: event.clientX,
            };
            setIndicator([...indicator, newIndicator]);
            setTimeout(
              () =>
                setIndicator((ind) =>
                  ind.filter((click) => click.key !== newIndicator.key)
                ),
              1500
            );
          }
        }}
      ></Counter>

      <div className="indecators">{indicatorWrapper()}</div>
      <div className="shop">
        {products.map((product) => {
          return (
            <Product
              {...product}
              active={gameData.count >= product.price}
              onClick={upgradeClickHandler(product.type)}
              key={product.name}
              hidden={product.hidden && product.hidden(gameData.periodTime)}
            />
          );
        })}
      </div>
      <button className="clear" onClick={() => setHide(false)}>
        Clear Progress
      </button>
      <ClearMenu
        isHided={hideMenu}
        OnAcept={() => {
          setHide(true);
          ClearProgress();
        }}
        OnCancel={() => {
          setHide(true);
        }}
      />
      {notifications.map((item) => (
        <Notification data={item.data} key={item.key}>
          {item.children}
        </Notification>
      ))}
    </div>
  );
}

export default App;
