import React from "react"

import { FilterValues } from "@/utils/hooks/use-filters"

import styles from "./filter.module.scss"

import IconImage from "@/components/ui/IconImage"

interface ActiveFiltersProps {
  currentValues: FilterValues
  onRemoveHouseType: (type: string) => void
  onRemoveRoomCount: () => void
  onRemovePriceRange: () => void
  onRemoveSearchValue: () => void
  getPriceDisplayText: () => string
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  currentValues,
  onRemoveHouseType,
  onRemoveRoomCount,
  onRemovePriceRange,
  onRemoveSearchValue,
  getPriceDisplayText,
}) => {
  const houseTypeLabels: { [key: string]: string } = {
    "Жилой комплекс": "ЖК",
    Квартира: "Квартира",
  }

  const roomCountLabels: { [key: string]: string } = {
    "1": "1-комнатная",
    "2": "2-комнатная",
    "3": "3-комнатная",
    "4": "4-комнатная",
    "5+": "5+ комнат",
    studio: "Студия",
  }

  return (
    <div className={styles.filter__activeFilters}>
      {currentValues.houseType && (
        <div
          key={`house-type-${currentValues.houseType}`}
          className={styles.filter__activeFilter}
        >
          <span className={styles.filter__activeFilter__text}>
            {houseTypeLabels[currentValues.houseType]}
          </span>
          <button
            className={styles.filter__activeFilter__remove}
            onClick={onRemoveHouseType}
            type="button"
            aria-label={`Удалить фильтр ${houseTypeLabels[currentValues.houseType]}`}
          >
            <IconImage
              iconLink="/images/icons/close.svg"
              alt="удалить"
              className={styles.filter__activeFilter__remove__icon}
            />
          </button>
        </div>
      )}

      {currentValues.roomCount && (
        <div
          key={`room-count-${currentValues.roomCount}`}
          className={styles.filter__activeFilter}
        >
          <span className={styles.filter__activeFilter__text}>
            {roomCountLabels[currentValues.roomCount]}
          </span>
          <button
            className={styles.filter__activeFilter__remove}
            onClick={onRemoveRoomCount}
            type="button"
            aria-label={`Удалить фильтр ${roomCountLabels[currentValues.roomCount]}`}
          >
            <IconImage
              iconLink="/images/icons/close.svg"
              alt="удалить"
              className={styles.filter__activeFilter__remove__icon}
            />
          </button>
        </div>
      )}

      {getPriceDisplayText() && (
        <div className={styles.filter__activeFilter}>
          <span className={styles.filter__activeFilter__text}>
            {getPriceDisplayText()}
          </span>
          <button
            className={styles.filter__activeFilter__remove}
            onClick={onRemovePriceRange}
            type="button"
            aria-label="Удалить фильтр цены"
          >
            <IconImage
              iconLink="/images/icons/close.svg"
              alt="удалить"
              className={styles.filter__activeFilter__remove__icon}
            />
          </button>
        </div>
      )}

      {currentValues.searchValue && (
        <div className={styles.filter__activeFilter}>
          <span className={styles.filter__activeFilter__text}>
            {currentValues.searchValue}
          </span>
          <button
            className={styles.filter__activeFilter__remove}
            onClick={onRemoveSearchValue}
            type="button"
            aria-label="Удалить поисковый запрос"
          >
            <IconImage
              iconLink="/images/icons/close.svg"
              alt="удалить"
              className={styles.filter__activeFilter__remove__icon}
            />
          </button>
        </div>
      )}
    </div>
  )
}

export default ActiveFilters
