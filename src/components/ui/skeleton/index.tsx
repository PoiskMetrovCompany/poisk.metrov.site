import clsx from "clsx"

import { CSSProperties, memo } from "react"

import cls from "./skeleton.module.scss"

interface SkeletonProps {
  className?: string
  height?: string | number
  width?: string | number
  border?: string
}

const Skeleton = memo((props: SkeletonProps) => {
  const { className, height, width, border } = props

  const styles: CSSProperties = {
    width,
    height,
    borderRadius: border,
  }

  return <div className={clsx(cls.Skeleton, {}, [className])} style={styles} />
})

Skeleton.displayName = "Skeleton"

export default Skeleton
