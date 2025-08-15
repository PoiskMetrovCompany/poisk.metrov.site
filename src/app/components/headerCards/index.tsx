import React from "react"
import styles from "./headerCards.module.scss"
import Link from "next/link"
import IconImage from "@/components/ui/IconImage"
import Button from "@/components/ui/buttons/ActionButton"

const HeaderCards = () => {
  return (
    <div className={styles.headerCards}>
      <div className={styles.headerCards__title}>
        <h1 className={styles.headerCards__title__heading}>
          Поиск Метров – бесплатный сервис бронирования новостроек
        </h1>
        <Link href="/" className={styles.headerCards__title__link}>
          <IconImage
            className={styles.headerCards__title__link__icon}
            iconLink="/images/icons/title-arrow.svg"
            alt="arrow"
          />
        </Link>
      </div>
      <div className={styles.headerCards__percent}>
        <div className={styles.headerCards__percent__content}>
          <div className={styles.headerCards__percent__text}>
            <h2 className={styles.headerCards__percent__title}>
              Следующее заседание Совета директоров ЦБ
            </h2>
            <h3 className={styles.headerCards__percent__subtitle}>
              Изменение процентных ставок
            </h3>
          </div>

          <div className={styles.headerCards__percent__date}>
            <div className={styles.headerCards__percent__date__time}>
              <span className={styles.headerCards__percent__date__time__number}>
                23
              </span>{" "}
              <span className={styles.headerCards__percent__date__time__colon}>
                :
              </span>
              <span className={styles.headerCards__percent__date__time__number}>
                12
              </span>
              <span className={styles.headerCards__percent__date__time__colon}>
                :
              </span>
              <span className={styles.headerCards__percent__date__time__number}>
                18
              </span>
            </div>
            <div className={styles.headerCards__percent__date__desc}>
              <span className={styles.headerCards__percent__date__desc__item}>
                дней
              </span>
              <span className={styles.headerCards__percent__date__desc__item}>
                часов
              </span>
              <span className={styles.headerCards__percent__date__desc__item}>
                минут
              </span>
            </div>
          </div>
        </div>
        <Button type="beige" className={styles.headerCards__percent__button}>
          Узнать об ипотеке
        </Button>
      </div>
      <div className={styles.headerCards__firstCard}>
        <div className={styles.headerCards__firstCard__content}>
          <h2 className={styles.headerCards__firstCard__title}>
            Узнать о старте продаж первым
          </h2>
          <IconImage
            className={styles.headerCards__firstCard__icon}
            iconLink="/images/icons/rocket.svg"
            alt="rocket"
          />
        </div>
        <Button type="beige" className={styles.headerCards__firstCard__button}>
          Оставить заявку
        </Button>
      </div>
    </div>
  )
}

export default HeaderCards
