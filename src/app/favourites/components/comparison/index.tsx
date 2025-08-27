import type { Swiper as SwiperType } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import React, { useRef, useState } from "react"

import {
  FlatLayoutCardComparison,
  PropertyCardComparison,
} from "@/components/ComparisonCards"
import { FlatLayoutCardDataArray } from "@/components/ComparisonCards/data/flatData"
import { PropertyCardDataArray } from "@/components/ComparisonCards/data/propertyData"
import { IFavouriteView } from "@/types/Favourites"

import styles from "./comparison.module.scss"

import IconImage from "@/components/ui/IconImage"
import ActionButton from "@/components/ui/buttons/ActionButton"
import IconButton from "@/components/ui/buttons/IconButton"
import SwitchComponent from "@/components/ui/switch"

interface IComparisonProps {
  selectedView: IFavouriteView
  setIsComparison: (isComparison: boolean) => void
}

const Comparison = ({ selectedView, setIsComparison }: IComparisonProps) => {
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)
  const [isOnlyDifferences, setIsOnlyDifferences] = useState(false)
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
        <ActionButton
          className={styles.comparison__header__button}
          type="outline-white"
          onClick={() => setIsComparison(false)}
        >
          <IconImage
            iconLink="/images/icons/arrow-left-dark.svg"
            alt="arrow-left"
            className={styles.comparison__header__button__icon}
          />
          Вернуться в избранное
        </ActionButton>
        <div className={styles.comparison__header__actions}>
          <SwitchComponent
            id="comparison-switch"
            label="Только различия"
            checked={isOnlyDifferences}
            onCheckedChange={setIsOnlyDifferences}
          />
          <div className={styles.comparison__header__actions__buttons}>
            <IconButton
              iconLink="/images/icons/arrow-slider.svg"
              alt="prev"
              className={styles.comparison__header__actions__buttons__prev}
              onClick={handlePrevClick}
              disabled={isBeginning}
            />
            <IconButton
              iconLink="/images/icons/arrow-slider.svg"
              alt="next"
              className={styles.comparison__header__actions__buttons__next}
              onClick={handleNextClick}
              disabled={isEnd}
            />
          </div>
        </div>
      </div>
      <div className={styles.comparison__content}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={0}
          slidesPerView={2}
          slidesPerGroup={1}
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
          {selectedView === "complexes" &&
            PropertyCardDataArray.map((cardData, index) => (
              <SwiperSlide
                key={cardData.id}
                className={styles.comparison__slide}
              >
                <PropertyCardComparison
                  data={cardData}
                  isLast={index === PropertyCardDataArray.length - 1}
                />
              </SwiperSlide>
            ))}
          {selectedView === "layouts" &&
            FlatLayoutCardDataArray.map((cardData, index) => (
              <SwiperSlide
                key={cardData.id}
                className={styles.comparison__slide}
              >
                <FlatLayoutCardComparison
                  data={cardData}
                  isLast={index === FlatLayoutCardDataArray.length - 1}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  )
}

export default Comparison
