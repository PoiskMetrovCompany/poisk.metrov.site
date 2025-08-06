"use client"
import React, { useState } from "react"
import styles from "./range.module.scss"
import RangeSlider from "@/components/ui/rangeSlider"

const Range = () => {
  const [priceRange, setPriceRange] = useState([4, 15])

  const formatPrice = (value: number) => `${value}`

  return (
    <div className={styles.range}>
      <legend className={styles.range__title}>Стоимость, млн ₽</legend>
      <div className={styles.range__input}>
        <div className={styles.range__input__display}>
          <div className={styles.range__input__display__value}>
            <span className={styles.range__input__display__value__label}>
              от
            </span>
            <input
              className={styles.range__input__display__value__count}
              value={priceRange[0]}
              type="number"
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
            />
          </div>
          <span className={styles.range__input__display__separator}>—</span>
          <div className={styles.range__input__display__value}>
            <span className={styles.range__input__display__value__label}>
              до
            </span>
            <input
              className={styles.range__input__display__value__count}
              value={priceRange[1]}
              type="number"
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
            />
          </div>
        </div>
        <RangeSlider
          className={styles.range__slider}
          min={4}
          max={15}
          step={1}
          value={priceRange}
          onValueChange={setPriceRange}
          formatLabel={formatPrice}
        />
      </div>
    </div>
  )
}

export default Range
