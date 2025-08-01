import React from "react"
import styles from "./estate.module.scss"
import Image from "next/image"

const Estate = () => {
  return (
    <div className={styles.info}>
      <div className={styles.info__slider}>
        {/* <Image
      src="/images/temporary/room.png"
      alt="details"
      width={560}
      height={400}
    /> */}
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
              <Image
                src="/images/arrow-right.svg"
                alt="arrow-right"
                width={14}
                height={14}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Estate
