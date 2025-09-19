import clsx from "clsx"

import React, { useState } from "react"

import Image from "next/image"
import Link from "next/link"

import { useAuthState } from "@/hooks/useAuthState"
import { useSwitchLike } from "@/hooks/useFavorites"
import { useAuthStore } from "@/stores/useAuthStore"
import { IApartment } from "@/types/api/complex"

import styles from "./flatLayoutCard.module.scss"

import IconImage from "../ui/IconImage"
import IconButton from "../ui/buttons/IconButton"

interface IFlatLayoutCardProps {
  listClassName?: string
  title?: string
  price?: string
  complex?: string
  description?: string[]
  imageUrl?: string
  linkUrl?: string
  apartment?: IApartment
  isOnlyFavourite?: boolean
}

const FlatLayoutCard = ({
  listClassName,
  title,
  price,
  complex = "Европейский берег",
  description,
  imageUrl,
  linkUrl,
  apartment,
  isOnlyFavourite = false,
}: IFlatLayoutCardProps) => {
  // Хуки для авторизации и избранного
  const { isAuthenticated } = useAuthState()
  const { openLoginForm } = useAuthStore()
  const switchLikeMutation = useSwitchLike()
  const { user } = useAuthState()
  const userKey = user?.key || ""

  // Состояние для отслеживания избранного
  // TODO: Убрать и сделать через запрос
  const [isFavorite, setIsFavorite] = useState(false)
  const apartmentData = apartment
    ? {
        title: `${apartment.apartment_type}, ${apartment.area} м²`,
        price: apartment.price
          ? apartment.price.toLocaleString("ru-RU") + " ₽"
          : "Цена не указана",
        description: [
          `Этаж ${apartment.floor}`,
          `№${apartment.apartment_number}`,
          apartment.renovation || "Отделка не указана",
        ],
        imageUrl:
          apartment.plan_URL && apartment.plan_URL.trim() !== ""
            ? apartment.plan_URL
            : "/images/temporary/room.png",
        linkUrl: `/detailsFlat?key=${apartment.key}`,
      }
    : null

  const finalTitle = apartmentData?.title || title || "Студия, 25 м²"
  const finalPrice = apartmentData?.price || price || "4 359 990 ₽"
  const finalDescription = apartmentData?.description ||
    description || [
      "Этаж 8 из 17",
      "I кв 2025",
      "Дом кирпичный",
      "Отделка улучшенная черновая",
    ]
  const finalImageUrl = (() => {
    const url =
      apartmentData?.imageUrl || imageUrl || "/images/temporary/room.png"
    return url && url.trim() !== "" ? url : "/images/temporary/room.png"
  })()
  const finalLinkUrl =
    apartmentData?.linkUrl || linkUrl || `/detailsFlat?key=asdf1231sdas`

  // Обработчик клика по избранному
  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      // Если пользователь не авторизован, открыть форму входа
      openLoginForm()
      return
    }

    // Получаем ключ квартиры из apartment или из linkUrl
    const apartmentKey =
      apartment?.key ||
      (linkUrl?.includes("key=") ? linkUrl.split("key=")[1] : null)

    if (!apartmentKey) {
      console.log("Нет ключа квартиры")
      return
    }

    const action = isFavorite ? "remove" : "add"
    const type = "apartment" // Для квартир всегда apartment

    switchLikeMutation.mutate(
      {
        code: apartmentKey,
        type,
        action,
        user_key: userKey,
      },
      {
        onSuccess: () => {
          setIsFavorite(!isFavorite)
        },
        onError: (error) => {
          console.error("Ошибка при обновлении избранного:", error)
        },
      }
    )
  }
  return (
    <div className={styles.flatLayoutCard}>
      <div className={styles.flatLayoutCard__header}>
        <span
          className={clsx(
            isOnlyFavourite &&
              styles.flatLayoutCard__header__actions__onlyFavourite__text
          )}
        >
          {complex}
        </span>
        <div className={styles.flatLayoutCard__header__actions}>
          <IconButton
            size="sm"
            type="secondary"
            iconLink="/images/icons/heart.svg"
            isActive={isFavorite}
            onClick={handleFavoriteClick}
            disabled={switchLikeMutation.isPending}
            className={clsx(
              isOnlyFavourite &&
                styles.flatLayoutCard__header__actions__onlyFavourite__heart
            )}
          />
          <IconButton
            size="sm"
            type="secondary"
            iconLink="/images/icons/share.svg"
            className={clsx(
              isOnlyFavourite &&
                styles.flatLayoutCard__header__actions__onlyFavourite__share
            )}
          />
        </div>
      </div>
      <div className={styles.flatLayoutCard__content}>
        <Link
          href={finalLinkUrl}
          className={styles.flatLayoutCard__content__image__wrapper}
        >
          <div className={styles.flatLayoutCard__content__image}>
            <Image src={finalImageUrl} alt="flat-layout-card" fill />
          </div>
        </Link>
        <span className={styles.flatLayoutCard__content__title}>
          {finalTitle}
        </span>
        <ul
          className={clsx(
            styles.flatLayoutCard__content__description,
            listClassName
          )}
        >
          {finalDescription.map((item, index) => (
            <React.Fragment key={item}>
              <li className={styles.flatLayoutCard__content__description__item}>
                {item}
              </li>
              {index < finalDescription.length - 1 && (
                <div
                  className={
                    styles.flatLayoutCard__content__description__separator
                  }
                />
              )}
            </React.Fragment>
          ))}
        </ul>
        <div className={styles.flatLayoutCard__content__price}>
          <h4 className={styles.flatLayoutCard__content__price__value}>
            {finalPrice}
          </h4>
          <a
            href={finalLinkUrl}
            className={styles.flatLayoutCard__content__price__change}
          >
            <div
              className={styles.flatLayoutCard__content__price__change__info}
            >
              <IconImage
                className={
                  styles.flatLayoutCard__content__price__change__info__icon
                }
                iconLink="/images/icons/price-graph.svg"
                alt="price-graph"
              />
              <span
                className={
                  styles.flatLayoutCard__content__price__change__info__text
                }
              >
                + 73 350 ₽ изменение цены
              </span>
            </div>

            <div
              className={styles.flatLayoutCard__content__price__change__button}
            >
              <IconImage
                iconLink="/images/icons/arrow-right.svg"
                alt="arrow-right"
                className={
                  styles.flatLayoutCard__content__price__change__button__icon
                }
              />
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default FlatLayoutCard
