"use client"

import clsx from "clsx"

import React, { FC, useState } from "react"

import { useRouter } from "next/navigation"

import { useAuthState } from "@/hooks/useAuthState"
import { useSwitchLike } from "@/hooks/useFavorites"
import { useAuthStore } from "@/stores/useAuthStore"
import { IProperty } from "@/types/PropertyCard"

import styles from "./propertyCardList.module.scss"

import IconImage from "../ui/IconImage"
import ActionButton from "../ui/buttons/ActionButton"
import IconButton from "../ui/buttons/IconButton"

interface IPropertyCardListProps {
  property: IProperty
}

const PropertyCardList: FC<IPropertyCardListProps> = ({ property }) => {
  const router = useRouter()

  // Хуки для авторизации и избранного
  const { isAuthenticated, user } = useAuthState()
  const { openLoginForm } = useAuthStore()
  const switchLikeMutation = useSwitchLike()
  const userKey = user?.key || ""

  // Состояние для отслеживания избранного
  // TODO: Убрать и сделать через запрос
  const [isFavorite, setIsFavorite] = useState(false)

  // Выбираем иконку в зависимости от типа передвижения до метро
  const getMetroIcon = () => {
    return property.metroType === "on_foot"
      ? "/images/icons/walk.svg"
      : "/images/icons/car.svg"
  }

  const handleDetailsClick = () => {
    if (property.linkKey) {
      const route = property.isApartment
        ? `/detailsFlat?key=${property.linkKey}`
        : `/details/${property.linkKey}`
      router.push(route)
    }
  }

  const handleMortgageClick = () => {
    router.push("/mortage")
  }

  const handleCatalogueClick = () => {
    router.push("/catalogue")
  }

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      // Если пользователь не авторизован, открыть форму входа
      openLoginForm()
      return
    }

    if (!property.linkKey) {
      console.log("Нет ключа карточки")
      return
    }

    const action = isFavorite ? "remove" : "add"
    const type = property.isApartment ? "apartment" : "building"

    switchLikeMutation.mutate(
      {
        code: property.linkKey,
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
    <div className={styles.property_card_list}>
      <IconImage
        className={styles.property_card_list__image}
        iconLink={property.image}
        alt={property.title}
        objectFit="cover"
      />
      <div className={styles.property_card_list__content}>
        <div className={styles.property_card_list__content__info}>
          <div className={styles.property_card_list__content__info__header}>
            <h3
              className={
                styles.property_card_list__content__info__header__title
              }
            >
              {property.title}
            </h3>
            <div
              className={
                styles.property_card_list__content__info__header__location
              }
            >
              <p
                className={
                  styles.property_card_list__content__info__header__location__adress
                }
              >
                {property.subtitle}
                <button
                  className={
                    styles.property_card_list__content__info__header__location__adress__button
                  }
                >
                  <IconImage
                    className={
                      styles.property_card_list__content__info__header__location__adress__button__icon
                    }
                    iconLink={"/images/icons/map.svg"}
                    alt={"map"}
                  />
                  На карте
                </button>
              </p>
              <div
                className={
                  styles.property_card_list__content__info__header__location__way
                }
              >
                <div
                  className={
                    styles.property_card_list__content__info__header__location__way__item
                  }
                >
                  <IconImage
                    className={clsx(
                      styles.property_card_list__content__info__header__location__way__item__icon,
                      styles.property_card_list__content__info__header__location__way__item__icon_metro
                    )}
                    iconLink={"/images/icons/metro.svg"}
                    alt={"metro"}
                  />
                  <span
                    className={
                      styles.property_card_list__content__info__header__location__way__item__text
                    }
                  >
                    {property.metro}
                  </span>
                </div>
                <div
                  className={
                    styles.property_card_list__content__info__header__location__way__item
                  }
                >
                  <IconImage
                    className={
                      styles.property_card_list__content__info__header__location__way__item__icon
                    }
                    iconLink={getMetroIcon()}
                    alt={property.metroType === "on_foot" ? "walking" : "car"}
                  />
                  <span
                    className={
                      styles.property_card_list__content__info__header__location__way__item__text
                    }
                  >
                    {property.driveTime}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className={styles.property_card_list__content__info__specifications}
          >
            {property.specifications.map((spec, index) => (
              <div
                className={
                  styles.property_card_list__content__info__specifications__item
                }
                key={index}
              >
                <span
                  className={
                    styles.property_card_list__content__info__specifications__item__name
                  }
                >
                  {spec.type}
                </span>
                <span
                  className={
                    styles.property_card_list__content__info__specifications__item__price
                  }
                >
                  {spec.price}
                </span>
              </div>
            ))}
          </div>

          <div
            className={styles.property_card_list__content__info__description}
          >
            {property.description.map((desc, index) => (
              <div
                className={
                  styles.property_card_list__content__info__description__item
                }
                key={index}
              >
                <span
                  className={
                    styles.property_card_list__content__info__description__item__type
                  }
                >
                  {desc.type}
                </span>
                <span
                  className={
                    styles.property_card_list__content__info__description__item__status
                  }
                >
                  {desc.status}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.property_card_list__content__separator} />
        <div className={styles.property_card_list__content__actions}>
          <div className={styles.property_card_list__content__actions__price}>
            <div
              className={
                styles.property_card_list__content__actions__price__value
              }
            >
              <div
                className={
                  styles.property_card_list__content__actions__price__value__header
                }
              >
                <h3
                  className={
                    styles.property_card_list__content__actions__price__value__header__number
                  }
                >
                  {property.price}
                </h3>
                <span
                  className={
                    styles.property_card_list__content__actions__price__value__header__description
                  }
                >
                  Эскроу счет
                </span>
              </div>
              <IconButton
                size="tiny"
                iconLink={"/images/icons/heart.svg"}
                isActive={isFavorite}
                onClick={handleFavoriteClick}
                disabled={switchLikeMutation.isPending}
              />
            </div>
            <div
              className={
                styles.property_card_list__content__actions__price__mortgage
              }
            >
              <ActionButton
                className={
                  styles.property_card_list__content__actions__price__mortgage__price
                }
                size="tiny"
                type="secondary"
                onClick={handleMortgageClick}
              >
                от 23 538 ₽/мес
              </ActionButton>
              <div
                className={
                  styles.property_card_list__content__actions__price__mortgage__description
                }
              >
                <h4
                  className={
                    styles.property_card_list__content__actions__price__mortgage__description__header
                  }
                >
                  Ипотека — это просто
                </h4>
                <p
                  className={
                    styles.property_card_list__content__actions__price__mortgage__description__text
                  }
                >
                  Получите предложения по ипотеке от банков в течение минуты
                </p>
              </div>
            </div>
          </div>
          <div className={styles.property_card_list__content__actions__builder}>
            <div
              className={
                styles.property_card_list__content__actions__builder__header
              }
            >
              <h3
                className={
                  styles.property_card_list__content__actions__builder__header__title
                }
              >
                {property.badge.developer}
              </h3>
              <IconImage
                className={
                  styles.property_card_list__content__actions__builder__header__icon
                }
                iconLink={"/images/temporary/brusnika.png"}
                alt={"company"}
              />
            </div>
            <div
              className={
                styles.property_card_list__content__actions__builder__buttons
              }
            >
              <ActionButton
                className={
                  styles.property_card_list__content__actions__builder__buttons__button
                }
                type="secondary"
                size="tiny"
              >
                Показать телефон
              </ActionButton>

              <div
                className={
                  styles.property_card_list__content__actions__builder__buttons__more
                }
              >
                <ActionButton
                  className={
                    styles.property_card_list__content__actions__builder__buttons__more__button
                  }
                  type="outline"
                  size="small"
                  onClick={handleDetailsClick}
                >
                  Подробнее
                </ActionButton>
                <ActionButton
                  className={
                    styles.property_card_list__content__actions__builder__buttons__more__button
                  }
                  size="small"
                  onClick={handleCatalogueClick}
                >
                  Каталог
                </ActionButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyCardList
