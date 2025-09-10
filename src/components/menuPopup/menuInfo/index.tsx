import clsx from "clsx"

import React, { useState } from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"

import styles from "./menuInfo.module.scss"

import IconImage from "@/components/ui/IconImage"
import ActionButton from "@/components/ui/buttons/ActionButton"

enum tabType {
  residentialComplex = "ЖК",
  flats = "Квартиры",
  apartments = "Апартаменты",
  houses = "Дома",
}

interface IMenuInfoProps {
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  onClose?: () => void
}

const MenuInfo = ({ onClick, onClose }: IMenuInfoProps) => {
  const [selectedType, setSelectedType] = useState(tabType.residentialComplex)
  const router = useRouter()

  const handleCatalogueClick = () => {
    router.push("/catalogue")
    onClose?.()
  }

  return (
    <div className={styles.info} onClick={onClick}>
      <div className={styles.info__content}>
        <div className={styles.info__content__switcher}>
          {Object.values(tabType).map((type) => (
            <button
              key={type}
              className={clsx(styles.info__content__switcher__item, {
                [styles.info__content__switcher__item__selected]:
                  selectedType === type,
              })}
              onClick={() => setSelectedType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        <div className={styles.info__content__statistics}>
          <div className={styles.info__content__statistics__general}>
            {[...new Array(3)].map((_, index) => (
              <Link
                href="/"
                className={styles.info__content__statistics__general__item}
                key={index}
              >
                <div
                  className={
                    styles.info__content__statistics__general__item__icon
                  }
                >
                  <IconImage
                    iconLink="/images/temporary/hot.svg"
                    alt="house"
                    className={
                      styles.info__content__statistics__general__item__icon__image
                    }
                  />
                </div>
                <div
                  className={
                    styles.info__content__statistics__general__item__text
                  }
                >
                  <span
                    className={
                      styles.info__content__statistics__general__item__text__title
                    }
                  >
                    Популярные
                  </span>
                  <span
                    className={
                      styles.info__content__statistics__general__item__text__value
                    }
                  >
                    46 проектов
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className={styles.info__content__statistics__cards}>
            {[...new Array(6)].map((_, index) => (
              <Link
                href="/"
                className={styles.info__content__statistics__cards__item}
                key={index}
              >
                <IconImage
                  iconLink="/images/temporary/location.webp"
                  alt="house"
                  className={
                    styles.info__content__statistics__cards__item__image
                  }
                />
                <div
                  className={
                    styles.info__content__statistics__cards__item__text
                  }
                >
                  <span
                    className={
                      styles.info__content__statistics__cards__item__text__title
                    }
                  >
                    ЖК у воды
                  </span>
                  <span
                    className={
                      styles.info__content__statistics__cards__item__text__value
                    }
                  >
                    11 548 предложений
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <ActionButton
        type="secondary"
        className={styles.info__button}
        onClick={handleCatalogueClick}
      >
        Перейти в каталог
      </ActionButton>
    </div>
  )
}

export default MenuInfo
