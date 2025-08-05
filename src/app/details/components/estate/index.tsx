import React from "react"
import styles from "./estate.module.scss"
import Image from "next/image"
import ActionButton from "@/components/ui/buttons/ActionButton"

const features = [
  {
    title: "Застройщик",
    value: "ГК СМСС",
  },
  {
    title: "Срок сдачи",
    value: "2027",
  },
  {
    title: "Отделка",
    value: "Подготовка под чистовую отделку",
  },
  {
    title: "Тип дома",
    value: "Кирпично-монолитный",
  },
  {
    title: "Этажность",
    value: "10",
  },
]

const Estate = () => {
  return (
    <div className={styles.info}>
      <div className={styles.info__slider}>
        <Image
          src="/images/temporary/house.png"
          alt="details"
          width={560}
          height={400}
          className={styles.info__slider__image}
        />
      </div>
      <div className={styles.info__description}>
        <div className={styles.info__description__price}>
          <div className={styles.info__description__price__minimal}>
            <span className={styles.info__description__price__minimal__title}>
              Минимальная цена
            </span>
            <span className={styles.info__description__price__minimal__price}>
              от 4 359 990 ₽
            </span>
          </div>
          <div className={styles.info__description__price__hasChanged}>
            <span className={styles.info__description__price__hasChanged__text}>
              Цена не менялась
            </span>

            <button
              className={styles.info__description__price__hasChanged__button}
            >
              <div
                className={
                  styles.info__description__price__hasChanged__button__icon
                }
              >
                <Image src="/images/arrow-right.svg" alt="arrow-right" fill />
              </div>
            </button>
          </div>
        </div>
        <ul className={styles.info__description__features}>
          {features.map((feature) => (
            <li
              className={styles.info__description__features__item}
              key={feature.title}
            >
              <span className={styles.info__description__features__item__title}>
                {feature.title}
              </span>
              <span className={styles.info__description__features__item__value}>
                {feature.value}
              </span>
            </li>
          ))}
        </ul>
        <div className={styles.info__description__buttons}>
          <ActionButton>Записаться на просмотр</ActionButton>
          <ActionButton type="secondary">Скачать презентацию</ActionButton>
        </div>
      </div>
    </div>
  )
}

export default Estate
