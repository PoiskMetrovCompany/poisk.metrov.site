import React from "react"
import styles from "./about.module.scss"
import Heading2 from "@/components/ui/heading2"

const About = () => {
  return (
    <div className={styles.about}>
      <Heading2 className={styles.about__title}>
        Как мы работаем с партнёрами?
      </Heading2>
      <div className={styles.about__content}>
        <div className={styles.about__content__number}>
          <div className={styles.about__content__number__item}>
            <span className={styles.about__content__number__item__number}>
              01
            </span>
            <div className={styles.about__content__number__item__line} />
          </div>
          <div className={styles.about__content__number__item}>
            <span className={styles.about__content__number__item__number}>
              02
            </span>
            <div className={styles.about__content__number__item__line} />
          </div>
          <div className={styles.about__content__number__item}>
            <span className={styles.about__content__number__item__number}>
              03
            </span>
            <div className={styles.about__content__number__item__line} />
          </div>
          <div className={styles.about__content__number__item}>
            <span className={styles.about__content__number__item__number}>
              04
            </span>
          </div>
        </div>
        <div className={styles.about__content__text}>
          <div className={styles.about__content__text__item}>
            <h3 className={styles.about__content__text__item__title}>
              Оформление заявки
            </h3>
            <p className={styles.about__content__text__item__text}>
              Мы принимаем клиентов, которые планируют переезд в города:
              Новосибирск, Сочи, Санкт-Петербург, Москва, Анапа, Туапсе, Дубай.
              Чтобы передать вашего клиента, вы должны заполнить форму обратной
              связи.
            </p>
          </div>
          <div className={styles.about__content__text__item}>
            <h3 className={styles.about__content__text__item__title}>
              Уточнение информации
            </h3>
            <p className={styles.about__content__text__item__text}>
              После обсуждения деталей с клиентом, мы передадим вам обратную
              связь с записями переговоров и переписок, чтобы вы всегда могли
              оставаться в курсе происходящего.
            </p>
          </div>
          <div className={styles.about__content__text__item}>
            <h3 className={styles.about__content__text__item__title}>
              Подбор оптимального варианта для клиента
            </h3>
            <p className={styles.about__content__text__item__text}>
              С учётом предоставленной информации о клиенте и его нуждах, наши
              специалисты подберут для него оптимальный вариант недвижимости,
              предложат варианты и сопроводят сделку.
            </p>
          </div>
          <div className={styles.about__content__text__item}>
            <h3 className={styles.about__content__text__item__title}>
              Вознаграждение
            </h3>
            <p className={styles.about__content__text__item__text}>
              После успешного завершения сделки, мы перечислим вам партнёрское
              вознаграждение за предоставленного клиента. Это может быть
              определённая сумма денег или комиссия от сделки, которую
              мы согласуем заранее.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
