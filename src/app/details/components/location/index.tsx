import styles from "./location.module.scss"
import Heading2 from "@/components/ui/heading2"
import Heading3 from "@/components/ui/heading3"
import Image from "next/image"
import ActionButton from "@/components/ui/buttons/ActionButton"

const INFRASTRUCTURE = [
  {
    icon: "/images/gray-rounded/metro.svg",
    title: "Метро",
  },
  {
    icon: "/images/gray-rounded/book.svg",
    title: "Школы",
  },
  {
    icon: "/images/gray-rounded/tree.svg",
    title: "Парки",
  },
  {
    icon: "/images/gray-rounded/kindergarten.svg",
    title: "Детские сады",
  },
  {
    icon: "/images/gray-rounded/shop.svg",
    title: "Магазины",
  },

  {
    icon: "/images/gray-rounded/sport.svg",
    title: "Спорт",
  },
  {
    icon: "/images/gray-rounded/medicine.svg",
    title: "Аптеки",
  },
]

const Location = () => {
  return (
    <div className={styles.location}>
      <div className={styles.location__header}>
        <Heading2>Расположение комплекса</Heading2>
      </div>
      <div className={styles.location__content}>
        <div className={styles.location__content__map} />
        <div className={styles.location__content__info}>
          <div className={styles.location__content__info__header}>
            <Heading3>Инфраструктура</Heading3>
          </div>
          <div className={styles.location__content__info__list}>
            {INFRASTRUCTURE.map((item, index) => (
              <button
                key={index}
                className={styles.location__content__info__list__item}
              >
                <div
                  className={styles.location__content__info__list__item__icon}
                >
                  <Image
                    src={item.icon}
                    alt={item.title}
                    fill
                    objectFit="cover"
                  />
                </div>
                <span
                  className={styles.location__content__info__list__item__title}
                >
                  {item.title}
                </span>
              </button>
            ))}
          </div>
          <ActionButton
            type="outline"
            className={styles.location__content__info__button}
          >
            Показать все
          </ActionButton>
        </div>
      </div>
    </div>
  )
}

export default Location
