import * as Popover from "@radix-ui/react-popover"
import clsx from "clsx"

import React, { FC, useEffect, useState } from "react"

import RangeInput from "@/app/catalogue/components/filters/rangeInput"

import styles from "./priceDropdown.module.scss"

import IconImage from "@/components/ui/IconImage"

interface PriceDropdownProps {
  onPriceChange?: (range: [number | null, number | null]) => void
  value?: [number | null, number | null]
}

const PriceDropdown: FC<PriceDropdownProps> = ({
  onPriceChange,
  value = [null, null],
}) => {
  const [priceRange, setPriceRange] =
    useState<[number | null, number | null]>(value)

  const handlePriceChange = (range: [number | null, number | null]) => {
    setPriceRange(range)
    onPriceChange?.(range)
  }

  useEffect(() => {
    setPriceRange(value)
  }, [value])

  const formatPrice = (price: number): string => {
    if (price < 1000) {
      return `${price} ₽`
    } else if (price < 1000000) {
      return `${Math.floor(price / 1000)} тыс. ₽`
    } else {
      return `${(price / 1000000).toFixed(1)} млн. ₽`
    }
  }

  const getDisplayText = (): string => {
    const [minPrice, maxPrice] = priceRange

    if (minPrice === null && maxPrice === null) {
      return "Цена"
    }

    if (minPrice !== null && maxPrice !== null) {
      return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`
    }

    if (minPrice !== null) {
      return `от ${formatPrice(minPrice)}`
    }

    if (maxPrice !== null) {
      return `до ${formatPrice(maxPrice)}`
    }

    return "Цена"
  }

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className={styles.priceDropdown__trigger}>
          <div className={styles.priceDropdown__trigger__content}>
            <span
              className={clsx(
                styles.priceDropdown__trigger__text,
                (priceRange[0] !== null || priceRange[1] !== null) &&
                  styles["priceDropdown__trigger__text--selected"]
              )}
            >
              {getDisplayText()}
            </span>
            <IconImage
              className={styles.priceDropdown__trigger__icon}
              iconLink="/images/icons/arrow-down.svg"
              alt="search-arrow"
            />
          </div>
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className={styles.priceDropdown__content}
          sideOffset={8}
          align="start"
          side="bottom"
        >
          <div className={styles.priceDropdown__content__inner}>
            <RangeInput
              value={priceRange}
              onValueChange={handlePriceChange}
              unit="₽"
              formClassName={styles.priceDropdown__content__inner__form}
            />
          </div>
          <Popover.Arrow className={styles.priceDropdown__arrow} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default PriceDropdown
