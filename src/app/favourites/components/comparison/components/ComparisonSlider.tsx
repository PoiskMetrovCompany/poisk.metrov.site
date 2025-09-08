import type { Swiper as SwiperType } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import React from "react"

import {
  FlatLayoutCardComparison,
  PropertyCardComparison,
} from "@/components/ComparisonCards"
import { IFavouriteView } from "@/types/Favourites"
import {
  ComparisonResponse,
  getTypedComparisonData,
} from "@/types/api/comparison"

import styles from "../comparison.module.scss"

import {
  adaptApartmentComparisonToFlatLayoutCard,
  adaptComparisonToFlatLayoutCard,
  adaptComparisonToPropertyCard,
} from "../utils/adapters"

interface IComparisonSliderProps {
  selectedView: IFavouriteView
  comparisonData: ComparisonResponse | undefined
  activeSlideIndex: number
  onSwiperInit: (swiper: SwiperType) => void
  onSlideChange: (swiper: SwiperType) => void
  isOnlyDifferences: boolean
}

const ComparisonSlider: React.FC<IComparisonSliderProps> = ({
  selectedView,
  comparisonData,
  activeSlideIndex,
  onSwiperInit,
  onSlideChange,
  isOnlyDifferences,
}) => {
  const typedData = comparisonData
    ? getTypedComparisonData(comparisonData)
    : null

  return (
    <div className={styles.comparison__content}>
      <Swiper
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={2}
        slidesPerGroup={1}
        navigation={false}
        pagination={{ clickable: true }}
        className={styles.comparison__swiper}
        onSwiper={onSwiperInit}
        onSlideChange={onSlideChange}
        watchSlidesProgress={true}
        observer={true}
        observeParents={true}
      >
        {selectedView === "complexes" &&
          typedData?.type === "complexes" &&
          typedData.data.attributes.map((attribute, index) => {
            const cardData = adaptComparisonToPropertyCard(
              attribute,
              typedData.data.attributes
            )
            return (
              <SwiperSlide
                key={attribute.key}
                className={styles.comparison__slide}
              >
                <PropertyCardComparison
                  data={cardData}
                  isLast={
                    index === (typedData.data.attributes?.length || 0) - 1
                  }
                  isInView={
                    index >= activeSlideIndex && index < activeSlideIndex + 2
                  }
                  isOnlyDifferences={isOnlyDifferences}
                />
              </SwiperSlide>
            )
          })}
        {selectedView === "layouts" &&
          typedData?.type === "apartments" &&
          typedData.data.attributes.map((attribute, index) => {
            const cardData = adaptApartmentComparisonToFlatLayoutCard(
              attribute,
              typedData.data.attributes
            )
            return (
              <SwiperSlide
                key={attribute.key}
                className={styles.comparison__slide}
              >
                <FlatLayoutCardComparison
                  data={cardData}
                  isLast={
                    index === (typedData.data.attributes?.length || 0) - 1
                  }
                  isInView={
                    index >= activeSlideIndex && index < activeSlideIndex + 2
                  }
                  isOnlyDifferences={isOnlyDifferences}
                />
              </SwiperSlide>
            )
          })}
      </Swiper>
    </div>
  )
}

export default ComparisonSlider
