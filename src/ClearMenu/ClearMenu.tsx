import clsx from "clsx";
import "./ClearMenu.css";
type args = {
  isHided: boolean;
  OnAcept: () => void;
  OnCancel: () => void;
};
export default function ClearMenu({ isHided, OnAcept, OnCancel }: args) {
  return (
    <div className={clsx("clearMenu", isHided && "hide")}>
      <h1>Are you sure?</h1>
      <div className="buttons">
        <button onClick={OnAcept}>Acept</button>
        <button onClick={OnCancel}>Cancel</button>
      </div>
    </div>
  );
}
