import React from "react"
import ClientTransferApp from "@/components/clientTransferApp"
import styles from "./clientTransferForm.module.scss"
const ClientTransferForm = () =>{
    return(
        <div className={styles.sellForm}>
            <ClientTransferApp/>
        </div>
    )
}

export default ClientTransferForm
