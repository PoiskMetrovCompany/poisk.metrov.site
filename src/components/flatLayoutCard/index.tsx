import React from "react"
import styles from "./flatLayoutCard.module.scss"
import Image from "next/image"
import IconButton from "../ui/buttons/IconButton"
import Link from "next/link"
import IconImage from "../ui/IconImage"
import clsx from "clsx"

const description = [
  "Этаж 8 из 17",
  "I кв 2025",
  "Дом кирпичный",
  "Отделка улучшенная черновая",
]

interface IFlatLayoutCardProps {
  listClassName?: string
}

const FlatLayoutCard = ({ listClassName }: IFlatLayoutCardProps) => {
  return (
    <div className={styles.flatLayoutCard}>
      <div className={styles.flatLayoutCard__header}>
        <span>Европейский берег</span>
        <div className={styles.flatLayoutCard__header__actions}>
          <IconButton
            size="sm"
            type="secondary"
            iconLink="/images/icons/heart.svg"
          />
          <IconButton
            size="sm"
            type="secondary"
            iconLink="/images/icons/share.svg"
          />
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
        <span className={styles.flatLayoutCard__content__title}>
          Студия, 25 м²
        </span>
        <ul
          className={clsx(
            styles.flatLayoutCard__content__description,
            listClassName
          )}
        >
          {description.map((item, index) => (
            <React.Fragment key={item}>
              <li className={styles.flatLayoutCard__content__description__item}>
                {item}
              </li>
              {index < description.length - 1 && (
                <div
                  className={
                    styles.flatLayoutCard__content__description__separator
                  }
                />
              )}
            </React.Fragment>
          ))}
        </ul>
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
              <IconImage
                className={
                  styles.flatLayoutCard__content__price__change__info__icon
                }
                iconLink="/images/icons/price-graph.svg"
                alt="price-graph"
              />
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
              <IconImage
                iconLink="/images/icons/arrow-right.svg"
                alt="arrow-right"
                className={
                  styles.flatLayoutCard__content__price__change__button__icon
                }
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FlatLayoutCard
