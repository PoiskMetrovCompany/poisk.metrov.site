"use client"

import React, { useEffect, useState } from "react"
import styles from "./catalogueList.module.scss"
import Heading3 from "@/components/ui/heading3"
import Heading2 from "@/components/ui/heading2"
import IconImage from "@/components/ui/IconImage"
import clsx from "clsx"
import Image from "next/image"

import ActionButton from "@/components/ui/buttons/ActionButton"
import RangeSlider from "@/components/ui/rangeSlider"
import CatalogueFilters from "../catalogueFiltersNavbar"
import Filters from "../filters"
import { IProperty } from "@/types/PropertyCard"
import PropertyCard from "@/components/propertyCard"
import PropertyCardList from "@/components/propertyCardList"
import GetYourDreamFlat from "@/components/getYourDreamFlat"
import GetCatalogue from "@/components/getCatalogue"
import Selection from "@/app/components/selection"

import { useScreenSize } from "@/utils/hooks/use-screen-size"
import NotFound from "@/components/notFound"

const useLockScroll = (lock: boolean) => {
  useEffect(() => {
    if (lock) {
      const scrollY = window.scrollY
      
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
    } else {
      const scrollY = document.body.style.top

      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
    }
  }, [lock])
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

type SortType = "cards" | "list"

const CatalogueList = () => {
  const [isEmpty, setIsEmpty] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedSorting, setSelectedSorting] = useState<SortType>("cards")
  const { isLaptop } = useScreenSize(0)

  // Блокируем скролл когда открыты фильтры
  useLockScroll(showFilters)

  const handleSorting = (sort: SortType) => {
    setSelectedSorting(sort)
  }

  const handleShowFilters = () => {
    setShowFilters(true)
  }

  const handleCloseFilters = () => {
    setShowFilters(false)
  }

  const applyFilters = () => {
    console.log("Фильтры применены")
    setShowFilters(false) // Закрываем фильтры при применении
  }

  useEffect(() => {
    if (!isLaptop) setSelectedSorting("cards")
  }, [isLaptop])

  // Cleanup для случая размонтирования компонента с открытыми фильтрами
  useEffect(() => {
    return () => {
      // Восстанавливаем скролл при размонтировании компонента
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
    }
  }, [])

  const renderCardsWithDreamFlat = (): React.ReactNode[] => {
    const result: React.ReactNode[] = []

    cards.forEach((card, index) => {
      if (selectedSorting === "cards") {
        result.push(<PropertyCard key={card.id} property={card} />)
      } else {
        result.push(<PropertyCardList key={card.id} property={card} />)
      }

      if (index === 1) {
        result.push(
          <div
            key={`dream-flat-${index}`}
            className={
              selectedSorting === "cards"
                ? styles.catalogue__cards__fullWidth
                : undefined
            }
          >
            <GetYourDreamFlat />
          </div>
        )
      }
    })

    result.push(
      <div
        key="get-catalogue"
        className={
          selectedSorting === "cards"
            ? styles.catalogue__cards__fullWidth
            : undefined
        }
      >
        <GetCatalogue />
      </div>
    )

    result.push(
      <div
        key="selection"
        className={
          selectedSorting === "cards"
            ? styles.catalogue__cards__fullWidth
            : undefined
        }
      >
        <Selection />
      </div>
    )

    return result
  }

  if (isEmpty) {
    return (
      <NotFound
        title="Подходящих вариантов нет"
        description="Измените фильтры или подпишитесь на поиск — так вы не пропустите подходящие предложения"
        buttonText="Сохранить поиск"
      />
    )
  }

  return (
    <div className={styles.catalogue}>
      <div className={styles.catalogue__choose}>
        <div className={styles.catalogue__choose__livingSet}>
          <Heading2>
            Подобрать <span> Жилой комплекс</span>
          </Heading2>
          <Image
            src="images/icons/chevron-down-orange.svg"
            alt="Нажмите, чтобы раскрыть"
            width={16}
            height={16}
          />
        </div>

        <div className={styles.catalogue__choose__favorite}>
          <Image
            src="/images/icons/heartOrange.svg"
            alt="Сохранить поиск"
            width={26}
            height={26}
          />
          сохранить поиск
        </div>
      </div>

      <div className={styles.catalogue__filtersNavbar}>
        <CatalogueFilters 
          onShowFilters={handleShowFilters}
          onApplyFilters={applyFilters}
        />
        <div className={styles.catalogue__filtersNavbar__buttonsMobile}>
          <ActionButton
            type="primary"
            onClick={applyFilters}
            className={styles.catalogue__filtersNavbar__buttonsMobile__button}
            size="medium"
          >
            Показать <span>12166 квартир</span>
          </ActionButton>
          <ActionButton
            type="secondary"
            onClick={handleShowFilters}
            className={
              styles.catalogue__filtersNavbar__buttonsMobile__button__filter
            }
            size="medium"
            svgSrc="/images/icons/filters-orange.svg"
            svgAlt="Показать фильтры"
            svgWidth={26}
            svgHeight={26}
            svgClassName={styles.filterSvg}
          >
            <span className={styles.textFiltersMobile}>Все фильтры</span>
          </ActionButton>
        </div>
      </div>

      {showFilters && (
        <div className={styles.catalogue__filters}>
          <Filters onClose={handleCloseFilters} />
        </div>
      )}

      <div className={styles.catalogue__header}>
        <Heading3>Найдено 102 ЖК из 182</Heading3>
        {isLaptop && (
          <div className={styles.catalogue__header__buttons}>
            <button
              className={clsx(
                styles.catalogue__header__buttons__button,
                selectedSorting === "cards" &&
                  styles.catalogue__header__buttons__button_active
              )}
              onClick={() => handleSorting("cards")}
            >
              <IconImage
                iconLink={
                  selectedSorting === "cards"
                    ? "/images/icons/sort-cards-colored.svg"
                    : "/images/icons/sort-cards.svg"
                }
                alt="cards"
                className={styles.catalogue__header__buttons__button__icon}
              />
              <span>Карточки</span>
            </button>
            <button
              className={clsx(
                styles.catalogue__header__buttons__button,
                selectedSorting === "list" &&
                  styles.catalogue__header__buttons__button_active
              )}
              onClick={() => handleSorting("list")}
            >
              <IconImage
                iconLink={
                  selectedSorting === "list"
                    ? "/images/icons/sort-list-colored.svg"
                    : "/images/icons/sort-list.svg"
                }
                alt="list"
                className={styles.catalogue__header__buttons__button__icon}
              />
              <span>Список</span>
            </button>
          </div>
        )}
      </div>
      <div
        className={clsx(
          styles.catalogue__cards,
          selectedSorting === "cards" && styles.catalogue__cards_cards,
          selectedSorting === "list" && styles.catalogue__cards_list
        )}
      >
        {renderCardsWithDreamFlat()}
      </div>
    </div>
  )
}

export default CatalogueList