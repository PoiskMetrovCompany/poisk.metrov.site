"use client"
import React from "react"
import styles from "./work.module.scss"
import Heading2 from "@/components/ui/heading2"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import Image from "next/image"
import IconImage from "@/components/ui/IconImage"

const workContent = [
  {
    imageLink: "/images/temporary/people.png",
    title: "Экскурсии по новостройкам",
    description:
      "Раскрывать потенциал каждой локации, делая жизнь в доме источником положительных эмоций",
  },
  {
    imageLink: "/images/temporary/people.png",
    title: "Экскурсии по новостройкам",
    description:
      "Раскрывать потенциал каждой локации, делая жизнь в доме источником положительных эмоций",
  },
  {
    imageLink: "/images/temporary/people.png",
    title: "Экскурсии по новостройкам",
    description:
      "Раскрывать потенциал каждой локации, делая жизнь в доме источником положительных эмоций",
  },
]

const Work = () => {
  return (
    <div className={styles.work}>
      <div className={styles.work__header}>
        <Heading2 className={styles.work__header__h2}>Как мы работаем?</Heading2>
        <div className={styles.work__header__navigation}>
          <div
            className={`swiper-button-prev-work ${styles.navigationButton} ${styles.navigationButtonPrev} ${styles.navigationButtonMobile}`}
          >
            <div className={styles.navigationButton__icon}>
              <Image src="/images/icons/arrow-slider.svg" alt="arrow-left" fill />
            </div>
          </div>
          <div
            className={`swiper-button-next-work ${styles.navigationButton} ${styles.navigationButtonNext} ${styles.navigationButtonMobile}`}
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

      <div className={styles.work__content}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          navigation={{
            nextEl: ".swiper-button-next-work",
            prevEl: ".swiper-button-prev-work",
          }}
          slidesPerView={1}
          className={styles.swiper}
        >
          {workContent.map((item, index) => (
            <SwiperSlide key={index}>
              <div className={styles.work__content__item}>
                <IconImage
                  iconLink={item.imageLink}
                  alt={item.title}
                  className={styles.work__content__item__image}
                />
                <div className={styles.work__content__item__content}>
                  <h3 className={styles.work__content__item__content__title}>
                    {item.title}
                  </h3>
                  <p
                    className={styles.work__content__item__content__description}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className={`swiper-button-prev-work ${styles.navigationButton} ${styles.navigationButtonPrev} ${styles.navigationButtonDesktop}`}
        >
          <div className={styles.navigationButton__icon}>
            <Image src="/images/icons/arrow-slider.svg" alt="arrow-left" fill />
          </div>
        </div>
        <div
          className={`swiper-button-next-work ${styles.navigationButton} ${styles.navigationButtonNext} ${styles.navigationButtonDesktop}`}
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

export default Work