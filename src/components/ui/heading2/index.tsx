import React from "react"
import styles from "./heading.module.scss"
import clsx from "clsx"

interface Heading2Props {
  children: React.ReactNode
  className?: string
  marginTop?: string | number
  style?: React.CSSProperties
}

const Heading2 = ({
  children,
  className,
  marginTop,
  style,
}: Heading2Props) => {
  const inlineStyle: React.CSSProperties = {
    ...style,
    ...(marginTop && { marginTop: typeof marginTop === 'number' ? `${marginTop}px` : marginTop }),
  }

  return (
    <h2 
      className={clsx(styles.heading2, className)} 
      style={inlineStyle}
    >
      {children}
    </h2>
  )
}

export default Heading2