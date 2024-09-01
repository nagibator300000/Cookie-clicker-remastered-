import Avatar from "../Avatar/Avatar";
import "./Account.css";

type Args = {
  url: string;
  name: string;
  onClose: () => void;
};

export default function Account({ url, name, onClose }: Args) {
  return (
    <div className="overlay">
      <button className="close" onClick={onClose}>
        <img src="/close.png" alt="" />
      </button>
      <div className="userData">
        <Avatar img={url} />
        <div className="name">{name}</div>
      </div>
      <div className="achivments">
        Achivments
        <div className="achivmentsConteiner">
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
          <div className="achivment"></div>
        </div>
      </div>
    </div>
  );
}
