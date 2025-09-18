import React, { useEffect, useState } from "react"

import Image from "next/image"
import Link from "next/link"

import styles from "./estate.module.scss"

import IconImage from "@/components/ui/IconImage"
import ActionButton from "@/components/ui/buttons/ActionButton"
import Skeleton from "@/components/ui/skeleton"

interface EstateProps {
  images?: string[]
}

const features = [
  {
    title: "Застройщик",
    value: "ГК СМСС",
  },
  {
    title: "Срок сдачи",
    value: "2027",
  },
  {
    title: "Отделка",
    value: "Подготовка под чистовую отделку",
  },
  {
    title: "Тип дома",
    value: "Кирпично-монолитный",
  },
  {
    title: "Этажность",
    value: "10",
  },
]

const Estate = ({ images }: EstateProps) => {
  const [isImageLoading, setIsImageLoading] = useState(true)
  const [isHandled, setIsHandled] = useState(false)

  const imageToShow = images && images.length > 0 ? images[0] : ""

  useEffect(() => {
    setIsImageLoading(true)
    setIsHandled(false)

    const img = new window.Image()

    const handleLoad = () => {
      if (!isHandled) {
        setIsHandled(true)
        setIsImageLoading(false)
      }
    }

    const handleError = () => {
      if (!isHandled) {
        setIsHandled(true)
        setIsImageLoading(false)
      }
    }

    img.onload = handleLoad
    img.onerror = handleError
    img.src = imageToShow

    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [imageToShow])

  const handleImageLoad = () => {
    if (!isHandled) {
      setIsHandled(true)
      setIsImageLoading(false)
    }
  }

  const handleImageError = () => {
    if (!isHandled) {
      setIsHandled(true)
      setIsImageLoading(false)
    }
  }

  return (
    <div className={styles.info}>
      <div className={styles.info__slider}>
        {isImageLoading && (
          <Skeleton
            className={styles.info__slider__skeleton}
            width="100%"
            height="100%"
          />
        )}
        <Image
          src={imageToShow}
          alt="details"
          width={560}
          height={400}
          className={styles.info__slider__image}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{ display: isImageLoading ? "none" : "block" }}
        />
      </div>
      <div className={styles.info__description}>
        <div className={styles.info__description__price}>
          <div className={styles.info__description__price__minimal}>
            <span className={styles.info__description__price__minimal__title}>
              Минимальная цена
            </span>
            <span className={styles.info__description__price__minimal__price}>
              от 4 359 990 ₽
            </span>
          </div>
          <Link
            href="/"
            className={styles.info__description__price__hasChanged}
          >
            <span className={styles.info__description__price__hasChanged__text}>
              Цена не менялась
            </span>

            <div
              className={styles.info__description__price__hasChanged__button}
            >
              <IconImage
                className={
                  styles.info__description__price__hasChanged__button__icon
                }
                iconLink="/images/icons/arrow-right.svg"
                alt="arrow-right"
              />
            </div>
          </Link>
        </div>
        <ul className={styles.info__description__features}>
          {features.map((feature) => (
            <li
              className={styles.info__description__features__item}
              key={feature.title}
            >
              <span className={styles.info__description__features__item__title}>
                {feature.title}
              </span>
              <span className={styles.info__description__features__item__value}>
                {feature.value}
              </span>
            </li>
          ))}
        </ul>
        <div className={styles.info__description__buttons}>
          <ActionButton className={styles.info__description__buttons__button}>
            Записаться на просмотр
          </ActionButton>
          <ActionButton
            className={styles.info__description__buttons__button}
            type="secondary"
          >
            Скачать презентацию
          </ActionButton>
        </div>
      </div>
    </div>
  )
}

export default Estate
