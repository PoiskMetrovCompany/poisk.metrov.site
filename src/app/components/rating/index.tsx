"use client"

import React from "react"
import styles from "./rating.module.scss"
import Heading2 from "@/components/ui/heading2"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import IconImage from "@/components/ui/IconImage"

const reviews = [
  {
    id: 1,
    name: "Михаил Шматов",
    text: "«Благодарю риэлтора Оксану Кравченко. Нам нужно было выбрать квартиру в сжатые сроки. Буквально в течение дня на основе моих собственных предпочтений риэлтор помогла найти идеальный вариант жилья. Мы остались очень довольны!»",
  },
  {
    id: 2,
    name: "Михаил Шматов",
    text: "«Благодарю риэлтора Оксану Кравченко. Нам нужно было выбрать квартиру в сжатые сроки. Буквально в течение дня на основе моих собственных предпочтений риэлтор помогла найти идеальный вариант жилья. Мы остались очень довольны!»",
  },
  {
    id: 3,
    name: "Михаил Шматов",
    text: "«Благодарю риэлтора Оксану Кравченко. Нам нужно было выбрать квартиру в сжатые сроки. Буквально в течение дня на основе моих собственных предпочтений риэлтор помогла найти идеальный вариант жилья. Мы остались очень довольны!»",
  },
  {
    id: 4,
    name: "Михаил Шматов",
    text: "«Благодарю риэлтора Оксану Кравченко. Нам нужно было выбрать квартиру в сжатые сроки. Буквально в течение дня на основе моих собственных предпочтений риэлтор помогла найти идеальный вариант жилья. Мы остались очень довольны!»",
  },
  {
    id: 5,
    name: "Михаил Шматов",
    text: "«Благодарю риэлтора Оксану Кравченко. Нам нужно было выбрать квартиру в сжатые сроки. Буквально в течение дня на основе моих собственных предпочтений риэлтор помогла найти идеальный вариант жилья. Мы остались очень довольны!»",
  },
  {
    id: 6,
    name: "Михаил Шматов",
    text: "«Благодарю риэлтора Оксану Кравченко. Нам нужно было выбрать квартиру в сжатые сроки. Буквально в течение дня на основе моих собственных предпочтений риэлтор помогла найти идеальный вариант жилья. Мы остались очень довольны!»",
  },
]

const Rating = () => {
  return (
    <div className={styles.rating}>
      <div className={styles.rating__title}>
        <div className={styles.rating__title__text}>
          <Heading2>Средняя оценка в соцсетях - 4,9*</Heading2>
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
          className={styles.swiper}
        >
          {reviews.map((item, index) => (
            <SwiperSlide key={index}>
              <div className={styles.rating__content__item}>
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

                <p className={styles.rating__content__item__description}>
                  {item.text}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default Rating
