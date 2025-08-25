import React, { FC, useState } from "react"
import * as Popover from "@radix-ui/react-popover"
import styles from "./priceDropdown.module.scss"
import RangeInput from "../rangeInput"
import IconImage from "@/components/ui/IconImage"

interface PriceDropdownProps {
  onPriceChange?: (range: [number, number]) => void
}

const PriceDropdown: FC<PriceDropdownProps> = ({ onPriceChange }) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0])

  const handlePriceChange = (range: [number, number]) => {
    setPriceRange(range)
    onPriceChange?.(range)
  }

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className={styles.priceDropdown__trigger}>
          <div className={styles.priceDropdown__trigger__content}>
            <span className={styles.priceDropdown__trigger__text}>Цена</span>
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
