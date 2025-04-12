import './Avatar.css'
function Avatar({ img }: { img: string }) {
  return (
    <>
      <div className="avatar">
        <img src={img} referrerPolicy="no-referrer" />
      </div>
    </>
  )
}

export default Avatar
