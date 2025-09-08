import clsx from "clsx"

import React from "react"

import Link from "next/link"

import { IFlatLayoutCardFullWithDifferences } from "@/types/PropertyCard"

import styles from "./comparisonCards.module.scss"

import IconImage from "../ui/IconImage"
import ActionButton from "../ui/buttons/ActionButton"
import IconButton from "../ui/buttons/IconButton"
import Heading3 from "../ui/heading3"

interface FlatLayoutCardComparisonProps {
  data: IFlatLayoutCardFullWithDifferences
  isLast?: boolean
  isInView?: boolean
  isOnlyDifferences?: boolean
}

const FlatLayoutCardComparison: React.FC<FlatLayoutCardComparisonProps> = ({
  data,
  isLast = false,
  isInView = false,
  isOnlyDifferences = false,
}) => {
  // Функция для проверки, нужно ли показывать элемент
  const shouldShowItem = (
    blockType: "apartmentInfo" | "complex",
    key: string
  ): boolean => {
    if (!isOnlyDifferences) return true
    const differences = data.differences[blockType]
    if (blockType === "apartmentInfo") {
      return (
        differences &&
        key in differences &&
        (
          differences as IFlatLayoutCardFullWithDifferences["differences"]["apartmentInfo"]
        )[
          key as keyof IFlatLayoutCardFullWithDifferences["differences"]["apartmentInfo"]
        ]
      )
    }
    if (blockType === "complex") {
      return (
        differences &&
        key in differences &&
        (
          differences as IFlatLayoutCardFullWithDifferences["differences"]["complex"]
        )[
          key as keyof IFlatLayoutCardFullWithDifferences["differences"]["complex"]
        ]
      )
    }
    return false
  }

  // Функция для рендеринга значения в зависимости от типа
  const renderValue = (key: string, value: unknown): React.ReactNode => {
    // Проверяем на null/undefined/пустые значения
    if (value === null || value === undefined || value === "") {
      return <span>Не указано</span>
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
            Характеристики квартиры
          </div>

          <ul className={styles.comparisonCards__content__block__list}>
            {Object.entries(data.apartmentInfo).map(([key, value]) =>
              shouldShowItem("apartmentInfo", key) ? (
                <li
                  key={key}
                  className={clsx(
                    styles.comparisonCards__content__block__list__item,
                    {
                      [styles.comparisonCards__content__block__list__item_active]:
                        (
                          data.differences
                            .apartmentInfo as IFlatLayoutCardFullWithDifferences["differences"]["apartmentInfo"]
                        )[
                          key as keyof IFlatLayoutCardFullWithDifferences["differences"]["apartmentInfo"]
                        ] && isInView,
                    }
                  )}
                >
                  <span
                    className={
                      styles.comparisonCards__content__block__list__item__title
                    }
                  >
                    {getApartmentInfoTranslation(key)}
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
            Жилой комплекс
          </div>

          <ul className={styles.comparisonCards__content__block__list}>
            {Object.entries(data.complex).map(([key, value]) =>
              shouldShowItem("complex", key) ? (
                <li
                  key={key}
                  className={clsx(
                    styles.comparisonCards__content__block__list__item,
                    {
                      [styles.comparisonCards__content__block__list__item_active]:
                        (
                          data.differences
                            .complex as IFlatLayoutCardFullWithDifferences["differences"]["complex"]
                        )[
                          key as keyof IFlatLayoutCardFullWithDifferences["differences"]["complex"]
                        ] && isInView,
                    }
                  )}
                >
                  <span
                    className={
                      styles.comparisonCards__content__block__list__item__title
                    }
                  >
                    {getComplexTranslation(key)}
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

        <div className={styles.comparisonCards__content__price}>
          <div className={styles.comparisonCards__content__price__value}>
            <span
              className={styles.comparisonCards__content__price__value__price}
            >
              {data.apartmentInfo.price} ₽
            </span>
            {/* <span
              className={
                styles.comparisonCards__content__price__value__pricePerMonth
              }
            >
              Не указано ₽/мес
            </span> */}
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

// Функции для получения переводов
const getApartmentInfoTranslation = (key: string): string => {
  const translations: Record<string, string> = {
    price: "Цена",
    area: "Общая площадь",
    livingSpace: "Жилая площадь",
    kitchenSpace: "Площадь кухни",
    roomCount: "Количество комнат",
    floor: "Этаж",
    floorsTotal: "Всего этажей",
    ceilingHeight: "Высота потолков",
    apartmentType: "Тип квартиры",
    bathroomUnit: "Санузел",
    buildingSection: "Секция",
    builtYear: "Год постройки",
    readyQuarter: "Квартал сдачи",
  }
  return translations[key] || key
}

const getComplexTranslation = (key: string): string => {
  const translations: Record<string, string> = {
    name: "Название",
    code: "Код",
    address: "Адрес",
  }
  return translations[key] || key
}

export default FlatLayoutCardComparison
