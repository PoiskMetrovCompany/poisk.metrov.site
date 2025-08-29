import React from "react"

import styles from "./header.module.scss"

import IconImage from "@/components/ui/IconImage"
import IconButton from "@/components/ui/buttons/IconButton"
import Heading1 from "@/components/ui/heading1"

interface HeaderData {
  name: string
  address: string
  metroStation: string
  metroType: string
  metroTime: number
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
        <div
          style={{
            height: "48px",
            backgroundColor: "#f0f0f0",
            borderRadius: "8px",
            animation: "pulse 2s infinite",
          }}
        />
      </div>
      <div className={styles.header__place__text}>
        <div
          style={{
            height: "24px",
            backgroundColor: "#f0f0f0",
            borderRadius: "4px",
            marginBottom: "12px",
            width: "70%",
            animation: "pulse 2s infinite",
          }}
        />
        <div className={styles.header__place__text__distance}>
          <div className={styles.header__place__text__distance__item}>
            <div
              style={{
                height: "20px",
                width: "20px",
                backgroundColor: "#f0f0f0",
                borderRadius: "4px",
                animation: "pulse 2s infinite",
              }}
            />
            <div
              style={{
                height: "16px",
                backgroundColor: "#f0f0f0",
                borderRadius: "4px",
                width: "80px",
                animation: "pulse 2s infinite",
              }}
            />
          </div>
          <div className={styles.header__place__text__distance__item}>
            <div
              style={{
                height: "20px",
                width: "20px",
                backgroundColor: "#f0f0f0",
                borderRadius: "4px",
                animation: "pulse 2s infinite",
              }}
            />
            <div
              style={{
                height: "16px",
                backgroundColor: "#f0f0f0",
                borderRadius: "4px",
                width: "60px",
                animation: "pulse 2s infinite",
              }}
            />
          </div>
        </div>
      </div>
    </div>
    <div className={styles.header__buttons}>
      <div
        style={{
          height: "40px",
          width: "40px",
          backgroundColor: "#f0f0f0",
          borderRadius: "8px",
          animation: "pulse 2s infinite",
        }}
      />
      <div
        style={{
          height: "40px",
          width: "40px",
          backgroundColor: "#f0f0f0",
          borderRadius: "8px",
          animation: "pulse 2s infinite",
        }}
      />
    </div>
  </div>
)

const DetailsHeader: React.FC<DetailsHeaderProps> = ({
  data,
  isLoading = false,
  isError = false,
}) => {
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
          <IconButton iconLink={"/images/icons/heart.svg"} />
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
        <IconButton iconLink={"/images/icons/heart.svg"} />
        <IconButton iconLink={"/images/icons/share.svg"} />
      </div>
    </div>
  )
}

export default DetailsHeader
