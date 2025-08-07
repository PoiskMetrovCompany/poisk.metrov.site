import React from "react"
import styles from "./download.module.scss"
import ActionButton from "@/components/ui/buttons/ActionButton"
import clsx from "clsx"
import IconImage from "@/components/ui/IconImage"

const Download = () => {
  return (
    <div className={styles.download}>
      <div className={styles.download__catalogue}>
        <div className={styles.download__catalogue__header}>
          <h2 className={styles.download__catalogue__header__title}>
            Скачайте каталог
          </h2>
          <p className={styles.download__catalogue__header__description}>
            <b>новых домов Новосибирска</b>
            <br /> для жизни и инвестиций
          </p>
        </div>
        <div className={styles.download__catalogue__statistics}>
          <div className={styles.download__catalogue__statistics__item}>
            <span
              className={styles.download__catalogue__statistics__item__number}
            >
              140+
            </span>
            <p
              className={
                styles.download__catalogue__statistics__item__description
              }
            >
              Новостроек
            </p>
          </div>
          <div className={styles.download__catalogue__statistics__item}>
            <span
              className={styles.download__catalogue__statistics__item__number}
            >
              от 3 млн ₽{" "}
            </span>
            <p
              className={
                styles.download__catalogue__statistics__item__description
              }
            >
              Стоимость квартир
            </p>
          </div>
        </div>
        <div className={styles.download__catalogue__buttons}>
          <ActionButton
            className={clsx(
              styles.download__catalogue__buttons__button,
              styles.download__catalogue__buttons__whatsapp
            )}
            size="medium"
          >
            Получить в WhatsApp{" "}
            <IconImage
              iconLink="/images/icons/whatsapp.svg"
              alt="whatsApp"
              className={styles.download__catalogue__buttons__button__icon}
            />
          </ActionButton>
          <ActionButton
            className={clsx(
              styles.download__catalogue__buttons__button,
              styles.download__catalogue__buttons__telegram
            )}
            size="medium"
          >
            Получить в Telegram
            <IconImage
              iconLink="/images/icons/telegram.svg"
              alt="telegram"
              className={styles.download__catalogue__buttons__button__icon}
            />
          </ActionButton>
        </div>
      </div>
      <div className={styles.download__aboutUs}>
        <IconImage
          iconLink="/images/peopleDownload.webp"
          alt="download"
          className={styles.download__aboutUs__icon}
        />
        <div className={styles.download__aboutUs__statistics}>
          <div className={styles.download__aboutUs__statistics__content}>
            <div
              className={styles.download__aboutUs__statistics__content__item}
            >
              <span
                className={
                  styles.download__aboutUs__statistics__content__item__number
                }
              >
                145+
              </span>
              <p
                className={
                  styles.download__aboutUs__statistics__content__item__description
                }
              >
                Застройщиков и банков – наши партнёры
              </p>
            </div>
            <div
              className={styles.download__aboutUs__statistics__content__item}
            >
              <span
                className={
                  styles.download__aboutUs__statistics__content__item__number
                }
              >
                6 000+
              </span>
              <p
                className={
                  styles.download__aboutUs__statistics__content__item__description
                }
              >
                Счастливых семей каждый год
              </p>
            </div>
            <div
              className={styles.download__aboutUs__statistics__content__item}
            >
              <span
                className={
                  styles.download__aboutUs__statistics__content__item__number
                }
              >
                300+
              </span>
              <p
                className={
                  styles.download__aboutUs__statistics__content__item__description
                }
              >
                Объектов недвижимостив нашей базе
              </p>
            </div>
          </div>
          <ActionButton
            type="beige"
            className={styles.download__aboutUs__statistics__button}
          >
            О нас
            <IconImage
              iconLink="/images/icons/arrow-top-right.svg"
              alt="arrow"
              className={styles.download__aboutUs__statistics__button__icon}
            />
          </ActionButton>
        </div>
      </div>
    </div>
  )
}

export default Download
