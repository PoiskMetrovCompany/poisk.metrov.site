import styles from "./menuSlider.module.scss"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import IconImage from "@/components/ui/IconImage"
import { useState } from "react"
import clsx from "clsx"

const images = [
  {
    imageLink: "/images/temporary/people.png",
    title: "ЖК «Astra Marine на набережной»",
    metro: "Октябрьская",
    car: "25 минут",
    price: "от 30,35 млн ₽",
  },
  {
    imageLink: "/images/temporary/people.png",
    title: "ЖК «Astra Marine на набережной»",
    metro: "Октябрьская",
    car: "25 минут",
    price: "от 30,35 млн ₽",
  },
  {
    imageLink: "/images/temporary/people.png",
    title: "ЖК «Astra Marine на набережной»",
    metro: "Октябрьская",
    car: "25 минут",
    price: "от 30,35 млн ₽",
  },
]

const MenuSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0)

  const handleNavigationClick = (index: number) => {
    setActiveSlide(index)
  }

  return (
    <div className={styles.slider}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ clickable: true }}
        // autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className={styles.slider__swiper}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className={styles.slider__swiper__slide}>
            <div className={styles.slider__swiper__slide__content}>
              <div className={styles.slider__swiper__slide__content__info}>
                <h1
                  className={styles.slider__swiper__slide__content__info__title}
                >
                  {images[activeSlide].title}
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
                          {images[activeSlide].metro}
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
                          {images[activeSlide].car}
                        </span>
                      </div>
                    </div>
                    <span
                      className={
                        styles.slider__swiper__slide__content__info__description__text__price
                      }
                    >
                      {images[activeSlide].price}
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
            key={index}
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
          <Image src="/images/icons/arrow-slider.svg" alt="arrow-left" fill />
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
