"use client"

import React from "react"

import { MapProvider } from "@/providers/map-provider"
import { IAboutObjectItem } from "@/types/Object"
import { ResidentialComplexDataResponse } from "@/types/api/complex"
import { useApiQuery } from "@/utils/hooks/use-api"

import styles from "./details.module.scss"

import AboutComplex from "./components/aboutComplex"
import AboutObject from "./components/aboutObject"
import AboutObjectSmall from "./components/aboutObjectSmall"
import ConstructionProgress from "./components/constructionProgress"
import Documents from "./components/documents"
import Estate from "./components/estate"
import FlatList from "./components/flatList"
import DetailsHeader from "./components/header"
import Location from "./components/location"

const RESIDENTIAL_COMPLEX_KEY = "e92e332a-822b-11f0-8411-10f60a82b815"

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

const aboutObjectItemsSmall: IAboutObjectItem[] = [
  {
    title: "Транспортная доступность",
    icon: "/images/icons/wall.svg",
  },
  {
    title: "Развитая инфраструктура",
    icon: "/images/icons/height.svg",
  },
  {
    title: "Благоустроенная придомовая территория",
    icon: "/images/icons/elevator.svg",
  },
  {
    title: "Просторные колясочные",
    icon: "/images/icons/stairs.svg",
  },
  {
    title: "Детские сады и школы",
    icon: "/images/icons/parking.svg",
  },
]

const DetailsPage = () => {
  const FULL_API_URL = `http://localhost:1080/api/v1/residential-complex/read?key=${RESIDENTIAL_COMPLEX_KEY}`

  const {
    data: complexData,
    isLoading,
    error,
  } = useApiQuery<ResidentialComplexDataResponse>(
    ["residential-complex", RESIDENTIAL_COMPLEX_KEY],
    FULL_API_URL,
    {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    }
  )
  if (isLoading) {
    return (
      <div className={styles.details}>
        <DetailsHeader isLoading={true} />
        <Estate />
        <FlatList complexKey={RESIDENTIAL_COMPLEX_KEY} />
        <AboutObject items={aboutObjectItems} />
        <AboutComplex isLoading={true} />
        <MapProvider>
          <Location />
        </MapProvider>
        <AboutObjectSmall items={aboutObjectItemsSmall} />
        <ConstructionProgress />
        <Documents />
      </div>
    )
  }
  if (error || !complexData) {
    return (
      <div className={styles.details}>
        <DetailsHeader isError={true} />
        <Estate />
        <FlatList complexKey={RESIDENTIAL_COMPLEX_KEY} />
        <AboutObject items={aboutObjectItems} />
        <AboutComplex />
        <MapProvider>
          <Location />
        </MapProvider>
        <AboutObjectSmall items={aboutObjectItemsSmall} />
        <ConstructionProgress />
        <Documents />
      </div>
    )
  }
  const complexAttributes = Array.isArray(complexData.attributes)
    ? complexData.attributes[0]
    : complexData.attributes

  const headerData = {
    name: complexAttributes.name,
    address: complexAttributes.address,
    metroStation: complexAttributes.metro_station,
    metroType: complexAttributes.metro_type,
    metroTime: complexAttributes.metro_time,
  }
  const aboutComplexData = {
    description: complexAttributes.description,
  }
  return (
    <div className={styles.details}>
      <DetailsHeader data={headerData} />
      <Estate />
      <FlatList complexKey={RESIDENTIAL_COMPLEX_KEY} />
      <AboutObject items={aboutObjectItems} />
      <AboutComplex data={aboutComplexData} />
      <MapProvider>
        <Location
          latitude={complexAttributes.latitude}
          longitude={complexAttributes.longitude}
          complexName={complexAttributes.name}
        />
      </MapProvider>
      <AboutObjectSmall items={aboutObjectItemsSmall} />
      <ConstructionProgress />
      <Documents />
    </div>
  )
}

export default DetailsPage
