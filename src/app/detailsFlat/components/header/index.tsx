import React from "react"
import styles from "./header.module.scss"
import Heading1 from "@/components/ui/heading1"
import IconButton from "@/components/ui/buttons/IconButton"
import IconImage from "@/components/ui/IconImage"

const DetailsHeader = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header__place}>
        <div className={styles.header__place__title}>
          <Heading1>
            1-комнатная квартира в ЖК Калининский квартал, 31.4 м², этаж 4
          </Heading1>
        </div>

        <div className={styles.header__place__text}>
          <h4 className={styles.header__place__text__title}>
            Микрорайон на набережной Оби
          </h4>
          <div className={styles.header__place__text__distance}>
            <div className={styles.header__place__text__distance__item}>
              <IconImage
                iconLink="/images/icons/metro.svg"
                alt="location"
                className={styles.header__place__text__distance__item__icon}
              />
              <span>Октябрьская</span>
            </div>
            <div className={styles.header__place__text__distance__item}>
              <IconImage
                iconLink="/images/icons/car.svg"
                alt="location"
                className={styles.header__place__text__distance__item__icon}
              />
              <span className={styles.header__place__text__distance__item__span}>25 минут</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.header__buttons}>
        <IconButton iconLink={"/images/icons/heart.svg"} />
        <IconButton iconLink={"/images/icons/share.svg"} />
      </div>
    </div>
  )
}

export default DetailsHeader
