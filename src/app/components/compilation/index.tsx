"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import styles from "./compilation.module.scss"
import Heading2 from "@/components/ui/heading2"
import FlatLayoutCard from "@/components/flatLayoutCard"
import Image from "next/image"
import PromoCard from "./promoCard"

interface compilationProps {
  header: string
  hasPromoCard: boolean
}

const Compilation = ({ header, hasPromoCard }: compilationProps) => {
  const flatCards = [
    {
      id: 1,
      title: "Студия, 25 м2",
      price: "4 359 990 ₽",
      complex: "Европейский берег",
    },
    {
      id: 2,
      title: "1-комнатная, 35 м2",
      price: "5 890 000 ₽",
      complex: "Европейский берег",
    },
    {
      id: 3,
      title: "2-комнатная, 45 м2",
      price: "7 200 000 ₽",
      complex: "Европейский берег",
    },
    {
      id: 4,
      title: "Студия, 28 м2",
      price: "4 800 000 ₽",
      complex: "Европейский берег",
    },
    {
      id: 5,
      title: "1-комнатная, 38 м2",
      price: "6 150 000 ₽",
      complex: "Европейский берег",
    },
    {
      id: 6,
      title: "2-комнатная, 52 м2",
      price: "8 100 000 ₽",
      complex: "Европейский берег",
    },
    {
      id: 7,
      title: "Студия, 30 м2",
      price: "5 200 000 ₽",
      complex: "Европейский берег",
    },
    {
      id: 8,
      title: "1-комнатная, 42 м2",
      price: "6 800 000 ₽",
      complex: "Европейский берег",
    },
  ]

  return (
    <div className={styles.compilation}>
      <div className={styles.compilation__header}>
        <Heading2 className={styles.compilation__header__h2}>{header}</Heading2>
        <div className={styles.compilation__header__navigation}>
          <div
            className={`swiper-button-prev ${styles.navigationButton} ${styles.navigationButtonPrev} ${styles.navigationButtonMobile}`}
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
            className={`swiper-button-next ${styles.navigationButton} ${styles.navigationButtonNext} ${styles.navigationButtonMobile}`}
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

      <div className={styles.compilation__content}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1440: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1920: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          className={styles.swiper}
        >
          {flatCards.map((card) => (
            <SwiperSlide key={card.id} className={styles.swiper__slide}>
              {card.id === 3 && hasPromoCard === true ? <PromoCard /> : <FlatLayoutCard />}
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className={`swiper-button-prev ${styles.navigationButton} ${styles.navigationButtonPrev} ${styles.navigationButtonDesktop}`}
        >
          <div className={styles.navigationButton__icon}>
            <Image src="/images/icons/arrow-slider.svg" alt="arrow-left" fill />
          </div>
        </div>
        <div
          className={`swiper-button-next ${styles.navigationButton} ${styles.navigationButtonNext} ${styles.navigationButtonDesktop}`}
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
  )
}

export default Compilation
