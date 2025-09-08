"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import clsx from "clsx"

import React, { useState } from "react"

import Image from "next/image"

import { useLocationStore } from "@/stores/useLocationStore"
import { CityResponse } from "@/types/api"
import { useApiQuery } from "@/utils/hooks/use-api"

import styles from "../header.module.scss"

import IconImage from "@/components/ui/IconImage"
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

  const currentCity = selectedCity || initialCity

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <div className={styles.location_selector}>
          <IconImage
            iconLink="/images/icons/location-picker.svg"
            alt="Location cursor"
            className={styles.location_selector__icon}
          />
          <button className={styles.location_selector__button} type="button">
            <span className={styles.location_selector__text}>
              {currentCity?.name || "Выберите город"}
            </span>

            <IconImage
              className={styles.location_selector__arrow}
              iconLink="/images/icons/header/svgExpandArrow.svg"
              alt="Arrow"
            />
          </button>
        </div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className={styles.location_dialog__overlay} />
        <Dialog.Content className={styles.location_dialog__content}>
          <div className={styles.location_dialog__header}>
            <Dialog.Title className={styles.location_dialog__title}>
              Выберите город
            </Dialog.Title>
            <Dialog.Description asChild>
              <VisuallyHidden>
                Выберите город для поиска недвижимости
              </VisuallyHidden>
            </Dialog.Description>
            <Dialog.Close asChild>
              <button className={styles.location_dialog__close} type="button">
                <IconImage
                  className={styles.location_dialog__close__icon}
                  iconLink="/images/icons/close-popup.svg"
                  alt="Закрыть"
                />
              </button>
            </Dialog.Close>
          </div>

          {currentCity && (
            <div className={styles.location_dialog__current}>
              <span className={styles.location_dialog__current_label}>
                Текущий город
              </span>
              <div className={styles.location_dialog__current_city}>
                <Image
                  src="/images/icons/checkMark-orange.svg"
                  alt="Выбрано"
                  width={16}
                  height={16}
                />
                <span className={styles.location_dialog__current_city_text}>
                  {currentCity.name}
                </span>
              </div>
            </div>
          )}

          <div className={styles.location_dialog__cities}>
            {isLoading ? (
              <div className={styles.location_dialog__loading}>
                <Skeleton width={100} height={16} />
                <Skeleton width={100} height={16} />
                <Skeleton width={100} height={16} />
              </div>
            ) : error ? (
              <div className={styles.location_dialog__error}>
                Ошибка загрузки
              </div>
            ) : cities.length === 0 ? (
              <div className={styles.location_dialog__error}>
                Города не найдены
              </div>
            ) : (
              <div className={styles.location_dialog__grid}>
                {cities.map((city) => (
                  <button
                    key={city.id}
                    className={clsx(
                      styles.location_dialog__city,
                      city.title === currentCity?.name &&
                        styles.location_dialog__city_active
                    )}
                    onClick={() => handleCitySelect(city.title)}
                    type="button"
                  >
                    {city.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default LocationSelector
