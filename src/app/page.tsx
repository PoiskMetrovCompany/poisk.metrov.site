import styles from "./page.module.scss"
import HeaderCards from "./components/headerCards"
import Mortage from "./components/mortgage"
import Compilation from "./components/compilation"
import Work from "./components/work"
import Partners from "./components/partners"
import Rating from "./components/rating"
import Download from "./components/download"
import Selection from "../components/apartmentSelection"
import Favourites from "./components/favourites"

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
        <Favourites />
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
