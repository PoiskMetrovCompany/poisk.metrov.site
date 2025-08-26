import React from "react"

import ApartmentSelection from "@/components/apartmentSelection"
import { MapProvider } from "@/providers/map-provider"

import styles from "./page.module.scss"

import About from "./components/about"
import Advantages from "./components/advantages"
import Escort from "./components/escort"
import Location from "./components/location"
import MainCard from "./components/mainCard"
import Questions from "./components/questions"
import Quote from "./components/quote"
import Where from "./components/where"

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
