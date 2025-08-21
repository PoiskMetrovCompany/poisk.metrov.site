import React, { useState, useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import styles from "./comparison.module.scss"
import Heading2 from "@/components/ui/heading2"
import PropertyCardComparison from "@/components/PropertyCardComparison"
import { PropertyCardDataArray } from "@/components/PropertyCardComparison/data"
import * as Switch from "@radix-ui/react-switch"
import IconButton from "@/components/ui/buttons/IconButton"

const Comparison = () => {
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)
  const swiperRef = useRef<SwiperType | null>(null)

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }

  const handlePrevClick = () => {
    if (swiperRef.current && !isBeginning) {
      swiperRef.current.slidePrev()
    }
  }

  const handleNextClick = () => {
    if (swiperRef.current && !isEnd) {
      swiperRef.current.slideNext()
    }
  }

  return (
    <div className={styles.comparison}>
      <div className={styles.comparison__header}>
        <div className={styles.comparison__header__switch}>
          <Switch.Root
            className={styles.comparison__header__switch__button}
            id="comparison-switch"
          >
            <Switch.Thumb
              className={styles.comparison__header__switch__button__thumb}
            />
          </Switch.Root>
          <span className={styles.comparison__header__switch__text}>
            Только различия
          </span>
        </div>
        <div className={styles.comparison__header__buttons}>
          <IconButton
            iconLink="/images/icons/arrow-slider.svg"
            alt="prev"
            className={styles.comparison__header__buttons__prev}
            onClick={handlePrevClick}
            disabled={isBeginning}
          />
          <IconButton
            iconLink="/images/icons/arrow-slider.svg"
            alt="next"
            className={styles.comparison__header__buttons__next}
            onClick={handleNextClick}
            disabled={isEnd}
          />
        </div>
      </div>
      <div className={styles.comparison__content}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={32}
          navigation={false}
          pagination={{ clickable: true }}
          className={styles.comparison__swiper}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
            setIsBeginning(swiper.isBeginning)
            setIsEnd(swiper.isEnd)
          }}
          onSlideChange={handleSlideChange}
        >
          {PropertyCardDataArray.map((cardData) => (
            <SwiperSlide key={cardData.id} className={styles.comparison__slide}>
              <PropertyCardComparison data={cardData} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default Comparison
