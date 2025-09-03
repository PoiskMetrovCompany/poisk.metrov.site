"use client"

import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import React from "react"

import Image from "next/image"

import { IProperty } from "@/types/PropertyCard"
import { IResidentialComplex } from "@/types/api/ResidentialComplex"
import { useApiQuery } from "@/utils/hooks/use-api"
import { useCityCode } from "@/utils/hooks/use-city-code"
import { mapResidentialComplexToProperty } from "@/utils/mappers/residential-complex-mapper"

import styles from "./favourites.module.scss"


import PropertyCard from "../../../components/propertyCard"

import ActionButton from "@/components/ui/buttons/ActionButton"
import Heading2 from "@/components/ui/heading2"
import Skeleton from "@/components/ui/skeleton"

const Favourites = () => {
  const cityCode = useCityCode()

  const { data: bestOffers, isLoading } = useApiQuery<IResidentialComplex[]>(
    ["best-offers", cityCode],
    `/residential-complex/best-offers/?city_code=${cityCode}`,
    {
      enabled: !!cityCode,
      staleTime: 5 * 60 * 1000, // 5 минут
      gcTime: 10 * 60 * 1000, // 10 минут
    }
  )

  // Маппинг данных из API в формат PropertyCard
  const apiCards: IProperty[] = bestOffers
    ? bestOffers.map(mapResidentialComplexToProperty)
    : []

  if (isLoading || !cityCode) {
    return (
      <div className={styles.favourites}>
        <div className={styles.favourites__header}>
          <Heading2 className={styles.favourites__header__title}>
            Лучшие предложения
          </Heading2>
        </div>
        <div className={styles.favourites__content}>
          <div className={styles.skeletonContainer}>
            {[1, 2].map((index) => (
              <div key={index} className={styles.skeletonCard}>
                <Skeleton className={styles.skeletonCard__image} height={600} />
                <div className={styles.skeletonCard__content}>
                  <div className={styles.skeletonCard__row}>
                    <Skeleton
                      className={styles.skeletonCard__title}
                      height={24}
                      width="60%"
                    />
                    <Skeleton
                      className={styles.skeletonCard__price}
                      height={24}
                      width="40%"
                    />
                  </div>
                  <div className={styles.skeletonCard__row}>
                    <Skeleton
                      className={styles.skeletonCard__subtitle}
                      height={18}
                      width="70%"
                    />
                    <div className={styles.skeletonCard__location}>
                      <Skeleton height={18} width="80px" />
                      <Skeleton height={18} width="60px" />
                    </div>
                  </div>
                  <div className={styles.skeletonCard__divider}></div>
                  <div className={styles.skeletonCard__specifications}>
                    {[1, 2, 3, 4, 5].map((specIndex) => (
                      <div
                        key={specIndex}
                        className={styles.skeletonCard__specification}
                      >
                        <Skeleton height={16} width="60%" />
                        <Skeleton height={16} width="40%" />
                      </div>
                    ))}
                  </div>
                  <div className={styles.skeletonCard__actions}>
                    <Skeleton height={56} width="45%" />
                    <Skeleton height={56} width="45%" />
                    <Skeleton height={56} width="56px" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.favourites}>
      <div className={styles.favourites__header}>
        <Heading2 className={styles.favourites__header__title}>
          Лучшие предложения
        </Heading2>
        <div className={styles.favourites__header__button}>
          <ActionButton className={styles.favourites__header__button__action}>
            Перейти в каталог
          </ActionButton>
        </div>
      </div>
      <div className={styles.favourites__content}>
        <div className={styles.swiperContainer}>
          <Swiper
            modules={[Navigation]}
            spaceBetween={40}
            slidesPerView={2}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            className={styles.swiper}
            breakpoints={{
              1024: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1440: {
                slidesPerView: 2,
                spaceBetween: 32,
              },
              1920: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
            }}
          >
            {apiCards.map((card) => (
              <SwiperSlide key={card.id} className={styles.swiper__slide}>
                <PropertyCard property={card} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div
            className={`swiper-button-prev ${styles.navigationButton} ${styles.navigationButtonPrev}`}
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

        <div className={styles.mobileCards}>
          {apiCards.slice(0, 2).map((card) => (
            <div key={card.id} className={styles.mobileCards__item}>
              <PropertyCard property={card} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.favourites__buttons}>
        <ActionButton className={styles.favourites__buttons__button}>
          Перейти в каталог
        </ActionButton>
      </div>
    </div>
  )
}

export default Favourites
