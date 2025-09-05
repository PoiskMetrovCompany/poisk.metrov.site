"use client"

import React from "react"
import styles from "./typeSwitcher.module.scss"
import IconImage from "@/components/ui/IconImage"
import { IFavouriteView } from "@/types/Favourites"
import clsx from "clsx"

interface ITypeSwitcherProps {
  selectedView: IFavouriteView
  setSelectedView: (view: IFavouriteView) => void
  flatCount: number
  complexCount: number
}

const TypeSwitcher = ({
  selectedView,
  setSelectedView,
  flatCount,
  complexCount,
}: ITypeSwitcherProps) => {
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
        <span className={styles.typeSwitcher__item__count}>{flatCount}</span>
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
        <span className={styles.typeSwitcher__item__count}>{complexCount}</span>
      </button>
    </div>
  )
}

export default TypeSwitcher
