"use client"

import React from "react"

import { MapProvider } from "@/providers/map-provider"
import { IAboutObjectItem } from "@/types/Object"
import { ResidentialComplexDataResponse } from "@/types/api/complex"
import { useApiQuery } from "@/utils/hooks/use-api"

import styles from "../details.module.scss"

import AboutComplex from "../components/aboutComplex"
import AboutObject from "../components/aboutObject"
import AboutObjectSmall from "../components/aboutObjectSmall"
import ConstructionProgress from "../components/constructionProgress"
import Documents from "../components/documents"
import Estate from "../components/estate"
import FlatList from "../components/flatList"
import DetailsHeader from "../components/header"
import Location from "../components/location"

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

interface DetailsPageProps {
  params: Promise<{
    key: string
  }>
}

const DetailsPage = ({ params }: DetailsPageProps) => {
  const { key } = React.use(params)

  if (!key) {
    return (
      <div className={styles.details}>
        <DetailsHeader isError={true} />
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h2>Ошибка</h2>
          <p>Ключ ЖК не найден</p>
        </div>
      </div>
    )
  }

  const FULL_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/residential-complex/read?key=${key}`

  const {
    data: complexData,
    isLoading,
    error,
  } = useApiQuery<ResidentialComplexDataResponse>(
    ["residential-complex", key],
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
        <Estate images={[]} data={undefined} />
        <FlatList complexKey={key} />
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
        <Estate images={[]} data={undefined} />
        <FlatList complexKey={key} />
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

  const aboutComplexData = {
    description: complexData.attributes.description,
  }

  // Парсим meta данные для получения изображений
  let estateImages: string[] = []
  try {
    const metaData = JSON.parse(complexData.attributes.meta)
    if (metaData.renderer && Array.isArray(metaData.renderer)) {
      estateImages = metaData.renderer
    }
  } catch (error) {
    console.error("Ошибка при парсинге meta данных:", error)
  }

  return (
    <div className={styles.details}>
      <DetailsHeader data={headerData} />
      <Estate images={estateImages} data={complexData.attributes} />
      <FlatList complexKey={key} />
      {/* <AboutObject items={aboutObjectItems} />
      <AboutComplex data={aboutComplexData} />
      <MapProvider>
        <Location
          latitude={complexData.attributes.latitude}
          longitude={complexData.attributes.longitude}
          complexName={complexData.attributes.name}
        />
      </MapProvider>
      <AboutObjectSmall items={aboutObjectItemsSmall} />
      <ConstructionProgress />
      <Documents /> */}
    </div>
  )
}

export default DetailsPage
