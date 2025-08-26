"use client"

import React, { useState } from "react"

import Image from "next/image"

import styles from "./leftSide.module.scss"

import ActionButton from "@/components/ui/buttons/ActionButton"

const officesData = [
  {
    id: 1,
    city: "Новосибирск",
    address: "ул. Кошурникова 33, 5 этаж, офис 1-2",
    coordinates: {
      lat: 55.0388,
      lng: 82.9752,
    },
  },
  {
    id: 2,
    city: "Новосибирск",
    address: "ул. Дуси Ковальчук 276 к. 13, 2 этаж",
    coordinates: {
      lat: 55.062,
      lng: 82.9248,
    },
  },
  {
    id: 3,
    city: "Санкт-Петербург",
    address: "Парфёновская улица 12, офис ​609,  6 этаж",
    coordinates: {
      lat: 59.902,
      lng: 30.3123,
    },
  },
]

interface LeftMapSectionProps {
  onOfficesChange: (offices: typeof officesData) => void
  onLocationChange: (location: [number, number]) => void
  onOfficeSelect: (office: (typeof officesData)[0]) => void
}

const LeftMapSection: React.FC<LeftMapSectionProps> = ({
  onOfficesChange,
  onLocationChange,
  onOfficeSelect,
}) => {
  const [selectedCity, setSelectedCity] = useState<string>("Новосибирск")
  const [selectedOfficeId, setSelectedOfficeId] = useState<number | null>(null)

  const filteredOffices = officesData.filter(
    (office) => office.city === selectedCity
  )

  const getCityCenter = (city: string): [number, number] => {
    const cityOffices = officesData.filter((office) => office.city === city)
    if (cityOffices.length === 0) return [82.9752, 55.0388] 

    const avgLng =
      cityOffices.reduce((sum, office) => sum + office.coordinates.lng, 0) /
      cityOffices.length
    const avgLat =
      cityOffices.reduce((sum, office) => sum + office.coordinates.lat, 0) /
      cityOffices.length

    return [avgLng, avgLat]
  }

  const handleCityChange = (city: string) => {
    setSelectedCity(city)
    const newFilteredOffices = officesData.filter(
      (office) => office.city === city
    )
    onOfficesChange(newFilteredOffices)
    onLocationChange(getCityCenter(city))
    setSelectedOfficeId(null) 
  }

  const handleOfficeClick = (office: (typeof officesData)[0]) => {
    setSelectedOfficeId(office.id)
    onOfficeSelect(office)
    onLocationChange([office.coordinates.lng, office.coordinates.lat])
  }

  React.useEffect(() => {
    onOfficesChange(filteredOffices)
    onLocationChange(getCityCenter(selectedCity))
  }, []) 

  return (
    <div className={styles.Offices__mapSection__container__leftSide}>
      <div
        className={styles.Offices__mapSection__container__leftSide__container}
      >
        <div
          className={
            styles.Offices__mapSection__container__leftSide__container__title
          }
        >
          Офисы продаж
        </div>

        <div
          className={
            styles.Offices__mapSection__container__leftSide__container__buttons
          }
        >
          <ActionButton
            type={selectedCity === "Новосибирск" ? "primary" : "gray"}
            size="medium"
            className={
              styles.Offices__mapSection__container__leftSide__container__buttons__button
            }
            onClick={() => handleCityChange("Новосибирск")}
          >
            Новосибирск
          </ActionButton>
          <ActionButton
            type={selectedCity === "Санкт-Петербург" ? "primary" : "gray"}
            size="medium"
            className={
              styles.Offices__mapSection__container__leftSide__container__buttons__button
            }
            onClick={() => handleCityChange("Санкт-Петербург")}
          >
            Санкт-Петербург
          </ActionButton>
        </div>

        <div
          className={
            styles.Offices__mapSection__container__leftSide__container__list
          }
        >
          {filteredOffices.map((office) => (
            <div
              key={office.id}
              className={`${
                styles.Offices__mapSection__container__leftSide__container__list__item
              } ${
                selectedOfficeId === office.id
                  ? styles.Offices__mapSection__container__leftSide__container__list__item__selected
                  : ""
              }`}
              onClick={() => handleOfficeClick(office)}
              style={{ cursor: "pointer" }}
            >
              <span
                className={
                  styles.Offices__mapSection__container__leftSide__container__list__item__text
                }
              >
                {office.address}
              </span>
              <Image
                src="/images/icons/arrow-right-orange.svg"
                alt="Location icon"
                width={20}
                height={20}
                className={
                  styles.Offices__mapSection__container__leftSide__container__list__item__icon
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LeftMapSection
