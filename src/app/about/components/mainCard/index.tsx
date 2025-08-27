import React from "react"

import styles from "./mainCard.module.scss"

import IconImage from "@/components/ui/IconImage"
import ActionButton from "@/components/ui/buttons/ActionButton"

const MainCard = () => {
  return (
    <div className={styles.mainCard}>
      <div className={styles.mainCard__card}>
        <div className={styles.mainCard__card__image} />
        <div className={styles.mainCard__card__text}>
          <div className={styles.mainCard__card__text__heading}>
            <div className={styles.mainCard__card__text__heading__title}>
              <IconImage
                className={styles.mainCard__card__text__heading__title__icon}
                iconLink="/images/header/logo.webp"
                alt="about"
              />
              <h2 className={styles.mainCard__card__text__heading__title__text}>
                Поиск Метров
              </h2>
            </div>
            <div className={styles.mainCard__card__text__heading__text}>
              бесплатный сервис <br /> бронирования новостроек
            </div>
          </div>
          <p className={styles.mainCard__card__text__description}>
            Подберём новостройку, которая подойдёт именно вам — бесплатно.
            Поможем с оформлением ипотеки и ответим на все вопросы
          </p>
        </div>
        <ActionButton size="medium" className={styles.mainCard__card__button}>
          Оставить заявку
        </ActionButton>
      </div>

      <div className={styles.mainCard__info}>
        <div className={styles.mainCard__info__item}>
          <IconImage
            className={styles.mainCard__info__item__icon}
            iconLink={"/images/icons/about/ruble.svg"}
            alt={"about"}
          />
          <div className={styles.mainCard__info__item__text}>
            <div className={styles.mainCard__info__item__text__count}>200+</div>
            <div className={styles.mainCard__info__item__text__description}>
              Банков-партнеров
            </div>
          </div>
        </div>
        <div className={styles.mainCard__info__item}>
          <IconImage
            className={styles.mainCard__info__item__icon}
            iconLink={"/images/icons/about/house.svg"}
            alt={"house"}
          />
          <div className={styles.mainCard__info__item__text}>
            <div className={styles.mainCard__info__item__text__count}>300+</div>
            <div className={styles.mainCard__info__item__text__description}>
              Объектов <span>недвижимости</span>
            </div>
          </div>
        </div>
        <div className={styles.mainCard__info__item}>
          <IconImage
            className={styles.mainCard__info__item__icon}
            iconLink={"/images/icons/about/expert.svg"}
            alt={"expert"}
          />
          <div className={styles.mainCard__info__item__text}>
            <div className={styles.mainCard__info__item__text__count}>200+</div>
            <div className={styles.mainCard__info__item__text__description}>
              Экспертов по жилью
            </div>
          </div>
        </div>
        <div className={styles.mainCard__info__item}>
          <IconImage
            className={styles.mainCard__info__item__icon}
            iconLink={"/images/icons/about/face.svg"}
            alt={"face"}
          />
          <div className={styles.mainCard__info__item__text}>
            <div className={styles.mainCard__info__item__text__count}>200+</div>
            <div className={styles.mainCard__info__item__text__description}>
              Успешных сделок
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainCard
