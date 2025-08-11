"use client"

import React, {FC, useState} from "react"
import styles from "./rightSide.module.scss"
import { FormRow } from "@/components/ui/forms/formRow/FormRow";
import InputContainer from "@/components/ui/inputs/inputContainer";
import ActionButton from "@/components/ui/buttons/ActionButton";

import clsx from "clsx";
import CheckboxRow from "@/components/ui/checkbox/personalProcessing";

interface DreamFlatData {
    firstName: string;
    phoneNumber: string;
    isAgreed: boolean;
}

const RightSide:FC = () => {
    const [formData, setFormData] = useState<DreamFlatData>({
        firstName: "",
        phoneNumber: "",
        isAgreed: false,
    })

    const handleInputChange = (name: string, value: string) =>{
        setFormData(prev => ({...prev, [name]: value}))
    }

    const handleCheckboxChange = (checked:boolean) => {
        setFormData(prev => ({...prev, isAgreed: checked}))
    }

    const handleSubmit = () => {
        if(!formData.isAgreed) return

        console.log("Form submited, need back", formData)
    }

    return (
        <div className= {styles.rightSide}>
            <FormRow className={clsx(styles.mt_0, styles.smallWrap)}>
                <InputContainer
                    label=""
                    placeholder="Ваше имя"
                    value={formData.firstName}
                    onChange={((value) => handleInputChange("firstName", value))}
                    name = "firstNameDreamFlat"
                />
                <InputContainer
                    label=""
                    placeholder=""
                    value={formData.phoneNumber}
                    onChange={(value) => handleInputChange("phone", value)}
                    name="phoneDreamFlat"
                    prefix="+7"
                    className={styles.w_50}
                />

                <ActionButton
                onClick={handleSubmit}
                size="medium"
                type="primary"
                >
                Отправить
                </ActionButton>
            </FormRow>

            <FormRow className={clsx(styles.mt_0, styles.smallWrap)} justifyContent="flex-start">
                <CheckboxRow
                    checked = {formData.isAgreed}
                    onChange={handleCheckboxChange}
                    text = "Нажимая на кнопку вы даете согласие"
                    linkText="своих персональных данных"
                    linkHref="/privatePolicy"
                    name="personalDataDreamFlat"
                    id="personalDataDreamFlat"
                />
            </FormRow>
        </div>
    )
}

export default RightSide
