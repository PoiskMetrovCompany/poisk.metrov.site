import styles from "./page.module.scss"
import HeaderCards from "./components/headerCards"
import BestOffers from "./components/bestOffers"
import Mortage from "./components/mortgage"
import Compilation from "./components/compilation"
import Work from "./components/work"
import Partners from "./components/partners"

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.main__container}>
        <HeaderCards />
        <BestOffers />
        <Mortage />
        <Compilation />
        <Work />
        <Partners />
      </div>
    </div>
  )
}
