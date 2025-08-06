"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import styles from "./constructionProgress.module.scss"
import Heading2 from "@/components/ui/heading2"
import Image from "next/image"

const ConstructionProgress = () => {
  const constructionImages = [
    {
      id: 1,
      src: "/images/temporary/constructionProgress.png",
      date: "2024-07-01",
    },
    {
      id: 2,
      src: "/images/temporary/constructionProgress.png",
      date: "2024-08-15",
    },
    {
      id: 3,
      src: "/images/temporary/constructionProgress.png",
      date: "2024-09-30",
    },
    {
      id: 4,
      src: "/images/temporary/constructionProgress.png",
      date: "2024-11-15",
    },
    {
      id: 5,
      src: "/images/temporary/constructionProgress.png",
      date: "2024-12-01",
    },
  ]

  return (
    <div className={styles.constructionProgress}>
      <div className={styles.constructionProgress__header}>
        <Heading2>Ход строительства</Heading2>
      </div>
      <div className={styles.constructionProgress__content}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={3}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          className={styles.swiper}
        >
          {constructionImages.map((image) => (
            <SwiperSlide key={image.id} className={styles.swiper__slide}>
              <div className={styles.imageCard}>
                <div className={styles.imageCard__imageWrapper}>
                  <Image
                    src={image.src}
                    alt={`Ход строительства - ${image.date}`}
                    width={400}
                    height={300}
                    className={styles.imageCard__image}
                    loading="lazy"
                  />
                </div>
                <div className={styles.imageCard__date}>{image.date}</div>
              </div>
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

export default ConstructionProgress
