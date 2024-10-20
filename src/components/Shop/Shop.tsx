import { useState } from "react";
import "./Shop.css";
import clsx from "clsx";
import { InventoryContent, useInventory } from "..";
import useNotificationStore from "../../stores/notification";
import { useGameStatsStore } from "../../stores/gameStats";

export default function Shop() {
  const [isSwitched, setIsSwitched] = useState(false);
  const count = useGameStatsStore((stats) => stats.count);
  const upgradePerClick = useGameStatsStore((stats) => stats.upgradePerClick);
  const upgradePeriodTime = useGameStatsStore(
    (stats) => stats.upgradePeriodTime
  );
  const upgradePeriodPoints = useGameStatsStore(
    (stats) => stats.upgradePeriodPoints
  );
  const unlock = useGameStatsStore((stats) => stats.unlock);
  const { setIsEditing, isEditing } = useInventory();
  const add = useNotificationStore((state) => state.add);
  return (
    <div className="shop">
      <button
        className="switch_shop"
        onClick={() => setIsSwitched(!isSwitched)}
      >
        <img
          src="/switch button.png"
          alt=""
          className={clsx("switch_img", isSwitched && "switched")}
        />
      </button>
      <div className="upgrades_shop">
        <button
          className="product"
          disabled={count < 10}
          onClick={() => {
            upgradePerClick(10);
          }}
        >
          <div className="name">per click</div>
          <div className="price">10</div>
        </button>
        <button
          className="product"
          disabled={count < 100}
          onClick={() => {
            upgradePeriodTime(100);
          }}
        >
          <div className="name">period time</div>
          <div className="price">100</div>
        </button>
        <button
          className="product"
          disabled={count < 50}
          onClick={() => {
            upgradePeriodPoints(50);
          }}
        >
          <div className="name">period points</div>
          <div className="price">50</div>
        </button>
        <button
          className="product"
          disabled={count < 50 || isEditing}
          onClick={() => {
            unlock(50);
            setIsEditing(true);
            add({
              type: "info",
              content: "click on the blocker to delete it",
            });
          }}
        >
          <div className="name">unlock slot</div>
          <div className="price">50</div>
        </button>
      </div>
      <div className={clsx("charms_shop", isSwitched && "active")}>
        <div className="row">
          <InventoryContent
            id={"fury_of_the_fallen1"}
            type="fury_of_the_fallen"
          />
          <InventoryContent id={"quick_slash1"} type="quick_slash" />
          <InventoryContent id={"fragile_force1"} type="fragile_force" />
        </div>
        <div className="row">
          <InventoryContent
            id={"fury_of_the_fallen2"}
            type="fury_of_the_fallen"
          />
          <InventoryContent id={"quick_slash2"} type="quick_slash" />
          <InventoryContent id={"fragile_force2"} type="fragile_force" />
        </div>
        <div className="row">
          <InventoryContent
            id={"fury_of_the_fallen3"}
            type="fury_of_the_fallen"
          />
          <InventoryContent id={"quick_slash3"} type="quick_slash" />
          <InventoryContent id={"fragile_force3"} type="fragile_force" />
        </div>
        <div className="row">
          <InventoryContent
            id={"fury_of_the_fallen4"}
            type="fury_of_the_fallen"
          />
          <InventoryContent id={"quick_slash4"} type="quick_slash" />
          <InventoryContent id={"fragile_force4"} type="fragile_force" />
        </div>
      </div>
    </div>
  );
}
