"use client"
import React, {FC, use, useState} from "react";

interface SellAppFormData{
    estateType: string;
    service: string;
    lastName: string;
    firstName: string;
    surName: string;
    phoneNumber: string;
    isAgreed: boolean;
}


const FormSendSellApp = () => {
    const [formData, setFormData] = useState<SellAppFormData>({
        estateType: "",
        service: "",
        lastName: "",
        firstName: "",
        surName: "",
        phoneNumber: "",
        isAgreed: false,
    })

    const handleInputChange = (name: string, value: string) => {
        setFormData(prev => ({...prev, [name]: value}))
    }

    const handleCheckboxChange = (checked:boolean) => {
        setFormData(prev => ({...prev, isAgreed: checked}))
    }

    const handleSubmit = () => {
        if(!formData.isAgreed) return

        console.log("Form submited, need back", formData)
    }


    return(
        <div></div>
    )

}

export default FormSendSellApp 