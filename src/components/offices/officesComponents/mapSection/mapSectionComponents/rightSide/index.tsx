"use client"

import React, { useMemo } from "react"
import { Map } from "@/components/map/map"
import { Place } from "@/components/map/variables/variables"
import styles from "./rightSide.module.scss"

interface RightMapSectionProps {
  selectedOffices: Array<{
    id: number
    city: string
    address: string
    coordinates: {
      lat: number
      lng: number
    }
  }>
  viewLocation?: [number, number]
}

const RightMapSection: React.FC<RightMapSectionProps> = ({
  selectedOffices,
  viewLocation,
}) => {
  const places: Place[] = useMemo(() => {
    return selectedOffices.map((office) => ({
      id: `office-${office.id}`,
      label: office.address,
      longitude: office.coordinates.lng,
      latitude: office.coordinates.lat,
    }))
  }, [selectedOffices])

  return (
    <div className={styles.Offices__mapSection__container__rightSide}>
      <div
        className={styles.Offices__mapSection__container__rightSide__container}
      >
        <Map 
          places={places} 
          viewLocation={viewLocation}
          customIcon="/images/icons/logo.svg"
        />
      </div>
    </div>
  )
}

export default RightMapSection