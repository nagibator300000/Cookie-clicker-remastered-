import useGameStore from '@/stores/game';
import { Notification } from '..';
import './NotificationsDisplay.css';

export default function NotificationsDisplay() {
  const notifications = useGameStore((state) => state.notifications);
  const removeNotification = useGameStore((state) => state.removeNotification);
  return (
    <div className="notificationsDisplay">
      {notifications.map((el) => (
        <Notification {...el} onClick={() => removeNotification(el.key)} />
      ))}
    </div>
  );
}
