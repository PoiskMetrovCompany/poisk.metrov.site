"use client"

import clsx from "clsx"

import React, { useEffect, useMemo, useRef, useState } from "react"


import FlatLayoutCard from "@/components/flatLayoutCard"
import NotFound from "@/components/notFound"
import PropertyCard from "@/components/propertyCard"


import { IProperty } from "@/types/PropertyCard"

import { Coordinate } from "@/types/Coordintes"
import { IFavouriteView } from "@/types/Favourites"
import { IApartment } from "@/types/api/apartment"
import { IResidentialComplex } from "@/types/api/complex"
import { FListResponse } from "@/types/api/favouritesList"
import { useApiQuery } from "@/utils/hooks/use-api"
import {
  mapFavoriteApartmentToFlatLayout,
  mapFavoriteComplexToProperty,
} from "@/utils/mappers/favouritesMapper"


import styles from "./favouritesList.module.scss"

import ListFilter from "../listFilter"


import Skeleton from "@/components/ui/skeleton"


interface IFavouritesListProps {
  selectedView: IFavouriteView
  setIsComparison: (isComparison: boolean) => void
  setFlatCount: (flatCount: number) => void
  setComplexCount: (complexCount: number) => void
  setCoordinates: (coordinates: Coordinate[]) => void
  setShowMap: (showMap: boolean) => void
  setComplexes: (complexes: IResidentialComplex[]) => void
  setApartments: (apartments: IApartment[]) => void
  setIsLoading: (isLoading: boolean) => void
}


const cards: IProperty[] = [
  {
    id: 1,
    title: "Европейский берег",
    price: "от 5.6 млн ₽",
    subtitle: "Микрорайон на набережной Оби",
    badge: { developer: "Брусника", period: "I – IV 2026" },
    metro: "Октябрьская",
    driveTime: "25 минут",
    metroType: "on_foot",
    specifications: [
      { type: "Студии", price: "от 5,6 млн ₽" },
      { type: "1-комн. кв", price: "от 7,1 млн ₽" },
      { type: "2-комн. кв", price: "от 8,5 млн ₽" },
      { type: "3-комн. кв", price: "от 10,8 млн ₽" },
      { type: "4+ комн. кв", price: "от 14,9 млн ₽" },
    ],
    description: [
      { type: "Срок сдачи", status: "Сдан — IV 2028" },
      { type: "Недвижимость", status: "Жилая" },
      { type: "Класс жилья", status: "Комфорт +" },
      { type: "Квартир", status: "8 402" },
    ],
    image: "/images/buildingCarousel/buidingExpandImg.webp",
  },
  {
    id: 2,
    title: "Солнечная долина",
    price: "от 4.8 млн ₽",
    subtitle: "Жилой комплекс в центре города",
    badge: { developer: "ПИК", period: "III – IV 2025" },
    metro: "Центральная",
    driveTime: "15 минут",
    metroType: "on_foot",
    specifications: [
      { type: "Студии", price: "от 4,8 млн ₽" },
      { type: "1-комн. кв", price: "от 6,2 млн ₽" },
      { type: "2-комн. кв", price: "от 7,8 млн ₽" },
      { type: "3-комн. кв", price: "от 9,5 млн ₽" },
      { type: "4+ комн. кв", price: "от 12,1 млн ₽" },
    ],
    description: [
      { type: "Срок сдачи", status: "Сдан — IV 2028" },
      { type: "Недвижимость", status: "Жилая" },
      { type: "Класс жилья", status: "Комфорт +" },
      { type: "Квартир", status: "8 402" },
    ],
    image: "/images/buildingCarousel/buidingExpandImg.webp",
  },
  {
    id: 3,
    title: "Зеленый парк",
    price: "от 6.2 млн ₽",
    subtitle: "Элитный комплекс у парка",
    badge: { developer: "Самолет", period: "II – III 2026" },
    metro: "Парковая",
    driveTime: "20 минут",
    metroType: "by_transport",
    specifications: [
      { type: "Студии", price: "от 6,2 млн ₽" },
      { type: "1-комн. кв", price: "от 8,0 млн ₽" },
      { type: "2-комн. кв", price: "от 9,8 млн ₽" },
      { type: "3-комн. кв", price: "от 12,5 млн ₽" },
      { type: "4+ комн. кв", price: "от 16,8 млн ₽" },
      { type: "5+ комн. кв", price: "от 24,8 млн ₽" },
      { type: "6+ комн. кв", price: "от 36,8 млн ₽" },
    ],
    description: [
      { type: "Срок сдачи", status: "Сдан — IV 2028" },
      { type: "Недвижимость", status: "Жилая" },
      { type: "Класс жилья", status: "Комфорт +" },
      { type: "Квартир", status: "8 402" },
    ],
    image: "/images/buildingCarousel/buidingExpandImg.webp",
  },
  {
    id: 4,
    title: "Морской бриз",
    price: "от 7.1 млн ₽",
    subtitle: "Премиум класс у моря",
    badge: { developer: "Эталон", period: "I – II 2027" },
    metro: "Морская",
    driveTime: "30 минут",
    metroType: "by_transport",
    specifications: [
      { type: "Студии", price: "от 7,1 млн ₽" },
      { type: "1-комн. кв", price: "от 9,3 млн ₽" },
      { type: "2-комн. кв", price: "от 11,2 млн ₽" },
      { type: "3-комн. кв", price: "от 14,8 млн ₽" },
      { type: "4+ комн. кв", price: "от 19,5 млн ₽" },
    ],
    description: [
      { type: "Срок сдачи", status: "Сдан — IV 2028" },
      { type: "Недвижимость", status: "Жилая" },
      { type: "Класс жилья", status: "Комфорт +" },
      { type: "Квартир", status: "8 402" },
    ],
    image: "/images/buildingCarousel/buidingExpandImg.webp",
  },
]


