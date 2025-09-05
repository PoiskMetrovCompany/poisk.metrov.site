"use client"

import React, { useState } from "react"
import { MapProvider } from "@/providers/map-provider"
import styles from "./mapSection.module.scss"
import LeftMapSection from "./mapSectionComponents/leftSide"
import RightMapSection from "./mapSectionComponents/rightSide"

interface Office {
  id: number
  city: string
  address: string
  coordinates: {
    lat: number
    lng: number
  }
}

const MapSection = () => {
  const [selectedOffices, setSelectedOffices] = useState<Office[]>([])
  const [viewLocation, setViewLocation] = useState<[number, number] | undefined>(undefined)
  const [, setSelectedOffice] = useState<Office | null>(null)

  const handleOfficesChange = (offices: Office[]) => {
    setSelectedOffices(offices)
  }

  const handleLocationChange = (location: [number, number]) => {
    setViewLocation(location)
  }

  const handleOfficeSelect = (office: Office) => {
    setSelectedOffice(office)
  }

  return (
    <MapProvider>
      <div className={styles.Offices__mapSection}>
        <div className={styles.Offices__mapSection__container}>
          <div className={styles.Offices__mapSection__container__leftSide}>
            <LeftMapSection 
              onOfficesChange={handleOfficesChange}
              onLocationChange={handleLocationChange}
              onOfficeSelect={handleOfficeSelect}
            />
          </div>
          <RightMapSection 
            selectedOffices={selectedOffices}
            viewLocation={viewLocation}
          />
        </div>
      </div>
    </MapProvider>
  )
}

export default MapSection