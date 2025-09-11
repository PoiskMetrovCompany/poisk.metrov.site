"use client"

import React, { FC } from "react"

interface ICourseDataTableProps {
  index: number
  formData: Record<string, any>
  setFormData: (
    updater: (prev: Record<string, any>) => Record<string, any>
  ) => void
}

const CourseDataTable: FC<ICourseDataTableProps> = ({
  index,
  formData,
  setFormData,
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

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (name: string, value: string) => {
    const formattedValue = formatDate(value)
    handleInputChange(name, formattedValue)
  }

  return (
    <div
      className="formRow table-container"
      style={{
        opacity: 1,
        transform: "translateY(0)",
        maxHeight: "220px",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <table className="inputTable">
        <caption className="tableLabel">Данные о пройденном курсе</caption>
        <tbody>
          <tr>
            <td colSpan={2}>
              <input
                type="text"
                name={`courseName${index}`}
                placeholder="Полное наименование учебного заведения"
                value={formData[`courseName${index}`] || ""}
                onChange={(e) =>
                  handleInputChange(`courseName${index}`, e.target.value)
                }
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <input
                type="text"
                name={`courseTitle${index}`}
                placeholder="Названия курса/тренинга"
                value={formData[`courseTitle${index}`] || ""}
                onChange={(e) =>
                  handleInputChange(`courseTitle${index}`, e.target.value)
                }
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="text"
                name={`courseStartDate${index}`}
                placeholder="01.01.2020"
                maxLength={10}
                value={formData[`courseStartDate${index}`] || ""}
                onChange={(e) =>
                  handleDateChange(`courseStartDate${index}`, e.target.value)
                }
              />
            </td>
            <td>
              <input
                type="text"
                name={`courseEndDate${index}`}
                placeholder="01.01.2021"
                maxLength={10}
                value={formData[`courseEndDate${index}`] || ""}
                onChange={(e) =>
                  handleDateChange(`courseEndDate${index}`, e.target.value)
                }
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default CourseDataTable
