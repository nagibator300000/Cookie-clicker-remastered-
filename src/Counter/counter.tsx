import "./counter.css";
type args = {
  onClick: () => void;
};
export default function Counter({ onClick }: args) {
  return (
    <div className="counter">
      <img src="/cookie.png" onClick={onClick} />
    </div>
  );
}
