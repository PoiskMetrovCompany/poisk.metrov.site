import React, { FC } from "react"
import Image from "next/image"
import styles from "./head.module.scss"

interface FiltersHeaderProps {
  onClose: () => void
  onReset: () => void
}

const FiltersHeader: FC<FiltersHeaderProps> = ({ onClose, onReset }) => {
  return (
    <div className={styles.catalogue__filters__container__head}>
      <div
        className={styles.catalogue__filters__container__head__link}
        onClick={onClose}
      >
        <Image
          src="/images/icons/arrow-left-blue.svg"
          alt="Скрыть фильтры"
          width={6}
          height={12}
        />
        Назад
      </div>
      <div className={styles.catalogue__filters__container__head__text}>
        Фильтры
      </div>
      <div
        className={styles.catalogue__filters__container__head__link}
        onClick={onReset}
      >
        <Image
          src="/images/icons/x-mark-blue.svg"
          alt="Cбросить фильтры"
          width={12}
          height={12}
        />
        Сбросить
      </div>
    </div>
  )
}

export default FiltersHeader
