import React, { FC } from "react"
import styles from "./catalogueFilters.module.scss"
import clsx from "clsx"
import Image from "next/image"
import ActionButton from "@/components/ui/buttons/ActionButton"
import IconImage from "@/components/ui/IconImage"
import IconButton from "@/components/ui/buttons/IconButton"
import PriceDropdown from "../filters/priceDropdown"
import SearchDropdown from "../filters/searchDropdown"

interface CatalogueFiltersProps {
  onShowFilters: () => void
  onApplyFilters: () => void
}

const CatalogueFilters: FC<CatalogueFiltersProps> = ({ onShowFilters }) => {
  const applyFilters = () => {
    console.log("Фильтры применены")
  }

  const handlePriceChange = (range: [number, number]) => {
    console.log("Диапазон цен изменен:", range)
  }

  const handleSearchChange = (value: string) => {
    console.log("Поисковый запрос:", value)
  }

  return (
    <div className={styles.catalogue__filters__container}>
      <div className={styles.catalogue__filters__container__inputs}>
        <PriceDropdown onPriceChange={handlePriceChange} />
        <SearchDropdown onSearchChange={handleSearchChange} />
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
          Показать 12166 квартир
        </ActionButton>
        <IconButton
          iconLink="/images/icons/filters-orange.svg"
          onClick={onShowFilters}
          className={
            styles.catalogue__filters__container__buttonsDesktop__button__filter
          }
          size="md"
          type="orange-light"
        />
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
