import React from "react"
import styles from "./about.module.scss"
import IconImage from "@/components/ui/IconImage"
import clsx from "clsx"

const About = () => {
  return (
    <div className={styles.about}>
      <IconImage
        className={styles.about__info}
        iconLink="/images/about/house-about.webp"
        alt="about"
      />

      <div className={styles.about__cols}>
        <div className={styles.about__col_left}>
          <div
            className={clsx(
              styles.about__col_left__block,
              styles.about__col_left__block_1
            )}
          >
            <span className={styles.about__col_left__block__count}>1 /</span>
            <div className={styles.about__col_left__block__text}>
              <h2 className={styles.about__col_left__block__text__title}>
                С чего всё началось
              </h2>
              <p className={styles.about__col_left__block__text__description}>
                Компания была основана в 2020 году. В 2023 мы провели
                ребрендинг, обновили подход, и вышли на новый уровень. Сейчас в
                нашей команде уже более 150 сотрудников в Новосибирске.
              </p>
            </div>
          </div>
          <div
            className={clsx(
              styles.about__col_left__block,
              styles.about__col_left__block_2
            )}
          >
            <span className={styles.about__col_left__block__count}>3 /</span>
            <div className={styles.about__col_left__block__text}>
              <h2 className={styles.about__col_left__block__text__title}>
                Результаты
              </h2>
              <p className={styles.about__col_left__block__text__description}>
                По итогам 2023 года «Поиск Метров» стал одним из лидеров по
                продажам новостроек в Новосибирске. Мы благодарны за доверие
                клиентов и партнёров, которое позволяет нам расти дальше.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.about__col_right}>
          <div
            className={clsx(
              styles.about__col_right__block,
              styles.about__col_right__block_1
            )}
          >
            <span className={styles.about__col_right__block__count}>2 /</span>
            <div className={styles.about__col_right__block__text}>
              <h2 className={styles.about__col_right__block__text__title}>
                Выход на новые города
              </h2>
              <p className={styles.about__col_right__block__text__description}>
                В 2023 году мы расширили географию и начали работать в
                Санкт-Петербурге. Это логичный шаг, к которому мы подошли
                осознанно — с уже налаженными процессами и сильной командой.
              </p>
            </div>
          </div>
          <div
            className={clsx(
              styles.about__col_right__block,
              styles.about__col_right__block_2
            )}
          >
            <span className={styles.about__col_right__block__count}>4 /</span>
            <div className={styles.about__col_right__block__text}>
              <h2 className={styles.about__col_right__block__text__title}>
                Что дальше
              </h2>
              <p className={styles.about__col_right__block__text__description}>
                Мы развиваем «Поиск Метров» как удобный и понятный сервис для
                выбора жилья. Планируем выход в новые города, улучшение поиска и
                добавление онлайн-инструментов, чтобы всё можно было решить в
                одном месте.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
