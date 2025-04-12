import { CSSProperties, forwardRef, HTMLAttributes } from 'react'
import styles from './InventoryContent.module.css'
import clsx from 'clsx'

interface GeneralContentProps extends HTMLAttributes<HTMLDivElement> {
  row?: number
  col?: number
  img: string
  isOverlaping?: boolean
}

export type ChildProps = Pick<
  GeneralContentProps,
  'row' | 'col' | 'isOverlaping'
>

const GeneralContent = forwardRef<HTMLDivElement, GeneralContentProps>(
  (
    { row, col, img, style: styleProp, isOverlaping, className, ...rest },
    ref
  ) => {
    const style = {
      ...styleProp,
      '--row': row,
      '--col': col,
      backgroundImage: `url("${img}")`,
    } as CSSProperties
    return (
      <div
        style={style}
        className={clsx(
          className,
          styles.content,
          isOverlaping && styles.overlaping
        )}
        ref={ref}
        {...rest}
      ></div>
    )
  }
)

export default GeneralContent
