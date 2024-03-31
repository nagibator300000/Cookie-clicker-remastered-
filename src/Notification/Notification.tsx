import { ReactNode } from "react";
import { errorSvg, infoSvg, successSvg, warningSvg } from "./SVGs";
import "./Notification.css";

type args = {
  data?: "error" | "warning" | "info" | "success";
  children?: ReactNode;
  onClick?: () => void;
};

const SVGs = {
  info: infoSvg(),
  error: errorSvg(),
  warning: warningSvg(),
  success: successSvg(),
};

export default function Notification({
  data = "info",
  children,
  onClick,
}: args) {
  const svg = SVGs[data];
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
