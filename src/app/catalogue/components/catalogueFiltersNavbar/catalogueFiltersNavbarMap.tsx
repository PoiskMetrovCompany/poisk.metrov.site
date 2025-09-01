"use client"

import clsx from "clsx"

import React, { FC, useEffect, useRef, useState } from "react"

import styles from "./catalogueFilters.module.scss"

import IconImage from "@/components/ui/IconImage"
import ActionButton from "@/components/ui/buttons/ActionButton"
import PriceDropdown from "@/components/ui/inputs/filters/priceDropdown"
import RoomCountDropdown from "@/components/ui/inputs/filters/roomCountDropdown"
import SearchDropdown from "@/components/ui/inputs/filters/searchDropdown"

interface CatalogueFiltersProps {
  onShowFilters: () => void
  onApplyFilters: () => void
}

const CatalogueFiltersMap: FC<CatalogueFiltersProps> = ({ onShowFilters }) => {
  const [roomCount, setRoomCount] = useState<string[]>([])

  const applyFilters = () => {
    console.log("Фильтры применены")
  }

  const handlePriceChange = (range: [number | null, number | null]) => {
    console.log("Диапазон цен изменен:", range)
  }

  const handleSearchChange = (value: string) => {
    console.log("Поисковый запрос:", value)
  }

  return (
    <div
      className={clsx(
        styles.catalogue__filters__container,
        styles.sticky,
        styles.map
      )}
    >
      <div className={styles.catalogue__filters__container__inputs}>
        <RoomCountDropdown
          className={styles.catalogue__filters__container__inputs__room}
          value={roomCount}
          onRoomCountChange={(newRoomCount: string[]) =>
            setRoomCount(newRoomCount)
          }
        />
        <div
          className={styles.catalogue__filters__container__inputs__separator}
        />
        <PriceDropdown
          className={styles.catalogue__filters__container__inputs__price}
          onPriceChange={handlePriceChange}
        />
        <div
          className={styles.catalogue__filters__container__inputs__separator}
        />
        <SearchDropdown
          className={styles.catalogue__filters__container__inputs__search}
          onSearchChange={handleSearchChange}
        />
      </div>
      <div className={styles.catalogue__filters__container__buttonsDesktop}>
        <ActionButton
          // iconLink="/images/icons/filters-orange.svg"
          onClick={onShowFilters}
          className={clsx(
            styles.catalogue__filters__container__buttonsDesktop__button__filter,
            styles.catalogue__filters__container__buttonsDesktop__button__filter__map
          )}
          size="small"
          type="secondary"
        >
          <IconImage
            className={clsx(
              styles.catalogue__filters__container__buttonsDesktop__button__filter__icon,
              styles.catalogue__filters__container__buttonsDesktop__button__filter__icon__map
            )}
            iconLink="/images/icons/filters-orange.svg"
            alt="Показать фильтры"
          />
          <span
            className={clsx(
              styles.catalogue__filters__container__buttonsDesktop__button__filter__text,

              styles.catalogue__filters__container__buttonsDesktop__button__filter__text_map
            )}
          >
            Все фильтры
          </span>
        </ActionButton>

        <ActionButton
          onClick={onShowFilters}
          className={clsx(
            styles.catalogue__filters__container__buttonsDesktop__button__save,
            styles.catalogue__filters__container__buttonsDesktop__button__save__map
          )}
          size="small"
          type="outline-white"
        >
          <IconImage
            className={clsx(
              styles.catalogue__filters__container__buttonsDesktop__button__save__icon,
              styles.catalogue__filters__container__buttonsDesktop__button__save__icon__map
            )}
            iconLink="/images/icons/heartOrange.svg"
            alt="Сохранить поиск"
          />
          <span
            className={clsx(
              styles.catalogue__filters__container__buttonsDesktop__button__save__text,
              styles.catalogue__filters__container__buttonsDesktop__button__save__text_map
            )}
          >
            Сохранить поиск
          </span>
        </ActionButton>
      </div>
    </div>
  )
}

export default CatalogueFiltersMap
