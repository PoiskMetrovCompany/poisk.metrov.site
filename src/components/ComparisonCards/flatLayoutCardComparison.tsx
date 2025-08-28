import React from "react"

import Link from "next/link"

import {
  IFlatLayoutCardFull,
  IPropertyCardConveniences,
  IPropertyCardGeneral,
  IPropertyCardLocation,
} from "@/types/PropertyCard"

import styles from "./comparisonCards.module.scss"

import FlatLayoutCardData from "./data/flatData"
import { propertyCardTranslations } from "./data/translations"

import IconImage from "../ui/IconImage"
import ActionButton from "../ui/buttons/ActionButton"
import IconButton from "../ui/buttons/IconButton"
import Heading3 from "../ui/heading3"

interface FlatLayoutCardComparisonProps {
  data: IFlatLayoutCardFull
  isLast?: boolean
  isInView?: boolean
}

const FlatLayoutCardComparison: React.FC<FlatLayoutCardComparisonProps> = ({
  data = FlatLayoutCardData,
  isLast = false,
  isInView = false,
}) => {
  // Функция для рендеринга значения в зависимости от типа
  const renderValue = (key: string, value: unknown): React.ReactNode => {
    // Обработка builder
    if (
      key === "builder" &&
      typeof value === "object" &&
      value !== null &&
      "name" in value &&
      "image" in value
    ) {
      const builderValue = value as { name: string; image: string }
      return (
        <div
          className={
            styles.comparisonCards__content__block__list__item__value__complex
          }
        >
          <span>{builderValue.name}</span>
          <IconImage
            iconLink={builderValue.image}
            alt={builderValue.name}
            className={
              styles.comparisonCards__content__block__list__item__value__complex__icon
            }
          />
        </div>
      )
    }

    // Обработка metro
    if (
      key === "metro" &&
      typeof value === "object" &&
      value !== null &&
      "name" in value &&
      "image" in value &&
      "time" in value
    ) {
      const metroValue = value as { name: string; image: string; time: string }
      return (
        <div
          className={
            styles.comparisonCards__content__block__list__item__value__complex
          }
        >
          <div
            className={
              styles.comparisonCards__content__block__list__item__value__complex__info
            }
          >
            <span
              className={
                styles.comparisonCards__content__block__list__item__value__complex__info__name
              }
            >
              {metroValue.name}
            </span>
            <IconImage
              iconLink={metroValue.image}
              alt={metroValue.name}
              className={
                styles.comparisonCards__content__block__list__item__value__complex__icon
              }
            />

            <span
              className={
                styles.comparisonCards__content__block__list__item__value__complex__info__time
              }
            >
              {metroValue.time}
            </span>
          </div>
        </div>
      )
    }

    // Обычное строковое значение
    return <span>{String(value)}</span>
  }

  const onTrashClick = () => {
    console.log("track")
  }

  return (
    <div
      className={`${styles.comparisonCards} ${isLast ? styles.comparisonCards__last : ""}`}
    >
      <div className={styles.comparisonCards__content}>
        <div className={styles.comparisonCards__content__heading}>
          <div
            className={styles.comparisonCards__content__heading__imageContainer}
          >
            <Link
              href="/details/1"
              className={styles.comparisonCards__content__heading__imageFlat}
            >
              <IconImage
                iconLink={data.image}
                alt="image"
                className={
                  styles.comparisonCards__content__heading__imageFlat__icon
                }
              />
            </Link>
            <IconButton
              size="sm"
              iconLink={"/images/icons/trash.svg"}
              type="secondary"
              alt="trash"
              iconClassName={
                styles.comparisonCards__content__heading__image__delete__icon
              }
              className={
                styles.comparisonCards__content__heading__image__delete
              }
              onClick={onTrashClick}
            />
          </div>
          <div className={styles.comparisonCards__content__heading__text}>
            <Heading3
              className={styles.comparisonCards__content__heading__text__title}
            >
              {data.title}
            </Heading3>
            <span
              className={
                styles.comparisonCards__content__heading__text__address
              }
            >
              {data.address}
            </span>
          </div>
        </div>

        <div className={styles.comparisonCards__content__block}>
          <div className={styles.comparisonCards__content__block__title}>
            Общие сведения
          </div>

          <ul className={styles.comparisonCards__content__block__list}>
            {Object.entries(data.general).map(([key, value]) => (
              <li
                key={key}
                className={styles.comparisonCards__content__block__list__item}
              >
                <span
                  className={
                    styles.comparisonCards__content__block__list__item__title
                  }
                >
                  {
                    propertyCardTranslations.general[
                      key as keyof IPropertyCardGeneral
                    ]
                  }
                </span>
                <div
                  className={
                    styles.comparisonCards__content__block__list__item__value
                  }
                >
                  {renderValue(key, value)}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.comparisonCards__content__block}>
          <div className={styles.comparisonCards__content__block__title}>
            Расположение
          </div>

          <ul className={styles.comparisonCards__content__block__list}>
            {Object.entries(data.location).map(([key, value]) => (
              <li
                key={key}
                className={styles.comparisonCards__content__block__list__item}
              >
                <span
                  className={
                    styles.comparisonCards__content__block__list__item__title
                  }
                >
                  {
                    propertyCardTranslations.location[
                      key as keyof IPropertyCardLocation
                    ]
                  }
                </span>
                <div
                  className={
                    styles.comparisonCards__content__block__list__item__value
                  }
                >
                  {renderValue(key, value)}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.comparisonCards__content__block}>
          <div className={styles.comparisonCards__content__block__title}>
            Удобства
          </div>

          <ul className={styles.comparisonCards__content__block__list}>
            {Object.entries(data.conveniences).map(([key, value]) => (
              <li
                key={key}
                className={styles.comparisonCards__content__block__list__item}
              >
                <span
                  className={
                    styles.comparisonCards__content__block__list__item__title
                  }
                >
                  {
                    propertyCardTranslations.conveniences[
                      key as keyof IPropertyCardConveniences
                    ]
                  }
                </span>
                <div
                  className={
                    styles.comparisonCards__content__block__list__item__value
                  }
                >
                  {renderValue(key, value)}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.comparisonCards__content__price}>
          <div className={styles.comparisonCards__content__price__value}>
            <span
              className={styles.comparisonCards__content__price__value__price}
            >
              {data.price} ₽
            </span>
            <span
              className={
                styles.comparisonCards__content__price__value__pricePerMonth
              }
            >
              {data.pricePerMonth} ₽/мес
            </span>
          </div>
          <div className={styles.comparisonCards__content__buttons}>
            <ActionButton>Записаться на просмотр</ActionButton>
            <ActionButton type="secondary">Скачать презентацию</ActionButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlatLayoutCardComparison
