"use client"

import clsx from "clsx"

import React, { FC, useEffect, useRef, useState } from "react"

import Image from "next/image"

import { FiltersFormData } from "@/app/catalogue/components/filters/types"
import { useFilters } from "@/contexts/FiltersContext"

import styles from "./catalogueFilters.module.scss"

import IconImage from "@/components/ui/IconImage"
import ActionButton from "@/components/ui/buttons/ActionButton"
import IconButton from "@/components/ui/buttons/IconButton"
import PriceDropdown from "@/components/ui/inputs/filters/priceDropdown"
import RoomCountDropdown from "@/components/ui/inputs/filters/roomCountDropdown"
import SearchDropdown from "@/components/ui/inputs/filters/searchDropdown"

interface CatalogueFiltersProps {
  isMap?: boolean
  onShowFilters: () => void
  onApplyFilters: (formData: FiltersFormData) => void
  isSticky?: boolean
}

const CatalogueFilters: FC<CatalogueFiltersProps> = ({
  isMap = false,
  onShowFilters,
  onApplyFilters,
  isSticky = false,
}) => {
  const [shouldApplySticky, setShouldApplySticky] = useState(false)
  const stickyTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const {
    selectedPropertyType,
    filtersData,
    updatePriceRange,
    updateRoomCount,
    updateSearchQuery,
  } = useFilters()

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

  const handleApplyFilters = () => {
    console.log("Применение фильтров из CatalogueFilters:", filtersData)
    onApplyFilters(filtersData)
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
          showCount={false}
          className={styles.catalogue__filters__container__inputs__room}
          value={filtersData.rooms[0] || ""}
          onRoomCountChange={updateRoomCount}
        />
        <div
          className={styles.catalogue__filters__container__inputs__separator}
        />
        <PriceDropdown
          className={styles.catalogue__filters__container__inputs__price}
          onPriceChange={updatePriceRange}
        />
        <div
          className={styles.catalogue__filters__container__inputs__separator}
        />
        <SearchDropdown
          className={styles.catalogue__filters__container__inputs__search}
          onSearchChange={updateSearchQuery}
        />
      </div>
      <div className={styles.catalogue__filters__container__buttonsDesktop}>
        {!isMap && (
          <ActionButton
            type="primary"
            onClick={handleApplyFilters}
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
              Показать{" "}
              <span>
                {selectedPropertyType === "Квартира" ? "квартиры" : "ЖК"}
              </span>
            </div>
          </ActionButton>
        )}

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
            className={clsx(
              styles.catalogue__filters__container__buttonsDesktop__button__filter__text,
              isMap &&
                styles.catalogue__filters__container__buttonsDesktop__button__filter__text_map
            )}
          >
            Все фильтры
          </span>
        </ActionButton>
        {isMap && (
          <ActionButton
            onClick={onShowFilters}
            className={
              styles.catalogue__filters__container__buttonsDesktop__button__save
            }
            size="small"
            type="outline-white"
          >
            <IconImage
              className={
                styles.catalogue__filters__container__buttonsDesktop__button__save__icon
              }
              iconLink="/images/icons/heartOrange.svg"
              alt="Сохранить поиск"
            />
            <span
              className={clsx(
                styles.catalogue__filters__container__buttonsDesktop__button__save__text,
                isMap &&
                  styles.catalogue__filters__container__buttonsDesktop__button__save__text_map
              )}
            >
              Сохранить поиск
            </span>
          </ActionButton>
        )}
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
