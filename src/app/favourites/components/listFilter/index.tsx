import React from "react"
import styles from "./listFilter.module.scss"
import DropdownFilter from "@/components/ui/inputs/dropdownFilter"
import ActionButton from "@/components/ui/buttons/ActionButton"
import IconImage from "@/components/ui/IconImage"

interface IListFilterProps {
  setIsComparison: (isComparison: boolean) => void
  setShowMap: (showMap: boolean) => void
}

const ListFilter = ({ setIsComparison, setShowMap }: IListFilterProps) => {
  return (
    <div className={styles.listFilter}>
      <DropdownFilter
        items={[
          { label: "Сортировка", value: "1" },
          { label: "Сортировка", value: "2" },
        ]}
        placeholder="Сначала дешевле"
        iconLink="/images/icons/sort-arrows.svg"
        value=""
        onChange={() => {}}
      />

      <div className={styles.listFilter__show}>
        <ActionButton
          type="outline-white"
          size="small"
          className={styles.listFilter__show__button}
          onClick={() => setIsComparison(true)}
        >
          <div className={styles.listFilter__show__button__content}>
            <IconImage
              iconLink="/images/icons/compare.svg"
              alt="compare"
              className={styles.listFilter__show__button__content__icon}
            />
            Сравнить
          </div>
        </ActionButton>

        <ActionButton
          type="outline-white"
          size="small"
          className={styles.listFilter__show__button}
          onClick={() => setShowMap(true)}
        >
          <div className={styles.listFilter__show__button__content}>
            <IconImage
              iconLink="/images/icons/map-dark.svg"
              alt="compare"
              className={styles.listFilter__show__button__content__icon}
            />
            Показать на карте
          </div>
        </ActionButton>
      </div>
    </div>
  )
}

export default ListFilter
