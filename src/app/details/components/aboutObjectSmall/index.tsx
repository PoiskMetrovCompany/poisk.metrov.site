import React from "react"
import styles from "./aboutObjectSmall.module.scss"
import Heading2 from "@/components/ui/heading2"
import Image from "next/image"

const AboutObjectSmall = () => {
  return (
    <div className={styles.aboutObject}>
      <div className={styles.aboutObject__header}>
        <Heading2>Об объекте</Heading2>
      </div>
      <div className={styles.aboutObject__content}>
        <div className={styles.aboutObject__content__item}>
          <div className={styles.aboutObject__content__item__icon}>
            <Image src="/images/wall.svg" alt="icon" fill />
          </div>
          <div className={styles.aboutObject__content__item__text}>
            <span className={styles.aboutObject__content__item__text_title}>
              Кирпично-монолитный
            </span>
          </div>
        </div>

        <div className={styles.aboutObject__content__item}>
          <div className={styles.aboutObject__content__item__icon}>
            <Image src="/images/height.svg" alt="icon" fill />
          </div>
          <div className={styles.aboutObject__content__item__text}>
            <span className={styles.aboutObject__content__item__text_title}>
              До 2.7 м
            </span>
          </div>
        </div>

        <div className={styles.aboutObject__content__item}>
          <div className={styles.aboutObject__content__item__icon}>
            <Image src="/images/elevator.svg" alt="icon" fill />
          </div>
          <div className={styles.aboutObject__content__item__text}>
            <span className={styles.aboutObject__content__item__text_title}>
              Пассажирский
            </span>
          </div>
        </div>

        <div className={styles.aboutObject__content__item}>
          <div className={styles.aboutObject__content__item__icon}>
            <Image src="/images/stairs.svg" alt="icon" fill />
          </div>
          <div className={styles.aboutObject__content__item__text}>
            <span className={styles.aboutObject__content__item__text_title}>
              9
            </span>
          </div>
        </div>

        <div className={styles.aboutObject__content__item}>
          <div className={styles.aboutObject__content__item__icon}>
            <Image src="/images/parking.svg" alt="icon" fill />
          </div>
          <div className={styles.aboutObject__content__item__text}>
            <span className={styles.aboutObject__content__item__text_title}>
              Стоянка
            </span>
          </div>
        </div>

        <div className={styles.aboutObject__content__item}>
          <div className={styles.aboutObject__content__item__icon}>
            <Image src="/images/building.svg" alt="icon" fill />
          </div>
          <div className={styles.aboutObject__content__item__text}>
            <span className={styles.aboutObject__content__item__text_title}>
              2
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutObjectSmall
