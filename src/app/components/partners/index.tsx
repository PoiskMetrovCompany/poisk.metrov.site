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
  const getItemSize = (index: number) => {
    if (index >= 0 && index <= 4) return "small"
    if (index >= 5 && index <= 7) return "big"
    if (index >= 8 && index <= 12) return "small"
    return "small"
  }

  const desktopRows = [
    partnersLogos.slice(0, 5),
    partnersLogos.slice(5, 8),
    partnersLogos.slice(8, 13),
  ]

  const mobileRows = [
    partnersLogos.slice(0, 3),
    partnersLogos.slice(3, 5),
    partnersLogos.slice(5, 8),
    partnersLogos.slice(8, 10),
    partnersLogos.slice(10, 13),
  ]

  return (
    <div className={styles.partners}>
      <Heading2 className={styles.partners__h2}>
        Партнёры, которые нам <b>доверяют</b>
      </Heading2>

      <div className={styles.partners__logos}>
        {desktopRows.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.partners__logos__row}>
            {row.map((logo, index) => {
              const globalIndex = partnersLogos.indexOf(logo)
              return (
                <div
                  className={`${styles.partners__logos__item} ${
                    styles[`partners__logos__item__${getItemSize(globalIndex)}`]
                  }`}
                  key={globalIndex}
                  style={{
                    backgroundImage: `url(/images/partners/colored/${logo}.webp)`,
                  }}
                />
              )
            })}
          </div>
        ))}
      </div>

      <div className={styles.partners__logosMobile}>
        {mobileRows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`${styles.partners__logosMobile__row} ${
              row.length === 2
                ? styles.partners__logosMobile__row_two
                : styles.partners__logosMobile__row_three
            }`}
          >
            {row.map((logo, index) => {
              const globalIndex = partnersLogos.indexOf(logo)
              return (
                <div
                  className={`${styles.partners__logosMobile__item} ${
                    styles[
                      `partners__logosMobile__item__${getItemSize(globalIndex)}`
                    ]
                  }`}
                  key={globalIndex}
                  style={{
                    backgroundImage: `url(/images/partners/${logo}.webp)`,
                  }}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Partners
