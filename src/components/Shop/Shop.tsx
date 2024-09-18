import { useState } from "react";
import "./Shop.css";
import clsx from "clsx";
import { InventoryContent } from "..";
import useGameStats from "../../hooks/useGameStats";
import { GameActionTypes } from "../../utils/gameReducer";

export default function Shop() {
  const [isSwitched, setIsSwitched] = useState(false);
  const { stats, dispatch } = useGameStats();
  return (
    <div className="shop">
      <div className="upgrades_shop">
        <button className="open_shop" onClick={() => setIsSwitched(true)}>
          open
        </button>
        <div className="product">
          <div className="name">per click</div>
          <button
            className="buy"
            onClick={() => {
              if (stats.count >= 10) {
                dispatch({
                  type: GameActionTypes.UPGRADE_PERCLICK,
                  payload: { cost: 10, upgrade: 1 },
                });
              }
            }}
          >
            10
          </button>
        </div>
        <div className="product">
          <div className="name">period time</div>
          <button className="buy">100</button>
        </div>
        <div className="product">
          <div className="name">period points</div>
          <button className="buy">50</button>
        </div>
      </div>
      <div className={clsx("charms_shop", isSwitched && "active")}>
        <button className="close_shop" onClick={() => setIsSwitched(false)}>
          close
        </button>
        <InventoryContent id={"fury_of_the_fallen"} type="fury_of_the_fallen" />
        <InventoryContent id={"quick_slash"} type="quick_slash" />
        <InventoryContent id={"fragile_force"} type="fragile_force" />
      </div>
    </div>
  );
}
