"use client"

import React from "react"
import styles from "./filter.module.scss"
import PriceDropdown from "@/components/ui/inputs/filters/priceDropdown"
import SearchDropdown from "@/components/ui/inputs/filters/searchDropdown"
import HouseTypeDropdown from "@/components/ui/inputs/filters/houseTypeDropdown"
import RoomCountDropdown from "@/components/ui/inputs/filters/roomCountDropdown"
import ActionButton from "@/components/ui/buttons/ActionButton"
import IconButton from "@/components/ui/buttons/IconButton"
import { useScreenSize } from "@/utils/hooks/use-screen-size"

interface FilterContentProps {
  currentValues: {
    houseTypes: string[]
    roomCounts: string[]
    priceRange: [number | null, number | null]
    searchValue: string
  }
  onHouseTypeChange: (types: string[]) => void
  onRoomCountChange: (counts: string[]) => void
  onPriceChange: (range: [number | null, number | null]) => void
  onSearchChange: (value: string) => void
  onApplyFilters: () => void
  onShowFilters: () => void
}

const FilterContent: React.FC<FilterContentProps> = ({
  currentValues,
  onHouseTypeChange,
  onRoomCountChange,
  onPriceChange,
  onSearchChange,
  onApplyFilters,
  onShowFilters,
}) => {
  const { isTablet } = useScreenSize()

  return (
    <div className={styles.filter__content}>
      <div className={styles.filter__content__inputs}>
        {isTablet && (
          <>
            <HouseTypeDropdown
              onHouseTypeChange={onHouseTypeChange}
              value={currentValues.houseTypes}
            />
            <div className={styles.filter__content__inputs__divider} />
            <RoomCountDropdown
              onRoomCountChange={onRoomCountChange}
              value={currentValues.roomCounts}
            />
            <div className={styles.filter__content__inputs__divider} />
            <PriceDropdown
              onPriceChange={onPriceChange}
              value={currentValues.priceRange}
            />
            <div className={styles.filter__content__inputs__divider} />
          </>
        )}

        <SearchDropdown
          onSearchChange={onSearchChange}
          value={currentValues.searchValue}
        />
      </div>

      <div className={styles.filter__content__buttonsDesktop}>
        <ActionButton
          type="primary"
          onClick={onApplyFilters}
          className={styles.filter__content__buttonsDesktop__button__show}
          size="medium"
        >
          Показать<span> 12166 квартир</span>
        </ActionButton>
        <IconButton
          iconLink="/images/icons/map-orange.svg"
          onClick={onShowFilters}
          className={styles.filter__content__buttonsDesktop__button__filter}
          size="md"
          type="orange-light"
        />
      </div>
      <div className={styles.filter__content__buttonsMobile}>
        <ActionButton
          svgSrc="/images/icons/filters-orange.svg"
          type="secondary"
          svgWidth={18}
          svgHeight={16}
          buttonWidth={48}
          className={styles.filter__content__buttonsMobile__button}
        />
        <ActionButton
          svgSrc="/images/icons/search-white.svg"
          type="primary"
          svgWidth={18}
          svgHeight={16}
          buttonWidth={48}
          className={styles.filter__content__buttonsMobile__button}
        />
      </div>
    </div>
  )
}

export default FilterContent
