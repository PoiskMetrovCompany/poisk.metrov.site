import React from "react"
import styles from "./partners.module.scss"
import Heading2 from "@/components/ui/heading2"
import IconImage from "@/components/ui/IconImage"

const partnersLogos = [
  "akvilon",
  "arsenal",
  "cds",
  "fsk",
  "glorax",
  "kvs",
  "lcp",
  "lenstroy",
  "vita",
  "terminal",
  "setl",
  "rbi",
  "polis",
]

const Partners = () => {
  return (
    <div className={styles.partners}>
      <Heading2>
        Партнёры, которые нам <b>доверяют</b>
      </Heading2>
      <div className={styles.partners__logos}>
        {partnersLogos.map((logo, index) => (
          <div
            className={styles.partners__logos__item}
            key={index}
            style={{ backgroundImage: `url(/images/partners/${logo}.webp)` }}
          />
        ))}
      </div>
    </div>
  )
}

export default Partners
