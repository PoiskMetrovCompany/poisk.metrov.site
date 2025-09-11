"use client"

import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import React from "react"

import Image from "next/image"

import { IProperty } from "@/types/PropertyCard"

import styles from "./favourites.module.scss"

import PropertyCard from "../../../components/propertyCard"

import ActionButton from "@/components/ui/buttons/ActionButton"
import Heading2 from "@/components/ui/heading2"

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

const Favourites = () => {
  return (
    <div className={styles.favourites}>
      <div className={styles.favourites__header}>
        <Heading2 className={styles.favourites__header__title}>
          Лучшие предложения
        </Heading2>
        <div className={styles.favourites__header__button}>
          <ActionButton className={styles.favourites__header__button__action}>
            Перейти в каталог
          </ActionButton>
        </div>
      </div>
      <div className={styles.favourites__content}>
        <div className={styles.swiperContainer}>
          <Swiper
            modules={[Navigation]}
            spaceBetween={40}
            slidesPerView={2}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            className={styles.swiper}
            breakpoints={{
              1024: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1440: {
                slidesPerView: 2,
                spaceBetween: 32,
              },
              1920: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
            }}
          >
            {cards.map((card) => (
              <SwiperSlide key={card.id} className={styles.swiper__slide}>
                <PropertyCard property={card} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div
            className={`swiper-button-prev ${styles.navigationButton} ${styles.navigationButtonPrev}`}
          >
            <div className={styles.navigationButton__icon}>
              <Image
                src="/images/icons/arrow-slider.svg"
                alt="arrow-left"
                fill
              />
            </div>
          </div>
          <div
            className={`swiper-button-next ${styles.navigationButton} ${styles.navigationButtonNext}`}
          >
            <div className={styles.navigationButton__icon}>
              <Image
                src="/images/icons/arrow-slider.svg"
                alt="arrow-right"
                fill
                className={styles.navigationButton__icon__icon_next}
              />
            </div>
          </div>
        </div>

        <div className={styles.mobileCards}>
          {cards.slice(0, 2).map((card) => (
            <div key={card.id} className={styles.mobileCards__item}>
              <PropertyCard property={card} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.favourites__buttons}>
        <ActionButton className={styles.favourites__buttons__button}>
          Перейти в каталог
        </ActionButton>
      </div>
    </div>
  )
}

export default Favourites
