"use client"

import "swiper/css"
import "swiper/css/navigation"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import Image from "next/image"

import FlatLayoutCard from "@/components/flatLayoutCard"
import FlatLayoutCardSkeleton from "@/components/flatLayoutCard/FlatLayoutCardSkeleton"
import { IApartment, IResidentialComplex } from "@/types/api/apartment"
import { useApiQuery } from "@/utils/hooks/use-api"

import styles from "./compilation.module.scss"

import PromoCard from "./promoCard"

import Heading2 from "@/components/ui/heading2"

export interface SimilarApartmentParams {
  city_code: string
  city: string
  price: number
  area: number
  living_space: number
  kitchen_space: number
  room_count: number
  divergence: number
  exclude_key: string
  exclude_offer_id: number
  page?: number
  per_page?: number
}

interface compilationProps {
  header: string
  hasPromoCard: boolean
  similarApartmentParams?: SimilarApartmentParams
  compolationParams?: unknown
}

const Compilation = ({
  header,
  hasPromoCard,
  similarApartmentParams,
}: compilationProps) => {
  const similarApartmentsUrl = similarApartmentParams
    ? `${process.env.NEXT_PUBLIC_API_URL}/apartments/similar?` +
      `city_code=${encodeURIComponent(similarApartmentParams.city_code)}&` +
      `city=${encodeURIComponent(similarApartmentParams.city)}&` +
      `price=${similarApartmentParams.price}&` +
      `area=${similarApartmentParams.area}&` +
      `living_space=${similarApartmentParams.living_space}&` +
      `kitchen_space=${similarApartmentParams.kitchen_space}&` +
      `room_count=${similarApartmentParams.room_count}&` +
      `divergence=${similarApartmentParams.divergence}&` +
      `exclude_key=${encodeURIComponent(similarApartmentParams.exclude_key)}&` +
      `exclude_offer_id=${similarApartmentParams.exclude_offer_id}&` +
      `page=${similarApartmentParams.page || 1}&` +
      `per_page=${similarApartmentParams.per_page || 15}`
    : null
  const {
    data: similarApartmentsResponse,
    isLoading,
    error,
  } = useApiQuery<
    { attributes?: IApartment[]; data?: IApartment[] } | IApartment[] | null
  >(
    ["similar-apartments", similarApartmentsUrl || ""],
    similarApartmentsUrl || "/api/empty",
    {
      enabled: !!similarApartmentsUrl,
    }
  )
  const similarApartments = Array.isArray(similarApartmentsResponse)
    ? similarApartmentsResponse
    : similarApartmentsResponse?.attributes ||
      similarApartmentsResponse?.data ||
      []

  const staticFlatCards = [
    {
      id: 1,
      title: "Студия, 25 м2",
      price: "4 359 990 ₽",
      complex: "Европейский берег",
      description: [
        "Этаж 8 из 17",
        "I кв 2025",
        "Дом кирпичный",
        "Отделка улучшенная черновая",
      ],
      apartment: null,
    },
    {
      id: 2,
      title: "1-комнатная, 35 м2",
      price: "5 890 000 ₽",
      complex: "Европейский берег",
      description: [
        "Этаж 5 из 17",
        "II кв 2025",
        "Дом кирпичный",
        "Отделка улучшенная черновая",
      ],
      apartment: null,
    },
    {
      id: 3,
      title: "2-комнатная, 45 м2",
      price: "7 200 000 ₽",
      complex: "Европейский берег",
      description: [
        "Этаж 12 из 17",
        "III кв 2025",
        "Дом кирпичный",
        "Отделка улучшенная черновая",
      ],
      apartment: null,
    },
    {
      id: 4,
      title: "Студия, 28 м2",
      price: "4 800 000 ₽",
      complex: "Европейский берег",
      description: [
        "Этаж 3 из 17",
        "I кв 2025",
        "Дом кирпичный",
        "Отделка улучшенная черновая",
      ],
      apartment: null,
    },
    {
      id: 5,
      title: "1-комнатная, 38 м2",
      price: "6 150 000 ₽",
      complex: "Европейский берег",
      description: [
        "Этаж 7 из 17",
        "II кв 2025",
        "Дом кирпичный",
        "Отделка улучшенная черновая",
      ],
      apartment: null,
    },
    {
      id: 6,
      title: "2-комнатная, 52 м2",
      price: "8 100 000 ₽",
      complex: "Европейский берег",
      description: [
        "Этаж 15 из 17",
        "III кв 2025",
        "Дом кирпичный",
        "Отделка улучшенная черновая",
      ],
      apartment: null,
    },
    {
      id: 7,
      title: "Студия, 30 м2",
      price: "5 200 000 ₽",
      complex: "Европейский берег",
      description: [
        "Этаж 10 из 17",
        "I кв 2025",
        "Дом кирпичный",
        "Отделка улучшенная черновая",
      ],
      apartment: null,
    },
    {
      id: 8,
      title: "1-комнатная, 42 м2",
      price: "6 800 000 ₽",
      complex: "Европейский берег",
      description: [
        "Этаж 6 из 17",
        "II кв 2025",
        "Дом кирпичный",
        "Отделка улучшенная черновая",
      ],
      apartment: null,
    },
  ]

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

  const apiCards = similarApartments.map((apartment, index) => {
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

    return {
      id: apartment.id || index + 1,
      title: `${apartment.room_count === 0 ? "Студия" : `${apartment.room_count}-комнатная`}, ${apartment.area} м²`,
      price: `${apartment.price.toLocaleString("ru-RU")} ₽`,
      complex: complexName,
      description: generateApartmentDescription(apartment),
      apartment: apartment,
    }
  })

  const flatCards =
    similarApartmentParams && !isLoading && !error && apiCards.length > 0
      ? apiCards
      : staticFlatCards

  if (similarApartmentParams && isLoading) {
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
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <SwiperSlide key={index} className={styles.swiper__slide}>
                <FlatLayoutCardSkeleton />
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            className={`swiper-button-prev ${styles.navigationButton} ${styles.navigationButtonPrev} ${styles.navigationButtonDesktop}`}
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
              {card.id === 3 && hasPromoCard === true ? (
                <PromoCard />
              ) : (
                <FlatLayoutCard
                  title={card.title}
                  price={card.price}
                  complex={card.complex}
                  description={card.description}
                  imageUrl={
                    card.apartment?.plan_URL || "/images/temporary/room.png"
                  }
                  apartment={card.apartment}
                  linkUrl={
                    card.apartment
                      ? `/detailsFlat?key=${card.apartment.key}`
                      : "/details/1"
                  }
                />
              )}
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
