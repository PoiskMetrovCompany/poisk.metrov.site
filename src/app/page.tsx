import styles from "./page.module.scss"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.main__container}>
        <div className={styles.main__container__cards}>
          <div className={styles.main__container__cards__title}>
            <h1 className={styles.main__container__cards__title__heading}>
              Поиск Метров – бесплатный сервис бронирования новостроек
            </h1>
            <Link
              href="/"
              className={styles.main__container__cards__title__link}
            >
              <Image
                src="/images/title-arrow.svg"
                alt="arrow"
                width={28}
                height={28}
              />
            </Link>
          </div>
          <div className={styles.main__container__cards__percent}>
            <div className={styles.main__container__cards__percent__text}>
              <h2 className={styles.main__container__cards__percent__title}>
                Следующее заседание Совета директоров ЦБ
              </h2>
              <h3 className={styles.main__container__cards__percent__subtitle}>
                Изменение процентных ставок
              </h3>
            </div>

            <div className={styles.main__container__cards__percent__date}>
              <div
                className={styles.main__container__cards__percent__date__time}
              >
                <span
                  className={
                    styles.main__container__cards__percent__date__time__number
                  }
                >
                  23
                </span>{" "}
                <span
                  className={
                    styles.main__container__cards__percent__date__time__colon
                  }
                >
                  :
                </span>
                <span
                  className={
                    styles.main__container__cards__percent__date__time__number
                  }
                >
                  12
                </span>
                <span
                  className={
                    styles.main__container__cards__percent__date__time__colon
                  }
                >
                  :
                </span>
                <span
                  className={
                    styles.main__container__cards__percent__date__time__number
                  }
                >
                  18
                </span>
              </div>
              <div
                className={styles.main__container__cards__percent__date__desc}
              >
                <span>дней</span>
                <span>часов</span>
                <span>минут</span>
              </div>
            </div>
            <div className={styles.main__container__cards__percent__button}>
              Подробнее
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
