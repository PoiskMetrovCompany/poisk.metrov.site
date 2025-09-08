"use client"

import clsx from "clsx"

import React from "react"

import { IFavouriteView } from "@/types/Favourites"

import styles from "./typeSwitcher.module.scss"

import IconImage from "@/components/ui/IconImage"
import Skeleton from "@/components/ui/skeleton"

interface ITypeSwitcherProps {
  selectedView: IFavouriteView
  setSelectedView: (view: IFavouriteView) => void
  flatCount: number
  complexCount: number
  isComparison?: boolean
  comparisonFlatCount?: number
  comparisonComplexCount?: number
  isLoading?: boolean
  isLoadingComparisonFlats?: boolean
  isLoadingComparisonComplexes?: boolean
}

const TypeSwitcher = ({
  selectedView,
  setSelectedView,
  flatCount,
  complexCount,
  isComparison = false,
  comparisonFlatCount = 0,
  comparisonComplexCount = 0,
  isLoading = true,
  isLoadingComparisonFlats = true,
  isLoadingComparisonComplexes = true,
}: ITypeSwitcherProps) => {
  // Определяем какое количество показывать в зависимости от режима
  const getFlatCount = () => {
    return isComparison ? comparisonFlatCount : flatCount
  }

  const getComplexCount = () => {
    return isComparison ? comparisonComplexCount : complexCount
  }

  return (
    <div className={styles.typeSwitcher}>
      <button
        className={clsx(
          styles.typeSwitcher__item,
          selectedView === "layouts" && styles.typeSwitcher__item_active
        )}
        onClick={() => setSelectedView("layouts")}
      >
        <div className={styles.typeSwitcher__item__content}>
          <IconImage
            iconLink="/images/icons/layout-gray.svg"
            alt="layout"
            className={styles.typeSwitcher__item__content__icon}
          />
          <span className={styles.typeSwitcher__item__content__text}>
            Планировка
          </span>
        </div>
        {isLoadingComparisonFlats && isLoading ? (
          <Skeleton
            className={styles.typeSwitcher__item__count}
            width={32}
            height={32}
            border="50px"
          />
        ) : (
          <span className={styles.typeSwitcher__item__count}>
            {getFlatCount()}
          </span>
        )}
      </button>

      <button
        className={clsx(
          styles.typeSwitcher__item,
          selectedView === "complexes" && styles.typeSwitcher__item_active
        )}
        onClick={() => setSelectedView("complexes")}
      >
        <div className={styles.typeSwitcher__item__content}>
          <IconImage
            iconLink="/images/icons/flat-gray.svg"
            alt="flat"
            className={styles.typeSwitcher__item__content__icon}
          />
          <span className={styles.typeSwitcher__item__content__text}>
            Жилые комплексы
          </span>
        </div>
        {isLoadingComparisonComplexes && isLoading ? (
          <Skeleton
            className={styles.typeSwitcher__item__count}
            width={28}
            height={28}
            border="50px"
          />
        ) : (
          <span className={styles.typeSwitcher__item__count}>
            {getComplexCount()}
          </span>
        )}
      </button>
    </div>
  )
}

export default TypeSwitcher
