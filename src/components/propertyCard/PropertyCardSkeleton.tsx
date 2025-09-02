"use client"

import clsx from "clsx"

import React, { FC } from "react"

import styles from "./propertyCard.module.scss"

import Skeleton from "@/components/ui/skeleton"

interface IPropertyCardSkeletonProps {
  className?: string
}

const PropertyCardSkeleton: FC<IPropertyCardSkeletonProps> = ({
  className,
}) => {
  return (
    <article className={clsx(styles.property_card, className)}>
      <div className={styles.property_card__image}>
        <Skeleton height="200px" width="100%" border="8px" />
        <div className={styles.property_card__badge}>
          <Skeleton height="20px" width="80px" border="4px" />
          <Skeleton height="20px" width="60px" border="4px" />
        </div>
      </div>

      <div className={styles.property_card__content}>
        <div
          className={clsx(
            styles.property_card__row,
            styles.property_card__row_title
          )}
        >
          <Skeleton height="24px" width="60%" border="4px" />
          <Skeleton height="24px" width="30%" border="4px" />
        </div>

        <div
          className={clsx(
            styles.property_card__row,
            styles.property_card__row_subtitle
          )}
        >
          <Skeleton height="18px" width="70%" border="4px" />
          <div className={styles.property_card__location}>
            <div className={styles.property_card__location__item}>
              <Skeleton height="16px" width="16px" border="50%" />
              <Skeleton height="16px" width="80px" border="4px" />
            </div>
            <div className={styles.property_card__location__item}>
              <Skeleton height="16px" width="16px" border="50%" />
              <Skeleton height="16px" width="60px" border="4px" />
            </div>
          </div>
        </div>

        <div className={styles.property_card__divider}></div>

        <div className={styles.property_card__specifications}>
          <div className={styles.property_card__specifications__list}>
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className={styles.property_card__specifications__list__item}
              >
                <Skeleton height="16px" width="70px" border="4px" />
                <Skeleton height="16px" width="90px" border="4px" />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.property_card__actions}>
          <Skeleton height="32px" width="80px" border="6px" />
          <Skeleton height="32px" width="100px" border="6px" />
          <Skeleton height="32px" width="32px" border="6px" />
        </div>
      </div>
    </article>
  )
}

export default PropertyCardSkeleton
