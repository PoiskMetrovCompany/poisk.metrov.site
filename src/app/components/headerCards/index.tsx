"use client"

import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from "date-fns"

import React, { useEffect, useState } from "react"

import { difference } from "next/dist/build/utils"
import Link from "next/link"

import { CbrResponse } from "@/types/api/cbr"
import { useApiQuery } from "@/utils/hooks/use-api"

import styles from "./headerCards.module.scss"

import IconImage from "@/components/ui/IconImage"
import Button from "@/components/ui/buttons/ActionButton"
import Skeleton from "@/components/ui/skeleton"

const HeaderCards = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const CITY = "novosibirsk"
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/cbr/actual-date/`
  const {
    data: cbrData,
    isLoading: cbrLoading,
    error: cbrError,
  } = useApiQuery<CbrResponse>([CITY], API_URL, {
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
  const cbrDate = cbrData?.attributes?.date
    ? new Date(cbrData.attributes.date)
    : null

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const dateDiff = cbrDate ? differenceInMinutes(cbrDate, currentTime) : 0

  const splitNumber = (number: number) => {
    const intPart = Math.floor(number)
    const decPart = number - intPart
    return {
      integer: intPart,
      decimal: decPart,
    }
  }

  const days = splitNumber(dateDiff / 1440)
  const hours = splitNumber(days.decimal * 24)
  const minutes = splitNumber(hours.decimal * 60)

  return (
    <div className={styles.headerCards}>
      <div className={styles.headerCards__title}>
        <h1 className={styles.headerCards__title__heading}>
          Поиск Метров – бесплатный сервис бронирования новостроек
        </h1>
        <Link href="/" className={styles.headerCards__title__link}>
          <IconImage
            className={styles.headerCards__title__link__icon}
            iconLink="/images/icons/title-arrow.svg"
            alt="arrow"
          />
        </Link>
      </div>
      <div className={styles.headerCards__percent}>
        <div className={styles.headerCards__percent__content}>
          <div className={styles.headerCards__percent__text}>
            <h2 className={styles.headerCards__percent__title}>
              Следующее заседание Совета директоров ЦБ
            </h2>
            <h3 className={styles.headerCards__percent__subtitle}>
              Изменение процентных ставок
            </h3>
          </div>
          {cbrLoading ? (
            <Skeleton
              width={310}
              height={96}
              className={styles.headerCards__percent__date__skeleton}
            />
          ) : (
            <div className={styles.headerCards__percent__date}>
              <div className={styles.headerCards__percent__date__time}>
                <span
                  className={styles.headerCards__percent__date__time__number}
                >
                  {days.integer}
                </span>{" "}
                <span
                  className={styles.headerCards__percent__date__time__colon}
                >
                  :
                </span>
                <span
                  className={styles.headerCards__percent__date__time__number}
                >
                  {hours.integer}
                </span>
                <span
                  className={styles.headerCards__percent__date__time__colon}
                >
                  :
                </span>
                <span
                  className={styles.headerCards__percent__date__time__number}
                >
                  {minutes.integer}
                </span>
              </div>
              <div className={styles.headerCards__percent__date__desc}>
                <span className={styles.headerCards__percent__date__desc__item}>
                  дней
                </span>
                <span className={styles.headerCards__percent__date__desc__item}>
                  часов
                </span>
                <span className={styles.headerCards__percent__date__desc__item}>
                  минут
                </span>
              </div>
            </div>
          )}
        </div>

        <Button type="beige" className={styles.headerCards__percent__button}>
          Узнать об ипотеке
        </Button>
      </div>
      <div className={styles.headerCards__firstCard}>
        <div className={styles.headerCards__firstCard__content}>
          <h2 className={styles.headerCards__firstCard__title}>
            Узнать о старте продаж первым
          </h2>
          <IconImage
            className={styles.headerCards__firstCard__icon}
            iconLink="/images/icons/rocket.svg"
            alt="rocket"
          />
        </div>
        <Button type="beige" className={styles.headerCards__firstCard__button}>
          Оставить заявку
        </Button>
      </div>
    </div>
  )
}

export default HeaderCards
