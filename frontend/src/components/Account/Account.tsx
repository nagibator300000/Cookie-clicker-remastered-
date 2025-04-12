import useGameStore from '@/stores/game';
import Avatar from '../Avatar/Avatar';
import './Account.css';
import { Achievement } from '..';
import ACHIEVEMENTS_CONTENT from '@data/achievements';

type Args = {
  url: string;
  name: string;
  onClose: () => void;
};

export default function Account({ url, name, onClose }: Args) {
  const achievements = useGameStore((state) => state.achievements);
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
          {ACHIEVEMENTS_CONTENT.map((achievement) => (
            <Achievement
              {...achievement}
              status={achievements.includes(achievement.title)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
