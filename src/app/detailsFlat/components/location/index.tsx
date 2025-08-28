"use client"
import styles from "./location.module.scss"
import Heading2 from "@/components/ui/heading2"
import { Map } from "./map/map"
import { Place } from "./map/variables"
import { useState } from "react"
import Infrastructure from "./infrastructure"
import InfrastructureDialog from "./infrastructure/infrastructureDialog"

export const places: Place[] = [[55.00844174651645, 82.93779287001264]].map(
  ([longitude, latitude], i) => ({
    id: `${i}`,
    label: `Place ${i + 1}`,
    longitude,
    latitude,
    text: `Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry standard dummy text
          ever since the 1500s, when an unknown printer took a galley of
          type and scrambled it to make a type specimen book. It has
          survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of
          Lorem Ipsum.`,
  })
)

const Location = () => {
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
