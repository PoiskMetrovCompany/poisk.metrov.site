"use client"

import React from "react"

import { MapProvider } from "@/providers/map-provider"
import { IAboutObjectItem } from "@/types/Object"
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


interface ResidentialComplexData{
  identifier: string
  attributes: {
    id: number
    location_key: string
    key: string
    code: string
    old_code: string | null
    name: string
    builder: string
    description: string
    latitude: number
    longitude: number
    metro_station: string
    metro_time: number
    metro_type: string
    meta: string
    head_title: string
    h1: string
    includes: any[]
  }

  meta:{
    copyright: string
    request: {
      identifier: string
      method: string
      path: string
      attributes: {
        key: string
      }
      timestamp: string
    }
  }
}

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


const DataResponse = {
  const FULL_API_URL = `http://localhost:1080/api/v1/residential-complex/read?key=${RESIDENTIAL_COMPLEX_KEY}`

  const {
    data: complexData,
    idLoading,
    error,
  } = useApiQuery<ResidentialComplexData>(
    ['residential-complex', RESIDENTIAL_COMPLEX_KEY],
    FULL_API_URL,
    {
      scaleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    }
  )
}



const DetailsPage = () => {
  const FULL_API_URL = `http://localhost:1080/api/v1/residential-complex/read?key=${RESIDENTIAL_COMPLEX_KEY}`

  const {
    data: complexData,
    isLoading,
    error,
  } = useApiQuery<ResidentialComplexData>(
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
        <FlatList />
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

  if (error || !complexData?.attributes) {
    return (
      <div className={styles.details}>
        <DetailsHeader isError={true} />
        <Estate />
        <FlatList />
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
  const headerData = {
    name: complexData.attributes.name,
    address: complexData.attributes.address,
    metroStation: complexData.attributes.metro_station,
    metroType: complexData.attributes.metro_type,
    metroTime: complexData.attributes.metro_time,
  }

  return (
    <div className={styles.details}>
      <DetailsHeader data={headerData} />
      <Estate />
      <FlatList />
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

export default DetailsPage
