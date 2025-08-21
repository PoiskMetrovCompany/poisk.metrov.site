import React from "react"
import styles from "./propertyCardComparison.module.scss"
import IconImage from "../ui/IconImage"
import PropertyCardData from "./data"
import Heading3 from "../ui/heading3"

const PropertyCardComparison = () => {
  const data = PropertyCardData

  return (
    <div className={styles.propertyCardComparison}>
      <div className={styles.propertyCardComparison__content}>
        <div className={styles.propertyCardComparison__content__heading}>
          <div
            className={styles.propertyCardComparison__content__heading__image}
          >
            <IconImage
              iconLink={data.image}
              alt="image"
              className={
                styles.propertyCardComparison__content__heading__image__icon
              }
            />
          </div>
          <div
            className={styles.propertyCardComparison__content__heading__text}
          >
            <Heading3>{data.title}</Heading3>
            <span
              className={
                styles.propertyCardComparison__content__heading__text__address
              }
            >
              {data.address}
            </span>
          </div>

          <div className={styles.propertyCardComparison__content__block}>
            <div
              className={styles.propertyCardComparison__content__block__title}
            >
              Общие сведения
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyCardComparison
