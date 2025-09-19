"use client"

import clsx from "clsx"

import React, { useEffect, useMemo, useRef, useState } from "react"

import { useRouter } from "next/navigation"

import FlatLayoutCard from "@/components/flatLayoutCard"
import NotFound from "@/components/notFound"
import PropertyCard from "@/components/propertyCard"
import { useAuthState } from "@/hooks/useAuthState"
import { Coordinate } from "@/types/Coordintes"
import { IFavouriteView } from "@/types/Favourites"
import { IApartment, IResidentialComplex } from "@/types/api/complex"
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
  const router = useRouter()
  const [isEmpty, setIsEmpty] = useState(false)

  // Получаем user key из состояния авторизации
  const { user } = useAuthState()
  const USER_KEY = user?.key || ""

  const handleNavigateToCatalogue = () => {
    router.push("/catalogue")
  }

  const prevComplexesLength = useRef(0)
  const prevApartmentsLength = useRef(0)
  const prevComplexes = useRef<IResidentialComplex[]>([])
  const prevApartments = useRef<IApartment[]>([])

  const {
    data: responseData,
    isLoading: isLoading,
    isError: responceError,
  } = useApiQuery<FListResponse>(
    ["favourite_list", USER_KEY],
    `/favorites?user_key=${USER_KEY}`,
    {
      enabled: !!USER_KEY,
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
        onClick={handleNavigateToCatalogue}
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
                      apartment={mappedApartment.apartment as IApartment}
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
