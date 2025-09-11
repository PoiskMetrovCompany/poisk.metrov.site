"use client"

import clsx from "clsx"

import React, { useState } from "react"

import FlatLayoutCard from "@/components/flatLayoutCard"
import NotFound from "@/components/notFound"
import PropertyCard from "@/components/propertyCard"
import { IFavouriteView } from "@/types/Favourites"
import { IProperty } from "@/types/PropertyCard"

import styles from "./favouritesList.module.scss"

import ListFilter from "../listFilter"

interface IFavouritesListProps {
  selectedView: IFavouriteView
  setIsComparison: (isComparison: boolean) => void
}

const cards: IProperty[] = [
  {
    id: 1,
    title: "Европейский берег",
    price: "от 5.6 млн ₽",
    subtitle: "Микрорайон на набережной Оби",
    badge: { developer: "Брусника", period: "I – IV 2026" },
    metro: "Октябрьская",
    driveTime: "25 минут",
    metroType: "on_foot",
    specifications: [
      { type: "Студии", price: "от 5,6 млн ₽" },
      { type: "1-комн. кв", price: "от 7,1 млн ₽" },
      { type: "2-комн. кв", price: "от 8,5 млн ₽" },
      { type: "3-комн. кв", price: "от 10,8 млн ₽" },
      { type: "4+ комн. кв", price: "от 14,9 млн ₽" },
    ],
    description: [
      { type: "Срок сдачи", status: "Сдан — IV 2028" },
      { type: "Недвижимость", status: "Жилая" },
      { type: "Класс жилья", status: "Комфорт +" },
      { type: "Квартир", status: "8 402" },
    ],
    image: "/images/buildingCarousel/buidingExpandImg.webp",
  },
  {
    id: 2,
    title: "Солнечная долина",
    price: "от 4.8 млн ₽",
    subtitle: "Жилой комплекс в центре города",
    badge: { developer: "ПИК", period: "III – IV 2025" },
    metro: "Центральная",
    driveTime: "15 минут",
    metroType: "on_foot",
    specifications: [
      { type: "Студии", price: "от 4,8 млн ₽" },
      { type: "1-комн. кв", price: "от 6,2 млн ₽" },
      { type: "2-комн. кв", price: "от 7,8 млн ₽" },
      { type: "3-комн. кв", price: "от 9,5 млн ₽" },
      { type: "4+ комн. кв", price: "от 12,1 млн ₽" },
    ],
    description: [
      { type: "Срок сдачи", status: "Сдан — IV 2028" },
      { type: "Недвижимость", status: "Жилая" },
      { type: "Класс жилья", status: "Комфорт +" },
      { type: "Квартир", status: "8 402" },
    ],
    image: "/images/buildingCarousel/buidingExpandImg.webp",
  },
  {
    id: 3,
    title: "Зеленый парк",
    price: "от 6.2 млн ₽",
    subtitle: "Элитный комплекс у парка",
    badge: { developer: "Самолет", period: "II – III 2026" },
    metro: "Парковая",
    driveTime: "20 минут",
    metroType: "by_transport",
    specifications: [
      { type: "Студии", price: "от 6,2 млн ₽" },
      { type: "1-комн. кв", price: "от 8,0 млн ₽" },
      { type: "2-комн. кв", price: "от 9,8 млн ₽" },
      { type: "3-комн. кв", price: "от 12,5 млн ₽" },
      { type: "4+ комн. кв", price: "от 16,8 млн ₽" },
      { type: "5+ комн. кв", price: "от 24,8 млн ₽" },
      { type: "6+ комн. кв", price: "от 36,8 млн ₽" },
    ],
    description: [
      { type: "Срок сдачи", status: "Сдан — IV 2028" },
      { type: "Недвижимость", status: "Жилая" },
      { type: "Класс жилья", status: "Комфорт +" },
      { type: "Квартир", status: "8 402" },
    ],
    image: "/images/buildingCarousel/buidingExpandImg.webp",
  },
  {
    id: 4,
    title: "Морской бриз",
    price: "от 7.1 млн ₽",
    subtitle: "Премиум класс у моря",
    badge: { developer: "Эталон", period: "I – II 2027" },
    metro: "Морская",
    driveTime: "30 минут",
    metroType: "by_transport",
    specifications: [
      { type: "Студии", price: "от 7,1 млн ₽" },
      { type: "1-комн. кв", price: "от 9,3 млн ₽" },
      { type: "2-комн. кв", price: "от 11,2 млн ₽" },
      { type: "3-комн. кв", price: "от 14,8 млн ₽" },
      { type: "4+ комн. кв", price: "от 19,5 млн ₽" },
    ],
    description: [
      { type: "Срок сдачи", status: "Сдан — IV 2028" },
      { type: "Недвижимость", status: "Жилая" },
      { type: "Класс жилья", status: "Комфорт +" },
      { type: "Квартир", status: "8 402" },
    ],
    image: "/images/buildingCarousel/buidingExpandImg.webp",
  },
]

const FavoutiresList = ({
  selectedView,
  setIsComparison,
}: IFavouritesListProps) => {
  const [isEmpty, setIsEmpty] = useState(false)

  if (isEmpty) {
    return (
      <NotFound
        title="У вас еще нет избранного"
        description="Чтобы добавить квартиры или ЖК в избранное, перейдите в каталог"
        buttonText="Перейти в каталог"
        className={styles.notFound}
      />
    )
  }

  return (
    <div className={styles.favouritesList}>
      <ListFilter setIsComparison={setIsComparison} />
      <div
        className={clsx(styles.favouritesList__list, {
          [styles.favouritesList__list_complexes]: selectedView === "layouts",
        })}
      >
        {selectedView === "complexes" &&
          cards.map((card) => (
            <PropertyCard
              className={styles.favouritesList__list__card}
              key={card.id}
              property={card}
              imageClassName={styles.favouritesList__list__image}
              subtitleClassName={styles.favouritesList__list__card__subtitle}
              listClassName={styles.favouritesList__list__card__specifications}
            />
          ))}
        {selectedView === "layouts" &&
          [...Array(10)].map((_, index) => (
            <FlatLayoutCard
              listClassName={styles.favouritesList__list__flatList}
              key={index}
            />
          ))}
      </div>
    </div>
  )
}

export default FavoutiresList
