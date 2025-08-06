"use client"

import React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import clsx from "clsx"
import styles from "./rangeSlider.module.scss"

type SliderProps = {
  className?: string
  min: number
  max: number
  step: number
  formatLabel?: (value: number) => string
  value?: number[] | readonly number[]
  onValueChange?: (values: number[]) => void
}

const RangeSlider = React.forwardRef(
  (
    {
      className,
      min,
      max,
      step,
      formatLabel,
      value,
      onValueChange,
      ...props
    }: SliderProps,
    ref
  ) => {
    const initialValue = Array.isArray(value) ? value : [min, max]
    const [localValues, setLocalValues] = React.useState(initialValue)

    React.useEffect(() => {
      // Update localValues when the external value prop changes
      setLocalValues(Array.isArray(value) ? value : [min, max])
    }, [min, max, value])

    const handleValueChange = (newValues: number[]) => {
      setLocalValues(newValues)
      if (onValueChange) {
        onValueChange(newValues)
      }
    }

    return (
      <SliderPrimitive.Root
        ref={ref as React.RefObject<HTMLDivElement>}
        min={min}
        max={max}
        step={step}
        value={localValues}
        onValueChange={handleValueChange}
        className={clsx(styles.rangeSlider, className)}
        {...props}
      >
        <SliderPrimitive.Track className={styles.track}>
          <SliderPrimitive.Range className={styles.range} />
        </SliderPrimitive.Track>
        {localValues.map((value, index) => (
          //   <React.Fragment key={index}>
          //   <div
          //     className={styles.valueLabel}
          //     style={{
          //       left: `calc(${((value - min) / (max - min)) * 100}% + 0px)`,
          //     }}
          //   >
          //     <span>{formatLabel ? formatLabel(value) : value}</span>
          //   </div>
          //   <SliderPrimitive.Thumb className={styles.thumb} />
          // </React.Fragment>
          <SliderPrimitive.Thumb key={index} className={styles.thumb} />
        ))}
      </SliderPrimitive.Root>
    )
  }
)

RangeSlider.displayName = SliderPrimitive.Root.displayName

export default RangeSlider
