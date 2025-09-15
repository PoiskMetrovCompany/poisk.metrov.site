"use client"

import clsx from "clsx"

import React, { FC } from "react"

import { useRouter } from "next/navigation"

import { IProperty } from "@/types/PropertyCard"

import styles from "./propertyCard.module.scss"

import ActionButton from "@/components/ui/buttons/ActionButton"
import IconButton from "@/components/ui/buttons/IconButton"

import IconImage from "../ui/IconImage"

interface IPropertyCardProps {
  property: IProperty
  className?: string
  isMap?: boolean
  imageClassName?: string
  subtitleClassName?: string
  listClassName?: string
}

const PropertyCard: FC<IPropertyCardProps> = ({
  property,
  className,
  isMap,
  imageClassName,
  subtitleClassName,
  listClassName,
}) => {
  const router = useRouter()

  const {
    title,
    price,
    subtitle,
    badge,
    metro,
    driveTime,
    metroType,
    specifications,
    linkKey,
  } = property

  const handleCatalogueClick = () => {
    router.push("/catalogue")
  }

  const handleDetailsClick = () => {
    if (linkKey) {
      const route = property.isApartment
        ? `/detailsFlat?key=${linkKey}`
        : `/details/${linkKey}`
      router.push(route)
    }
  }

  // Выбираем иконку в зависимости от типа передвижения до метро
  const getMetroIcon = () => {
    return metroType === "on_foot"
      ? "/images/icons/walk.svg"
      : "/images/icons/car.svg"
  }

  return (
    <article
      className={clsx(
        styles.property_card,
        className,
        isMap && styles.property_card_map
      )}
    >
      <div
        className={clsx(
          styles.property_card__image,
          isMap && styles.property_card__image_map
        )}
      >
        <img
          className={clsx(imageClassName)}
          src={property.image}
          alt={`Изображение ЖК ${title}`}
        />
        <div className={styles.property_card__badge}>
          <span>{badge.developer}</span>
          <span>{badge.period}</span>
        </div>
      </div>

      <div className={styles.property_card__content}>
        <div
          className={clsx(
            styles.property_card__row,
            styles.property_card__row_title
          )}
        >
          <span className={styles.property_card__title}>{title}</span>
          <span className={styles.property_card__price}>{price}</span>
        </div>

        <div
          className={clsx(
            styles.property_card__row,
            styles.property_card__row_subtitle,
            isMap && styles.property_card__row_subtitle_map
          )}
        >
          <div
            className={clsx(styles.property_card__subtitle, subtitleClassName)}
          >
            {subtitle}
          </div>
          <div className={styles.property_card__location}>
            <span className={clsx(styles.property_card__location__item)}>
              <IconImage
                iconLink="/images/icons/metro.svg"
                alt="Metro"
                className={styles.property_card__location__item__icon}
              />
              {metro}
            </span>
            <span className={clsx(styles.property_card__location__item)}>
              <IconImage
                iconLink={getMetroIcon()}
                alt={metroType === "on_foot" ? "Walking time" : "Drive time"}
                className={styles.property_card__location__item__icon}
              />
              {driveTime}
            </span>
          </div>
        </div>

        <div
          className={clsx(
            styles.property_card__divider,
            isMap && styles.property_card__divider_map
          )}
        ></div>

        <div className={styles.property_card__specifications}>
          <div
            className={clsx(
              styles.property_card__specifications__list,
              listClassName,
              isMap && styles.property_card__specifications__list_map
            )}
          >
            {specifications.map((spec, index) => (
              <div
                key={index}
                className={styles.property_card__specifications__list__item}
              >
                <span
                  className={
                    styles.property_card__specifications__list__item__type
                  }
                >
                  {spec.type}
                </span>
                <span
                  className={
                    styles.property_card__specifications__list__item__price
                  }
                >
                  {spec.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          className={clsx(
            styles.property_card__actions,
            isMap && styles.property_card__actions_map
          )}
        >
          {!isMap && (
            <ActionButton
              size="tiny"
              className={styles.property_card__actions__button}
              onClick={handleCatalogueClick}
            >
              Каталог
            </ActionButton>
          )}

          <ActionButton
            className={clsx(
              styles.property_card__actions__button,
              isMap && styles.property_card__actions__button_map
            )}
            type={isMap ? "primary" : "outline"}
            size="tiny"
            onClick={handleDetailsClick}
          >
            Подробнее
          </ActionButton>
          <IconButton size="tiny" iconLink={"/images/icons/heart.svg"} />
        </div>
      </div>
    </article>
  )
}

export default PropertyCard
