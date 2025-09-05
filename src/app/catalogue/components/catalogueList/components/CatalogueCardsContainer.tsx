import clsx from "clsx"

import React, { memo, useMemo } from "react"

import styles from "../catalogueList.module.scss"

interface CatalogueCardsContainerProps {
  selectedSorting: "cards" | "list"
  selectedPropertyType: string
  children: React.ReactNode
}

export const CatalogueCardsContainer: React.FC<CatalogueCardsContainerProps> =
  memo(({ selectedSorting, selectedPropertyType, children }) => {
    // Мемоизируем классы для предотвращения лишних вычислений
    const containerClasses = useMemo(
      () =>
        clsx(
          styles.catalogue__cards,
          selectedSorting === "cards" &&
            selectedPropertyType === "Жилой комплекс" &&
            styles.catalogue__cards_cards,
          selectedSorting === "cards" &&
            selectedPropertyType === "Квартира" &&
            styles.catalogue__cards_apartments,
          selectedSorting === "list" && styles.catalogue__cards_list
        ),
      [selectedSorting, selectedPropertyType]
    )

    return <div className={containerClasses}>{children}</div>
  })

CatalogueCardsContainer.displayName = "CatalogueCardsContainer"
