import React from "react";
import styles from "./listSection.module.scss"
import RightListSide from "../rightListSide";

const ListSection = () => {
  return(
    <div className={styles.sendSellApp}>
      <div className={styles.sendSellApp__container}>
        <div className={styles.sendSellApp__container__leftSide}>
          <div className={styles.sendSellApp__container__leftSide__header}>
            Как мы работаем?
          </div>
        </div>
        <RightListSide/>
      </div>
    </div>
  )
}

export default ListSection