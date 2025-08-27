"use client"

import { useMemo, useState } from "react"

import styles from "./location.module.scss"

import { Map } from "../../../../components/map/map"
import { Place } from "../../../../components/map/variables/variables"

import IconImage from "@/components/ui/IconImage"
import ActionButton from "@/components/ui/buttons/ActionButton"
import CustomSelect from "@/components/ui/inputs/select/customSelect"

enum City {
  NOVOSIBIRSK = "novosibirsk",
  SPB = "spb",
  CRIM = "crim",
}

const cityNameToKey: Record<string, City> = {
  Новосибирск: City.NOVOSIBIRSK,
  "Санкт-Петербург": City.SPB,
  Крым: City.CRIM,
}

const citiesData = {
  novosibirsk: {
    name: "Новосибирск",
    coordinates: [82.92459487797922, 55.06209571655443] as [number, number],
    address: "г. Новосибирск, ул. Дуси Ковальчук, 276 (корпус 13)",
    phone: "+7 (999) 448-46-95",
    email: "poisk-metrov@yandex.ru",
  },
  spb: {
    name: "Санкт-Петербург",
    coordinates: [30.31244549999996, 59.90215356423468] as [number, number],
    address: "г. Санкт-Петербург, ул. Парфёновская 12, этаж 5, офис 509",
    phone: "+7 (999) 448-46-95",
    email: "poisk-metrov@yandex.ru",
  },
  crim: {
    name: "Крым",
    coordinates: [33.44482720242058, 44.59339135454167] as [number, number],
    address: "г. Севастополь, ул. Героев Сталинграда проспект, 63",
    phone: "+7 (999) 448-46-95",
    email: "poisk-metrov@yandex.ru",
  },
}

const Location = () => {
  const [selectedCity, setSelectedCity] = useState<City>(City.NOVOSIBIRSK)

  const locationPlace: Place = useMemo(() => {
    const cityData = citiesData[selectedCity]
    return {
      id: "office-location",
      label: "Офис продаж",
      longitude: cityData.coordinates[0],
      latitude: cityData.coordinates[1],
    }
  }, [selectedCity])

  const currentCityData = citiesData[selectedCity]

  return (
    <div className={styles.location}>
      <div className={styles.locationSelector}>
        <CustomSelect
          className={styles.locationSelector__dropdown}
          label="Офис"
          placeholder="Выберите город"
          value={currentCityData.name}
          onChange={(value) => {
            const cityKey = cityNameToKey[value] || City.NOVOSIBIRSK
            setSelectedCity(cityKey)
          }}
          options={["Новосибирск", "Санкт-Петербург", "Крым"]}
        />
        <ul className={styles.locationSelector__info}>
          <li className={styles.locationSelector__info__item}>
            <IconImage
              className={styles.locationSelector__info__item__icon}
              iconLink="/images/icons/about/address-location.svg"
              alt="location"
            />
            <div className={styles.locationSelector__info__item__text}>
              <span
                className={styles.locationSelector__info__item__text__title}
              >
                Адрес
              </span>
              <span
                className={styles.locationSelector__info__item__text__value}
              >
                {currentCityData.address}
              </span>
            </div>
          </li>
          <li className={styles.locationSelector__info__item}>
            <IconImage
              className={styles.locationSelector__info__item__icon}
              iconLink="/images/icons/about/address-phone.svg"
              alt="phone"
            />
            <div className={styles.locationSelector__info__item__text}>
              <span
                className={styles.locationSelector__info__item__text__title}
              >
                Телефон
              </span>
              <a
                href={`tel:${currentCityData.phone}`}
                className={styles.locationSelector__info__item__text__value}
              >
                {currentCityData.phone}
              </a>
            </div>
          </li>
          <li className={styles.locationSelector__info__item}>
            <IconImage
              className={styles.locationSelector__info__item__icon}
              iconLink="/images/icons/about/address-email.svg"
              alt="email"
            />
            <div className={styles.locationSelector__info__item__text}>
              <span
                className={styles.locationSelector__info__item__text__title}
              >
                Email
              </span>
              <a
                href={`mailto:${currentCityData.email}`}
                className={styles.locationSelector__info__item__text__value}
              >
                {currentCityData.email}
              </a>
            </div>
          </li>
        </ul>
        <ActionButton className={styles.locationSelector__button}>
          Записаться на встречу
        </ActionButton>
      </div>
      <Map
        viewLocation={currentCityData.coordinates}
        places={[locationPlace]}
      />
    </div>
  )
}

export default Location
