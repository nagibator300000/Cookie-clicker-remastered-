import useGameStore from '@/stores/game'
import Avatar from '../Avatar/Avatar'
import './Account.css'
import { Achievement } from '..'
import ACHIVMENTS_CONTENT from '../../../data/ahievements'

type Args = {
  url: string
  name: string
  onClose: () => void
}

export default function Account({ url, name, onClose }: Args) {
  const achievements = useGameStore((state) => state.achievements)
  return (
    <div className="account">
      <button className="close" onClick={onClose}>
        <img src="/close.png" alt="" />
      </button>
      <div className="userData">
        <Avatar img={url} />
        <div className="name">{name}</div>
      </div>
      <div className="achievements">
        Achievements
        <div className="achievementsConteiner">
          {achievements.map((el) => {
            const content = ACHIVMENTS_CONTENT.find((e) => e.title === el.name)
            if (content) {
              return <Achievement status={el.status} {...content} />
            }
          })}
        </div>
      </div>
    </div>
  )
}
