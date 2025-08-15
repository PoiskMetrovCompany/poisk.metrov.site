  "use client"
  import React, { useState } from "react"
  import { Swiper, SwiperSlide } from "swiper/react"
  import { Navigation, Pagination } from "swiper/modules"
  import type { Swiper as SwiperType } from "swiper"
  import "swiper/css"
  import "swiper/css/navigation"
  import "swiper/css/pagination"

  import styles from "./estate.module.scss"
  import Image from "next/image"
  import ActionButton from "@/components/ui/buttons/ActionButton"
  import Link from "next/link"
  import IconImage from "@/components/ui/IconImage"

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
      value: "Подготовка под чистовую отделку",
    },
    {
      title: "Этаж",
      value: "4 из 23",
    },
    {
      title: "Номер квартиры",
      value: "111",
    },
    {
      title: "Общая площадь",
      value: "31.4 м²",
    },
    {
      title: "Жилая площадь",
      value: "12.8 м²",
    },
  ]

  // Массив изображений для слайдера
  const images = [
    "/images/temporary/flatImage.webp",
    "/images/temporary/flatImage.webp",
  ]

  const Estate = () => {
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
                  src={image}
                  alt={`details ${index + 1}`}
                  width={560}
                  height={400}
                  className={styles.info__slider__image}
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
                от 4 359 990 ₽
              </span>
            </div>
            <Link href="/" className={styles.info__description__price__hasChanged}>
              <span className={styles.info__description__price__hasChanged__text}>
                Цена не менялась
              </span>
              <div className={styles.info__description__price__hasChanged__button}>
                <IconImage
                  className={styles.info__description__price__hasChanged__button__icon}
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