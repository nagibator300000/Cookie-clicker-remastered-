import useNotificationStore from "../../stores/notification";
import { Notification } from "..";
import "./NotificationsDisplay.css";

export default function NotificationsDisplay() {
  const notifications = useNotificationStore((state) => state.notifications);
  const remove = useNotificationStore((state) => state.remove);
  return (
    <div className="notificationsDisplay">
      {notifications.map((el) => (
        <Notification {...el} onClick={() => remove(el.key)} />
      ))}
    </div>
  );
}
