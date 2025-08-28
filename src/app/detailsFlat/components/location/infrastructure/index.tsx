import React from "react"
import styles from "./infrastructure.module.scss"
import Heading3 from "@/components/ui/heading3"
import IconImage from "@/components/ui/IconImage"
import ActionButton from "@/components/ui/buttons/ActionButton"
import clsx from "clsx"
import IconButton from "@/components/ui/buttons/IconButton"

const INFRASTRUCTURE = [
  {
    icon: "/images/icons/gray-rounded/metro.svg",
    title: "Метро",
    type: "metro",
  },
  {
    icon: "/images/icons/gray-rounded/book.svg",
    title: "Школы",
    type: "schools",
  },
  {
    icon: "/images/icons/gray-rounded/tree.svg",
    title: "Парки",
    type: "parks",
  },
  {
    icon: "/images/icons/gray-rounded/kindergarten.svg",
    title: "Детские сады",
    type: "kindergartens",
  },
  {
    icon: "/images/icons/gray-rounded/shop.svg",
    title: "Магазины",
    type: "shops",
  },
  {
    icon: "/images/icons/gray-rounded/sport.svg",
    title: "Спорт",
    type: "sport",
  },
  {
    icon: "/images/icons/gray-rounded/medicine.svg",
    title: "Аптеки",
    type: "pharmacies",
  },
]

interface InfrastructureProps {
  selectedInfrastructure: string[]
  toggleInfrastructure: (type: string) => void
  className?: string
  onClose?: () => void
}

const Infrastructure = ({
  selectedInfrastructure,
  toggleInfrastructure,
  className,
  onClose,
}: InfrastructureProps) => {
  return (
    <div className={clsx(styles.infrastructure, className)}>
      <div className={styles.infrastructure__header}>
        <Heading3>Инфраструктура</Heading3>
        <IconButton
          iconLink="/images/icons/close.svg"
          alt="close"
          className={styles.infrastructure__header__close}
          onClick={onClose}
        />
      </div>

      <div className={styles.infrastructure__list}>
        {INFRASTRUCTURE.map((item, index) => (
          <button
            key={index}
            className={`${styles.infrastructure__list__item} ${
              selectedInfrastructure.includes(item.type)
                ? styles.infrastructure__list__item__active
                : ""
            }`}
            onClick={() => toggleInfrastructure(item.type)}
          >
            <IconImage
              iconLink={item.icon}
              alt={item.title}
              className={styles.infrastructure__list__item__icon}
            />
            <span className={styles.infrastructure__list__item__title}>
              {item.title}
            </span>
          </button>
        ))}
      </div>
      <ActionButton type="outline" className={styles.infrastructure__button}>
        Выбрать все
      </ActionButton>
    </div>
  )
}

export default Infrastructure
