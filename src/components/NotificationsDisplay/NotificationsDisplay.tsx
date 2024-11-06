import useNotificationStore from "../../stores/notification";
import { Notification } from "..";

export default function NotificationsDisplay() {
  const notifications = useNotificationStore((state) => state.notifications);
  return notifications.map((el) => <Notification {...el} />);
}
