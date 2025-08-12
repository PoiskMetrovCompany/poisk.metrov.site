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

const Compilation = () => {

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
        <Heading2>Подборка квартир</Heading2>
      </div>
      <div className={styles.compilation__content}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={4}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
          className={styles.swiper}
        >
          {flatCards.map((card) => (
            <SwiperSlide key={card.id} className={styles.swiper__slide}>
              {card.id === 3 ? <PromoCard /> : <FlatLayoutCard />}
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          className={`swiper-button-prev ${styles.navigationButton} ${styles.navigationButtonPrev}`}
        >
          <div className={styles.navigationButton__icon}>
            <Image src="/images/icons/arrow-slider.svg" alt="arrow-left" fill />
          </div>
        </div>
        <div
          className={`swiper-button-next ${styles.navigationButton} ${styles.navigationButtonNext}`}
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
