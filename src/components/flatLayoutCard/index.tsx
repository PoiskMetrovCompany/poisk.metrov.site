import clsx from "clsx"

import React from "react"

import Image from "next/image"
import Link from "next/link"

import styles from "./flatLayoutCard.module.scss"

import IconImage from "../ui/IconImage"
import IconButton from "../ui/buttons/IconButton"

interface IFlatLayoutCardProps {
  listClassName?: string
  title?: string
  price?: string
  complex?: string
  description?: string[]
  imageUrl?: string
  linkUrl?: string
  apartment?: any
}

const FlatLayoutCard = ({
  listClassName,
  title = "Студия, 25 м²",
  price = "4 359 990 ₽",
  complex = "Европейский берег",
  description = [
    "Этаж 8 из 17",
    "I кв 2025",
    "Дом кирпичный",
    "Отделка улучшенная черновая",
  ],
  imageUrl = "/images/temporary/room.png",
  linkUrl = `/detailsFlat?key=asdf1231sdas`,
}: IFlatLayoutCardProps) => {
  return (
    <div className={styles.flatLayoutCard}>
      <div className={styles.flatLayoutCard__header}>
        <span>{complex}</span>
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
          href={linkUrl}
          className={styles.flatLayoutCard__content__image__wrapper}
        >
          <div className={styles.flatLayoutCard__content__image}>
            <Image src={imageUrl} alt="flat-layout-card" fill />
          </div>
        </Link>
        <span className={styles.flatLayoutCard__content__title}>{title}</span>
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
            {price}
          </h4>
          <a
            href={linkUrl}
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
          </a>
        </div>
      </div>
    </div>
  )
}

export default FlatLayoutCard
