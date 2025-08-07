import styles from "./mortgage.module.scss"
import ActionButton from "@/components/ui/buttons/ActionButton"

const Mortgage = () => {
  return (
    <div className={styles.mortgage}>
      <h1 className={styles.mortgage__question}>
        какой <b>ежемесячный платёж</b> по ипотеке вам подойдёт?
      </h1>
      <div className={styles.mortgage__buttons}>
        <ActionButton type="beige">До 30 тыс. ₽</ActionButton>
        <ActionButton type="beige">До 50 тыс. ₽</ActionButton>
        <ActionButton type="beige">До 70 тыс. ₽</ActionButton>
        <ActionButton type="beige">До 100 тыс. ₽</ActionButton>
        <ActionButton type="beige">Больше 100 тыс. ₽</ActionButton>
      </div>
    </div>
  )
}

export default Mortgage
