import "./Avatar.css";
function Avatar({ img }: { img: string }) {
  return (
    <>
      <div className="avatar">
        <img src={img} />
      </div>
    </>
  );
}

export default Avatar;
