"use client"

import React from "react"

import { useSearchParams } from "next/navigation"

import { MapProvider } from "@/providers/map-provider"
import { IAboutObjectItem } from "@/types/Object"
import { ApartmentResponse } from "@/types/api/apartment"
import { IDoc, IDocInclude, IInclude } from "@/types/api/apartment"
import { IResidentialComplexInclude } from "@/types/api/apartment"
import { useApiQuery } from "@/utils/hooks/use-api"

import styles from "./details.module.scss"

import Compilation from "../components/compilation"
import Location from "../details/components/location"
import AboutComplexSkeleton from "../detailsFlat/components/aboutComplex/AboutComplexSkeleton"
import DocumentsSkeleton from "../detailsFlat/components/documents/DocumentsSkeleton"
import AboutComplex from "./components/aboutComplex"
import AboutObject from "./components/aboutObject"
import AboutObjectSmall from "./components/aboutObjectSmall"
import ConstructionProgress from "./components/constructionProgress"
import Documents from "./components/documents"
import Estate from "./components/estate"
import DetailsHeader from "./components/header"

const FLAT_KEY = "cdcaa3c4-822d-11f0-8411-10f60a82b815"

const DetailsPage = () => {
  const searchParams = useSearchParams()
  const keyFromUrl = searchParams.get("key")
  const flatKey = keyFromUrl || FLAT_KEY

  const {
    data: apartmentData,
    isLoading: apartmentLoading,
    isError: apartmentError,
  } = useApiQuery<ApartmentResponse>(
    ["apartments", flatKey],
    `/apartments/read?key=${flatKey}&includes=ResidentialComplex,Doc,Building`,
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
  const isDocsInclude = (include: IInclude): include is IDocInclude => {
    return include.type === "doc"
  }

  return (
    <div className={styles.details}>
      <DetailsHeader
        data={
          apartmentData?.attributes
            ? {
                name: apartmentData.attributes.h1 ?? "",
                address:
                  apartmentData.attributes.includes?.find(
                    isResidentialComplexInclude
                  )?.attributes?.[0]?.h1 ?? "",
                metroStation:
                  apartmentData.attributes.includes?.find(
                    isResidentialComplexInclude
                  )?.attributes?.[0]?.metro_station ?? "",
                metroType:
                  apartmentData.attributes.includes?.find(
                    isResidentialComplexInclude
                  )?.attributes?.[0]?.metro_type ?? "",
                metroTime:
                  apartmentData.attributes.includes?.find(
                    isResidentialComplexInclude
                  )?.attributes?.[0]?.metro_time ?? 0,
              }
            : null
        }
        isLoading={apartmentLoading}
        isError={apartmentError}
      />
      <Estate />

      <AboutObject items={aboutObjectItems} />
      {apartmentLoading ? (
        <AboutComplexSkeleton />
      ) : (
        <AboutComplex
          data={
            apartmentData?.attributes?.includes?.find(
              isResidentialComplexInclude
            )
              ? {
                  description:
                    apartmentData.attributes.includes.find(
                      isResidentialComplexInclude
                    )?.attributes?.[0]?.description ?? "",
                }
              : null
          }
          isLoading={apartmentLoading}
          isError={apartmentError}
        />
      )}
      <MapProvider>
        <Location
          latitude={
            apartmentData?.attributes?.includes?.find(
              isResidentialComplexInclude
            )?.attributes?.[0]?.latitude ?? 0
          }
          longitude={
            apartmentData?.attributes?.includes?.find(
              isResidentialComplexInclude
            )?.attributes?.[0]?.longitude ?? 0
          }
          complexName={
            apartmentData?.attributes?.includes?.find(
              isResidentialComplexInclude
            )?.attributes?.[0]?.h1 ?? ""
          }
        />
      </MapProvider>
      <ConstructionProgress />
      {apartmentLoading ? <DocumentsSkeleton /> : <Documents />}
      <Compilation
        header="Похожие квартиры"
        hasPromoCard={false}
        similarApartmentParams={
          apartmentData?.attributes
            ? {
                city_code: "novosibirsk",
                city: "novosibirsk",
                price: apartmentData.attributes.price,
                area: apartmentData.attributes.area,
                living_space: apartmentData.attributes.living_space,
                kitchen_space: apartmentData.attributes.kitchen_space,
                room_count: apartmentData.attributes.room_count,
                divergence: 5,
                exclude_key: apartmentData.attributes.key,
                exclude_offer_id: apartmentData.attributes.offer_id,
                page: 1,
                per_page: 15,
              }
            : undefined
        }
      />
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
