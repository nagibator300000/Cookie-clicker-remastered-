import "./App.scss";
import { ReactNode, useEffect, useRef, useState } from "react";
import type { ProductObj } from "./shop/Shop";
import Product from "./shop/Shop";
import Notification from "./Notification/Notification";
import "./Notification/Notification.css";
import "./Game/Game.css";
import Game from "./Game/Game";
import Login from "./Login/Login";
import Account from "./Account/Account";
import useFetch from "./useFetch";
import { User } from "@prisma/client";
import { DragEndEvent, DragMoveEvent } from "@dnd-kit/core";
import Draggable from "./Dragable/Dragable";
import "./Dragable/Dragable.css";
import Droppable from "./Droppable/Droppable";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import GridContext from "./GridContext/GridContext";

const port = import.meta.env.VITE_BACK_PORT;

const backURL = `http://localhost:${port}`;

// function loadData(key: string, defValue: GameStats): GameStats {
//   const item = fetch("http://localhost:1488/gamedata", {
//     headers: {
//       "Content-Type": "application/json",
//     },
//     credentials: "include",
//   });
//   if (item) {
//     return JSON.parse(item);
//   }
//   return defValue;
// }

// function saveData(val: GameStats) {
//   fetch("http://localhost:1488/gamedata", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(val),
//     credentials: "include",
//   });
// }

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

// const products: ProductObj[] = [
//   {
//     price: 10,
//     name: "UPGRADE!",
//     buff: 1,
//     type: "perClick",
//   },
//   {
//     price: 100,
//     name: "UPGRADE!!!!",
//     buff: 12,
//     type: "perClick",
//   },
//   {
//     price: 50,
//     name: "Points per period",
//     buff: 1,
//     type: "periodPoints",
//   },
//   {
//     price: 20,
//     name: "Period Time",
//     buff: -0.1,
//     type: "periodTime",
//     hidden: (periodTime: number) => Math.round(periodTime * 10) === 1,
//   },
// ];

let appInit = false;

function isUser(obj: unknown): obj is User {
  return (
    typeof obj === "object" &&
    !!obj &&
    "id" in obj &&
    typeof obj.id === "string" &&
    "picture" in obj &&
    typeof obj.picture === "string" &&
    "name" in obj &&
    typeof obj.name === "string" &&
    "gameData" in obj &&
    typeof obj.gameData === "string"
  );
}

function App() {
  const [gameData, setData] = useState(defaulStats);
  const [notifications, setNotif] = useState<Notification[]>([]);
  const [isSaving, setSaving] = useState(false);
  const [dropTargetData, setDropTargetData] = useState(false);
  const GameFunctions = useRef({
    OnClick: () => {
      {
        setData({
          ...gameData,
          count: gameData.count + gameData.perClick,
        });
      }
    },
    ClearFunction: ClearProgress,
  });
  const [user, error, load] = useFetch(`${backURL}/user`, {
    credentials: "include",
  });

  function OnMove(event: DragMoveEvent) {
    console.log("move");
    if (event.over) {
      setDropTargetData(true);
      console.log("over");
    } else {
      setDropTargetData(false);
    }
  }

  function OnEnd() {
    setDropTargetData(false);
  }

  // function upgradeClickHandler(key: keyof GameStats) {
  //   return function (buff: number, price: number) {
  //     if (gameData.count >= price) {
  //       setData((data) => {
  //         return {
  //           ...data,
  //           [key]: data[key] + buff,
  //           count: data.count - price,
  //         };
  //       });
  //     }
  //   };
  // }

  function ClearProgress() {
    localStorage.clear();
    setData(defaulStats);
  }

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
        60000
      );
    }
  }, []);

  // useEffect(() => {
  //   setInterval(() => {
  //     setData((data) => {
  //       saveData(data);
  //       return data;
  //     });
  //     setSaving((val) => !val);
  //     setTimeout(() => setSaving((val) => !val), 500);
  //   }, 60000);
  //   return setData((data) => {
  //     saveData(data);
  //     return data;
  //   });
  // }, []);

  return load ? (
    <div className="load">
      <div className="loadAnim"></div>
    </div>
  ) : (
    <div className="clicker">
      <GridContext
        horizontalCellCount={5}
        verticalCellCount={10}
        modifiers={[restrictToWindowEdges]}
        onDragMove={OnMove}
        onDragEnd={OnEnd}
      >
        <div className="overlayer">
          {notifications.map((item) => (
            <Notification data={item.data} key={item.key}>
              {item.children}
            </Notification>
          ))}
          <div className="topFleur"></div>
          <div className="bottomFleur"></div>
          <div className="leftCornerFleur"></div>
          <div className="rightCornerFleur"></div>
          {isSaving && <div className="saving"></div>}
        </div>
        <Droppable>
          <div className="inventory">
            {dropTargetData && <div className="char"></div>}
          </div>
        </Droppable>
        <Game functions={GameFunctions.current} gameData={gameData}></Game>
        <div className="right">
          <Draggable id="abob">
            <div className="char"></div>
          </Draggable>

          <div className="user">
            {isUser(user) ? (
              <Account url={user.picture} name={user.name} />
            ) : (
              <Login url={`${backURL}/login`} />
            )}
          </div>

          {/* <div className="shop">
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
          </div> */}
        </div>
      </GridContext>
    </div>
  );
}

export default App;
export type { GameStats };
