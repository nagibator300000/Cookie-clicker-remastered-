import "./counter.css";
type args = {
  onClick: (event: React.MouseEvent) => void;
};
export default function Counter({ onClick }: args) {
  return (
    <button className="counter">
      <img src="/cookie.png" onClick={onClick} />
    </button>
  );
}
