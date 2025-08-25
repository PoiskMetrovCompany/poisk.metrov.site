import React from "react"
import styles from "./filter.module.scss"
import IconImage from "@/components/ui/IconImage"
import { FilterValues } from "@/utils/hooks/use-filters"

interface ActiveFiltersProps {
  currentValues: FilterValues
  onRemoveHouseType: (type: string) => void
  onRemoveRoomCount: (count: string) => void
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
    "residential-complex": "ЖК",
    apartment: "Квартира",
    apartments: "Апартаменты",
    house: "Дома",
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
      {currentValues.houseTypes.map((type) => (
        <div key={`house-type-${type}`} className={styles.filter__activeFilter}>
          <span className={styles.filter__activeFilter__text}>
            {houseTypeLabels[type]}
          </span>
          <button
            className={styles.filter__activeFilter__remove}
            onClick={() => onRemoveHouseType(type)}
            type="button"
            aria-label={`Удалить фильтр ${houseTypeLabels[type]}`}
          >
            <IconImage
              iconLink="/images/icons/close.svg"
              alt="удалить"
              className={styles.filter__activeFilter__remove__icon}
            />
          </button>
        </div>
      ))}

      {currentValues.roomCounts.map((count) => (
        <div
          key={`room-count-${count}`}
          className={styles.filter__activeFilter}
        >
          <span className={styles.filter__activeFilter__text}>
            {roomCountLabels[count]}
          </span>
          <button
            className={styles.filter__activeFilter__remove}
            onClick={() => onRemoveRoomCount(count)}
            type="button"
            aria-label={`Удалить фильтр ${roomCountLabels[count]}`}
          >
            <IconImage
              iconLink="/images/icons/close.svg"
              alt="удалить"
              className={styles.filter__activeFilter__remove__icon}
            />
          </button>
        </div>
      ))}

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
