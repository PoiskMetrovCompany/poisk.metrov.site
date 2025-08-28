import React from "react"
import SendSellApplication from "@/components/sendSellApplication"
import styles from "./sellForm.module.scss"
const SellForm = () =>{
    return(
        <div className={styles.sellForm}>
            <SendSellApplication/>
        </div>
    )
}

export default SellForm
