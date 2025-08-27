import React, { FC } from "react"
import styles from "./leftSide.module.scss"
import Image from "next/image"

const GreetingAreaQuestion: FC = () => {
  return (
    <div className={styles.TextContainer}>
      <div className={styles.TextContainer__image}>
        <Image
          src="/images/MalikovaYulijaPop.webp"
          alt="Картинка"
          width={90}
          height={90}
          className={styles.TextContainer_avatar}
        />
      </div>
      <div className={styles.TextContainer__textZone}>
        {/* Копия картинки для обтекания на маленьких экранах */}
        <div className={styles.TextContainer__imageFloat}>
          <Image
            src="/images/MalikovaYulijaPop.webp"
            alt="Картинка"
            width={90}
            height={90}
            className={styles.TextContainer_avatar}
          />
        </div>
        <div className={styles.TextContainer__header}>
          Я – Маликова Юлия, руководитель офиса Поиска метров
        </div>
        <div className={`${styles.TextContainer__descriptionSection} ${styles.TextContainer__570None}`}>
          Моя цель – создавать для клиента комфортные условия взаимодействия с
          нашей компаниейв любой момент времени.
        </div>
        <div className={styles.TextContainer__descriptionSection}>
          Если у вас есть нерешенные вопросы, напишите мне, и я лично разберусь
          в Вашей ситуации.
        </div>
        <div className={`${styles.TextContainer__nameSection} ${styles.TextContainer__570None}`}>
          <div className={styles.TextContainer__name}>
            Юлия Маликова
          </div>
          <div className={styles.TextContainer__jobTitle}>
            руководитель офиса Поиска метров
          </div>
        </div>
      </div>
    </div>
  )
}

export default GreetingAreaQuestion