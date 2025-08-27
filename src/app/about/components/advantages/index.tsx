import Heading2 from "@/components/ui/heading2"
import styles from "./advantages.module.scss"
import clsx from "clsx"

const Advantages = () => {
  return (
    <div className={styles.advantages}>
      <Heading2>Преимущества</Heading2>
      <div className={styles.advantages__cards}>
        <div
          className={clsx(
            styles.advantages__cards__card,
            styles.advantages__cards__card_1
          )}
        >
          <h3 className={styles.advantages__cards__card_1__title}>
            Только актуальные цены
          </h3>
          <p className={styles.advantages__cards__card_1__description}>
            Мы следим за актуальностью цен, чтобы вы были уверены в своём выборе
          </p>
        </div>
        <div
          className={clsx(
            styles.advantages__cards__card,
            styles.advantages__cards__card_2
          )}
        >
          <h3 className={styles.advantages__cards__card__title}>
            Берем на себя все вопросы сопровождения сделки
          </h3>
          <p className={styles.advantages__cards__card__description}>
            Помогаем на каждом этапе сделки — от выбора до получения ключей,
            чтобы вы были спокойны и уверены.
          </p>
        </div>
        <div
          className={clsx(
            styles.advantages__cards__card,
            styles.advantages__cards__card_3
          )}
        >
          <h3 className={styles.advantages__cards__card_3__title}>
            Проверенные и надёжные застройщики
          </h3>
          <p className={styles.advantages__cards__card_3__description}>
            Мы работаем только с надёжными застройщиками, благодаря чему
            предлагаем бесплатные консультации и помощь в выборе.
          </p>
        </div>
        <div
          className={clsx(
            styles.advantages__cards__card,
            styles.advantages__cards__card_4
          )}
        >
          <h3 className={styles.advantages__cards__card__title}>
            Недвижимость без комиссий
          </h3>
          <p className={styles.advantages__cards__card__description}>
            Помогаем приобрести квартиру без дополнительных расходов и комиссий.
          </p>
        </div>
        <div
          className={clsx(
            styles.advantages__cards__card,
            styles.advantages__cards__card_5
          )}
        >
          <h3 className={styles.advantages__cards__card__title}>
            Экскурсии по новостройкам
          </h3>
          <p className={styles.advantages__cards__card__description}>
            Организуем экскурсии, на которых вы увидите жильё своими глазами и
            убедитесь, что оно вам подходит.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Advantages
