import React from "react"
import styles from "./details.module.scss"
import DetailsHeader from "./components/header"
import Estate from "./components/estate"
import AboutObject from "./components/aboutObject"
import AboutComplex from "./components/aboutComplex"
import Location from "./components/location"
import ConstructionProgress from "./components/constructionProgress"
import { MapProvider } from "@/providers/map-provider"
import AboutObjectSmall from "./components/aboutObjectSmall"
import Documents from "./components/documents"
import { IAboutObjectItem } from "@/types/Object"

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
  return (
    <div className={styles.details}>
      <DetailsHeader />
      <Estate />
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
