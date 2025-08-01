"use client"
import React from "react"
import CarouselComponent from "@/layouts/carouselComponent"
import PropertyCard from "@/components/propertyCard/PropertyCard"

import "../../styles/style.css"

const TestPage = () => {
  const properties = [
    {
      title: "ЖК Riverside",
      price: "от 15 млн ₽",
      subtitle: "2-комн. квартира, 65 м²",
      badge: {
        developer: "Capital Group",
        period: "II кв. 2025"
      },
      metro: "м. Речной вокзал",
      driveTime: "15 мин на авто",
      specifications: [
        { type: "1-комн.", price: "от 8 млн ₽" },
        { type: "2-комн.", price: "от 15 млн ₽" },
        { type: "3-комн.", price: "от 25 млн ₽" }
      ]
    },
    {
      title: "ЖК Green Park",
      price: "от 12 млн ₽",
      subtitle: "1-комн. квартира, 45 м²",
      badge: {
        developer: "PIK Group",
        period: "III кв. 2025"
      },
      metro: "м. Сокольники",
      driveTime: "20 мин на авто",
      specifications: [
        { type: "1-комн.", price: "от 12 млн ₽" },
        { type: "2-комн.", price: "от 18 млн ₽" },
        { type: "3-комн.", price: "от 28 млн ₽" }
      ]
    },
    {
      title: "ЖК Sky Tower",
      price: "от 20 млн ₽",
      subtitle: "3-комн. квартира, 85 м²",
      badge: {
        developer: "MR Group",
        period: "IV кв. 2025"
      },
      metro: "м. Динамо",
      driveTime: "10 мин на авто",
      specifications: [
        { type: "1-комн.", price: "от 10 млн ₽" },
        { type: "2-комн.", price: "от 20 млн ₽" },
        { type: "3-комн.", price: "от 30 млн ₽" }
      ]
    },
    {
      title: "ЖК Golden City",
      price: "от 18 млн ₽",
      subtitle: "2-комн. квартира, 70 м²",
      badge: {
        developer: "Samolet",
        period: "I кв. 2026"
      },
      metro: "м. Марьино",
      driveTime: "25 мин на авто",
      specifications: [
        { type: "1-комн.", price: "от 9 млн ₽" },
        { type: "2-комн.", price: "от 18 млн ₽" },
        { type: "3-комн.", price: "от 27 млн ₽" }
      ]
    },
    {
      title: "ЖК Forest Hills",
      price: "от 22 млн ₽",
      subtitle: "3-комн. квартира, 90 м²",
      badge: {
        developer: "Ingrad",
        period: "II кв. 2026"
      },
      metro: "м. Бульвар Рокоссовского",
      driveTime: "18 мин на авто",
      specifications: [
        { type: "1-комн.", price: "от 11 млн ₽" },
        { type: "2-комн.", price: "от 22 млн ₽" },
        { type: "3-комн.", price: "от 32 млн ₽" }
      ]
    }
  ];

  // Исправленный путь к изображению
  const images = [
    "/img/buidingExpandImg.png",
    "/img/buidingExpandImg.png", // добавил для остальных карточек
    "/img/buidingExpandImg.png",
    "/img/buidingExpandImg.png",
    "/img/buidingExpandImg.png"
  ];

  const handleCatalogClick = (index: number) => {
    console.log(`Каталог clicked for property ${index}`);
  };

  const handleDetailsClick = (index: number) => {
    console.log(`Детали clicked for property ${index}`);
  };

  const handleFavoriteClick = (index: number) => {
    console.log(`Избранное clicked for property ${index}`);
  };

  return (
    <div>
      <h1>Карусель недвижимости</h1>
      <CarouselComponent itemWidth={400} gap={30}>
        {properties.map((property, index) => (
          <PropertyCard
            key={index}
            property={property}
            image={images[index] || "/images/placeholder.jpg"}
            onCatalogClick={() => handleCatalogClick(index)}
            onDetailsClick={() => handleDetailsClick(index)}
            onFavoriteClick={() => handleFavoriteClick(index)}
          />
        ))}
      </CarouselComponent>
    </div>
  )
}

export default TestPage