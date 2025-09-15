"use client"

import "swiper/css"
import "swiper/css/navigation"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import Image from "next/image"

import FlatLayoutCard from "@/components/flatLayoutCard"
import FlatLayoutCardSkeleton from "@/components/flatLayoutCard/FlatLayoutCardSkeleton"
import { IApartment, IResidentialComplex } from "@/types/api/apartment"
import { IApartment as IApartmentComplex } from "@/types/api/complex"
import { useApiQuery } from "@/utils/hooks/use-api"
import { useCityCode } from "@/utils/hooks/use-city-code"

import styles from "./compilation.module.scss"

import PromoCard from "../promoCard"

import Heading2 from "@/components/ui/heading2"

interface SelectionsResponse {
  identifier: string
  attributes: IApartment[]
}

interface compilationProps {
  header: string
  hasPromoCard: boolean
  similarApartmentParams?: unknown
  compolationParams?: unknown
}

const Compilation = ({ header, hasPromoCard }: compilationProps) => {
  const cityCode = useCityCode()
  const userKey = ""

  const { data: selectionsData, isLoading } = useApiQuery<SelectionsResponse>(
    ["selections", cityCode, userKey],
    `${process.env.NEXT_PUBLIC_API_URL}/apartments/selections?city_code=${cityCode}`,
    {
      enabled: !!cityCode,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    }
  )

  const apartments = selectionsData?.attributes || []

  const convertApartmentType = (apartment: IApartment): IApartmentComplex => ({
    ...apartment,
    offer_id: apartment.offer_id.toString(),
  })

  const generateApartmentDescription = (apartment: IApartment) => {
    const description = []

    if (apartment.floor) {
      description.push(`Этаж ${apartment.floor}`)
    }

    if (apartment.renovation) {
      description.push(apartment.renovation)
    }

    if (apartment.balcony && apartment.balcony !== "нет") {
      const balconyText =
        apartment.balcony === "лоджия"
          ? "Лоджия"
          : `Балкон: ${apartment.balcony}`
      description.push(balconyText)
    }

    if (apartment.bathroom_unit && apartment.bathroom_unit !== "1") {
      description.push(`${apartment.bathroom_unit} санузла`)
    }

    if (apartment.ceiling_height) {
      description.push(`Потолки ${apartment.ceiling_height} м`)
    }

    if (description.length === 0) {
      description.push("Современная планировка", "Качественная отделка")
    }

    return description
  }

  const getComplexName = (apartment: IApartment) => {
    let complexName = "Не указан"

    if (apartment.h1) {
      const match = apartment.h1.match(/в ЖК ([^,]+)/)
      if (match) {
        complexName = match[1].trim()
      }
    }

    if (complexName === "Не указан" && apartment.includes) {
      const complexInclude = apartment.includes.find(
        (include) => include.type === "residentialcomplex"
      )
      if (complexInclude && complexInclude.type === "residentialcomplex") {
        const attributes = complexInclude.attributes as IResidentialComplex[]
        complexName = attributes?.[0]?.name || "Не указан"
      }
    }

    return complexName
  }

  const apartmentCards = apartments.map((apartment, index) => ({
    id: apartment.id || index + 1,
    title: `${apartment.room_count === 0 ? "Студия" : `${apartment.room_count}-комнатная`}, ${apartment.area} м²`,
    price: `${apartment.price.toLocaleString("ru-RU")} ₽`,
    complex: getComplexName(apartment),
    description: generateApartmentDescription(apartment),
    apartment: apartment,
  }))

  if (isLoading || !cityCode) {
    return (
      <div className={styles.compilation}>
        <div className={styles.compilation__header}>
          <Heading2 className={styles.compilation__header__h2}>
            {header}
          </Heading2>
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
          <div className={styles.skeletonContainer}>
            {[1, 2, 3].map((index) => (
              <div key={index} className={styles.skeletonCard}>
                <FlatLayoutCardSkeleton />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

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
                src="/images/icons/arrow-slider-mobile.svg"
                alt="arrow-left"
                fill
                className={styles.navigationButtonMobile__prev}
              />
            </div>
          </div>
          <div
            className={`swiper-button-next ${styles.navigationButton} ${styles.navigationButtonNext} ${styles.navigationButtonMobile}`}
          >
            <div className={styles.navigationButton__icon}>
              <Image
                src="/images/icons/arrow-slider-mobile.svg"
                alt="arrow-right"
                fill
                className={styles.navigationButtonMobile__next}
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
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
            1440: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
            1920: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
          className={styles.swiper}
        >
          {(() => {
            if (hasPromoCard && apartmentCards.length >= 2) {
              const firstTwo = apartmentCards.slice(0, 2)
              const rest = apartmentCards.slice(2)

              return (
                <>
                  {firstTwo.map((card) => (
                    <SwiperSlide key={card.id} className={styles.swiper__slide}>
                      <FlatLayoutCard
                        title={card.title}
                        price={card.price}
                        complex={card.complex}
                        description={card.description}
                        imageUrl={
                          card.apartment?.plan_URL ||
                          "/images/temporary/room.png"
                        }
                        apartment={
                          card.apartment
                            ? convertApartmentType(card.apartment)
                            : undefined
                        }
                        linkUrl={
                          card.apartment
                            ? `/detailsFlat?key=${card.apartment.key}`
                            : "/details/1"
                        }
                        isOnlyFavourite
                      />
                    </SwiperSlide>
                  ))}
                  <SwiperSlide className={styles.swiper__slide}>
                    <PromoCard />
                  </SwiperSlide>

                  {rest.map((card) => (
                    <SwiperSlide key={card.id} className={styles.swiper__slide}>
                      <FlatLayoutCard
                        title={card.title}
                        price={card.price}
                        complex={card.complex}
                        description={card.description}
                        imageUrl={
                          card.apartment?.plan_URL ||
                          "/images/temporary/room.png"
                        }
                        apartment={
                          card.apartment
                            ? convertApartmentType(card.apartment)
                            : undefined
                        }
                        linkUrl={
                          card.apartment
                            ? `/detailsFlat?key=${card.apartment.key}`
                            : "/details/1"
                        }
                        isOnlyFavourite
                      />
                    </SwiperSlide>
                  ))}
                </>
              )
            }

            return apartmentCards.map((card) => (
              <SwiperSlide key={card.id} className={styles.swiper__slide}>
                <FlatLayoutCard
                  title={card.title}
                  price={card.price}
                  complex={card.complex}
                  description={card.description}
                  imageUrl={
                    card.apartment?.plan_URL || "/images/temporary/room.png"
                  }
                  apartment={
                    card.apartment
                      ? convertApartmentType(card.apartment)
                      : undefined
                  }
                  linkUrl={
                    card.apartment
                      ? `/detailsFlat?key=${card.apartment.key}`
                      : "/details/1"
                  }
                />
              </SwiperSlide>
            ))
          })()}
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
