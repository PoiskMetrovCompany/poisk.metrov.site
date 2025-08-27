"use client"

import clsx from "clsx"

import React, { FC, useState } from "react"

import Image from "next/image"

import styles from "../header.module.scss"

interface ICity {
  name: string
  id: string
}

interface ILocationSelectorProps {
  defaultCity?: string
  onCityChange?: (city: string) => void
}

const LocationSelector: FC<ILocationSelectorProps> = ({
  defaultCity = "Новосибирск",
  onCityChange,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState<string>(defaultCity)

  const cities: ICity[] = [
    { name: "Новосибирск", id: "novosibirsk" },
    { name: "Санкт-Петербург", id: "spb" },
  ]

  const handleCitySelect = (city: string): void => {
    setSelectedCity(city)
    setIsOpen(false)
    if (onCityChange) {
      onCityChange(city)
    }
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={styles.location_selector}>
      <Image
        src="/images/icons/header/svgPickCity.svg"
        alt="Location cursor"
        width={24}
        height={24}
      />
      <button
        className={styles.location_selector__button}
        onClick={toggleDropdown}
        type="button"
      >
        <span className={styles.location_selector__text}>{selectedCity}</span>
        <Image
          className={clsx(
            styles.location_selector__arrow,
            isOpen && styles["location-selector__arrow--open"]
          )}
          src="/images/icons/header/svgExpandArrow.svg"
          alt="Arrow"
          width={16}
          height={16}
        />
      </button>

      {isOpen && (
        <div className={styles.location_selector__dropdown}>
          <ul className={styles.location_selector__list}>
            {cities.map((city) => (
              <li key={city.id} className={styles.location_selector__item}>
                <button
                  className={`${styles.location_selector__option} ${
                    city.name === selectedCity
                      ? styles["location-selector__option--active"]
                      : ""
                  }`}
                  onClick={() => handleCitySelect(city.name)}
                  type="button"
                >
                  {city.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default LocationSelector
