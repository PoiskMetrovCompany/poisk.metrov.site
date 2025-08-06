"use client"

import React, { FC } from "react"
import styles from "../../components/carouselBuildings/carouselComponent.module.scss"
import "../globals.css"
import CarouselComponent from "@/components/carouselBuildings/carouselComponent"
import PropertyCard from "@/components/carouselBuildings/carouselComponents/PropertyCard"

const cardExpandImg = "/images/buidingExpandImg.webp"

interface ISpecification {
  type: string
  price: string
}

interface IBadge {
  developer: string
  period: string
}

interface ICard {
  id: number
  title: string
  price: string
  subtitle: string
  badge: IBadge
  metro: string
  driveTime: string
  specifications: ISpecification[]
}

const BuildingCarousel: FC = () => {
  const cards: ICard[] = [
    {
      id: 1,
      title: "Европейский берег",
      price: "от 5.6 млн ₽",
      subtitle: "Микрорайон на набережной Оби",
      badge: { developer: "Брусника", period: "I – IV 2026" },
      metro: "Октябрьская",
      driveTime: "25 минут",
      specifications: [
        { type: "Студии", price: "от 5,6 млн ₽" },
        { type: "1-комн. кв", price: "от 7,1 млн ₽" },
        { type: "2-комн. кв", price: "от 8,5 млн ₽" },
        { type: "3-комн. кв", price: "от 10,8 млн ₽" },
        { type: "4+ комн. кв", price: "от 14,9 млн ₽" },
      ],
    },
    {
      id: 2,
      title: "Солнечная долина",
      price: "от 4.8 млн ₽",
      subtitle: "Жилой комплекс в центре города",
      badge: { developer: "ПИК", period: "III – IV 2025" },
      metro: "Центральная",
      driveTime: "15 минут",
      specifications: [
        { type: "Студии", price: "от 4,8 млн ₽" },
        { type: "1-комн. кв", price: "от 6,2 млн ₽" },
        { type: "2-комн. кв", price: "от 7,8 млн ₽" },
        { type: "3-комн. кв", price: "от 9,5 млн ₽" },
        { type: "4+ комн. кв", price: "от 12,1 млн ₽" },
      ],
    },
    {
      id: 3,
      title: "Зеленый парк",
      price: "от 6.2 млн ₽",
      subtitle: "Элитный комплекс у парка",
      badge: { developer: "Самолет", period: "II – III 2026" },
      metro: "Парковая",
      driveTime: "20 минут",
      specifications: [
        { type: "Студии", price: "от 6,2 млн ₽" },
        { type: "1-комн. кв", price: "от 8,0 млн ₽" },
        { type: "2-комн. кв", price: "от 9,8 млн ₽" },
        { type: "3-комн. кв", price: "от 12,5 млн ₽" },
        { type: "4+ комн. кв", price: "от 16,8 млн ₽" },
      ],
    },
    {
      id: 4,
      title: "Морской бриз",
      price: "от 7.1 млн ₽",
      subtitle: "Премиум класс у моря",
      badge: { developer: "Эталон", period: "I – II 2027" },
      metro: "Морская",
      driveTime: "30 минут",
      specifications: [
        { type: "Студии", price: "от 7,1 млн ₽" },
        { type: "1-комн. кв", price: "от 9,3 млн ₽" },
        { type: "2-комн. кв", price: "от 11,2 млн ₽" },
        { type: "3-комн. кв", price: "от 14,8 млн ₽" },
        { type: "4+ комн. кв", price: "от 19,5 млн ₽" },
      ],
    },
  ]

  return (
    <section className={styles.offers}>
      <h2 className={`${styles.offers__title} ${styles.row}`}>
        Лучшие предложения
      </h2>

      <div
        className={`${styles.offers__container} ${styles.row}`}
        id="cardList"
      >
        <CarouselComponent itemWidth={820} gap={50}>
          {cards.map((card) => (
            <PropertyCard
              key={card.id}
              property={{
                title: card.title,
                price: card.price,
                subtitle: card.subtitle,
                badge: card.badge,
                metro: card.metro,
                driveTime: card.driveTime,
                specifications: card.specifications,
              }}
              image={cardExpandImg}
            />
          ))}
        </CarouselComponent>
      </div>

      <div className={`${styles.offers_button} ${styles.row}`}>
        <button className={styles["offers_button-catalogue"]}>
          Перейти в каталог
        </button>
      </div>
    </section>
  )
}

export default BuildingCarousel
