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
  "polis",
  "rbi",
  "setl",
  "terminal",
  "vita",
]

const Partners = () => {
  return (
    <div className={styles.partners}>
      <Heading2>Наши партнеры</Heading2>
      <div className={styles.partners__logos}>
        {partnersLogos.map((logo, index) => (
          <div className={styles.partners__logos__item} key={index}>
            <IconImage
              iconLink={`/images/partners/${logo}.webp`}
              alt={logo}
              className={styles.partners__logos__logo__image}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Partners
