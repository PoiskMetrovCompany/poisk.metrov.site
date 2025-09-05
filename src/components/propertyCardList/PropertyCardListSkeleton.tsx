"use client"

import React, { FC } from "react"

import styles from "./propertyCardList.module.scss"

import Skeleton from "@/components/ui/skeleton"

interface IPropertyCardListSkeletonProps {
  className?: string
}

const PropertyCardListSkeleton: FC<IPropertyCardListSkeletonProps> = ({
  className,
}) => {
  return (
    <div className={styles.property_card_list}>
      <Skeleton
        className={styles.property_card_list__image}
        height="200px"
        width="280px"
        border="8px"
      />

      <div className={styles.property_card_list__content}>
        <div className={styles.property_card_list__content__info}>
          <div className={styles.property_card_list__content__info__header}>
            <Skeleton
              className={
                styles.property_card_list__content__info__header__title
              }
              height="28px"
              width="60%"
              border="4px"
            />
            <div
              className={
                styles.property_card_list__content__info__header__location
              }
            >
              <Skeleton height="18px" width="80%" border="4px" />
              <div
                className={
                  styles.property_card_list__content__info__header__location__way
                }
              >
                <div
                  className={
                    styles.property_card_list__content__info__header__location__way__item
                  }
                >
                  <Skeleton height="16px" width="16px" border="50%" />
                  <Skeleton height="16px" width="80px" border="4px" />
                </div>
                <div
                  className={
                    styles.property_card_list__content__info__header__location__way__item
                  }
                >
                  <Skeleton height="16px" width="16px" border="50%" />
                  <Skeleton height="16px" width="60px" border="4px" />
                </div>
              </div>
            </div>
          </div>

          <div
            className={styles.property_card_list__content__info__specifications}
          >
            {[...Array(4)].map((_, index) => (
              <div
                className={
                  styles.property_card_list__content__info__specifications__item
                }
                key={index}
              >
                <Skeleton height="16px" width="70px" border="4px" />
                <Skeleton height="16px" width="90px" border="4px" />
              </div>
            ))}
          </div>

          <div
            className={styles.property_card_list__content__info__description}
          >
            {[...Array(4)].map((_, index) => (
              <div
                className={
                  styles.property_card_list__content__info__description__item
                }
                key={index}
              >
                <Skeleton height="16px" width="80px" border="4px" />
                <Skeleton height="16px" width="120px" border="4px" />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.property_card_list__content__separator} />

        <div className={styles.property_card_list__content__actions}>
          <div className={styles.property_card_list__content__actions__price}>
            <div
              className={
                styles.property_card_list__content__actions__price__value
              }
            >
              <div
                className={
                  styles.property_card_list__content__actions__price__value__header
                }
              >
                <Skeleton height="32px" width="120px" border="4px" />
                <Skeleton height="16px" width="80px" border="4px" />
              </div>
              <Skeleton height="32px" width="32px" border="6px" />
            </div>
            <div
              className={
                styles.property_card_list__content__actions__price__mortgage
              }
            >
              <Skeleton height="32px" width="140px" border="6px" />
              <div
                className={
                  styles.property_card_list__content__actions__price__mortgage__description
                }
              >
                <Skeleton height="20px" width="150px" border="4px" />
                <Skeleton height="16px" width="200px" border="4px" />
              </div>
            </div>
          </div>

          <div className={styles.property_card_list__content__actions__builder}>
            <div
              className={
                styles.property_card_list__content__actions__builder__header
              }
            >
              <Skeleton height="24px" width="100px" border="4px" />
              <Skeleton height="40px" width="40px" border="6px" />
            </div>
            <div
              className={
                styles.property_card_list__content__actions__builder__buttons
              }
            >
              <Skeleton height="32px" width="140px" border="6px" />
              <div
                className={
                  styles.property_card_list__content__actions__builder__buttons__more
                }
              >
                <Skeleton height="36px" width="100px" border="6px" />
                <Skeleton height="36px" width="80px" border="6px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyCardListSkeleton
