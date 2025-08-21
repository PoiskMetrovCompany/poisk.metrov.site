import React from "react"
import styles from "./propertyCardComparison.module.scss"
import IconImage from "../ui/IconImage"
import PropertyCardData from "./data"
import Heading3 from "../ui/heading3"
import { propertyCardTranslations } from "./translations"
import {
  IPropertyCardGeneral,
  IPropertyCardLocation,
  IPropertyCardConveniences,
  IPropertyCardApartments,
  IPropertyCardCost,
  IPropertyCardFull,
} from "@/types/PropertyCard"
import ActionButton from "../ui/buttons/ActionButton"

interface PropertyCardComparisonProps {
  data?: IPropertyCardFull
}

const PropertyCardComparison: React.FC<PropertyCardComparisonProps> = ({
  data = PropertyCardData,
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
            styles.propertyCardComparison__content__block__list__item__value__complex
          }
        >
          <span>{builderValue.name}</span>
          <IconImage
            iconLink={builderValue.image}
            alt={builderValue.name}
            className={
              styles.propertyCardComparison__content__block__list__item__value__complex__icon
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
            styles.propertyCardComparison__content__block__list__item__value__complex
          }
        >
          <IconImage
            iconLink={metroValue.image}
            alt={metroValue.name}
            className={
              styles.propertyCardComparison__content__block__list__item__value__complex__icon
            }
          />
          <div
            className={
              styles.propertyCardComparison__content__block__list__item__value__complex__info
            }
          >
            <span
              className={
                styles.propertyCardComparison__content__block__list__item__value__complex__info__name
              }
            >
              {metroValue.name}
            </span>
            <span
              className={
                styles.propertyCardComparison__content__block__list__item__value__complex__info__time
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

  return (
    <div className={styles.propertyCardComparison}>
      <div className={styles.propertyCardComparison__content}>
        <div className={styles.propertyCardComparison__content__heading}>
          <div
            className={styles.propertyCardComparison__content__heading__image}
          >
            <IconImage
              iconLink={data.image}
              alt="image"
              className={
                styles.propertyCardComparison__content__heading__image__icon
              }
            />
          </div>
          <div
            className={styles.propertyCardComparison__content__heading__text}
          >
            <Heading3>{data.title}</Heading3>
            <span
              className={
                styles.propertyCardComparison__content__heading__text__address
              }
            >
              {data.address}
            </span>
          </div>
        </div>

        <div className={styles.propertyCardComparison__content__block}>
          <div className={styles.propertyCardComparison__content__block__title}>
            Общие сведения
          </div>

          <ul className={styles.propertyCardComparison__content__block__list}>
            {Object.entries(data.general).map(([key, value]) => (
              <li
                key={key}
                className={
                  styles.propertyCardComparison__content__block__list__item
                }
              >
                <span
                  className={
                    styles.propertyCardComparison__content__block__list__item__title
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
                    styles.propertyCardComparison__content__block__list__item__value
                  }
                >
                  {renderValue(key, value)}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.propertyCardComparison__content__block}>
          <div className={styles.propertyCardComparison__content__block__title}>
            Расположение
          </div>

          <ul className={styles.propertyCardComparison__content__block__list}>
            {Object.entries(data.location).map(([key, value]) => (
              <li
                key={key}
                className={
                  styles.propertyCardComparison__content__block__list__item
                }
              >
                <span
                  className={
                    styles.propertyCardComparison__content__block__list__item__title
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
                    styles.propertyCardComparison__content__block__list__item__value
                  }
                >
                  {renderValue(key, value)}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.propertyCardComparison__content__block}>
          <div className={styles.propertyCardComparison__content__block__title}>
            Удобства
          </div>

          <ul className={styles.propertyCardComparison__content__block__list}>
            {Object.entries(data.conveniences).map(([key, value]) => (
              <li
                key={key}
                className={
                  styles.propertyCardComparison__content__block__list__item
                }
              >
                <span
                  className={
                    styles.propertyCardComparison__content__block__list__item__title
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
                    styles.propertyCardComparison__content__block__list__item__value
                  }
                >
                  {renderValue(key, value)}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.propertyCardComparison__content__block}>
          <div className={styles.propertyCardComparison__content__block__title}>
            Квартиры
          </div>

          <ul className={styles.propertyCardComparison__content__block__list}>
            {Object.entries(data.apartments).map(([key, value]) => (
              <li
                key={key}
                className={
                  styles.propertyCardComparison__content__block__list__item
                }
              >
                <span
                  className={
                    styles.propertyCardComparison__content__block__list__item__title
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
                    styles.propertyCardComparison__content__block__list__item__value
                  }
                >
                  {renderValue(key, value)}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.propertyCardComparison__content__block}>
          <div className={styles.propertyCardComparison__content__block__title}>
            Стоимость квартир
          </div>

          <ul className={styles.propertyCardComparison__content__block__list}>
            {Object.entries(data.cost).map(([key, value]) => (
              <li
                key={key}
                className={
                  styles.propertyCardComparison__content__block__list__item
                }
              >
                <span
                  className={
                    styles.propertyCardComparison__content__block__list__item__title
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
                    styles.propertyCardComparison__content__block__list__item__value
                  }
                >
                  от {value} млн ₽
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.propertyCardComparison__content__buttons}>
          <ActionButton>Записаться на просмотр</ActionButton>
          <ActionButton type="secondary">Скачать презентацию</ActionButton>
        </div>
      </div>
    </div>
  )
}

export default PropertyCardComparison
