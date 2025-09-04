import clsx from "clsx"

import styles from "./flatLayoutCard.module.scss"

import Skeleton from "../ui/skeleton"

interface IFlatLayoutCardSkeletonProps {
  listClassName?: string
}

const FlatLayoutCardSkeleton = ({
  listClassName,
}: IFlatLayoutCardSkeletonProps) => {
  return (
    <div className={styles.flatLayoutCard}>
      <div className={styles.flatLayoutCard__header}>
        <Skeleton width="60%" height="16px" />
        <div className={styles.flatLayoutCard__header__actions}>
          <Skeleton width="32px" height="32px" border="8px" />
          <Skeleton width="32px" height="32px" border="8px" />
        </div>
      </div>
      <div className={styles.flatLayoutCard__content}>
        <div className={styles.flatLayoutCard__content__image__wrapper}>
          <div className={styles.flatLayoutCard__content__image}>
            <Skeleton width="100%" height="100%" border="12px" />
          </div>
        </div>
        <Skeleton
          className={styles.flatLayoutCard__content__title}
          width="80%"
          height="20px"
        />
        <ul
          className={clsx(
            styles.flatLayoutCard__content__description,
            listClassName
          )}
        >
          {[1, 2, 3, 4].map((index) => (
            <li
              key={index}
              className={styles.flatLayoutCard__content__description__item}
            >
              <Skeleton width={`${65 + index * 5}%`} height="14px" />
            </li>
          ))}
        </ul>
        <div className={styles.flatLayoutCard__content__price}>
          <Skeleton
            className={styles.flatLayoutCard__content__price__value}
            width="70%"
            height="24px"
          />
          <div className={styles.flatLayoutCard__content__price__change}>
            <div
              className={styles.flatLayoutCard__content__price__change__info}
            >
              <Skeleton width="16px" height="16px" />
              <Skeleton width="140px" height="14px" />
            </div>
            <div
              className={styles.flatLayoutCard__content__price__change__button}
            >
              <Skeleton width="20px" height="20px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlatLayoutCardSkeleton
