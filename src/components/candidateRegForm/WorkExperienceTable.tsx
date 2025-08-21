"use client"
import React, { FC } from "react"

interface IWorkExperienceTableProps {
  formData: Record<string, any>
  setFormData: (
    updater: (prev: Record<string, any>) => Record<string, any>
  ) => void
  requiredFields?: string[]
  errors?: Record<string, boolean> // Добавляем пропс для ошибок
}

const WorkExperienceTable: FC<IWorkExperienceTableProps> = ({
  formData,
  setFormData,
  requiredFields = [],
  errors = {}, // Значение по умолчанию
}) => {
  const formatDate = (value: string): string => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 2) {
      return numbers
    } else if (numbers.length <= 4) {
      return numbers.slice(0, 2) + "." + numbers.slice(2)
    } else {
      return (
        numbers.slice(0, 2) +
        "." +
        numbers.slice(2, 4) +
        "." +
        numbers.slice(4, 8)
      )
    }
  }

  const formatMobilePhone = (value: string): string => {
    const numbers = value.replace(/\D/g, "")

    let formattedNumbers = numbers
    if (numbers.length > 0 && numbers[0] !== "7") {
      formattedNumbers = "7" + numbers
    }

    if (formattedNumbers.length <= 1) {
      return "+7"
    } else if (formattedNumbers.length <= 4) {
      return "+7 (" + formattedNumbers.slice(1)
    } else if (formattedNumbers.length <= 7) {
      return (
        "+7 (" + formattedNumbers.slice(1, 4) + ") " + formattedNumbers.slice(4)
      )
    } else if (formattedNumbers.length <= 9) {
      return (
        "+7 (" +
        formattedNumbers.slice(1, 4) +
        ") " +
        formattedNumbers.slice(4, 7) +
        "-" +
        formattedNumbers.slice(7)
      )
    } else {
      return (
        "+7 (" +
        formattedNumbers.slice(1, 4) +
        ") " +
        formattedNumbers.slice(4, 7) +
        "-" +
        formattedNumbers.slice(7, 9) +
        "-" +
        formattedNumbers.slice(9, 11)
      )
    }
  }

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (name: string, value: string) => {
    const formattedValue = formatDate(value)
    handleInputChange(name, formattedValue)
  }

  const isRequired = (fieldName: string): boolean => {
    return requiredFields.includes(fieldName)
  }

  // Функция для проверки наличия ошибки у поля
  const hasError = (fieldName: string): boolean => {
    return Boolean(errors[fieldName])
  }

  const renderInputWithRequired = (
    name: string,
    placeholder: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    maxLength?: number,
    additionalClassName?: string // Добавляем возможность передать дополнительный класс
  ) => {
    const required = isRequired(name)
    const error = hasError(name)

    return (
      <div className={`custom-input-container ${additionalClassName || ""}`}>
        <input
          type="text"
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          required={required}
          maxLength={maxLength}
          className={`${value ? "has-value" : ""} ${error ? "error" : ""}`}
          style={{
            borderColor: error ? "#e74c3c" : undefined,
            borderWidth: error ? "1.5px" : undefined,
          }}
        />
        <label
          htmlFor={name}
          className={`custom-placeholder ${required ? "required" : ""} ${
            error ? "error" : ""
          }`}
        >
          {placeholder}
          {required && <span className="required-star"> *</span>}
        </label>
      </div>
    )
  }

  return (
    <div
      className="formRow"
      id="workTable"
      style={{
        opacity: 1,
        height: "550px",
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <table
        className="inputTable"
        style={{ height: "auto", minHeight: "350px" }}
      >
        <caption
          className={`tableLabel ${
            requiredFields.length > 0 ? "required" : ""
          }`}
        >
          Данные о последнем месте работы
        </caption>
        <tbody>
          <tr>
            <td className="yesRadius"
              style={{
                borderTopLeftRadius: "16px",
                borderTopRightRadius: 0,
                borderColor: hasError("companyName") ? "#e74c3c" : undefined,
              }}
            >
              {renderInputWithRequired(
                "companyName",
                "Полное наименование предприятия",
                formData.companyName || "",
                (e) => handleInputChange("companyName", e.target.value)
              )}
            </td>
            <td className="noRadius"
              style={{
                borderTopRightRadius: "16px",
                borderTopLeftRadius: 0,
                borderColor: hasError("companyPhone") ? "#e74c3c" : undefined,
              }}
            >
              {renderInputWithRequired(
                "companyPhone",
                "Телефон предприятия",
                formData.companyPhone || "",
                (e) => {
                  const formattedValue = formatMobilePhone(e.target.value)
                  handleInputChange("companyPhone", formattedValue)
                },
                18
              )}
            </td>
          </tr>
          <tr>
            <td
              colSpan={2}
              style={{
                borderColor: hasError("companyActivity")
                  ? "#e74c3c"
                  : undefined,
              }}
            >
              {renderInputWithRequired(
                "companyActivity",
                "Сфера деятельности предприятия",
                formData.companyActivity || "",
                (e) => handleInputChange("companyActivity", e.target.value)
              )}
            </td>
          </tr>
          <tr>
            <td
              colSpan={2}
              style={{
                borderColor: hasError("companyAddress") ? "#e74c3c" : undefined,
              }}
            >
              {renderInputWithRequired(
                "companyAddress",
                "Адрес предприятия",
                formData.companyAddress || "",
                (e) => handleInputChange("companyAddress", e.target.value)
              )}
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderColor: hasError("position") ? "#e74c3c" : undefined,
              }}
            >
              {renderInputWithRequired(
                "position",
                "Должность",
                formData.position || "",
                (e) => handleInputChange("position", e.target.value)
              )}
            </td>
            <td
              style={{
                borderColor: hasError("salary") ? "#e74c3c" : undefined,
              }}
            >
              {renderInputWithRequired(
                "salary",
                "Уровень заработной платы",
                formData.salary || "",
                (e) => handleInputChange("salary", e.target.value)
              )}
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderColor: hasError("hireDate") ? "#e74c3c" : undefined,
              }}
            >
              {renderInputWithRequired(
                "hireDate",
                "Дата приема (месяц, год)",
                formData.hireDate || "",
                (e) => handleDateChange("hireDate", e.target.value),
                10
              )}
            </td>
            <td
              style={{
                borderColor: hasError("dismissalDate") ? "#e74c3c" : undefined,
              }}
            >
              {renderInputWithRequired(
                "dismissalDate",
                "Дата увольнения (месяц, год)",
                formData.dismissalDate || "",
                (e) => handleDateChange("dismissalDate", e.target.value),
                10
              )}
            </td>
          </tr>
          <tr>
            <td
              colSpan={2}
              style={{
                borderColor: hasError("dismissalReason")
                  ? "#e74c3c"
                  : undefined,
              }}
            >
              {renderInputWithRequired(
                "dismissalReason",
                "Причина увольнения",
                formData.dismissalReason || "",
                (e) => handleInputChange("dismissalReason", e.target.value)
              )}
            </td>
          </tr>
          <tr>
            <td
              className="place-of-living-cell"
              colSpan={2}
              style={{
                borderBottomLeftRadius: "16px !important",
                borderBottomRightRadius: "16px !important",
                borderColor: hasError("referenceContact")
                  ? "#e74c3c"
                  : undefined,
              }}
            >
              {renderInputWithRequired(
                "referenceContact",
                "ФИО и номер телефона лица, к которому можно обратиться за рекомендацией",
                formData.referenceContact || "",
                (e) => handleInputChange("referenceContact", e.target.value),
                undefined
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default WorkExperienceTable
