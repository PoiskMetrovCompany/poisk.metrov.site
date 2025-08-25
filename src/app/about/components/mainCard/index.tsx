import React from "react"
import styles from "./mainCard.module.scss"
import ActionButton from "@/components/ui/buttons/ActionButton"
import IconImage from "@/components/ui/IconImage"

const info = [
  {
    icon: "/images/icons/about/ruble.svg",
    count: "200+",
    description: "Банков-партнеров",
  },
  {
    icon: "/images/icons/about/house.svg",
    count: "300+",
    description: "Объектов недвижимости",
  },
  {
    icon: "/images/icons/about/expert.svg",
    count: "200+",
    description: "Экспертов по жилью",
  },
  {
    icon: "/images/icons/about/face.svg",
    count: "200+",
    description: "Успешных сделок",
  },
]

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
              бесплатный сервис бронирования новостроек
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
        {info.map((item) => (
          <div className={styles.mainCard__info__item} key={item.description}>
            <IconImage
              className={styles.mainCard__info__item__icon}
              iconLink={item.icon}
              alt={item.description}
            />
            <div className={styles.mainCard__info__item__text}>
              <div className={styles.mainCard__info__item__text__count}>
                {item.count}
              </div>
              <div className={styles.mainCard__info__item__text__description}>
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MainCard
