import React from "react"
import styles from "./partners.module.scss"
import Heading2 from "@/components/ui/heading2"

interface PartnerLogo {
  src: string
  alt: string
}

interface PartnersProps {
  logos: PartnerLogo[]
  headingText: string
  highlightedText?: string
  className?: string
}

const Partners = ({
  logos,
  headingText,
  highlightedText,
  className,
}: PartnersProps) => {
  const getItemSize = (index: number) => {
    if (index >= 0 && index <= 4) return "small"
    if (index >= 5 && index <= 7) return "big"
    if (index >= 8 && index <= 12) return "small"
    return "small"
  }

  const desktopRows = [logos.slice(0, 5), logos.slice(5, 8), logos.slice(8, 13)]

  const mobileRows = [
    logos.slice(0, 3),
    logos.slice(3, 5),
    logos.slice(5, 8),
    logos.slice(8, 10),
    logos.slice(10, 13),
  ]

  return (
    <div className={`${styles.partners} ${className || ""}`}>
      <Heading2 className={styles.partners__h2}>
        {headingText} {highlightedText && <b>{highlightedText}</b>}
      </Heading2>

      <div className={styles.partners__logos}>
        {desktopRows.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.partners__logos__row}>
            {row.map((logo, index) => {
              const globalIndex = logos.indexOf(logo)
              return (
                <div
                  className={`${styles.partners__logos__item} ${
                    styles[`partners__logos__item__${getItemSize(globalIndex)}`]
                  }`}
                  key={globalIndex}
                  style={{ backgroundImage: `url(${logo.src})` }}
                  aria-label={logo.alt}
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
              const globalIndex = logos.indexOf(logo)
              return (
                <div
                  className={`${styles.partners__logosMobile__item} ${
                    styles[
                      `partners__logosMobile__item__${getItemSize(globalIndex)}`
                    ]
                  }`}
                  key={globalIndex}
                  style={{ backgroundImage: `url(${logo.src})` }}
                  aria-label={logo.alt}
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
