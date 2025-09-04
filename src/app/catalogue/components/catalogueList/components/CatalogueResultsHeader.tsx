import clsx from "clsx"

import React, { memo, useCallback, useMemo } from "react"

import { FiltersResponse } from "@/types/api/filters"

import styles from "../catalogueList.module.scss"

import IconImage from "@/components/ui/IconImage"
import Heading3 from "@/components/ui/heading3"

interface CatalogueResultsHeaderProps {
  filtersData: FiltersResponse | null | undefined
  selectedPropertyType: string
  selectedSorting: "cards" | "list"
  isLaptop: boolean
  onSortingChange: (sort: "cards" | "list") => void
}

export const CatalogueResultsHeader: React.FC<CatalogueResultsHeaderProps> =
  memo(
    ({
      filtersData,
      selectedPropertyType,
      selectedSorting,
      isLaptop,
      onSortingChange,
    }) => {
      // Мемоизируем обработчик сортировки
      const handleSorting = useCallback(
        (sort: "cards" | "list") => {
          onSortingChange(sort)
        },
        [onSortingChange]
      )

      // Мемоизируем количество результатов
      const resultsCount = useMemo(
        () => filtersData?.data?.length || 0,
        [filtersData?.data?.length]
      )

      // Мемоизируем текст заголовка
      const headerText = useMemo(
        () =>
          `Найдено ${resultsCount} ${selectedPropertyType === "Квартира" ? "квартир" : "ЖК"}`,
        [resultsCount, selectedPropertyType]
      )

      // Мемоизируем иконки для кнопок
      const cardsIcon = useMemo(
        () =>
          selectedSorting === "cards"
            ? "/images/icons/sort-cards-colored.svg"
            : "/images/icons/sort-cards.svg",
        [selectedSorting]
      )

      const listIcon = useMemo(
        () =>
          selectedSorting === "list"
            ? "/images/icons/sort-list-colored.svg"
            : "/images/icons/sort-list.svg",
        [selectedSorting]
      )

      return (
        <div className={styles.catalogue__header}>
          <Heading3>{headerText}</Heading3>
          {isLaptop && (
            <div className={styles.catalogue__header__buttons}>
              <button
                className={clsx(
                  styles.catalogue__header__buttons__button,
                  selectedSorting === "cards" &&
                    styles.catalogue__header__buttons__button_active
                )}
                onClick={() => handleSorting("cards")}
              >
                <IconImage
                  iconLink={cardsIcon}
                  alt="cards"
                  className={styles.catalogue__header__buttons__button__icon}
                />
                <span>Карточки</span>
              </button>
              <button
                className={clsx(
                  styles.catalogue__header__buttons__button,
                  selectedSorting === "list" &&
                    styles.catalogue__header__buttons__button_active
                )}
                onClick={() => handleSorting("list")}
              >
                <IconImage
                  iconLink={listIcon}
                  alt="list"
                  className={styles.catalogue__header__buttons__button__icon}
                />
                <span>Список</span>
              </button>
            </div>
          )}
        </div>
      )
    }
  )

CatalogueResultsHeader.displayName = "CatalogueResultsHeader"
