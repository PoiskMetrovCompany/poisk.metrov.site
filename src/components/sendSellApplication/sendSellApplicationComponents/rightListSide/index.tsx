import React, {FC} from "react";
import styles from "./rightListSide.module.scss"


const RightListSide = () => {
  return(

    <div className={styles.sendSellApp__container__rightSide}>
       <div className={styles.sendSellApp__container__rightSide__list}>
        <div className={styles.sendSellApp__container__rightSide__list__item}>
          <div className={styles.sendSellApp__container__rightSide__list__item__number}>
            01
          </div>
          <div className={styles.sendSellApp__container__rightSide__list__item__text}>
            <div className={styles.sendSellApp__container__rightSide__list__item__text__header}>
              Оформление заявки
            </div>
            <div className={styles.sendSellApp__container__rightSide__list__item__text__title}>
              Оставьте заявку на сайте для первичной консультации с нашим специалистом.
            </div>
          </div>
        </div>
       </div>
    </div>  
  )
}

export default RightListSide