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
      lat: 55.0620,
      lng: 82.9248,
    },
  },
  {
    id: 3,
    city: "Санкт-Петербург",
    address: "Парфёновская улица 12, офис ​609,  6 этаж",
    coordinates: {
      lat: 59.9020,
      lng: 30.3123,
    },
  },
]

const LeftMapSection = () => {
  const [selectedCity, setSelectedCity] = useState<string>("Новосибирск")

  const filteredOffices = officesData.filter(
    (office) => office.city === selectedCity
  )

  const handleCityChange = (city: string) => {
    setSelectedCity(city)
  }

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
              className={
                styles.Offices__mapSection__container__leftSide__container__list__item
              }
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
