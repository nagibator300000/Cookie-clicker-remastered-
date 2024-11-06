import { Counter } from "../";
import ClearMenu from "../ClearMenu/ClearMenu";
import { Key, useState } from "react";
import Indicator from "../Indicator/Indicator";
import "./Game.css";
import useGameStore from "../../stores/game";

type Indecator = {
  key: Key;
  position: {
    x: number;
    y: number;
  };
};

export default function Game({}) {
  const [hideMenu, setHide] = useState(true);
  const [indicator, setIndicator] = useState<Indecator[]>([]);
  const reset = useGameStore((stats) => stats.reset);
  const count = useGameStore((stats) => stats.count);
  const click = useGameStore((stats) => stats.click);
  function indicatorWrapper() {
    return indicator.map((i) => (
      <Indicator position={i.position} key={i.key} />
    ));
  }
  function ClearProgress() {
    localStorage.clear();
    reset();
  }
  return (
    <div className="game">
      <div className="value">
        <div className="geoes">
          <img src="/Geo.png"></img>
          {count}
        </div>
      </div>
      <Counter
        img={"/Deposit 1.png"}
        onClick={(event) => {
          click();
          const newIndicator = {
            key: crypto.randomUUID(),
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
          ClearProgress();
        }}
        OnCancel={() => {
          setHide(true);
        }}
      />
    </div>
  );
}
