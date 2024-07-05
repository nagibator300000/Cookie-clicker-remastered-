import { Counter } from "../";
import ClearMenu from "../ClearMenu/ClearMenu";
import { Key, useState } from "react";
import type { GameStats } from "../../App";
import Indicator from "../Indicator/Indicator";
import "./Game.css";

type Indecator = {
  key: Key;
  inner: number;
  position: {
    x: number;
    y: number;
  };
};

type GameArgs = {
  gameData: GameStats;
  functions: {
    OnClick: () => void;
    ClearFunction: () => void;
  };
};

export default function Game({ gameData, functions }: GameArgs) {
  const [hideMenu, setHide] = useState(true);
  const [indicator, setIndicator] = useState<Indecator[]>([]);
  function indicatorWrapper() {
    return indicator.map((i) => (
      <Indicator position={i.position} val={String(i.inner)} key={i.key} />
    ));
  }
  return (
    <div className="game">
      <div className="value">
        <div className="geoes">
          <img src="/Geo.png"></img>
          {gameData.count}
        </div>
        <div className="perSecond">
          points per second:
          {(
            gameData.periodPoints / Number(gameData.periodTime.toFixed(1))
          ).toFixed(2)}
        </div>
      </div>
      <Counter
        img={"/Deposit 1"}
        onClick={(event) => {
          functions.OnClick();
          const newIndicator = {
            key: crypto.randomUUID(),
            inner: gameData.perClick,
            position: {
              x: event.clientX,
              y: event.clientY,
            },
          };
          setIndicator([...indicator, newIndicator]);
          setTimeout(
            () =>
              setIndicator((ind) =>
                ind.filter((click) => click.key !== newIndicator.key)
              ),
            1500
          );
        }}
      >
        {indicatorWrapper()}
      </Counter>
      <button className="clear" onClick={() => setHide(false)}>
        Clear Progress
      </button>
      <ClearMenu
        isHided={hideMenu}
        OnAcept={() => {
          setHide(true);
          functions.ClearFunction();
        }}
        OnCancel={() => {
          setHide(true);
        }}
      />
    </div>
  );
}
