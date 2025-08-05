"use client"
import styles from "./location.module.scss"
import Heading2 from "@/components/ui/heading2"
import Heading3 from "@/components/ui/heading3"
import Image from "next/image"
import ActionButton from "@/components/ui/buttons/ActionButton"
import { Map } from "./map/map"
import { Place } from "./map/variables"
import { useState } from "react"
import IconImage from "@/components/ui/IconImage"

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

const INFRASTRUCTURE = [
  {
    icon: "/images/icons/gray-rounded/metro.svg",
    title: "Метро",
    type: "metro",
  },
  {
    icon: "/images/icons/gray-rounded/book.svg",
    title: "Школы",
    type: "schools",
  },
  {
    icon: "/images/icons/gray-rounded/tree.svg",
    title: "Парки",
    type: "parks",
  },
  {
    icon: "/images/icons/gray-rounded/kindergarten.svg",
    title: "Детские сады",
    type: "kindergartens",
  },
  {
    icon: "/images/icons/gray-rounded/shop.svg",
    title: "Магазины",
    type: "shops",
  },
  {
    icon: "/images/icons/gray-rounded/sport.svg",
    title: "Спорт",
    type: "sport",
  },
  {
    icon: "/images/icons/gray-rounded/medicine.svg",
    title: "Аптеки",
    type: "pharmacies",
  },
]

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
        <div className={styles.location__content__info}>
          <div className={styles.location__content__info__header}>
            <Heading3>Инфраструктура</Heading3>
          </div>
          <div className={styles.location__content__info__list}>
            {INFRASTRUCTURE.map((item, index) => (
              <button
                key={index}
                className={`${styles.location__content__info__list__item} ${
                  selectedInfrastructure.includes(item.type)
                    ? styles.location__content__info__list__item__active
                    : ""
                }`}
                onClick={() => toggleInfrastructure(item.type)}
              >
                <IconImage
                  iconLink={item.icon}
                  alt={item.title}
                  className={styles.location__content__info__list__item__icon}
                />
                <span
                  className={styles.location__content__info__list__item__title}
                >
                  {item.title}
                </span>
              </button>
            ))}
          </div>
          <ActionButton
            type="outline"
            className={styles.location__content__info__button}
          >
            Показать все
          </ActionButton>
        </div>
      </div>
    </div>
  )
}

export default Location
