import clsx from 'clsx'
import styles from './Achievement.module.css'

export interface AchievementProps {
  img: string
  title: string
  description: string
  status: boolean
}

export default function Achievement({
  img,
  title,
  description,
  status,
}: AchievementProps) {
  return (
    <div className={styles.achievement}>
      <div className={clsx(styles.mask, !status && styles.closed)}></div>
      <img src={img} />
      <div className={styles.info}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  )
}
