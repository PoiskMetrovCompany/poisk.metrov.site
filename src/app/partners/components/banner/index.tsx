import React from "react"
import styles from "./banner.module.scss"
import Heading1 from "@/components/ui/heading1"
import clsx from "clsx"

const Banner = () => {
  return (
    <div className={styles.banner__container}>
      <div className={styles.banner}>
        <Heading1 className={styles.banner__title}>
          <b>Поиск Метров</b> –
          <br />
          найдем квартиру, поможем с ипотекой
        </Heading1>
        <p className={styles.banner__subtitle}>
          Вы можете передать клиента в наше сопровождение, если он планирует
          переезд в другой город. Мы предусматриваем агентское вознаграждение
          за каждого переданного клиента!
        </p>
      </div>

      <p
        className={clsx(
          styles.banner__subtitle,
          styles.banner__subtitle_mobile
        )}
      >
        Вы можете передать клиента в наше сопровождение, если он планирует
        переезд в другой город. Мы предусматриваем агентское вознаграждение
        за каждого переданного клиента!
      </p>
    </div>
  )
}

export default Banner
