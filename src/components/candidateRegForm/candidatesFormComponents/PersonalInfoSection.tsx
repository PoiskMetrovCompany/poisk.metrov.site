import React, { FC } from "react"
import { FormRow } from "./FormRow"
import { FormInput } from "./FormInput"
import { RadioGroup } from "./RadioGroup"
import CustomSelect from "@/components/ui/inputs/select/customSelect"
import { SectionHeader } from "./SectionHeader"

interface PersonalInfoSectionProps {
  formData: Record<string, any>
  onFormDataChange: (name: string, value: string) => void
  selectedVacancy: string
  setSelectedVacancy: React.Dispatch<React.SetStateAction<string>>
  selectedCity: string
  setSelectedCity: React.Dispatch<React.SetStateAction<string>>
  vacancyOptions: string[]
  cityOptions: string[]
  isLoadingVacancies: boolean
  vacancyError: string
  loadVacancies: () => void
  surnameChanged: boolean
  setSurnameChanged: React.Dispatch<React.SetStateAction<boolean>>
  goingToROP: boolean
  setGoingToROP: React.Dispatch<React.SetStateAction<boolean>>
  selectedROP: string
  setSelectedROP: React.Dispatch<React.SetStateAction<string>>
  ropOptions: string[]
  // Добавляем новые пропсы для валидации
  validationErrors: Record<string, boolean>
  triggerValidation: boolean
}

