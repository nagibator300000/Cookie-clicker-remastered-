import { CSSProperties, forwardRef, HTMLAttributes } from 'react'

interface GeneralContentProps extends HTMLAttributes<HTMLDivElement> {
  row?: number
  col?: number
  img: string
}

const GeneralContent = forwardRef<HTMLDivElement, GeneralContentProps>(
  ({ row, col, img, style: styleProp }, ref) => {
    const style = {
      ...styleProp,
      '--row': row,
      '--col': col,
      backgroundImage: `url("${img}")`,
    } as CSSProperties
    return <div style={style} className="content" ref={ref}></div>
  }
)

export default GeneralContent
