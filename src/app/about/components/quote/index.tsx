import React from "react"
import styles from "./quote.module.scss"
import clsx from "clsx"

const Quote = () => {
  return (
    <div className={styles.quote}>
      <div className={clsx(styles.quote__image, styles.quote__image_1)} />
      <div className={clsx(styles.quote__image, styles.quote__image_2)} />
      <div className={clsx(styles.quote__image, styles.quote__image_3)} />
      <div className={clsx(styles.quote__image, styles.quote__image_4)} />
      <div className={clsx(styles.quote__image, styles.quote__image_5)} />

      <div className={styles.quote__block}>
        <div
          className={clsx(
            styles.quote__block__mark,
            styles.quote__block__mark_left
          )}
        >
          “
        </div>
        <div className={styles.quote__block__text}>
          Мы стремимся сделать покупку жилья комфортной и спокойной.
          <br />
          Наша миссия — помочь вам найти <br /> не просто квартиру, а настоящий
          дом, место, где вы будете счастливы.
        </div>
        <div
          className={clsx(
            styles.quote__block__mark,
            styles.quote__block__mark_right
          )}
        >
          ”
        </div>
      </div>
    </div>
  )
}

export default Quote
