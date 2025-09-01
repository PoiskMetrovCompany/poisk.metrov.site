"use client"

import React from "react"

import { MapProvider } from "@/providers/map-provider"
import { IAboutObjectItem } from "@/types/Object"
import { ApartmentResponse } from "@/types/api/apartment"
import { IInclude } from "@/types/api/apartment"
import { IResidentialComplexInclude } from "@/types/api/apartment"
import { useApiQuery } from "@/utils/hooks/use-api"

import styles from "./details.module.scss"

import Compilation from "../components/compilation"
import AboutComplex from "./components/aboutComplex"
import AboutComplexSkeleton from "./components/aboutComplex/AboutComplexSkeleton"
import AboutObject from "./components/aboutObject"
import AboutObjectSmall from "./components/aboutObjectSmall"
import ConstructionProgress from "./components/constructionProgress"
import Documents from "./components/documents"
import Estate from "./components/estate"
import DetailsHeader from "./components/header"
import Location from "./components/location"

const FLAT_KEY = "cdc76d67-822d-11f0-8411-10f60a82b815"

const DetailsPage = () => {
  const {
    data: apartmentData,
    isLoading: apartmentLoading,
    isError: apartmentError,
  } = useApiQuery<ApartmentResponse>(
    ["apartments"],
    `/apartments/read?key=${FLAT_KEY}&includes=ResidentialComplex,Doc,Building`,
    {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    }
  )
  const isResidentialComplexInclude = (
    include: IInclude
  ): include is IResidentialComplexInclude => {
    return include.type === "residentialcomplex"
  }

  return (
    <div className={styles.details}>
      <DetailsHeader
        h1={apartmentData?.attributes?.h1 ?? ""}
        mStation={
          apartmentData?.attributes?.includes?.find(isResidentialComplexInclude)
            ?.attributes?.[0]?.metro_station ?? ""
        }
        mType={
          apartmentData?.attributes?.includes?.find(isResidentialComplexInclude)
            ?.attributes?.[0]?.metro_type ?? ""
        }
        mTime={
          apartmentData?.attributes?.includes?.find(isResidentialComplexInclude)
            ?.attributes?.[0]?.metro_time ?? 0
        }
        resComplexname={
          apartmentData?.attributes?.includes?.find(isResidentialComplexInclude)
            ?.attributes?.[0]?.h1 ?? ""
        }
        isLoading={apartmentLoading}
      />
      <Estate
        price={apartmentData?.attributes?.price ?? 0}
        renovation={apartmentData?.attributes?.renovation ?? ""}
        floor={apartmentData?.attributes?.floor ?? 0}
        flatNumber={apartmentData?.attributes?.apartment_number ?? ""}
        fullArea={apartmentData?.attributes?.area ?? 0}
        livingArea={apartmentData?.attributes?.living_space ?? 0}
        planUrl={
          apartmentData?.attributes?.plan_URL ??
          "/images/temporary/flatImage22.webp"
        }
        isLoading={apartmentLoading}
      />

      <AboutObject items={aboutObjectItems} />
      {apartmentLoading ? (
        <AboutComplexSkeleton />
      ) : (
        <AboutComplex
          text={
            apartmentData?.attributes?.includes?.find(
              isResidentialComplexInclude
            )?.attributes?.[0]?.description ?? ""
          }
        />
      )}
      <MapProvider>
        <Location />
      </MapProvider>
      {/* <AboutObjectSmall items={aboutObjectItemsSmall} /> */}
      <ConstructionProgress />
      <Documents />
      <Compilation header="Похожие квартиры" hasPromoCard={false} />
    </div>
  )
}

export default DetailsPage

const aboutObjectItems: IAboutObjectItem[] = [
  {
    title: "Кирпично-монолитный",
    description: "Транспортная доступность",
    icon: "/images/icons/wall.svg",
  },
  {
    title: "До 2.7 м",
    description: "Высота потолков",
    icon: "/images/icons/height.svg",
  },
  {
    title: "Пассажирский",
    description: "Лифт",
    icon: "/images/icons/elevator.svg",
  },
  {
    title: "9",
    description: "Этажей",
    icon: "/images/icons/stairs.svg",
  },
  {
    title: "Стоянка",
    description: "Паркинг",
    icon: "/images/icons/parking.svg",
  },
  {
    title: "2",
    description: "Корпуса",
    icon: "/images/icons/building.svg",
  },
]

// const aboutObjectItemsSmall: IAboutObjectItem[] = [
//   {
//     title: "Транспортная доступность",
//     icon: "/images/icons/wall.svg",
//   },
//   {
//     title: "Развитая инфраструктура",
//     icon: "/images/icons/height.svg",
//   },
//   {
//     title: "Благоустроенная придомовая территория",
//     icon: "/images/icons/elevator.svg",
//   },
//   {
//     title: "Просторные колясочные",
//     icon: "/images/icons/stairs.svg",
//   },
//   {
//     title: "Детские сады и школы",
//     icon: "/images/icons/parking.svg",
//   },
// ]
