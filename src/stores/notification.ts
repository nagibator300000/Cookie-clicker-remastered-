import { create } from "zustand";
import { NotificationData } from "../components";

interface NotificationState extends NotificationData {
  key: string;
}

interface NotificationStore {
  add: (data: NotificationData) => void;
  hide: (key: string) => void;
  notifications: NotificationState[];
}

const useNotificationStore = create<NotificationStore>()((set) => ({
  add: (data: NotificationData) => {
    const notificationKey = crypto.randomUUID();
    const newNotification = { ...data, key: notificationKey };
    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));
    setTimeout(() => {
      useNotificationStore.getState().hide(notificationKey);
    }, 1000 * 5);
  },
  hide: (key) => {
    set((state) => ({
      notifications: state.notifications.filter((e) => e.key != key),
    }));
  },
  notifications: [],
}));

export default useNotificationStore;
