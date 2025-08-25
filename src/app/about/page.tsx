import MainCard from "./components/mainCard"
import React from "react"
import styles from "./page.module.scss"
import Quote from "./components/quote"
import Where from "./components/where"
import About from "./components/about"
import Escort from "./components/escort"
import Advantages from "./components/advantages"
import Questions from "./components/questions"
import ApartmentSelection from "@/components/apartmentSelection"
import { MapProvider } from "@/providers/map-provider"
import Location from "./components/location"

const AboutPage = () => {
  return (
    <div className={styles.aboutPage}>
      <MainCard />
      <Quote />
      <Where />
      <About />
      <Escort />
      <Advantages />
      <Questions />
      <ApartmentSelection className={styles.apartmentSelection} />
      <MapProvider>
        <Location />
      </MapProvider>
    </div>
  )
}

export default AboutPage
