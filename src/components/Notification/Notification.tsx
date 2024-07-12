import { ReactNode } from "react";
import { errorSvg, infoSvg, successSvg, warningSvg } from "./SVGs";
import "./Notification.css";

export interface NotificationData {
  type?: "error" | "warning" | "info" | "success";
  content?: ReactNode;
}

interface NotificationProps extends NotificationData {
  onClick?: () => void;
}

const SVGs = {
  info: infoSvg(),
  error: errorSvg(),
  warning: warningSvg(),
  success: successSvg(),
};

export default function Notification({
  type = "info",
  content,
  onClick,
}: NotificationProps) {
  const svg = SVGs[type];
  return (
    <div className={`notification natification_${type}`} onClick={onClick}>
      {svg}
      <p>
        <b>{type}: </b>
        {content}
      </p>
    </div>
  );
}
