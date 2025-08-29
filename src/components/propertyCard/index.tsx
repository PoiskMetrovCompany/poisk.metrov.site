"use client"

import clsx from "clsx"

import React, { FC } from "react"

import { IProperty } from "@/types/PropertyCard"

import styles from "./propertyCard.module.scss"

import ActionButton from "@/components/ui/buttons/ActionButton"
import IconButton from "@/components/ui/buttons/IconButton"

import IconImage from "../ui/IconImage"

interface IPropertyCardProps {
  property: IProperty
  className?: string
  imageClassName?: string
  subtitleClassName?: string
  listClassName?: string
}

const PropertyCard: FC<IPropertyCardProps> = ({
  property,
  className,
  imageClassName,
  subtitleClassName,
  listClassName,
}) => {
  const {
    title,
    price,
    subtitle,
    badge,
    metro,
    driveTime,
    metroType,
    specifications,
  } = property

  // Выбираем иконку в зависимости от типа передвижения до метро
  const getMetroIcon = () => {
    return metroType === "on_foot"
      ? "/images/icons/walk.svg"
      : "/images/icons/car.svg"
  }

  return (
    <article className={clsx(styles.property_card, className)}>
      <div className={styles.property_card__image}>
        <img
          className={imageClassName}
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
            styles.property_card__row_subtitle
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

        <div className={styles.property_card__divider}></div>

        <div className={styles.property_card__specifications}>
          <div
            className={clsx(
              styles.property_card__specifications__list,
              listClassName
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

        <div className={styles.property_card__actions}>
          <ActionButton
            size="tiny"
            className={styles.property_card__actions__button}
          >
            Каталог
          </ActionButton>
          <ActionButton
            className={styles.property_card__actions__button}
            type="outline"
            size="tiny"
          >
            <a href={`/details`}>Подробнее</a>
          </ActionButton>
          <IconButton size="tiny" iconLink={"/images/icons/heart.svg"} />
        </div>
      </div>
    </article>
  )
}

export default PropertyCard
