import clsx from "clsx"

import React from "react"

import Link from "next/link"

import {
  IPropertyCardApartments,
  IPropertyCardConveniences,
  IPropertyCardCost,
  IPropertyCardFull,
  IPropertyCardFullWithDifferences,
  IPropertyCardGeneral,
  IPropertyCardLocation,
} from "@/types/PropertyCard"

import styles from "./comparisonCards.module.scss"

import PropertyCardData from "./data/propertyData"
import { propertyCardTranslations } from "./data/translations"

import IconImage from "../ui/IconImage"
import ActionButton from "../ui/buttons/ActionButton"
import IconButton from "../ui/buttons/IconButton"
import Heading3 from "../ui/heading3"

interface PropertyCardComparisonProps {
  data?: IPropertyCardFullWithDifferences
  isLast?: boolean
  isInView?: boolean
  isOnlyDifferences?: boolean
}

const PropertyCardComparison: React.FC<PropertyCardComparisonProps> = ({
  data,
  isLast = false,
  isInView = false,
  isOnlyDifferences = false,
}) => {
  // Используем данные по умолчанию только если data не передан
  const cardData =
    data || (PropertyCardData as IPropertyCardFullWithDifferences)

  // Функция для проверки, нужно ли показывать элемент
  const shouldShowItem = (
    blockType: "general" | "location" | "conveniences" | "apartments" | "cost",
    key: string
  ): boolean => {
    if (!isOnlyDifferences) return true
    return cardData.differences[blockType][key] || false
  }

  // Функция для рендеринга значения в зависимости от типа
  const renderValue = (key: string, value: unknown): React.ReactNode => {
    // Проверяем на null/undefined/пустые значения
    if (value === null || value === undefined || value === "") {
      return <span>Не указано</span>
    }

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
          <span>{builderValue.name || "Не указано"}</span>
          {/* <IconImage
            iconLink={builderValue.image}
            alt={builderValue.name || "Не указано"}
            className={
              styles.comparisonCards__content__block__list__item__value__complex__icon
            }
          /> */}
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
              {metroValue.name || "Не указано"}
            </span>
            <IconImage
              iconLink={metroValue.image}
              alt={metroValue.name || "Не указано"}
              className={
                styles.comparisonCards__content__block__list__item__value__complex__icon
              }
            />

            <span
              className={
                styles.comparisonCards__content__block__list__item__value__complex__info__time
              }
            >
              {metroValue.time || "Не указано"}
            </span>
          </div>
        </div>
      )
    }

    // Обычное строковое значение
    return <span>{String(value)}</span>
  }

  return (
    <div
      className={clsx(styles.comparisonCards, {
        [styles.comparisonCards__last]: isLast,
      })}
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
                iconLink={cardData.image}
                alt="image"
                className={
                  styles.comparisonCards__content__heading__image__icon
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
            />
          </div>
          <div className={styles.comparisonCards__content__heading__text}>
            <Heading3
              className={styles.comparisonCards__content__heading__text__title}
            >
              {cardData.title}
            </Heading3>
            <span
              className={
                styles.comparisonCards__content__heading__text__address
              }
            >
              {cardData.address}
            </span>
          </div>
        </div>

        <div className={styles.comparisonCards__content__block}>
          <div className={styles.comparisonCards__content__block__title}>
            Общие сведения
          </div>

          <ul className={styles.comparisonCards__content__block__list}>
            {Object.entries(cardData.general).map(([key, value]) =>
              shouldShowItem("general", key) ? (
                <li
                  key={key}
                  className={clsx(
                    styles.comparisonCards__content__block__list__item,
                    {
                      [styles.comparisonCards__content__block__list__item_active]:
                        cardData.differences.general[key] && isInView,
                    }
                  )}
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
              ) : null
            )}
          </ul>
        </div>

        <div className={styles.comparisonCards__content__block}>
          <div className={styles.comparisonCards__content__block__title}>
            Расположение
          </div>

          <ul className={styles.comparisonCards__content__block__list}>
            {Object.entries(cardData.location).map(([key, value]) =>
              shouldShowItem("location", key) ? (
                <li
                  key={key}
                  className={clsx(
                    styles.comparisonCards__content__block__list__item,
                    {
                      [styles.comparisonCards__content__block__list__item_active]:
                        cardData.differences.location[key] && isInView,
                    }
                  )}
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
              ) : null
            )}
          </ul>
        </div>

        <div className={styles.comparisonCards__content__block}>
          <div className={styles.comparisonCards__content__block__title}>
            Удобства
          </div>

          <ul className={styles.comparisonCards__content__block__list}>
            {Object.entries(cardData.conveniences).map(([key, value]) =>
              shouldShowItem("conveniences", key) ? (
                <li
                  key={key}
                  className={clsx(
                    styles.comparisonCards__content__block__list__item,
                    {
                      [styles.comparisonCards__content__block__list__item_active]:
                        cardData.differences.conveniences[key] && isInView,
                    }
                  )}
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
              ) : null
            )}
          </ul>
        </div>

        <div className={styles.comparisonCards__content__block}>
          <div className={styles.comparisonCards__content__block__title}>
            Квартиры
          </div>

          <ul className={styles.comparisonCards__content__block__list}>
            {Object.entries(cardData.apartments).map(([key, value]) =>
              shouldShowItem("apartments", key) ? (
                <li
                  key={key}
                  className={clsx(
                    styles.comparisonCards__content__block__list__item,
                    {
                      [styles.comparisonCards__content__block__list__item_active]:
                        cardData.differences.apartments[key] && isInView,
                    }
                  )}
                >
                  <span
                    className={
                      styles.comparisonCards__content__block__list__item__title
                    }
                  >
                    {
                      propertyCardTranslations.apartments[
                        key as keyof IPropertyCardApartments
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
              ) : null
            )}
          </ul>
        </div>

        <div className={styles.comparisonCards__content__block}>
          <div className={styles.comparisonCards__content__block__title}>
            Стоимость квартир
          </div>

          <ul className={styles.comparisonCards__content__block__list}>
            {Object.entries(cardData.cost).map(([key, value]) =>
              shouldShowItem("cost", key) ? (
                <li
                  key={key}
                  className={clsx(
                    styles.comparisonCards__content__block__list__item,
                    {
                      [styles.comparisonCards__content__block__list__item_active]:
                        cardData.differences.cost[key] && isInView,
                    }
                  )}
                >
                  <span
                    className={
                      styles.comparisonCards__content__block__list__item__title
                    }
                  >
                    {
                      propertyCardTranslations.cost[
                        key as keyof IPropertyCardCost
                      ]
                    }
                  </span>
                  <div
                    className={
                      styles.comparisonCards__content__block__list__item__value
                    }
                  >
                    от {value} млн ₽
                  </div>
                </li>
              ) : null
            )}
          </ul>
        </div>

        <div className={styles.comparisonCards__content__buttons}>
          <ActionButton>Записаться на просмотр</ActionButton>
          <ActionButton type="secondary">Скачать презентацию</ActionButton>
        </div>
      </div>
    </div>
  )
}

export default PropertyCardComparison
