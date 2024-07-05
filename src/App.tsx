import "./App.scss";
import { ReactNode, useEffect, useRef, useState } from "react";
import {
  Notification,
  Game,
  Login,
  Account,
  GridContext,
  Charm,
  Inventory,
} from "./components";
import type { CharmProps, GridMoveEvent } from "./components";
import { useFetch } from "./utils";
import { User } from "@prisma/client";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

const port = import.meta.env.VITE_BACK_PORT;

const backURL = `http://localhost:${port}`;

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
  const [dropTargetData, setDropTargetData] = useState<CharmProps | null>(null);
  const [charms, setCharms] = useState<CharmProps[]>([]);

  const overlap = charms.find(
    (val) => val.col === dropTargetData?.col && val.row === dropTargetData?.row
  );

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

  function OnMove(event: GridMoveEvent) {
    if (event.position) {
      const newDropTargetData = {
        ...event.position,
        id: event.active.id,
        url: event.active.data.current?.url,
      };
      setDropTargetData(newDropTargetData);
    } else {
      setDropTargetData(null);
    }
  }

  function OnEnd() {
    if (!dropTargetData) return;
    if (overlap) {
      setDropTargetData(null);
      return;
    }
    setCharms([
      ...charms.filter((el) => el.id !== dropTargetData.id),
      {
        ...dropTargetData,
        id: `col:${dropTargetData.col} row:${dropTargetData.row}`,
      },
    ]);
    setDropTargetData(null);
  }

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
        onGridMove={OnMove}
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
        <div className="inventoryHandler">
          <Inventory>
            {dropTargetData && (
              <Charm
                url={dropTargetData.url}
                row={dropTargetData.row}
                col={dropTargetData.col}
                id="Abob5"
                isDropTarget
              ></Charm>
            )}
            {charms.map((el) => {
              return (
                <Charm
                  {...el}
                  key={el.id}
                  isOverlaping={el === overlap && el.id !== dropTargetData?.id}
                ></Charm>
              );
            })}
          </Inventory>
        </div>
        <Game functions={GameFunctions.current} gameData={gameData}></Game>
        <div className="right">
          <Charm id="Abob1" url="/Charms/Fragile Strength.png" />
          <Charm id="Abob2" url="/Charms/Fury of the Fallen.png" />
          <Charm id="Abob3" url="/Charms/Quick Slash.png" />

          <div className="user">
            {isUser(user) ? (
              <Account url={user.picture} name={user.name} />
            ) : (
              <Login url={`${backURL}/login`} />
            )}
          </div>
        </div>
      </GridContext>
    </div>
  );
}

export default App;
export type { GameStats };