export const PersonalInfoSection: FC<PersonalInfoSectionProps> = ({
  formData,
  onFormDataChange,
  selectedVacancy,
  setSelectedVacancy,
  selectedCity,
  setSelectedCity,
  vacancyOptions,
  cityOptions,
  isLoadingVacancies,
  vacancyError,
  loadVacancies,
  surnameChanged,
  setSurnameChanged,
  goingToROP,
  setGoingToROP,
  selectedROP,
  setSelectedROP,
  ropOptions,
  validationErrors,
  triggerValidation,
}) => {
  const formatNameInput = (value: string) => {
    return value.replace(/[^а-яёА-ЯЁ\s]/g, "")
  }

  const formatDateInput = (value: string) => {
    const digits = value.replace(/\D/g, "")
    if (digits.length <= 2) return digits
    if (digits.length <= 4) return `${digits.slice(0, 2)}.${digits.slice(2)}`
    return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4, 8)}`
  }

  const formatMobilePhone = (value: string) => {
    const digits = value.replace(/\D/g, "")
    if (digits.length === 0) return ""
    if (digits.length <= 1) return `+7 (${digits}`
    if (digits.length <= 4) return `+7 (${digits.slice(1)}`
    if (digits.length <= 7)
      return `+7 (${digits.slice(1, 4)}) ${digits.slice(4)}`
    if (digits.length <= 9)
      return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(
        7
      )}`
    return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(
      7,
      9
    )}-${digits.slice(9, 11)}`
  }

  const formatHomePhone = (value: string) => {
    const digits = value.replace(/\D/g, "")
    if (digits.length <= 3) return digits
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)}`
  }

  const formatINN = (value: string) => {
    return value.replace(/\D/g, "")
  }

  // Функция для проверки есть ли ошибка у конкретного поля
  const hasError = (fieldName: string) => {
    return triggerValidation && validationErrors[fieldName]
  }

  return (
    <>
      <FormRow>
        <div className="input-container">
          <CustomSelect
            label="Вакансия"
            options={vacancyOptions}
            placeholder="Выберите вакансию, на которую подаетесь"
            value={selectedVacancy}
            onChange={setSelectedVacancy}
            isLoading={isLoadingVacancies}
            required={true}
            error={hasError("selectedVacancy")}
          />
          {vacancyError && (
            <div
              className="error-message"
              style={{ marginTop: "5px", fontSize: "14px", color: "#e74c3c" }}
            >
              {vacancyError}
              <button
                onClick={loadVacancies}
                style={{
                  marginLeft: "10px",
                  background: "none",
                  border: "none",
                  color: "#3498db",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Повторить
              </button>
            </div>
          )}
        </div>
      </FormRow>

      <FormRow>
        <div className="input-container">
          <CustomSelect
            label="Город работы"
            options={cityOptions}
            placeholder="Выберите город в котором хотите работать"
            value={selectedCity}
            onChange={setSelectedCity}
            required={true}
            error={hasError("selectedCity")}
          />
        </div>
      </FormRow>

      <FormRow className="justify-flex-start required">
        <p
          style={{
            marginTop: 0,
            marginLeft: "0.4375rem",
            color: "rgba(24, 24, 23, 1)",
          }}
        >
          Вы идете в команду РОПа или в административный состав?
        </p>
      </FormRow>

      <FormRow className="justify-flex-start" style={{ marginTop: 0 }}>
        <RadioGroup
          name="goingToROP"
          value={goingToROP}
          onChange={setGoingToROP}
          options={[
            { value: true, label: "Я иду к РОПу" },
            { value: false, label: "Я буду работать в админ составе" },
          ]}
        />
      </FormRow>

      {goingToROP && (
        <div className="toggle-block" style={{ width: "100%" }}>
          <FormRow>
            <div className="input-container">
              <CustomSelect
                label="Выберите РОПа в команду которого вы идете"
                options={ropOptions}
                placeholder="Выберите РОП"
                value={selectedROP}
                onChange={setSelectedROP}
                required={true}
                error={hasError("selectedROP")}
              />
            </div>
          </FormRow>
        </div>
      )}

      <SectionHeader
        title="Сведенья о вас"
        subtitle="Мы не передаём эти данные третьим лицам и используем их только для целей адаптации и сопровождения кандидатов"
      />

      <FormRow>
        <FormInput
          label="ФИО"
          name="FIO"
          required={true}
          placeholder="Иванов Иван Иванович"
          value={formData.FIO || ""}
          onChange={(value) => onFormDataChange("FIO", formatNameInput(value))}
          error={hasError("FIO")}
        />
      </FormRow>

      <FormRow className="justify-flex-start">
        <RadioGroup
          name="surnameChanged"
          options={[
            { value: true, label: "Я менял(-а) фамилию" },
            { value: false, label: "Я не менял(-а) фамилию" },
          ]}
          value={surnameChanged}
          onChange={setSurnameChanged}
        />
      </FormRow>

      {surnameChanged && (
        <div className="toggle-block" style={{ width: "100%" }}>
          <FormRow>
            <FormInput
              label="Причина изменения фамилии"
              name="reasonOfChange"
              placeholder="Опишите, почему поменяли фамилию"
              value={formData.reasonOfChange || ""}
              onChange={(value) => onFormDataChange("reasonOfChange", value)}
            />
          </FormRow>
        </div>
      )}

      <FormRow className="justify-space-between">
        <FormInput
          label="Дата рождения"
          name="birthDate"
          required={true}
          type="text"
          placeholder="01.01.1990"
          maxLength={10}
          value={formData.birthDate || ""}
          onChange={(value) =>
            onFormDataChange("birthDate", formatDateInput(value))
          }
          containerClassName="input-container w-49"
          error={hasError("birthDate")}
        />

        <FormInput
          label="Место рождения"
          name="birthPlace"
          required={true}
          type="text"
          placeholder="Страна, город"
          value={formData.birthPlace || ""}
          onChange={(value) => onFormDataChange("birthPlace", value)}
          containerClassName="input-container w-49"
          error={hasError("birthPlace")}
        />
      </FormRow>

      <FormRow className="justify-space-between">
        <FormInput
          label="Мобильный телефон"
          name="mobileNumber"
          required={true}
          type="text"
          placeholder="+7 (905) 123-45-67"
          maxLength={18}
          value={formData.mobileNumber || ""}
          onChange={(value) =>
            onFormDataChange("mobileNumber", formatMobilePhone(value))
          }
          containerClassName="input-container w-49"
          error={hasError("mobileNumber")}
        />

        <FormInput
          label="Домашний телефон"
          name="domesticNumber"
          required={true}
          type="text"
          placeholder="999 999"
          maxLength={7}
          value={formData.domesticNumber || ""}
          onChange={(value) =>
            onFormDataChange("domesticNumber", formatHomePhone(value))
          }
          containerClassName="input-container w-49"
          error={hasError("domesticNumber")}
        />
      </FormRow>

      <FormRow className="justify-space-between">
        <FormInput
          label="E-mail"
          required={true}
          name="email"
          type="email"
          placeholder="example@gmail.com"
          value={formData.email || ""}
          onChange={(value) => onFormDataChange("email", value)}
          containerClassName="input-container w-49"
          className="formInput"
          error={hasError("email")}
        />

        <FormInput
          label="ИНН"
          required={true}
          name="INN"
          type="tel"
          placeholder="123456789012"
          maxLength={12}
          value={formData.INN || ""}
          onChange={(value) => onFormDataChange("INN", formatINN(value))}
          containerClassName="input-container w-49"
          error={hasError("INN")}
        />
      </FormRow>
    </>
  )
}

export default PersonalInfoSection
