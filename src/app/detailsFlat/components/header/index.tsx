import React, { useState } from "react"

import { useAuthState } from "@/hooks/useAuthState"
import { useSwitchLike } from "@/hooks/useFavorites"
import { useAuthStore } from "@/stores/useAuthStore"

import styles from "./header.module.scss"

import IconImage from "@/components/ui/IconImage"
import IconButton from "@/components/ui/buttons/IconButton"
import Heading1 from "@/components/ui/heading1"
import Skeleton from "@/components/ui/skeleton"

interface DetailsHeaderProps {
  h1: string
  mStation: string
  mTime: number
  mType: string
  resComplexname: string
  isLoading?: boolean
  apartmentKey?: string
}

const DetailsHeader = ({
  h1,
  mStation,
  mTime,
  mType,
  resComplexname,
  isLoading = false,
  apartmentKey,
}: DetailsHeaderProps) => {
  const { isAuthenticated, user } = useAuthState()
  const { openLoginForm } = useAuthStore()
  const switchLikeMutation = useSwitchLike()
  const userKey = user?.key || ""

  // Состояние для отслеживания избранного
  // TODO: Убрать и сделать через запрос
  const [isFavorite, setIsFavorite] = useState(false)

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      // Если пользователь не авторизован, открыть форму входа
      openLoginForm()
      return
    }

    if (!apartmentKey || apartmentKey.trim() === "") {
      console.log("Нет ключа карточки")
      return
    }

    const action = isFavorite ? "remove" : "add"
    const type = "apartment" // Для страницы деталей квартиры всегда тип "apartment"

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
  if (isLoading) {
    return (
      <div className={styles.header}>
        <div className={styles.header__place}>
          <div className={styles.header__place__title}>
            <Skeleton height={48} width="300px" border="8px" />
          </div>

          <div className={styles.header__place__text}>
            <Skeleton height={27} width="200px" border="4px" />
            <div className={styles.header__place__text__distance}>
              <div className={styles.header__place__text__distance__item}>
                <Skeleton height={20} width={20} border="50%" />
                <Skeleton height={27} width="120px" border="4px" />
              </div>
              <div className={styles.header__place__text__distance__item}>
                <Skeleton height={20} width={20} border="50%" />
                <Skeleton height={27} width="80px" border="4px" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.header__buttons}>
          <Skeleton height={48} width={48} border="12px" />
          <Skeleton height={48} width={48} border="12px" />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.header}>
      <div className={styles.header__place}>
        <div className={styles.header__place__title}>
          <Heading1>{h1}</Heading1>
        </div>

        <div className={styles.header__place__text}>
          <h4 className={styles.header__place__text__title}>
            {resComplexname}
          </h4>
          <div className={styles.header__place__text__distance}>
            <div className={styles.header__place__text__distance__item}>
              <IconImage
                iconLink="/images/icons/metro.svg"
                alt="location"
                className={styles.header__place__text__distance__item__icon}
              />
              <span>{mStation}</span>
            </div>
            <div className={styles.header__place__text__distance__item}>
              {mType === "by_transport" ? (
                <IconImage
                  iconLink="/images/icons/car.svg"
                  alt="location"
                  className={styles.header__place__text__distance__item__icon}
                />
              ) : (
                <IconImage
                  iconLink="/images/icons/walk.svg"
                  alt="location"
                  className={styles.header__place__text__distance__item__icon}
                />
              )}

              <span
                className={styles.header__place__text__distance__item__span}
              >
                {mTime} минут
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.header__buttons}>
        <IconButton
          iconLink={"/images/icons/heart.svg"}
          isActive={isFavorite}
          onClick={handleFavoriteClick}
          disabled={switchLikeMutation.isPending}
        />
        <IconButton iconLink={"/images/icons/share.svg"} />
      </div>
    </div>
  )
}

export default DetailsHeader
