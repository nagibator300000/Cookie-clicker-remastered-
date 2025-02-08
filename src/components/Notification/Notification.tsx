import './Notification.css'
import { Achievement } from '..'
import ACHIEVEMENTs_CONTENT from '../../../data/achievements'

export type NotificationData = { name: string }

interface NotificationProps extends NotificationData {
  onClick?: () => void
}

export default function Notification({ name, onClick }: NotificationProps) {
  const info = ACHIEVEMENTs_CONTENT.find((e) => e.title === name)
  if (info) {
    return (
      <div className={`notification`} onClick={onClick}>
        <Achievement {...info} status />
      </div>
    )
  }
}
