"use client"

import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import React from "react"

import Image from "next/image"

import styles from "./rating.module.scss"

import IconImage from "@/components/ui/IconImage"
import Heading2 from "@/components/ui/heading2"

const reviews = [
  {
    id: 1,
    name: "Михаил Шматов",
    rating: 5.0,
    text: "«Благодарю риэлтора Оксану Кравченко. Нам нужно было выбрать квартиру в сжатые сроки. Буквально в течение дня на основе моих собственных предпочтений риэлтор помогла найти идеальный вариант жилья. Мы остались очень довольны!»",
  },
  {
    id: 2,
    name: "Михаил Шматов",
    rating: 4.0,
    text: "«Благодарю риэлтора Оксану Кравченко. Нам нужно было выбрать квартиру в сжатые сроки. Буквально в течение дня на основе моих собственных предпочтений риэлтор помогла найти идеальный вариант жилья. Мы остались очень довольны!»",
  },
  {
    id: 3,
    name: "Михаил Шматов",
    rating: 5.0,
    text: "«Благодарю риэлтора Оксану Кравченко. Нам нужно было выбрать квартиру в сжатые сроки. Буквально в течение дня на основе моих собственных предпочтений риэлтор помогла найти идеальный вариант жилья. Мы остались очень довольны!»",
  },
  {
    id: 4,
    name: "Михаил Шматов",
    rating: 3.0,
    text: "«Благодарю риэлтора Оксану Кравченко. Нам нужно было выбрать квартиру в сжатые сроки. Буквально в течение дня на основе моих собственных предпочтений риэлтор помогла найти идеальный вариант жилья. Мы остались очень довольны!»",
  },
  {
    id: 5,
    name: "Михаил Шматов",
    rating: 2.0,
    text: "«Благодарю риэлтора Оксану Кравченко. Нам нужно было выбрать квартиру в сжатые сроки. Буквально в течение дня на основе моих собственных предпочтений риэлтор помогла найти идеальный вариант жилья. Мы остались очень довольны!»",
  },
  {
    id: 6,
    name: "Михаил Шматов",
    rating: 5.0,
    text: "«Благодарю риэлтора Оксану Кравченко. Нам нужно было выбрать квартиру в сжатые сроки. Буквально в течение дня на основе моих собственных предпочтений риэлтор помогла найти идеальный вариант жилья. Мы остались очень довольны!»",
  },
]

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating)

  return (
    <div className={styles.starRating}>
      <div className={styles.starRating__stars}>
        {[...Array(5)].map((_, index) => (
          <div key={index} className={styles.starRating__star}>
            {index < fullStars ? (
              <Image
                src="/images/icons/starRating.svg"
                alt="star"
                width={20}
                height={20}
              />
            ) : (
              <div className={styles.starRating__starEmpty}></div>
            )}
          </div>
        ))}
      </div>
      <span className={styles.starRating__score}>{rating.toFixed(1)}</span>
    </div>
  )
}

const Rating = () => {
  return (
    <div className={styles.rating}>
      <div className={styles.rating__title}>
        <div className={styles.rating__title__text}>
          <Heading2 className={styles.rating__title__text__h2}>
            Средняя оценка в соцсетях - 4,9*
          </Heading2>
          <p className={styles.rating__title__text__description}>
            На основании отзывов более 300 клиентов
          </p>
        </div>
        <div className={styles.rating__title__buttons}>
          <div
            className={`swiper-button-prev-rating ${styles.navigationButton} ${styles.navigationButtonPrev}`}
          >
            <div className={styles.navigationButton__icon}>
              <Image
                src="/images/icons/arrow-slider.svg"
                alt="arrow-left"
                fill
              />
            </div>
          </div>
          <div
            className={`swiper-button-next-rating ${styles.navigationButton} ${styles.navigationButtonNext}`}
          >
            <div className={styles.navigationButton__icon}>
              <Image
                src="/images/icons/arrow-slider.svg"
                alt="arrow-right"
                fill
                className={styles.navigationButton__icon__icon_next}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rating__content}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={40}
          navigation={{
            nextEl: ".swiper-button-next-rating",
            prevEl: ".swiper-button-prev-rating",
          }}
          slidesPerView={3}
          breakpoints={{
            0: {
              slidesPerView: 1.3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          className={styles.swiper}
        >
          {reviews.map((item, index) => (
            <SwiperSlide key={index}>
              <div className={styles.rating__content__item}>
                <StarRating rating={item.rating} />
                <p className={styles.rating__content__item__description}>
                  {item.text}
                </p>
                <div className={styles.rating__content__item__title}>
                  <p className={styles.rating__content__item__title__name}>
                    {item.name}
                  </p>
                  <IconImage
                    iconLink={"/images/icons/geo.svg"}
                    alt={item.name}
                    className={styles.rating__content__item__title__image}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default Rating
