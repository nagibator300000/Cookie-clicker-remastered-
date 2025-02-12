type ProductProps = {
  onClick: () => void
  disabled: boolean
  title: string
  price: number
}

export default function Product({
  onClick,
  disabled,
  title,
  price,
}: ProductProps) {
  return (
    <button className="product" disabled={disabled} onClick={onClick}>
      <div className="name">{title}</div>
      <div className="price">{price}</div>
    </button>
  )
}
