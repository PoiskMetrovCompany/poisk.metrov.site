import React from "react"
import SendSellApplication from "@/components/sendSellApplication"
import OfficesQuestions from "@/components/offices"
import styles from "./offices.module.scss"
const Offices = () =>{
    return(
        <div className={styles.QuestionsSection}>
            <OfficesQuestions/>
        </div>
    )
}

export default Offices