const FavoutiresList = ({
  selectedView,
  setIsComparison,
  setFlatCount,
  setComplexCount,
  setCoordinates,
  setShowMap,
  setComplexes,
  setApartments,
  setIsLoading,
}: IFavouritesListProps) => {
  const [isEmpty, setIsEmpty] = useState(false)
  const USER_KEY = "06cf32b1-83c2-11f0-a013-10f60a82b815"

  const prevComplexesLength = useRef(0)
  const prevApartmentsLength = useRef(0)
  const prevComplexes = useRef<IResidentialComplex[]>([])
  const prevApartments = useRef<IApartment[]>([])

  const {
    data: responseData,
    isLoading: isLoading,
    isError: responceError,
  } = useApiQuery<FListResponse>(
    ["favourite_list"],
    `/favorites?user_key=${USER_KEY}`,
    {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    }
  )

  const complexes = responseData?.attributes?.residential_complexes || []
  const apartments = responseData?.attributes?.apartments || []

  const coordinates = useMemo(() => {
    if (complexes.length > 0) {
      return complexes.map((complex) => ({
        longitude: complex.longitude,
        latitude: complex.latitude,
      }))
    }
    return []
  }, [complexes])

  useEffect(() => {
    const complexesLengthChanged =
      prevComplexesLength.current !== complexes.length
    const apartmentsLengthChanged =
      prevApartmentsLength.current !== apartments.length

    if (complexesLengthChanged) {
      setComplexCount(complexes.length)
      prevComplexesLength.current = complexes.length
    }

    if (apartmentsLengthChanged) {
      setFlatCount(apartments.length)
      prevApartmentsLength.current = apartments.length
    }
  }, [complexes.length, apartments.length])

  useEffect(() => {
    const complexesChanged =
      JSON.stringify(prevComplexes.current) !== JSON.stringify(complexes)
    const apartmentsChanged =
      JSON.stringify(prevApartments.current) !== JSON.stringify(apartments)

    if (complexesChanged) {
      setComplexes(complexes as unknown as IResidentialComplex[])
      prevComplexes.current = complexes as unknown as IResidentialComplex[]
    }

    if (apartmentsChanged) {
      setApartments(apartments as unknown as IApartment[])
      prevApartments.current = apartments as unknown as IApartment[]
    }
  }, [complexes, apartments])

  useEffect(() => {
    if (coordinates.length > 0) {
      setCoordinates(coordinates)
    }
  }, [coordinates])

  useEffect(() => {
    if (!isLoading && complexes.length === 0 && apartments.length === 0) {
      setIsEmpty(true)
    } else {
      setIsEmpty(false)
    }
  }, [isLoading, complexes.length, apartments.length])

  // Обновляем состояние загрузки в родительском компоненте
  useEffect(() => {
    setIsLoading(isLoading)
  }, [isLoading, setIsLoading])

  if (isEmpty) {
    return (
      <NotFound
        title="У вас еще нет избранного"
        description="Чтобы добавить квартиры или ЖК в избранное, перейдите в каталог"
        buttonText="Перейти в каталог"
        className={styles.notFound}
      />
    )
  }

  const renderSkeletonCards = (count: number) => {
    return Array.from({ length: count }, (_, index) => (
      <div key={index} className={styles.favouritesList__list__card}>
        <Skeleton
          className={styles.favouritesList__list__image}
          height="200px"
          width="100%"
        />
        <div className={styles.favouritesList__list__card__content}>
          <Skeleton height="20px" width="60%" />
          <Skeleton height="16px" width="40%" />
          <Skeleton height="16px" width="80%" />
          <Skeleton height="16px" width="70%" />
        </div>
      </div>
    ))
  }

  const renderSkeletonFlatCards = (count: number) => {
    return Array.from({ length: count }, (_, index) => (
      <div key={index} className={styles.favouritesList__list__flatCard}>
        <Skeleton
          className={styles.favouritesList__list__flatImage}
          height="150px"
          width="100%"
        />
        <div className={styles.favouritesList__list__flatContent}>
          <Skeleton height="18px" width="70%" />
          <Skeleton height="16px" width="50%" />
          <Skeleton height="16px" width="60%" />
          <Skeleton height="16px" width="40%" />
          <Skeleton height="20px" width="80%" />
        </div>
      </div>
    ))
  }

  return (
    <div className={styles.favouritesList}>
      <ListFilter setIsComparison={setIsComparison} setShowMap={setShowMap} />
      <div
        className={clsx(styles.favouritesList__list, {
          [styles.favouritesList__list_complexes]: selectedView === "layouts",
        })}
      >
        {selectedView === "complexes" && (
          <>
            {isLoading
              ? renderSkeletonCards(6)
              : complexes.map((card) => {
                  const mappedCard = mapFavoriteComplexToProperty(card)
                  return (
                    <PropertyCard
                      className={styles.favouritesList__list__card}
                      key={card.id}
                      property={mappedCard}
                      imageClassName={styles.favouritesList__list__image}
                      subtitleClassName={
                        styles.favouritesList__list__card__subtitle
                      }
                      listClassName={
                        styles.favouritesList__list__card__specifications
                      }
                    />
                  )
                })}
          </>
        )}

        {selectedView === "layouts" && (
          <>
            {isLoading
              ? renderSkeletonFlatCards(6)
              : apartments.map((apartment) => {
                  const mappedApartment =
                    mapFavoriteApartmentToFlatLayout(apartment)
                  return (
                    <FlatLayoutCard
                      key={apartment.id}
                      listClassName={styles.favouritesList__list__flatList}
                      title={mappedApartment.title}
                      price={mappedApartment.price}
                      complex={mappedApartment.complex}
                      description={mappedApartment.description}
                      imageUrl={mappedApartment.imageUrl}
                      linkUrl={mappedApartment.linkUrl}
                      apartment={mappedApartment.apartment}
                    />
                  )
                })}
          </>
        )}
      </div>
    </div>
  )
}

export default FavoutiresList
