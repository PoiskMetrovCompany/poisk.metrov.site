"use client"

import React from "react"

import { useScreenSize } from "@/utils/hooks/use-screen-size"

import styles from "./filter.module.scss"

import ActionButton from "@/components/ui/buttons/ActionButton"
import IconButton from "@/components/ui/buttons/IconButton"
import HouseTypeDropdown from "@/components/ui/inputs/filters/houseTypeDropdown"
import PriceDropdown from "@/components/ui/inputs/filters/priceDropdown"
import RoomCountDropdown from "@/components/ui/inputs/filters/roomCountDropdown"
import SearchDropdown from "@/components/ui/inputs/filters/searchDropdown"

interface FilterContentProps {
  currentValues: {
    houseType: string
    roomCount: string
    priceRange: [number | null, number | null]
    searchValue: string
  }
  onHouseTypeChange: (type: string) => void
  onRoomCountChange: (count: string) => void
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
              value={currentValues.houseType}
            />
            <div className={styles.filter__content__inputs__divider} />
            <RoomCountDropdown
              onRoomCountChange={onRoomCountChange}
              value={currentValues.roomCount}
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
        <IconButton
          iconLink="/images/icons/filters-orange.svg"
          type="secondary"
          size="md"
          onClick={onShowFilters}
          className={styles.filter__content__buttonsMobile__button}
          alt="Показать фильтры"
        />
        <IconButton
          iconLink="/images/icons/search-white.svg"
          type="orange"
          size="md"
          onClick={onApplyFilters}
          className={styles.filter__content__buttonsMobile__button}
          alt="Найти"
        />
      </div>
    </div>
  )
}

export default FilterContent
