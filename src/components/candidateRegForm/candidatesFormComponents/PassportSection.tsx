import React, { FC } from "react"
import { FormRow } from "./FormRow"
import { FormInput } from "./FormInput"

interface PassportSectionProps {
  formData: Record<string, any>
  onFormDataChange: (name: string, value: string) => void
  onDateChange: (name: string, value: string) => void
  onPassportChange: (name: string, value: string) => void
  errors?: Record<string, boolean> // Добавляем проп для ошибок
}

export const PassportSection: FC<PassportSectionProps> = ({
  formData,
  onFormDataChange,
  onDateChange,
  onPassportChange,
  errors = {},
}) => {
  const formatDateInput = (value: string) => {
    const digits = value.replace(/\D/g, "")
    if (digits.length <= 2) return digits
    if (digits.length <= 4) return `${digits.slice(0, 2)}.${digits.slice(2)}`
    return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4, 8)}`
  }

  const formatPassportInput = (value: string) => {
    const digits = value.replace(/\D/g, "")
    if (digits.length <= 4) return digits
    return `${digits.slice(0, 4)} ${digits.slice(4, 10)}`
  }

  return (
    <>
      <FormRow style={{ marginTop: "50px" }}>
        <h3>Паспортные данные</h3>
      </FormRow>

      <FormRow className="justify-space-between">
        <FormInput
          label="Серия и номер"
          name="passwordSeriaNumber"
          required={true}
          placeholder="1234 567890"
          maxLength={11}
          value={formData.passwordSeriaNumber || ""}
          onChange={(value) =>
            onPassportChange("passwordSeriaNumber", formatPassportInput(value))
          }
          className="formInput"
          containerClassName="input-container w-49"
          error={errors.passwordSeriaNumber}
        />

        <FormInput
          label="Дата выдачи"
          name="dateOfIssue"
          required={true}
          placeholder="01.01.1990"
          maxLength={10}
          value={formData.dateOfIssue || ""}
          onChange={(value) =>
            onDateChange("dateOfIssue", formatDateInput(value))
          }
          className="formInput"
          containerClassName="input-container w-49"
          error={errors.dateOfIssue}
        />
      </FormRow>

      <FormRow>
        <FormInput
          label="Кем выдан"
          name="issuedBy"
          required={true}
          placeholder="ОФУМС России"
          value={formData.issuedBy || ""}
          onChange={(value) => onFormDataChange("issuedBy", value)}
          className="formInput"
          error={errors.issuedBy}
        />
      </FormRow>

      <FormRow>
        <FormInput
          label="Адрес постоянной регистрации"
          name="adressOfPermanentReg"
          required={true}
          placeholder="Адрес постоянной регистрации"
          value={formData.adressOfPermanentReg || ""}
          onChange={(value) => onFormDataChange("adressOfPermanentReg", value)}
          className="formInput"
          error={errors.adressOfPermanentReg}
        />
      </FormRow>

      <FormRow>
        <FormInput
          label="Адрес временной регистрации"
          name="adressOfTemporaryReg"
          placeholder="Адрес временной регистрации"
          value={formData.adressOfTemporaryReg || ""}
          onChange={(value) => onFormDataChange("adressOfTemporaryReg", value)}
          className="formInput"
        />
      </FormRow>

      <FormRow>
        <FormInput
          label="Адрес фактического проживания"
          name="adressOfFactialLiving"
          placeholder="Адрес фактического проживания"
          value={formData.adressOfFactialLiving || ""}
          onChange={(value) => onFormDataChange("adressOfFactialLiving", value)}
          className="formInput"
          required={true}
          error={errors.adressOfFactialLiving}
        />
      </FormRow>
    </>
  )
}
