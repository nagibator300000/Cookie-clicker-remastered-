import { createContext, ReactNode, useContext, useState } from "react";
import { Notification } from "..";
import type { NotificationData } from "..";

type NotificationProviderProps = { children: ReactNode };

interface NotificationContext {
  add: (data: NotificationData) => void;
}

interface NotificationState extends NotificationData {
  key: string;
}

const notificationContext = createContext<NotificationContext | null>(null);

export default function NotificationProvider({
  children,
}: NotificationProviderProps) {
  const [notificationData, setNotificationData] = useState<NotificationState[]>(
    []
  );
  const add = (data: NotificationData) => {
    const notificationKey = crypto.randomUUID();
    const newNotification = { ...data, key: notificationKey };
    setNotificationData((notifications) => [...notifications, newNotification]);
    setTimeout(() => {
      hide(notificationKey);
    }, 1000 * 5);
  };
  const hide = (key: string) =>
    setNotificationData((notifications) => {
      return notifications.filter((el) => el.key !== key);
    });
  return (
    <notificationContext.Provider value={{ add }}>
      {children}
      <div className="notifications">
        {notificationData.map((notif) => {
          return <Notification {...notif} onClick={() => hide(notif.key)} />;
        })}
      </div>
    </notificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(notificationContext);
  if (!context) {
    throw new Error(
      "This hook shouldn't be used outside of NotificationProvider"
    );
  }
  return context;
}
