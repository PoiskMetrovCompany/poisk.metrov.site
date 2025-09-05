import styles from "./menuSlider.module.scss"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules"
import "swiper/css"
import IconImage from "@/components/ui/IconImage"
import { useState, useRef, useEffect } from "react"
import clsx from "clsx"
import type { Swiper as SwiperType } from "swiper"

const images = [
  {
    imageLink: "/images/temporary/people.png",
    title: "ЖК «Astra Marine на набережной1»",
    metro: "Октябрьская1",
    car: "25 минут1",
    price: "от 30,35 млн ₽",
  },
  {
    imageLink: "/images/temporary/people.png",
    title: "ЖК «Astra Marine на набережной2»",
    metro: "Октябрьская2",
    car: "25 минут2",
    price: "от 30,35 млн ₽",
  },
  {
    imageLink: "/images/temporary/people.png",
    title: "ЖК «Astra Marine на набережной3»",
    metro: "Октябрьская3",
    car: "25 минут3",
    price: "от 30,35 млн ₽",
  },
]

interface IMenuSliderProps {
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

const MenuSlider = ({ onClick }: IMenuSliderProps) => {
  const [activeSlide, setActiveSlide] = useState(0)
  const [animationKey, setAnimationKey] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)

  const handleNavigationClick = (index: number) => {
    setActiveSlide(index)
    setAnimationKey((prev) => prev + 1)
    if (swiperRef.current) {
      swiperRef.current.slideTo(index)
    }
  }

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveSlide(swiper.realIndex)
    setAnimationKey((prev) => prev + 1)
  }

  useEffect(() => {
    setAnimationKey((prev) => prev + 1)
  }, [])

  return (
    <div className={styles.slider} onClick={onClick}>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        onSlideChange={handleSlideChange}
        className={styles.slider__swiper}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className={styles.slider__swiper__slide}>
            <div className={styles.slider__swiper__slide__content}>
              <div className={styles.slider__swiper__slide__content__info}>
                <h1
                  className={styles.slider__swiper__slide__content__info__title}
                >
                  {image.title}
                </h1>
                <div
                  className={
                    styles.slider__swiper__slide__content__info__description
                  }
                >
                  <div
                    className={
                      styles.slider__swiper__slide__content__info__description__text
                    }
                  >
                    <div
                      className={
                        styles.slider__swiper__slide__content__info__description__text__road
                      }
                    >
                      <div
                        className={
                          styles.slider__swiper__slide__content__info__description__text__road__item
                        }
                      >
                        <IconImage
                          iconLink="/images/icons/metro.svg"
                          alt="metro"
                          className={
                            styles.slider__swiper__slide__content__info__description__text__road__item__icon
                          }
                        />
                        <span
                          className={
                            styles.slider__swiper__slide__content__info__description__text__road__item__text
                          }
                        >
                          {image.metro}
                        </span>
                      </div>

                      <div
                        className={
                          styles.slider__swiper__slide__content__info__description__text__road__item
                        }
                      >
                        <IconImage
                          iconLink="/images/icons/car-white.svg"
                          alt="car"
                          className={
                            styles.slider__swiper__slide__content__info__description__text__road__item__icon
                          }
                        />
                        <span
                          className={
                            styles.slider__swiper__slide__content__info__description__text__road__item__text
                          }
                        >
                          {image.car}
                        </span>
                      </div>
                    </div>
                    <span
                      className={
                        styles.slider__swiper__slide__content__info__description__text__price
                      }
                    >
                      {image.price}
                    </span>
                  </div>
                  <button
                    className={
                      styles.slider__swiper__slide__content__info__description__button
                    }
                  >
                    Подробнее
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.slider__navigation}>
        {images.map((_, index) => (
          <div
            key={`${index}-${
              activeSlide === index ? animationKey : "inactive"
            }`}
            className={clsx(styles.slider__navigation__item, {
              [styles.slider__navigation__item__active]: activeSlide === index,
            })}
            onClick={() => handleNavigationClick(index)}
          />
        ))}
      </div>

      <div
        className={`swiper-button-prev ${styles.slider__navigationButton} ${styles.slider__navigationButtonPrev}`}
      >
        <div className={styles.slider__navigationButton__icon}>
          <Image
            className={styles.slider__navigationButton__icon__image}
            src="/images/icons/arrow-slider.svg"
            alt="arrow-left"
            fill
          />
        </div>
      </div>
      <div
        className={`swiper-button-next ${styles.slider__navigationButton} ${styles.slider__navigationButtonNext}`}
      >
        <div className={styles.slider__navigationButton__icon}>
          <Image
            src="/images/icons/arrow-slider.svg"
            alt="arrow-right"
            fill
            className={styles.slider__navigationButton__icon__icon_next}
          />
        </div>
      </div>
    </div>
  )
}

export default MenuSlider
