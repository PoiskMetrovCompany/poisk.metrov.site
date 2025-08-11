import { CSSProperties, memo } from "react"
import cls from "./skeleton.module.scss"
import clsx from "clsx"

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

  return <div className={clsx(cls.skeleton, {}, [className])} style={styles} />
})

Skeleton.displayName = "Skeleton"

export default Skeleton
