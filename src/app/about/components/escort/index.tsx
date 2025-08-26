import clsx from "clsx"

import styles from "./escort.module.scss"

import ActionButton from "@/components/ui/buttons/ActionButton"

const Escort = () => {
  return (
    <div className={styles.escort}>
      <div className={styles.escort__title}>
        <h2 className={styles.escort__title__title}>
          Сопровождаем клиента на всех этапах
        </h2>
        <ActionButton type="secondary" className={styles.escort__title__button}>
          Получить консультацию
        </ActionButton>
      </div>
      <div className={styles.escort__cards}>
        <div className={styles.escort__cards__card}>
          <span className={styles.escort__cards__card__count}> 1 / </span>
          <div className={styles.escort__cards__card__text}>
            <h3 className={styles.escort__cards__card__text__title}>
              Помогаем <br /> с выбором жилья
            </h3>
            <p className={styles.escort__cards__card__text__description}>
              Уточняем ваш запрос и подбираем подходящие новостройки —
              по бюджету, району и нужным параметрам
            </p>
          </div>
        </div>
        <div className={styles.escort__cards__card}>
          <span className={styles.escort__cards__card__count}> 2 / </span>
          <div className={styles.escort__cards__card__text}>
            <h3 className={styles.escort__cards__card__text__title}>
              Подбираем лучшие условия по ипотеке
            </h3>
            <p className={styles.escort__cards__card__text__description}>
              Сравниваем предложения банков, помогаем выбрать выгодную ипотечную
              программу и помогаем подать заявку
            </p>
          </div>
        </div>
        <div className={styles.escort__cards__card}>
          <span className={styles.escort__cards__card__count}> 3 / </span>
          <div className={styles.escort__cards__card__text}>
            <h3 className={styles.escort__cards__card__text__title}>
              Проводим оформление сделки
            </h3>
            <p className={styles.escort__cards__card__text__description}>
              Готовим документы, проверяем договоры и сопровождаем вас
              до момента подписания и передачи ключей
            </p>
          </div>
        </div>
        <div className={styles.escort__cards__card}>
          <span className={styles.escort__cards__card__count}> 4 / </span>
          <div className={styles.escort__cards__card__text}>
            <h3 className={styles.escort__cards__card__text__title}>
              Остаёмся на связи даже после покупки
            </h3>
            <p className={styles.escort__cards__card__text__description}>
              Отвечаем на вопросы, помогаем с пост-оформлением и всегда
              на связи, если нужна дополнительная поддержка
            </p>
          </div>
        </div>
      </div>
      <ActionButton
        type="secondary"
        className={clsx(
          styles.escort__title__button,
          styles.escort__title__button__mobile
        )}
      >
        Получить консультацию
      </ActionButton>
    </div>
  )
}

export default Escort
