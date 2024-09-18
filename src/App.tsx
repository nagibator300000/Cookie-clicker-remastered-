import "./App.scss";
import { useState } from "react";
import {
  Game,
  Login,
  Account,
  Inventory,
  Avatar,
  Saving,
  Shop,
} from "./components";
import useGameStats from "./hooks/useGameStats";
import { GameActionTypes } from "./utils/gameReducer";
import useUser from "./hooks/useUser";
import { FetchError } from "./utils/fetchJSON";
import useInterval from "./hooks/useInterval";
import { useInventory } from "./components";
import InventoryContent from "./components/InventoryContent/InventoryContent";

function App() {
  const gameStats = useGameStats();
  const inventory = useInventory();

  const [isOpenProfile, setIsOpenProfile] = useState(false);

  function OnClick() {
    {
      gameStats.dispatch({
        type: GameActionTypes.CLICK,
      });
    }
  }
  const user = useUser();

  function ClearProgress() {
    localStorage.clear();
    gameStats.dispatch({ type: GameActionTypes.RESET });
  }

  useInterval(() => {
    gameStats.dispatch({ type: GameActionTypes.AUTOCLICK });
  }, gameStats.stats.periodTime * 1000);
  if (user.isLoading || gameStats.isLoading) {
    return (
      <div className="load">
        <div className="loadAnim"></div>
      </div>
    );
  }
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
      <div className="inventoryHandler">
        <Inventory>
          {inventory.dropTargetData && (
            <InventoryContent
              type={inventory.dropTargetData.type}
              row={inventory.dropTargetData.row}
              col={inventory.dropTargetData.col}
              id="Abob5"
              isDropTarget
            ></InventoryContent>
          )}
          {inventory.inventoryContent.map((el) => {
            return (
              <InventoryContent
                {...el}
                key={el.id}
                isOverlaping={
                  el === inventory.overlap &&
                  el.id !== inventory.dropTargetData?.id
                }
              ></InventoryContent>
            );
          })}
        </Inventory>
      </div>
      <Game
        onClick={OnClick}
        onClear={ClearProgress}
        gameData={gameStats.stats}
      ></Game>
      <Shop></Shop>
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
      <Saving isSaving={gameStats.isSaving} />
    </div>
  );
}

export default App;
