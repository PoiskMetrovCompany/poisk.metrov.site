import React from "react"

import styles from "./comparisonCards.module.scss"

import Skeleton from "../ui/skeleton"

interface ComparisonSkeletonProps {
  count?: number
}

const ComparisonSkeleton: React.FC<ComparisonSkeletonProps> = ({
  count = 2,
}) => {
  return (
    <div className={styles.comparisonSkeleton}>
      <div className={styles.comparisonSkeleton__grid}>
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className={styles.comparisonSkeleton__card}>
            {/* Заголовок карточки */}
            <div className={styles.comparisonSkeleton__card__header}>
              <div className={styles.comparisonSkeleton__card__header__image}>
                <Skeleton width="100%" height="100%" border="8px" />
              </div>
              <div className={styles.comparisonSkeleton__card__header__content}>
                <Skeleton
                  width="80%"
                  height="20px"
                  className={styles.comparisonSkeleton__title}
                />
                <Skeleton
                  width="60%"
                  height="16px"
                  className={styles.comparisonSkeleton__subtitle}
                />
              </div>
            </div>

            {/* Блок характеристик */}
            <div className={styles.comparisonSkeleton__card__block}>
              <Skeleton
                width="40%"
                height="18px"
                className={styles.comparisonSkeleton__blockTitle}
              />
              <div className={styles.comparisonSkeleton__card__block__list}>
                {Array.from({ length: 6 }).map((_, itemIndex) => (
                  <div
                    key={itemIndex}
                    className={styles.comparisonSkeleton__card__block__item}
                  >
                    <Skeleton width="30%" height="14px" />
                    <Skeleton width="50%" height="14px" />
                  </div>
                ))}
              </div>
            </div>

            {/* Блок комплекса */}
            <div className={styles.comparisonSkeleton__card__block}>
              <Skeleton
                width="35%"
                height="18px"
                className={styles.comparisonSkeleton__blockTitle}
              />
              <div className={styles.comparisonSkeleton__card__block__list}>
                {Array.from({ length: 3 }).map((_, itemIndex) => (
                  <div
                    key={itemIndex}
                    className={styles.comparisonSkeleton__card__block__item}
                  >
                    <Skeleton width="25%" height="14px" />
                    <Skeleton width="60%" height="14px" />
                  </div>
                ))}
              </div>
            </div>

            {/* Блок цены */}
            <div className={styles.comparisonSkeleton__card__price}>
              <div className={styles.comparisonSkeleton__card__price__values}>
                <Skeleton
                  width="60%"
                  height="24px"
                  className={styles.comparisonSkeleton__price}
                />
                <Skeleton
                  width="40%"
                  height="16px"
                  className={styles.comparisonSkeleton__pricePerMonth}
                />
              </div>
              <div className={styles.comparisonSkeleton__card__price__buttons}>
                <Skeleton
                  width="100%"
                  height="40px"
                  className={styles.comparisonSkeleton__button}
                />
                <Skeleton
                  width="100%"
                  height="40px"
                  className={styles.comparisonSkeleton__button}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ComparisonSkeleton
