import React, { FC } from "react"
import styles from "./catalogueFilters.module.scss"
import clsx from "clsx"
import Image from "next/image"
import ActionButton from "@/components/ui/buttons/ActionButton"

interface CatalogueFiltersProps {
  onShowFilters: () => void
  onApplyFilters: () => void
}

const CatalogueFilters: FC<CatalogueFiltersProps> = ({ onShowFilters }) => {
  const applyFilters = () => {
    console.log("Фильтры применены")
  }

  return (
    <div className={styles.catalogue__filters__container}>
      <div className={styles.catalogue__filters__container__select}>
        <div className={styles.catalogue__filters__container__select__text}>
          Кол-во комнат
        </div>
        <Image
          src="/images/icons/arrow-down-gray.svg"
          alt="Нажмите, чтобы выбрать колличество комнат"
          width={12}
          height={6}
        />
      </div>
      <div className={styles.catalogue__filters__container__select}>
        <div className={styles.catalogue__filters__container__select__text}>
          Цена
        </div>
        <Image
          src="/images/icons/arrow-down-gray.svg"
          alt="Нажмите, чтобы выбрать колличество комнат"
          width={12}
          height={6}
        />
      </div>
      <div className={styles.catalogue__filters__container__search}>
        <Image
          src="/images/icons/search.svg"
          alt="Введите название ключевых слов для поиска"
          width={20}
          height={20}
        />
        <input
          type="text"
          placeholder="Район, метро, улица, ЖК, застройщик"
          className={styles.catalogue__filters__container__search__text}
        />
      </div>
      <div className={styles.catalogue__filters__container__buttonsDesktop}>
        <ActionButton
          type="primary"
          onClick={applyFilters}
          className={styles.catalogue__filters__container__buttonsDesktop__button}
          size="medium"
        >
          Показать <span>12166 квартир</span>
        </ActionButton>
        <ActionButton
          type="secondary"
          onClick={onShowFilters}
          className={styles.catalogue__filters__container__buttonsDesktop__button__filter}
          size="medium"
          svgSrc="/images/icons/filters-orange.svg"
          svgAlt="Показать фильтры"
          svgWidth={26}
          svgHeight={26}
          svgClassName={styles.filterSvg}
        >
          Все фильтры
        </ActionButton>
      </div>
    </div>
  )
}

export default CatalogueFilters
