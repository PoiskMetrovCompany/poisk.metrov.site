import clsx from "clsx"

import React from "react"

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

export const CatalogueResultsHeader: React.FC<CatalogueResultsHeaderProps> = ({
  filtersData,
  selectedPropertyType,
  selectedSorting,
  isLaptop,
  onSortingChange,
}) => {
  const handleSorting = (sort: "cards" | "list") => {
    onSortingChange(sort)
  }

  return (
    <div className={styles.catalogue__header}>
      <Heading3>
        Найдено {filtersData?.data?.length || 0}{" "}
        {selectedPropertyType === "Квартира" ? "квартир" : "ЖК"}
      </Heading3>
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
              iconLink={
                selectedSorting === "cards"
                  ? "/images/icons/sort-cards-colored.svg"
                  : "/images/icons/sort-cards.svg"
              }
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
              iconLink={
                selectedSorting === "list"
                  ? "/images/icons/sort-list-colored.svg"
                  : "/images/icons/sort-list.svg"
              }
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
