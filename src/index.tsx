import { ReactNode } from "react";

export type NotificationData = {
  key: string;
  children: ReactNode;
  data?: "info" | "success" | "error" | "warning";
};
