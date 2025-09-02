import clsx from "clsx"

import React from "react"

import Image from "next/image"
import Link from "next/link"

import { IApartment } from "@/types/api/complex"

import styles from "./flatLayoutCard.module.scss"

import IconImage from "../ui/IconImage"
import IconButton from "../ui/buttons/IconButton"

interface IFlatLayoutCardProps {
  listClassName?: string
  apartment?: IApartment
}

const FlatLayoutCard = ({ listClassName, apartment }: IFlatLayoutCardProps) => {
  // Если нет данных квартиры, показываем плейсхолдер
  if (!apartment) {
    return (
      <div className={styles.flatLayoutCard}>
        <div className={styles.flatLayoutCard__header}>
          <span>Загрузка...</span>
        </div>
      </div>
    )
  }

  // Формируем описание квартиры
  const description = [
    `Этаж ${apartment.floor}`,
    apartment.renovation,
    apartment.balcony !== "нет" ? apartment.balcony : "Без балкона",
    `${apartment.bathroom_unit} санузел${apartment.bathroom_unit === "2" ? "а" : ""}`,
  ].filter(Boolean)
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
          href={`/detailsFlat?key=${apartment.key}`}
          className={styles.flatLayoutCard__content__image__wrapper}
        >
          <div className={styles.flatLayoutCard__content__image}>
            <Image
              src={apartment.plan_URL || "/images/temporary/room.png"}
              alt="flat-layout-card"
              fill
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/images/temporary/room.png"
              }}
            />
          </div>
        </Link>
        <span className={styles.flatLayoutCard__content__title}>
          {apartment.room_count === 0
            ? "Студия"
            : `${apartment.room_count}-комн`}
          , {apartment.area} м²
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
            {apartment.price.toLocaleString("ru-RU")} ₽
          </h4>
          <Link
            href={`/detailsFlat?key=${apartment.key}`}
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
