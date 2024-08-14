import "./App.scss";
import { useEffect, useState } from "react";
import {
  Game,
  Login,
  Account,
  GridContext,
  Charm,
  Inventory,
} from "./components";
import type { CharmProps, GridMoveEvent } from "./components";
import { isUser } from "./utils";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { useGameStats } from "./components/ReducerProvider/ReducerProvider";
import { GameActionTypes } from "./utils/gameReducer";
import useUser from "./utils/useUser";

const port = import.meta.env.VITE_BACK_PORT;

const backURL = `http://localhost:${port}`;

function App() {
  const gameStats = useGameStats();
  const [isSaving, setIsSaving] = useState(false);
  const [dropTargetData, setDropTargetData] = useState<CharmProps | null>(null);
  const [charms, setCharms] = useState<CharmProps[]>([]);

  const overlap = charms.find(
    (val) => val.col === dropTargetData?.col && val.row === dropTargetData?.row
  );

  function OnClick() {
    {
      gameStats.dispatch({
        type: GameActionTypes.CLICK,
      });
    }
  }
  const user = useUser();

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
    gameStats.dispatch({ type: GameActionTypes.RESET });
  }

  useEffect(() => {
    const period = setInterval(() => {
      gameStats.dispatch({ type: GameActionTypes.AUTOCLICK });
    }, gameStats.state.periodTime * 1000);
    return () => clearInterval(period);
  }, [gameStats]);

  return user.isLoading ? (
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
          <div className="user">
            {user.data ? (
              <Account url={user.data.picture} name={user.data.name} />
            ) : (
              <Login url={`${backURL}/login`} />
            )}
          </div>
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
        <Game
          onClick={OnClick}
          onClear={ClearProgress}
          gameData={gameStats.state}
        ></Game>
        <div className="right">
          <Charm id="Abob1" url="/Charms/Fragile Strength.png" />
          <Charm id="Abob2" url="/Charms/Fury of the Fallen.png" />
          <Charm id="Abob3" url="/Charms/Quick Slash.png" />
        </div>
      </GridContext>
    </div>
  );
}

export default App;
