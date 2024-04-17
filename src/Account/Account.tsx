import { useState } from "react";
import Avatar from "../Avatar/Avatar";
import clsx from "clsx";
import "./Account.css";

type Args = {
  url: string;
  name: string;
};

export default function Account({ url, name }: Args) {
  const [isHidden, setHidden] = useState(true);
  return (
    <div>
      <button onClick={() => setHidden(false)} className="account">
        <Avatar img={url} />
      </button>
      <div className={clsx("overlay", isHidden && "hide")}>
        <div className="userData">
          <Avatar img={url} />
          <div className="name">{name}</div>
        </div>
        <div className="achivments">
          Achivments
          <div className="achivmentsConteiner">
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
            <div className="achivment"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
