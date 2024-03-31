import "./counter.css";
type args = {
  onClick: (event: React.MouseEvent) => void;
};
export default function Counter({ onClick }: args) {
  return (
    <button className="counter" onClick={onClick}>
      <img src="/nuke.png" />
    </button>
  );
}
