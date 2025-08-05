import React from "react"
import styles from "./flatLayoutCard.module.scss"
import Image from "next/image"
import IconButton from "../ui/buttons/IconButton"
import Link from "next/link"

const description = [
  "Этаж 8 из 17",
  "I кв 2025",
  "Дом кирпичный",
  "Отделка улучшенная черновая",
]

const FlatLayoutCard = () => {
  return (
    <div className={styles.flatLayoutCard}>
      <div className={styles.flatLayoutCard__header}>
        <span>Европейский берег</span>
        <div className={styles.flatLayoutCard__header__actions}>
          <IconButton size="sm" type="secondary" iconLink="/images/heart.svg" />
          <IconButton size="sm" type="secondary" iconLink="/images/share.svg" />
        </div>
      </div>
      <div className={styles.flatLayoutCard__content}>
        <Link
          href="/details/1"
          className={styles.flatLayoutCard__content__image__wrapper}
        >
          <div className={styles.flatLayoutCard__content__image}>
            <Image
              src="/images/temporary/room.png"
              alt="flat-layout-card"
              fill
            />
          </div>
        </Link>
        <div className={styles.flatLayoutCard__content__title}>
          Студия, 25 м2
        </div>
        <div className={styles.flatLayoutCard__content__description}>
          {description.map((item, index) => (
            <React.Fragment key={item}>
              <h3 className={styles.flatLayoutCard__content__description__item}>
                {item}
              </h3>
              {index < description.length - 1 && (
                <div
                  className={
                    styles.flatLayoutCard__content__description__separator
                  }
                />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className={styles.flatLayoutCard__content__price}>
          <h4 className={styles.flatLayoutCard__content__price__value}>
            4 359 990 ₽
          </h4>
          <Link
            href="/details/1"
            className={styles.flatLayoutCard__content__price__change}
          >
            <div
              className={styles.flatLayoutCard__content__price__change__info}
            >
              <div
                className={
                  styles.flatLayoutCard__content__price__change__info__icon
                }
              >
                <Image src="/images/price-graph.svg" alt="price-graph" fill />
              </div>
              <span
                className={
                  styles.flatLayoutCard__content__price__change__info__text
                }
              >
                + 73 350 ₽ изменение цены
              </span>
            </div>

            <div
              className={styles.flatLayoutCard__content__price__change__button}
            >
              <div
                className={
                  styles.flatLayoutCard__content__price__change__button__icon
                }
              >
                <Image src="/images/arrow-right.svg" alt="arrow-right" fill />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FlatLayoutCard
