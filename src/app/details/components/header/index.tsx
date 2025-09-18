import React, { useState } from "react"

import { useAuthState } from "@/hooks/useAuthState"
import { useSwitchLike } from "@/hooks/useFavorites"
import { useAuthStore } from "@/stores/useAuthStore"

import styles from "./header.module.scss"

import IconImage from "@/components/ui/IconImage"
import IconButton from "@/components/ui/buttons/IconButton"
import Heading1 from "@/components/ui/heading1"
import Skeleton from "@/components/ui/skeleton"

interface HeaderData {
  name: string
  address: string
  metroStation: string
  metroType: string
  metroTime: number
  key?: string
}

interface DetailsHeaderProps {
  data?: HeaderData | null
  isLoading?: boolean
  isError?: boolean
}

const HeaderSkeleton = () => (
  <div className={styles.header}>
    <div className={styles.header__place}>
      <div className={styles.header__place__title}>
        <Skeleton height="48px" border="8px" />
      </div>
      <div className={styles.header__place__text}>
        <div style={{ marginBottom: "12px" }}>
          <Skeleton height="24px" width="70%" border="4px" />
        </div>
        <div className={styles.header__place__text__distance}>
          <div className={styles.header__place__text__distance__item}>
            <Skeleton height="20px" width="20px" border="4px" />
            <Skeleton height="16px" width="80px" border="4px" />
          </div>
          <div className={styles.header__place__text__distance__item}>
            <Skeleton height="20px" width="20px" border="4px" />
            <Skeleton height="16px" width="60px" border="4px" />
          </div>
        </div>
      </div>
    </div>
    <div className={styles.header__buttons}>
      <Skeleton height="40px" width="40px" border="8px" />
      <Skeleton height="40px" width="40px" border="8px" />
    </div>
  </div>
)

const DetailsHeader: React.FC<DetailsHeaderProps> = ({
  data,
  isLoading = false,
  isError = false,
}) => {
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

    if (!data?.key) {
      console.log("Нет ключа карточки")
      return
    }

    const action = isFavorite ? "remove" : "add"
    const type = "building" // Для страницы деталей ЖК всегда тип "building"

    switchLikeMutation.mutate(
      {
        code: data.key,
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
    return <HeaderSkeleton />
  }

  if (isError || !data) {
    return (
      <div className={styles.header}>
        <div className={styles.header__place}>
          <div className={styles.header__place__title}>
            <Heading1>Ошибка загрузки данных</Heading1>
          </div>
          <div className={styles.header__place__text}>
            <h4 className={styles.header__place__text__title}>
              Попробуйте обновить страницу
            </h4>
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

  const getMetroDisplayText = () => {
    const typeText = data.metroType === "on_foot" ? "пешком" : "на транспорте"
    const timeText =
      data.metroTime === 1 ? "минута" : data.metroTime < 5 ? "минуты" : "минут"
    return `${data.metroTime} ${timeText} ${typeText}`
  }

  return (
    <div className={styles.header}>
      <div className={styles.header__place}>
        <div className={styles.header__place__title}>
          <Heading1>{data.name}</Heading1>
        </div>

        <div className={styles.header__place__text}>
          <h4 className={styles.header__place__text__title}>{data.address}</h4>
          <div className={styles.header__place__text__distance}>
            <div className={styles.header__place__text__distance__item}>
              <IconImage
                iconLink="/images/icons/metro.svg"
                alt="metro"
                className={styles.header__place__text__distance__item__icon}
              />
              <span>{data.metroStation}</span>
            </div>
            <div className={styles.header__place__text__distance__item}>
              <IconImage
                iconLink={
                  data.metroType === "on_foot"
                    ? "/images/icons/walk.svg"
                    : "/images/icons/car.svg"
                }
                alt="transport"
                className={styles.header__place__text__distance__item__icon}
              />
              <span>{getMetroDisplayText()}</span>
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
