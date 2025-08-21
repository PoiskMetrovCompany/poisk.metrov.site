import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import styles from "./comparison.module.scss"
import Heading2 from "@/components/ui/heading2"
import PropertyCardComparison from "@/components/PropertyCardComparison"
import { PropertyCardDataArray } from "@/components/PropertyCardComparison/data"

const Comparison = () => {
  return (
    <div className={styles.comparison}>
      <div className={styles.comparison__header}>
        <Heading2>Сравнение</Heading2>
      </div>
      <div className={styles.comparison__content}>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          // slidesPerView={}

          navigation={true}
          pagination={{ clickable: true }}
          className={styles.comparison__swiper}
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
