"use client"

import React, {FC} from "react"
import styles from './leftSide.module.scss'

const LeftSide:FC = () => {
    return(
        <div className={styles.leftSide}>
            <div className={styles.leftSide__text}>
                Подберите <span className={styles.leftSide__marker}>квартиру мечты</span> и получите <span className={styles.leftSide__marker}>персональную скидку</span> от застройщика
            </div>
        </div>
    )
}

export default LeftSide