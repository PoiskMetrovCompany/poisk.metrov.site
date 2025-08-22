"use client"

import React, { useState } from "react"
import styles from "./filter.module.scss"
import PriceDropdown from "@/components/ui/inputs/filters/priceDropdown"
import SearchDropdown from "@/components/ui/inputs/filters/searchDropdown"
import HouseTypeDropdown from "@/components/ui/inputs/filters/houseTypeDropdown"
import RoomCountDropdown from "@/components/ui/inputs/filters/roomCountDropdown"
import ActionButton from "@/components/ui/buttons/ActionButton"
import IconButton from "@/components/ui/buttons/IconButton"
import IconImage from "@/components/ui/IconImage"

const Filter = () => {
  const [houseTypes, setHouseTypes] = useState<string[]>([])
  const [roomCounts, setRoomCounts] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number | null, number | null]>([
    null,
    null,
  ])
  const [searchValue, setSearchValue] = useState<string>("")

  const handlePriceChange = (range: [number | null, number | null]) => {
    setPriceRange(range)
    console.log("Диапазон цен изменен:", range)
  }

  const handleSearchChange = (value: string) => {
    setSearchValue(value)
    console.log("Поисковый запрос:", value)
  }

  const handleHouseTypeChange = (selectedTypes: string[]) => {
    setHouseTypes(selectedTypes)
    console.log("Выбранные типы жилья:", selectedTypes)
  }

  const handleRoomCountChange = (selectedCounts: string[]) => {
    setRoomCounts(selectedCounts)
    console.log("Выбранное количество комнат:", selectedCounts)
  }

  const applyFilters = () => {
    console.log("Фильтры применены")
  }

  const onShowFilters = () => {
    console.log("Показать фильтры")
  }

  const removeHouseType = (typeToRemove: string) => {
    setHouseTypes(houseTypes.filter((type) => type !== typeToRemove))
  }

  const removeRoomCount = (countToRemove: string) => {
    setRoomCounts(roomCounts.filter((count) => count !== countToRemove))
  }

  const removePriceRange = () => {
    setPriceRange([null, null])
  }

  const removeSearchValue = () => {
    setSearchValue("")
  }

  const formatPrice = (price: number): string => {
    if (price < 1000) {
      return `${price} ₽`
    } else if (price < 1000000) {
      return `${Math.floor(price / 1000)} тыс. ₽`
    } else {
      return `${(price / 1000000).toFixed(1)} млн. ₽`
    }
  }

  const getPriceDisplayText = (): string => {
    const [minPrice, maxPrice] = priceRange

    if (minPrice !== null && maxPrice !== null) {
      return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`
    }

    if (minPrice !== null) {
      return `от ${formatPrice(minPrice)}`
    }

    if (maxPrice !== null) {
      return `до ${formatPrice(maxPrice)}`
    }

    return ""
  }

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

  const hasActiveFilters =
    houseTypes.length > 0 ||
    roomCounts.length > 0 ||
    priceRange[0] !== null ||
    priceRange[1] !== null ||
    searchValue !== ""

  return (
    <div className={styles.filter}>
      <div className={styles.filter__content}>
        <div className={styles.filter__content__inputs}>
          <HouseTypeDropdown
            onHouseTypeChange={handleHouseTypeChange}
            value={houseTypes}
          />
          <RoomCountDropdown
            onRoomCountChange={handleRoomCountChange}
            value={roomCounts}
          />
          <PriceDropdown onPriceChange={handlePriceChange} value={priceRange} />
          <SearchDropdown onSearchChange={handleSearchChange} />
        </div>

        <div className={styles.filter__content__buttonsDesktop}>
          <ActionButton
            type="primary"
            onClick={applyFilters}
            className={styles.filter__content__buttonsDesktop__button__show}
            size="medium"
          >
            Показать 12166 квартир
          </ActionButton>
          <IconButton
            iconLink="/images/icons/map-orange.svg"
            onClick={onShowFilters}
            className={styles.filter__content__buttonsDesktop__button__filter}
            size="md"
            type="orange-light"
          />
        </div>
      </div>

      {hasActiveFilters && (
        <div className={styles.filter__activeFilters}>
          {houseTypes.map((type) => (
            <div
              key={`house-type-${type}`}
              className={styles.filter__activeFilter}
            >
              <span className={styles.filter__activeFilter__text}>
                {houseTypeLabels[type]}
              </span>
              <button
                className={styles.filter__activeFilter__remove}
                onClick={() => removeHouseType(type)}
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

          {roomCounts.map((count) => (
            <div
              key={`room-count-${count}`}
              className={styles.filter__activeFilter}
            >
              <span className={styles.filter__activeFilter__text}>
                {roomCountLabels[count]}
              </span>
              <button
                className={styles.filter__activeFilter__remove}
                onClick={() => removeRoomCount(count)}
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
                onClick={removePriceRange}
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

          {searchValue && (
            <div className={styles.filter__content__activeFilter}>
              <span className={styles.filter__content__activeFilter__text}>
                {searchValue}
              </span>
              <button
                className={styles.filter__content__activeFilter__remove}
                onClick={removeSearchValue}
                type="button"
                aria-label="Удалить поисковый запрос"
              >
                <IconImage
                  iconLink="/images/icons/close.svg"
                  alt="удалить"
                  className={styles.filter__content__activeFilter__remove__icon}
                />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Filter
