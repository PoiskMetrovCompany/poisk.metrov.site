"use client"

import type { Swiper as SwiperType } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import React, { useState } from "react"

import Image from "next/image"
import Link from "next/link"

import styles from "./estate.module.scss"

import IconImage from "@/components/ui/IconImage"
import ActionButton from "@/components/ui/buttons/ActionButton"
import Skeleton from "@/components/ui/skeleton"

interface InfoProps {
  price: number
  renovation: string
  floor: number
  flatNumber: string
  fullArea: number
  livingArea: number
  planUrl: string
  isLoading?: boolean
  isError?: boolean
}

const Estate = ({
  price,
  renovation,
  floor,
  flatNumber,
  fullArea,
  livingArea,
  planUrl,
  isLoading = false,
  isError = false,
}: InfoProps) => {
  const [imageError, setImageError] = useState<boolean>(false)
  const images = [planUrl]
  const features = [
    {
      title: "Срок сдачи",
      value: "2027",
    },
    {
      title: "Корпус",
      value: "Корпус 2",
    },
    {
      title: "Отделка",
      value: renovation,
    },
    {
      title: "Этаж",
      value: floor,
    },
    {
      title: "Номер квартиры",
      value: flatNumber,
    },
    {
      title: "Общая площадь",
      value: `${fullArea} м²`,
    },
    {
      title: "Жилая площадь",
      value: `${livingArea} м²  `,
    },
  ]
  const [activeSlide, setActiveSlide] = useState<number>(0)
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null)

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveSlide(swiper.activeIndex)
  }

  const handleNavigationClick = (index: number) => {
    if (swiperRef) {
      swiperRef.slideTo(index)
    }
  }

  if (isLoading || isError) {
    return (
      <div className={styles.info}>
        <div className={styles.info__slider}>
          <div className={styles.info__slider__skeleton}>
            <Skeleton
              height="100%"
              width="100%"
              border="32px"
              className={styles.info__slider__skeleton__image}
            />
          </div>

          <div className={styles.info__slider__navigation}>
            <Skeleton height={4} width="100%" border="2px" />
          </div>
        </div>

        <div className={styles.info__description}>
          <div className={styles.info__description__price}>
            <div className={styles.info__description__price__minimal}>
              <Skeleton height={27} width="150px" border="4px" />
              <Skeleton height={31} width="120px" border="4px" />
            </div>
            <div className={styles.info__description__price__hasChanged}>
              <Skeleton height={48} width="100%" border="16px" />
            </div>
          </div>

          <ul className={styles.info__description__features}>
            {Array.from({ length: 7 }).map((_, index) => (
              <li
                className={styles.info__description__features__item}
                key={index}
              >
                <Skeleton height={27} width="120px" border="4px" />
                <Skeleton height={27} width="80px" border="4px" />
              </li>
            ))}
          </ul>

          <div className={styles.info__description__buttons}>
            <Skeleton height={48} width="100%" border="12px" />
            <Skeleton height={48} width="100%" border="12px" />
            <Skeleton height={48} width="100%" border="12px" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.info}>
      <div className={styles.info__slider}>
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          spaceBetween={0}
          onSwiper={setSwiperRef}
          onSlideChange={handleSlideChange}
          allowTouchMove={true}
          className={styles.swiper}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                src={imageError ? "/images/temporary/flatImage.webp" : image}
                alt={`details ${index + 1}`}
                width={560}
                height={400}
                className={styles.info__slider__image}
                onError={() => setImageError(true)}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={styles.info__slider__navigation}>
          {images.map((_, index) => (
            <div
              key={index}
              className={`${styles.info__slider__navigation__item} ${
                activeSlide === index ? styles.active : ""
              }`}
              onClick={() => handleNavigationClick(index)}
            />
          ))}
        </div>
      </div>

      <div className={styles.info__description}>
        <div className={styles.info__description__price}>
          <div className={styles.info__description__price__minimal}>
            <span className={styles.info__description__price__minimal__title}>
              Минимальная цена
            </span>
            <span className={styles.info__description__price__minimal__price}>
              {price} ₽
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
            Забронировать
          </ActionButton>
          <ActionButton
            className={styles.info__description__buttons__button}
            type="secondary"
          >
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
