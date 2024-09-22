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
      <button
        className="switch_shop"
        onClick={() => setIsSwitched(!isSwitched)}
      >
        switch
      </button>
      <div className="upgrades_shop">
        <button
          className="product"
          onClick={() => {
            if (stats.count >= 10) {
              dispatch({
                type: GameActionTypes.UPGRADE_PERCLICK,
                payload: { cost: 10, upgrade: 1 },
              });
            }
          }}
        >
          <div className="name">per click</div>
          <div className="buy">10</div>
        </button>
        <button
          className="product"
          onClick={() => {
            if (stats.count >= 100) {
              dispatch({
                type: GameActionTypes.UPGRADE_PERCLICK,
                payload: { cost: 100, upgrade: 0.1 },
              });
            }
          }}
        >
          <div className="name">period time</div>
          <div className="buy">100</div>
        </button>
        <button
          className="product"
          onClick={() => {
            if (stats.count >= 50) {
              dispatch({
                type: GameActionTypes.UPGRADE_PERIOD_POINTS,
                payload: { cost: 50, upgrade: 1 },
              });
            }
          }}
        >
          <div className="name">period points</div>
          <div className="buy">50</div>
        </button>
      </div>
      <div className={clsx("charms_shop", isSwitched && "active")}>
        <InventoryContent id={"fury_of_the_fallen"} type="fury_of_the_fallen" />
        <InventoryContent id={"quick_slash"} type="quick_slash" />
        <InventoryContent id={"fragile_force"} type="fragile_force" />
      </div>
    </div>
  );
}
