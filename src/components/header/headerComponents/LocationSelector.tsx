"use client"

import clsx from "clsx"

import React, { useState } from "react"

import Image from "next/image"

import { useLocationStore } from "@/stores/useLocationStore"
import { CityResponse } from "@/types/api"
import { useApiQuery } from "@/utils/hooks/use-api"

import styles from "../header.module.scss"

import Skeleton from "@/components/ui/skeleton"

interface LocationSelectorProps {
  initialCity: { name: string; id: string; slug: string } | null
}

const LocationSelector = ({ initialCity }: LocationSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const { selectedCity, setSelectedCity } = useLocationStore()

  const {
    data: citiesData,
    isLoading,
    error,
  } = useApiQuery<CityResponse>(["cities"], "/city")

  const cities = citiesData?.attributes || []

  const handleCitySelect = (cityName: string): void => {
    const city = cities.find((c) => c.title === cityName)
    if (city) {
      setSelectedCity({
        name: city.title,
        id: city.id.toString(),
        slug: city.slug,
      })

      try {
        const cookieValue = encodeURIComponent(
          JSON.stringify({
            name: city.title,
            id: city.id.toString(),
            slug: city.slug,
          })
        )
        document.cookie = `selectedCity=${cookieValue}; Path=/; Max-Age=${60 * 60 * 24 * 365}`
      } catch {}
    }
    setIsOpen(false)
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
        <span className={styles.location_selector__text}>
          {selectedCity?.name || initialCity?.name || "Выберите город"}
        </span>
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
            {isLoading ? (
              <>
                <li className={styles.location_selector__item}>
                  <div className={styles.location_selector__option}>
                    <Skeleton width={100} height={16} />
                  </div>
                </li>
                <li className={styles.location_selector__item}>
                  <div className={styles.location_selector__option}>
                    <Skeleton width={100} height={16} />
                  </div>
                </li>
                <li className={styles.location_selector__item}>
                  <div className={styles.location_selector__option}>
                    <Skeleton width={100} height={16} />
                  </div>
                </li>
              </>
            ) : error ? (
              <li className={styles.location_selector__item}>
                <div className={styles.location_selector__option}>
                  Ошибка загрузки
                </div>
              </li>
            ) : cities.length === 0 ? (
              <li className={styles.location_selector__item}>
                <div className={styles.location_selector__option}>
                  Города не найдены
                </div>
              </li>
            ) : (
              cities.map((city) => (
                <li key={city.id} className={styles.location_selector__item}>
                  <button
                    className={`${styles.location_selector__option} ${
                      city.title === selectedCity?.name
                        ? styles["location-selector__option--active"]
                        : ""
                    }`}
                    onClick={() => handleCitySelect(city.title)}
                    type="button"
                  >
                    {city.title}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default LocationSelector
