import clsx from "clsx"

import React from "react"

import styles from "../catalogueList.module.scss"

interface CatalogueCardsContainerProps {
  selectedSorting: "cards" | "list"
  selectedPropertyType: string
  children: React.ReactNode
}

export const CatalogueCardsContainer: React.FC<
  CatalogueCardsContainerProps
> = ({ selectedSorting, selectedPropertyType, children }) => {
  return (
    <div
      className={clsx(
        styles.catalogue__cards,
        selectedSorting === "cards" &&
          selectedPropertyType === "Жилой комплекс" &&
          styles.catalogue__cards_cards,
        selectedSorting === "cards" &&
          selectedPropertyType === "Квартира" &&
          styles.catalogue__cards_apartments,
        selectedSorting === "list" && styles.catalogue__cards_list
      )}
    >
      {children}
    </div>
  )
}
