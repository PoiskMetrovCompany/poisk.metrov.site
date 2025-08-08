import React from "react"
import clsx from "clsx"
import styles from "./alphabeticList.module.scss"

interface AlphabeticListProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

interface LiProps {
  style?: React.CSSProperties
  className?: string
}

const AlphabeticList = ({
  children,
  className,
  style,
}: AlphabeticListProps) => {
  return (
    <ol
      className={clsx(styles.alphabeticList, className)}
      style={style}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement<LiProps>(child) && child.type === 'li') {
          return React.cloneElement(child, {
            ...child.props,
            className: clsx(child.props.className, styles.alphabeticItem)
          } as LiProps)
        }
        return child
      })}
    </ol>
  )
}

export default AlphabeticList