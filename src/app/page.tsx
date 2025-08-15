import styles from "./page.module.scss"
import HeaderCards from "./components/headerCards"
import Mortage from "./components/mortgage"
import Compilation from "./components/compilation"
import Work from "./components/work"
import Partners from "./components/partners"
import Rating from "./components/rating"
import Download from "./components/download"
import Selection from "./components/selection"
import Favourites from "./components/favourites"
import MenuPopup from "@/components/menuPopup"

export default function Home() {
  return (
    <div className={styles.main}>
      <MenuPopup />
      <div className={styles.main__container}>
        <HeaderCards />
        <Favourites />
        <Mortage />
        <Compilation />
        <Work />
        <Partners />
        <Rating />
        <Download />
        <Selection />
      </div>
    </div>
  )
}
