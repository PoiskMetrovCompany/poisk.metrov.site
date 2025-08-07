"use client"

import React, { FC } from "react"
import styles from "../carouselComponent.module.scss"
import CatalogButton from "@/components/ui/buttons/CatalogButton"
import DetailsButton from "@/components/ui/buttons/DetailsButton"
import FavoriteButton from "@/components/ui/buttons/FavoriteButton"
import Image from "next/image"
import clsx from "clsx"
import ActionButton from "@/components/ui/buttons/ActionButton"
import IconButton from "@/components/ui/buttons/IconButton"

interface ISpecification {
  type: string
  price: string
}

interface IBadge {
  developer: string
  period: string
}

interface IProperty {
  title: string
  price: string
  subtitle: string
  badge: IBadge
  metro: string
  driveTime: string
  specifications: ISpecification[]
}

interface IPropertyCardProps {
  property: IProperty
  image: string
}

const PropertyCard: FC<IPropertyCardProps> = ({ property, image }) => {
  const { title, price, subtitle, badge, metro, driveTime, specifications } =
    property

  return (
    <article className={styles.property_card}>
      <div className={styles.property_card__image}>
        <img src={image} alt={`Изображение ЖК ${title}`} />
        <div className={styles.property_card__badge}>
          <span>{badge.developer}</span>
          <span>{badge.period}</span>
        </div>
      </div>

      <div className={styles.property_card__content}>
        <div className={styles.property_card__row}>
          <div className={styles.property_card__title}>{title}</div>
          <div className={styles.property_card__price}>{price}</div>
        </div>

        <div className={styles.property_card__row}>
          <div className={styles.property_card__subtitle}>{subtitle}</div>
          <div className={styles.property_card__location}>
            <span className={clsx(styles.location__item)}>
              <Image
                src="/images/icons/metro.svg"
                alt="Location"
                width={24}
                height={24}
              />
              {metro}
            </span>
            <span className={clsx(styles.location__item)}>
              <Image
                src="/images/icons/car.svg"
                alt="Drive time"
                width={24}
                height={24}
              />
              {driveTime}
            </span>
          </div>
        </div>

        <div className={styles.property_card__divider}></div>

        <div className={styles.property_card__specifications}>
          <div className={styles.specifications}>
            {specifications.map((spec, index) => (
              <div key={index} className={styles.specifications__item}>
                <span className={styles.specifications__type}>{spec.type}</span>
                <span className={styles.specifications__price}>
                  {spec.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.property_card__actions}>
          <ActionButton className={styles.property_card__actions__button}>
            Каталог
          </ActionButton>
          <ActionButton
            className={styles.property_card__actions__button}
            type="outline"
          >
            Подробнее
          </ActionButton>
          <IconButton
            className={styles.property_card__actions__like}
            iconClassName={styles.property_card__actions__like__icon}
            iconLink={"/images/icons/heart.svg"}
          />
          {/* <CatalogButton />
          <DetailsButton />
          <FavoriteButton /> */}
        </div>
      </div>
    </article>
  )
}

export default PropertyCard
