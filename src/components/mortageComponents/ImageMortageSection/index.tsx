import React from "react"
import styles from "./imageMortageSection.module.scss"
import Image from "next/image"

const ImageMortageSection = () => {
  return (
    <div className={styles.mortage__container__imageSection}>
      <div className={styles.mortage__container__imageSection__text}>
        <div className={styles.mortage__container__imageSection__text__header}>
          <span
            className={
              styles.mortage__container__imageSection__text__header__orange
            }
          >
            Поиск Метров
          </span>
          – найдем квартиру, поможем с ипотекой
        </div>
        <div className={styles.mortage__container__imageSection__text__title}>
          Мы сотрудничаем с большим количеством банков, а наши специалисты
          готовы добиться для вас выгодных условий по ипотеке!
        </div>
      </div>
    </div>
  )
}

export default ImageMortageSection
