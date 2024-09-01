import "./App.scss";
import { useEffect, useState } from "react";
import {
  Game,
  Login,
  Account,
  GridContext,
  Charm,
  Inventory,
  Avatar,
} from "./components";
import type { CharmProps, GridMoveEvent } from "./components";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import useGameStats from "./utils/useGameStats";
import { GameActionTypes } from "./utils/gameReducer";
import useUser from "./utils/useUser";
import { FetchError } from "./utils/fetchJSON";
import useInterval from "./utils/useInterval";

function App() {
  const gameStats = useGameStats();
  const [dropTargetData, setDropTargetData] = useState<CharmProps | null>(null);
  const [charms, setCharms] = useState<CharmProps[]>([]);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isSavingAnimationEnd, setIsSavingAnimationEnd] = useState(true);

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
    if (gameStats.isSaving) {
      setIsSavingAnimationEnd(false);
      const timeout = setTimeout(() => {
        setIsSavingAnimationEnd(true), 6000;
      });
      return () => clearTimeout(timeout);
    }
  }, [gameStats.isSaving]);

  useInterval(() => {
    gameStats.dispatch({ type: GameActionTypes.AUTOCLICK });
  }, gameStats.stats.periodTime);
  if (user.isLoading || gameStats.isLoading) {
    return (
      <div className="load">
        <div className="loadAnim"></div>
      </div>
    );
  }
  console.log(isSavingAnimationEnd);
  if (user.error instanceof FetchError && user.error.status === 401) {
    return <Login></Login>;
  }
  if (user.error || !user.data || gameStats.error) {
    console.log(gameStats.error);
    return (
      <div className="oops">
        <h1>Oops</h1>
        <h5>We've got some problems with backend</h5>
      </div>
    );
  }
  return (
    <div className="clicker">
      <GridContext
        horizontalCellCount={5}
        verticalCellCount={10}
        modifiers={[restrictToWindowEdges]}
        onGridMove={OnMove}
        onDragEnd={OnEnd}
      >
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
          gameData={gameStats.stats}
        ></Game>
        <div className="right">
          <Charm id="Abob1" url="/Charms/Fragile Strength.png" />
          <Charm id="Abob2" url="/Charms/Fury of the Fallen.png" />
          <Charm id="Abob3" url="/Charms/Quick Slash.png" />
        </div>
        {isOpenProfile && (
          <Account
            url={user.data.picture}
            name={user.data.name}
            onClose={() => {
              setIsOpenProfile(false);
            }}
          />
        )}
        <button className="account" onClick={() => setIsOpenProfile(true)}>
          Profile
          <Avatar img={user.data.picture} />
        </button>

        {(gameStats.isSaving || !isSavingAnimationEnd) && (
          <div className="saving"></div>
        )}
      </GridContext>
    </div>
  );
}

export default App;
