import { StateCreator } from 'zustand'
import { NotificationData } from '../components'
import useGameStore from './game'

interface NotificationState extends NotificationData {
    key: string
}

export interface NotificationSlice {
    addNotification: (data: NotificationData) => void
    removeNotification: (key: string) => void
    notifications: NotificationState[]
}

const createNotificationSlice: StateCreator<
    NotificationSlice,
    [['zustand/devtools', never]],
    [],
    NotificationSlice
> = (set) => ({
    addNotification: (data: NotificationData) => {
        const notificationKey = crypto.randomUUID()
        const newNotification = { ...data, key: notificationKey }
        set((state) => ({
            notifications: [...state.notifications, newNotification],
        }))
        setTimeout(() => {
            useGameStore.getState().removeNotification(notificationKey)
        }, 1000 * 5)
    },
    removeNotification: (key) => {
        set((state) => ({
            notifications: state.notifications.filter((e) => e.key != key),
        }))
    },
    notifications: [],
})

export default createNotificationSlice
