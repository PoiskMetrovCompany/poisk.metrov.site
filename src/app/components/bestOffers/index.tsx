import styles from "./bestOffers.module.scss"
import Heading2 from "@/components/ui/heading2"
import ActionButton from "@/components/ui/buttons/ActionButton"

const BestOffers = () => {
  return (
    <div className={styles.bestOffers}>
      <Heading2>Лучшие предложения</Heading2>
      <div className={styles.bestOffers__content}></div>
      <ActionButton className={styles.bestOffers__button}>
        Перейти в каталог
      </ActionButton>
    </div>
  )
}

export default BestOffers
