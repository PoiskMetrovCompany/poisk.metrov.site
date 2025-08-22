import React, { useState, useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import styles from "./comparison.module.scss"
import { PropertyCardDataArray } from "@/components/ComparisonCards/propertyData"
import { FlatLayoutCardDataArray } from "@/components/ComparisonCards/flatData"
import IconButton from "@/components/ui/buttons/IconButton"
import SwitchComponent from "@/components/ui/switch"
import { IFavouriteView } from "@/types/Favourites"
import {
  PropertyCardComparison,
  FlatLayoutCardComparison,
} from "@/components/ComparisonCards"

interface IComparisonProps {
  selectedView: IFavouriteView
}

const Comparison = ({ selectedView }: IComparisonProps) => {
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
        <SwitchComponent
          id="comparison-switch"
          label="Только различия"
          checked={isOnlyDifferences}
          onCheckedChange={setIsOnlyDifferences}
        />
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
          {selectedView === "complexes" &&
            PropertyCardDataArray.map((cardData) => (
              <SwiperSlide
                key={cardData.id}
                className={styles.comparison__slide}
              >
                <PropertyCardComparison data={cardData} />
              </SwiperSlide>
            ))}
          {selectedView === "layouts" &&
            FlatLayoutCardDataArray.map((cardData) => (
              <SwiperSlide
                key={cardData.id}
                className={styles.comparison__slide}
              >
                <FlatLayoutCardComparison data={cardData} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  )
}

export default Comparison
