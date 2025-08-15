"use client"
import React, { useState, useEffect } from "react"
import styles from "./range.module.scss"
import RangeSlider from "@/components/ui/rangeSlider"
import clsx from "clsx"

interface RangeProps {
  title?: string
  min: number
  max: number
  step: number
  value?: [number, number]
  className?: string
  onValueChange?: (value: [number, number]) => void
  formatLabel?: (value: number) => string
}

const Range: React.FC<RangeProps> = ({
  title = "Стоимость, млн ₽",
  min,
  max,
  step,
  className,
  value,
  onValueChange,
  formatLabel = (value: number) => `${value}`
}) => {
  const [internalRange, setInternalRange] = useState<[number, number]>(
    value || [min, max]
  )

  useEffect(() => {
    if (value) {
      setInternalRange(value)
    }
  }, [value])

  const handleRangeChange = (newRange: [number, number]) => {
    setInternalRange(newRange)
    onValueChange?.(newRange)
  }

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value)
    const newRange: [number, number] = [newMin, internalRange[1]]
    handleRangeChange(newRange)
  }

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value)
    const newRange: [number, number] = [internalRange[0], newMax]
    handleRangeChange(newRange)
  }

  return (
    <div className={clsx(styles.range, className)}>
      <legend className={clsx(styles.range__title, className)}>{title}</legend>
      <div className={styles.range__input}>
        <div className={styles.range__input__display}>
          <div className={styles.range__input__display__value}>
            <span className={styles.range__input__display__value__label}>
              от
            </span>
            <input
              className={styles.range__input__display__value__count}
              value={internalRange[0]}
              type="number"
              min={min}
              max={max}
              step={step}
              onChange={handleMinInputChange}
            />
          </div>
          <span className={styles.range__input__display__separator}>—</span>
          <div className={styles.range__input__display__value}>
            <span className={styles.range__input__display__value__label}>
              до
            </span>
            <input
              className={styles.range__input__display__value__count}
              value={internalRange[1]}
              type="number"
              min={min}
              max={max}
              step={step}
              onChange={handleMaxInputChange}
            />
          </div>
        </div>
        <RangeSlider
          className={styles.range__slider}
          min={min}
          max={max}
          step={step}
          value={internalRange}
          onValueChange={(values) => handleRangeChange(values as [number, number])}
          formatLabel={formatLabel}
        />
      </div>
    </div>
  )
}

export default Range