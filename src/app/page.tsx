import styles from "./page.module.scss"

import Selection from "../components/apartmentSelection"
import Compilation from "./components/compilation/compilationMain"
import Download from "./components/download"
import Favourites from "./components/favourites"
import Filter from "./components/filter"
import HeaderCards from "./components/headerCards"
import MonthlyPayment from "./components/monthlyPayment"
import Mortage from "./components/mortgage"
import Partners from "./components/partners"
import Rating from "./components/rating"
import Work from "./components/work"

const partnersData = [
  { src: "/images/partners/akvilon.webp", alt: "Akvilon" },
  { src: "/images/partners/arsenal.webp", alt: "Arsenal" },
  { src: "/images/partners/cds.webp", alt: "CDS" },
  { src: "/images/partners/fsk.webp", alt: "FSK" },
  { src: "/images/partners/glorax.webp", alt: "Glorax" },
  { src: "/images/partners/kvs.webp", alt: "KVS" },
  { src: "/images/partners/lcp.webp", alt: "LCP" },
  { src: "/images/partners/lenstroy.webp", alt: "Lenstroy" },
  { src: "/images/partners/vita.webp", alt: "Vita" },
  { src: "/images/partners/terminal.webp", alt: "Terminal" },
  { src: "/images/partners/setl.webp", alt: "Setl" },
  { src: "/images/partners/rbi.webp", alt: "RBI" },
  { src: "/images/partners/polis.webp", alt: "Polis" },
]

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.main__container}>
        <HeaderCards />
        <Filter />
        <Favourites />
        <MonthlyPayment />
        <Mortage />
        <Compilation header="Подборка квартир" hasPromoCard={true} />
        <Work />
        <Partners
          logos={partnersData}
          headingText="Партнеры, которые нам"
          highlightedText="доверяют"
        />
        <Rating />
        <Download />
        <Selection />
      </div>
    </div>
  )
}
