"use client"

import { useState } from "react"

import styles from "./location.module.scss"

import { Map } from "../../../../components/map/map"
import { Place } from "../../../../components/map/variables/variables"
import Infrastructure from "./infrastructure"
import InfrastructureDialog from "./infrastructure/infrastructureDialog"

import Heading2 from "@/components/ui/heading2"

interface LocationProps {
  latitude?: number
  longitude?: number
  complexName?: string
}

const Location = ({ latitude, longitude, complexName }: LocationProps) => {
  const defaultCoordinates = [82.93779287001264, 55.00844174651645]
  const coordinates =
    latitude && longitude ? [longitude, latitude] : defaultCoordinates

  const places: Place[] = [coordinates].map(([longitude, latitude], i) => ({
    id: `${i}`,
    label: complexName || `Place ${i + 1}`,
    longitude,
    latitude,
  }))
  const [selectedInfrastructure, setSelectedInfrastructure] = useState<
    string[]
  >([])

  const toggleInfrastructure = (type: string) => {
    setSelectedInfrastructure((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    )
  }

  return (
    <div className={styles.location}>
      <div className={styles.location__header}>
        <Heading2>Расположение комплекса</Heading2>
      </div>
      <div className={styles.location__content}>
        <div className={styles.location__content__map}>
          <Map
            places={places}
            selectedInfrastructure={selectedInfrastructure}
            viewLocation={coordinates as [number, number]}
          />
        </div>

        <InfrastructureDialog
          selectedInfrastructure={selectedInfrastructure}
          toggleInfrastructure={toggleInfrastructure}
        />

        <Infrastructure
          selectedInfrastructure={selectedInfrastructure}
          toggleInfrastructure={toggleInfrastructure}
          className={styles.location__content__infrastructure}
        />
      </div>
    </div>
  )
}

export default Location
