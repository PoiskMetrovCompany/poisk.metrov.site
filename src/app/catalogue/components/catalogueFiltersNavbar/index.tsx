"use client"

import clsx from "clsx"

import React, { FC, useEffect, useRef, useState } from "react"

import Image from "next/image"

import styles from "./catalogueFilters.module.scss"

import IconImage from "@/components/ui/IconImage"
import ActionButton from "@/components/ui/buttons/ActionButton"
import IconButton from "@/components/ui/buttons/IconButton"
import RoomCountDropdown from "@/components/ui/inputs/filters/roomCountDropdown"

import PriceDropdown from "../../../../components/ui/inputs/filters/priceDropdown"
import SearchDropdown from "../../../../components/ui/inputs/filters/searchDropdown"

interface CatalogueFiltersProps {
  onShowFilters: () => void
  onApplyFilters: () => void
  isSticky?: boolean
}

const CatalogueFilters: FC<CatalogueFiltersProps> = ({
  onShowFilters,
  isSticky = false,
}) => {
  const [roomCount, setRoomCount] = useState<string[]>([])
  const [shouldApplySticky, setShouldApplySticky] = useState(false)
  const stickyTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isSticky) {
      // Очищаем предыдущий таймаут
      if (stickyTimeoutRef.current) {
        clearTimeout(stickyTimeoutRef.current)
      }

      // Устанавливаем таймаут на 1 секунду для применения класса sticky
      stickyTimeoutRef.current = setTimeout(() => {
        setShouldApplySticky(true)
      }, 500)
    } else {
      // Очищаем таймаут и сразу убираем класс
      if (stickyTimeoutRef.current) {
        clearTimeout(stickyTimeoutRef.current)
        stickyTimeoutRef.current = null
      }
      setShouldApplySticky(false)
    }

    // Очистка таймаута при размонтировании
    return () => {
      if (stickyTimeoutRef.current) {
        clearTimeout(stickyTimeoutRef.current)
      }
    }
  }, [isSticky])

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
        shouldApplySticky && styles.sticky
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
          type="primary"
          onClick={applyFilters}
          className={
            styles.catalogue__filters__container__buttonsDesktop__button__show
          }
          size="medium"
        >
          <IconImage
            iconLink="/images/icons/search-white.svg"
            alt="Показать"
            className={
              styles.catalogue__filters__container__buttonsDesktop__button__show__icon
            }
          />
          <div
            className={
              styles.catalogue__filters__container__buttonsDesktop__button__show__text
            }
          >
            Показать <span>12166 квартир</span>
          </div>
        </ActionButton>
        <ActionButton
          // iconLink="/images/icons/filters-orange.svg"
          onClick={onShowFilters}
          className={
            styles.catalogue__filters__container__buttonsDesktop__button__filter
          }
          size="small"
          type="secondary"
        >
          <IconImage
            className={
              styles.catalogue__filters__container__buttonsDesktop__button__filter__icon
            }
            iconLink="/images/icons/filters-orange.svg"
            alt="Показать фильтры"
          />
          <span
            className={
              styles.catalogue__filters__container__buttonsDesktop__button__filter__text
            }
          >
            Все фильтры
          </span>
        </ActionButton>
        {/* <ActionButton
          type="secondary"
          onClick={onShowFilters}
          className={
            styles.catalogue__filters__container__buttonsDesktop__button__filter
          }
          size="medium"
          svgSrc="/images/icons/filters-orange.svg"
          svgAlt="Показать фильтры"
          svgWidth={26}
          svgHeight={26}
          svgClassName={styles.filterSvg}
        >
          {" "}
        </ActionButton> */}
      </div>
    </div>
  )
}

export default CatalogueFilters
