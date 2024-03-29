import { ReactNode } from "react";
import { errorSvg, infoSvg, successSvg, warningSvg } from "./SVGs";
import "./Notification.css";

type args = {
  data?: "error" | "warning" | "info" | "success";
  children?: ReactNode;
  onClick?: () => void;
};

export default function Notification({
  data = "info",
  children,
  onClick,
}: args) {
  let svg;
  if (data == "info") {
    svg = infoSvg();
  } else if (data == "error") {
    svg = errorSvg();
  } else if (data == "warning") {
    svg = warningSvg();
  } else {
    svg = successSvg();
  }
  return (
    <div className="notification" datatype={data} onClick={onClick}>
      {svg}
      <p>
        <b>{data}: </b>
        {children}
      </p>
    </div>
  );
}
