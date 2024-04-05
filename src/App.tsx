import "./App.css";
import Counter from "./Counter/counter";
import { Key, useEffect, useState } from "react";
import type { ProductObj } from "./shop/Shop";
import ClearMenu from "./ClearMenu/ClearMenu";
import Product from "./shop/Shop";

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

function App() {
  const [indicator, setIndicator] = useState<
    { key: Key; inner: number; top: number; left: number }[]
  >([]);
  const [gameData, setData] = useState(loadData("gameData", defaulStats));
  const [hideMenu, setHide] = useState(true);

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

  return (
    <div className="clicker">
      <div className="value">
        <div>{gameData.count}</div>
        <div className="perSecond">
          points per second:{gameData.periodPoints / gameData.periodTime}
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
      {/* products,
        upgradeClickHandler(),
        [
          products[0].price < gameData.count,
          products[1].price < gameData.count,
          products[2].price < gameData.count,
          products[3].price < gameData.count,
        ],
        [false, false, false, ]
      )} */}
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
    </div>
  );
}

export default App;
