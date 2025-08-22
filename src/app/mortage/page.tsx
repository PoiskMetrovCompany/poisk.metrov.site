import React from "react";
import styles from "./mortage.module.scss"
import ImageMortageSection from "@/components/mortageComponents/ImageMortageSection";

const Mortage = () => {
  return(
    <div className={styles.mortage}>
      <div className={styles.mortage__container}>
        <ImageMortageSection/>
      </div>
    </div>
  )
}

export default Mortage