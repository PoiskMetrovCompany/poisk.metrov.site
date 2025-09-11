"use client"

import React, { useEffect, useState } from "react"

import Image from "next/image"

import styles from "./candidateLoginComponents.module.css"
import formStyles from "./showForm.module.scss"

import BigHeader from "./bigHeader"

interface SelectOption {
  value: string
  text: string
}

interface CandidateData {
  id: string
  last_name: string
  first_name: string
  middle_name?: string
  birth_date?: string
  country_birth?: string
  city_birth?: string
  mobile_phone_candidate?: string
  home_phone_candidate?: string
  mail_candidate?: string
  inn?: string
  level_educational?: string
  educational_institution?: string
  courses?: string
  organization_name?: string
  organization_phone?: string
  field_of_activity?: string
  organization_address?: string
  organization_job_title?: string
  organization_price?: string
  date_of_hiring?: string
  date_of_dismissal?: string
  reason_for_dismissal?: string
  recommendation_contact?: string
  passport_series?: string
  passport_number?: string
  passport_issued_date?: string
  passport_issued?: string
  permanent_registration_address?: string
  temporary_registration_address?: string
  actual_residence_address?: string
  marital_statuses?: {
    attributes?: {
      title?: string
    }
  }
  family_partner?: Array<{
    full_name?: string
    birth_date?: string
    phone?: string
    work_study_place?: string
    residence_address?: string
  }>
  adult_children?: Array<{
    full_name?: string
    birth_date?: string
    phone?: string
    work_study_place?: string
    residence_address?: string
  }>
  adult_family_members?: Array<{
    relationship_and_name?: string
    birth_date?: string
    phone?: string
    work_study_place?: string
    residence_address?: string
  }>
  serviceman?: boolean
  law_breaker?: string
  legal_entity?: string
  status?: string
  comment?: string
  created_at?: string
  vacancy?: {
    attributes?: {
      title?: string
    }
  }
  reason_for_changing_surnames?: string
}

interface ShowFormProps {
  vacancyKey: string
  setSelectedVacancyKey: (key: string | null) => void
  selectedCity: string
}

const ShowForm: React.FC<ShowFormProps> = ({
  vacancyKey,
  setSelectedVacancyKey,
  selectedCity,
}) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<SelectOption>({
    value: "new",
    text: "Новая анкета",
  })
  const [commentValue, setCommentValue] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)

  const [candidateData, setCandidateData] = useState<CandidateData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  const selectOptions: SelectOption[] = [
    { value: "new", text: "Новая анкета" },
    { value: "needs-work", text: "Нужна доработка" },
    { value: "checked", text: "Проверен" },
    { value: "rejected", text: "Отклонен" },
  ]

  useEffect(() => {
    const applyStyles = (element: Element) => {
      // Применяем стили к main
      const mainElement =
        element.tagName === "MAIN"
          ? (element as HTMLElement)
          : element.querySelector("main")
      if (mainElement) {
        mainElement.style.setProperty("width", "100%", "important")
        console.log("✅ Стили применены к main")
      }

      // Применяем стили к section
      const sectionElement =
        element.tagName === "SECTION"
          ? (element as HTMLElement)
          : element.querySelector("section")
      if (sectionElement) {
        sectionElement.style.removeProperty("max-width")
        console.log("✅ Стили применены к section")
      }
    }

    // Пробуем найти и применить стили к уже существующим элементам
    const existingMain = document.querySelector("main")
    const existingSection = document.querySelector("section")

    if (existingMain) {
      applyStyles(existingMain)
    }

    if (existingSection && !existingMain) {
      applyStyles(existingSection)
    }

    // Если элементы не найдены, используем MutationObserver
    if (!existingMain || !existingSection) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element

              // Проверяем main
              if (element.tagName === "MAIN" || element.querySelector("main")) {
                applyStyles(element)
              }

              // Проверяем section
              if (
                element.tagName === "SECTION" ||
                element.querySelector("section")
              ) {
                applyStyles(element)
              }
            }
          })
        })
      })

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      })

      return () => {
        observer.disconnect()

        // Очистка стилей при размонтировании
        const mainElement = document.querySelector("main")
        const sectionElement = document.querySelector("section")

        if (mainElement) {
          mainElement.style.removeProperty("width")
          console.log("🔄 Стили удалены с main")
        }

        if (sectionElement) {
          // Не восстанавливаем max-width, так как мы его удаляли
          sectionElement.style.removeProperty("width")
          console.log("🔄 Стили удалены с section")
        }
      }
    }

    return () => {
      // Очистка стилей при размонтировании
      const mainElement = document.querySelector("main")
      const sectionElement = document.querySelector("section")

      if (mainElement) {
        mainElement.style.removeProperty("width")
        console.log("🔄 Стили удалены с main")
      }

      if (sectionElement) {
        sectionElement.style.removeProperty("width")
        console.log("🔄 Стили удалены с section")
      }
    }
  }, [])

  // Альтернативный вариант с несколькими попытками (более простой):
  useEffect(() => {
    let attempts = 0
    const maxAttempts = 10

    const tryApplyStyles = () => {
      const mainElement = document.querySelector("main")
      const sectionElement = document.querySelector("section")
      let success = false

      if (mainElement) {
        mainElement.style.setProperty("width", "100%", "important")
        console.log("✅ Стили применены к main")
        success = true
      }

      if (sectionElement) {
        sectionElement.style.removeProperty("max-width")
        console.log("✅ Стили применены к section")
        success = true
      }

      return success
    }

    const intervalId = setInterval(() => {
      attempts++
      console.log(`🔍 Попытка ${attempts} найти main и section...`)

      if (tryApplyStyles() || attempts >= maxAttempts) {
        clearInterval(intervalId)
        if (attempts >= maxAttempts) {
          console.log("❌ Элементы не найдены после", maxAttempts, "попыток")
        }
      }
    }, 50)

    return () => {
      clearInterval(intervalId)

      const mainElement = document.querySelector("main")
      const sectionElement = document.querySelector("section")

      if (mainElement) {
        mainElement.style.removeProperty("width")
      }

      if (sectionElement) {
        sectionElement.style.removeProperty("width")
      }
    }
  }, [])

  const handleLogout = () => {
    document.cookie =
      "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    window.location.reload()
  }

  // Функция для получения CSRF токена
  const getCsrfToken = () => {
    const metaTag = document.querySelector('meta[name="csrf-token"]')
    if (metaTag) {
      return metaTag.getAttribute("content")
    }

    const cookies = document.cookie.split(";")
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split("=")
      if (name === "XSRF-TOKEN") {
        return decodeURIComponent(value)
      }
    }

    return "Zva2RlvTSh5wTQogjJMfE8v5ObQoOSIcL40Xwc5d"
  }

  // Функция для получения access token из cookies
  const getAccessToken = () => {
    const cookies = document.cookie.split(";")
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split("=")
      if (name === "access_token") {
        return value
      }
    }
    return null
  }

  // Функция для парсинга JSON строк
  const parseJsonField = (jsonString?: string): any[] => {
    if (!jsonString || jsonString === null || jsonString === "null") return []
    try {
      const parsed = JSON.parse(jsonString)
      return Array.isArray(parsed) ? parsed : []
    } catch (error) {
      console.error("Ошибка парсинга JSON:", error)
      return []
    }
  }

  // Функция для загрузки данных кандидата
  const fetchCandidateData = async () => {
    if (!vacancyKey) {
      setError("Ключ кандидата не передан")
      setIsLoading(false)
      return
    }

    const accessToken = getAccessToken()
    if (!accessToken) {
      console.log("Access token не найден, используем mock-данные")
      setMockData()
      setIsLoading(false) // Добавляем эту строку
      return // Важно: завершаем выполнение функции здесь
    }

    setIsLoading(true)
    setError("")

    try {
      const csrfToken = getCsrfToken()

      const headers: Record<string, string> = {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }

      if (csrfToken) {
        headers["X-CSRF-TOKEN"] = csrfToken
      }

      const response = await fetch(
        `/api/v1/candidates/read?key=${vacancyKey}`,
        {
          method: "GET",
          headers: headers,
        }
      )

      if (response.ok) {
        const result = await response.json()

        if (result.response && result.attributes) {
          const data = Array.isArray(result.attributes.data)
            ? result.attributes.data[0]
            : result.attributes
          setCandidateData(data)

          // Устанавливаем текущий статус в селектор
          const currentStatus = data.status
          const statusOption = selectOptions.find((option) => {
            const statusMap: Record<string, string> = {
              new: "Новая анкета",
              "needs-work": "Нужна доработка",
              checked: "Проверен",
              rejected: "Отклонен",
            }
            return statusMap[option.value] === currentStatus
          })

          if (statusOption) {
            setSelectedOption(statusOption)
          }

          if (data.comment) {
            setCommentValue(data.comment)
          }
        } else {
          throw new Error("Неверный формат ответа сервера")
        }
      } else {
        throw new Error(`Ошибка ${response.status}`)
      }
    } catch (error) {
      console.error("Ошибка при получении данных кандидата:", error)
      console.log("Используем mock-данные для разработки")
      setMockData()
    } finally {
      setIsLoading(false)
    }
  }

  // Добавьте эту новую функцию для установки mock-данных:
  const setMockData = () => {
    console.log("Устанавливаем mock-данные...")

    const mockData: CandidateData = {
      id: "1",
      last_name: "Иванов",
      first_name: "Иван",
      middle_name: "Иванович",
      birth_date: "1990-05-15",
      country_birth: "Россия",
      city_birth: "Новосибирск",
      mobile_phone_candidate: "+7(999)123-45-67",
      home_phone_candidate: "123-456",
      mail_candidate: "ivanov@example.com",
      inn: "123456789012",
      level_educational: "Высшее",
      educational_institution: JSON.stringify([
        {
          institution_name: "НГУ",
          start_date: "2008-09-01",
          end_date: "2012-06-30",
          education_type: "Очная",
          specialty: "Программная инженерия",
        },
      ]),
      courses: JSON.stringify([
        {
          institution_name: "IT Academy",
          course_name: "React разработка",
          start_date: "2023-01-15",
          end_date: "2023-03-15",
        },
      ]),
      organization_name: 'ООО "Технологии"',
      organization_phone: "+7(383)555-0123",
      field_of_activity: "IT разработка",
      organization_address: "г. Новосибирск, ул. Ленина, 1",
      organization_job_title: "Frontend разработчик",
      organization_price: "120000",
      date_of_hiring: "2020-03-01",
      date_of_dismissal: "2024-12-31",
      reason_for_dismissal: "По собственному желанию",
      recommendation_contact: "Петров П.П. +7(999)888-77-66",
      passport_series: "1234",
      passport_number: "567890",
      passport_issued_date: "2010-05-15",
      passport_issued: "ОУФМС России по Новосибирской области",
      permanent_registration_address: "г. Новосибирск, ул. Мира, 10, кв. 5",
      temporary_registration_address: "",
      actual_residence_address: "г. Новосибирск, ул. Мира, 10, кв. 5",
      marital_statuses: {
        attributes: {
          title: "Женат/Замужем",
        },
      },
      family_partner: [
        {
          full_name: "Иванова Мария Петровна",
          birth_date: "1992-08-20",
          phone: "+7(999)111-22-33",
          work_study_place: 'ООО "Дизайн Студия"',
          residence_address: "г. Новосибирск, ул. Мира, 10, кв. 5",
        },
      ],
      adult_children: [
        {
          full_name: "Иванов Дмитрий Иванович",
          birth_date: "2005-12-10",
          phone: "+7(999)444-55-66",
          work_study_place: "Школа №15",
          residence_address: "г. Новосибирск, ул. Мира, 10, кв. 5",
        },
      ],
      adult_family_members: [
        {
          relationship_and_name: "Отец, Иванов Сергей Петрович",
          birth_date: "1965-03-12",
          phone: "+7(999)777-88-99",
          work_study_place: "Пенсионер",
          residence_address: "г. Новосибирск, ул. Советская, 25",
        },
      ],
      serviceman: true,
      law_breaker: "Нет",
      legal_entity: "Нет",
      status: "Новая анкета",
      comment: "Тестовый комментарий для демонстрации",
      created_at: "2025-01-15T14:30:00Z",
      vacancy: {
        attributes: {
          title: "Frontend разработчик React",
        },
      },
      reason_for_changing_surnames: "",
    }

    setCandidateData(mockData)
    console.log("Mock-данные установлены:", mockData)

    // Устанавливаем соответствующий статус
    const statusOption = selectOptions.find((option) => option.value === "new")
    if (statusOption) {
      setSelectedOption(statusOption)
    }

    setCommentValue(mockData.comment || "")
    setError("")
  }

  // Загружаем данные при монтировании компонента
  useEffect(() => {
    console.log("UseEffect запущен, vacancyKey:", vacancyKey)
    if (vacancyKey) {
      fetchCandidateData()
    } else {
      console.log("vacancyKey не передан")
      setError("Ключ кандидата не передан")
      setIsLoading(false)
    }
  }, [vacancyKey])

  // Функция для преобразования значения статуса в точно такой же формат как в API
  const mapStatusForAPI = (statusValue: string) => {
    const statusMap: Record<string, string> = {
      new: "Новая анкета",
      "needs-work": "Нужна доработка",
      checked: "Проверен",
      rejected: "Отклонен",
    }
    return statusMap[statusValue] || statusValue
  }

  // Функция для отправки запроса обновления статуса
  const updateCandidateStatus = async (newStatus: string) => {
    const accessToken = getAccessToken()

    if (!accessToken) {
      console.error("Access token не найден в cookies")
      return false
    }

    if (!vacancyKey) {
      console.error("Ключ кандидата не передан в props")
      return false
    }

    setIsUpdating(true)

    const mappedStatus = mapStatusForAPI(newStatus)
    const requestData = {
      key: vacancyKey,
      status: mappedStatus,
      comment: commentValue || "",
      city_work: selectedCity || "Новосибирск",
    }

    console.log("=== НАЧАЛО ЗАПРОСА ОБНОВЛЕНИЯ СТАТУСА ===")
    console.log("vacancyKey:", vacancyKey)
    console.log("newStatus (original):", newStatus)
    console.log("mappedStatus:", mappedStatus)
    console.log("requestData:", requestData)

    try {
      const csrfToken = getCsrfToken()
      const headers: Record<string, string> = {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }

      if (csrfToken) {
        headers["X-CSRF-TOKEN"] = csrfToken
      }

      const response = await fetch("/api/v1/candidates/update", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestData),
      })

      if (response.ok) {
        const result = await response.json()
        console.log("✅ Статус успешно обновлен:", result)
        return true
      } else {
        const errorText = await response.text()
        console.error(
          "❌ Ошибка при обновлении статуса:",
          response.status,
          errorText
        )
        return false
      }
    } catch (error) {
      console.error("=== ОШИБКА ЗАПРОСА ===")
      console.error("Ошибка:", error)
      return false
    } finally {
      setIsUpdating(false)
    }
  }

  const handleSelectToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsSelectOpen(!isSelectOpen)
  }

  const handleOptionSelect = async (option: SelectOption) => {
    if (selectedOption.value !== option.value) {
      const success = await updateCandidateStatus(option.value)

      if (success) {
        setSelectedOption(option)
        console.log("Статус изменен на:", option.text)
      } else {
        console.error("Не удалось обновить статус")
      }
    }

    setIsSelectOpen(false)
  }

  const handleCityChange = (city: string) => {
    console.log("Город изменен на:", city)
  }

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue(e.target.value)
  }

  const handleAddComment = async () => {
    if (!commentValue.trim()) {
      console.warn("Комментарий пустой, отправка не требуется")
      return
    }

    const accessToken = getAccessToken()

    if (!accessToken) {
      console.error("Access token не найден в cookies")
      return
    }

    if (!vacancyKey) {
      console.error("Ключ кандидата не передан в props")
      return
    }

    const requestData = {
      key: vacancyKey,
      status: "",
      comment: commentValue.trim(),
      city_work: selectedCity || "Новосибирск",
    }

    try {
      const csrfToken = getCsrfToken()
      const headers: Record<string, string> = {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }

      if (csrfToken) {
        headers["X-CSRF-TOKEN"] = csrfToken
      }

      const response = await fetch("/api/v1/candidates/update", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestData),
      })

      if (response.ok) {
        const result = await response.json()
        console.log("✅ Комментарий успешно отправлен:", result)
        setCommentValue("")
      } else {
        const errorText = await response.text()
        console.error(
          "❌ Ошибка при отправке комментария:",
          response.status,
          errorText
        )
      }
    } catch (error) {
      console.error("=== ОШИБКА ОТПРАВКИ КОММЕНТАРИЯ ===")
      console.error("Ошибка:", error)
    }
  }

  const getStatusClass = (statusText: string) => {
    console.log(statusText + " СТАТУС")
    switch (statusText) {
      case "Новая анкета":
        return "status-new"
      case "Проверен":
        return "status-checked"
      case "Нужна доработка":
        return "status-needRevision"
      case "Отклонен":
        return "status-rejected"
      default:
        return "status-new" // по умолчанию
    }
  }

  // Функции для форматирования данных
  const formatDate = (dateString?: string) => {
    if (!dateString) return ""
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("ru-RU")
    } catch {
      return dateString
    }
  }

  const formatPhone = (phone?: string) => {
    if (!phone) return ""
    return phone
  }

  // Закрытие селектора при клике вне его
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isSelectOpen && !(e.target as HTMLElement).closest("#customSelect")) {
        setIsSelectOpen(false)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSelectOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("click", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isSelectOpen])

  // Показываем загрузку
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <p>Загрузка данных кандидата...</p>
      </div>
    )
  }

  // Показываем ошибку
  if (error) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <p style={{ color: "red", marginBottom: "20px" }}>Ошибка: {error}</p>
        <button
          onClick={() => {
            setSelectedVacancyKey(null)
            window.location.reload()
          }}
        >
          Вернуться к списку
        </button>
      </div>
    )
  }

  // Показываем сообщение, если данные не загружены
  if (!candidateData) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <p>Данные кандидата не найдены</p>
        <button onClick={() => setSelectedVacancyKey(null)}>
          Вернуться к списку
        </button>
      </div>
    )
  }

  // Парсим данные об образовании, курсах и работе
  const educationalInstitutions = parseJsonField(
    candidateData.educational_institution
  )
  const courses = parseJsonField(candidateData.courses)

  const hasPartner =
    candidateData.family_partner &&
    Array.isArray(candidateData.family_partner) &&
    candidateData.family_partner.length > 0

  const hasAdultChildren =
    candidateData.adult_children &&
    Array.isArray(candidateData.adult_children) &&
    candidateData.adult_children.length > 0

  const hasAdultFamilyMembers =
    candidateData.adult_family_members &&
    Array.isArray(candidateData.adult_family_members) &&
    candidateData.adult_family_members.length > 0

  return (
    <>
      <BigHeader onCityChange={handleCityChange} activePage="candidates" />
      <main style={{ marginTop: "5rem" }} className={formStyles.main}>
        <section className={formStyles.section}>
          <div className={`center-card big ${formStyles.centerCard}`}>
            <div className="fixedMenu">
              <div className="navArea">
                <div
                  className={`yellowSelect ${isSelectOpen ? "open" : ""} ${isUpdating ? "updating" : ""}`}
                  id="customSelect"
                >
                  <div
                    className={`select-trigger ${getStatusClass(selectedOption.text)}`}
                    id="selectTrigger"
                    onClick={handleSelectToggle}
                    style={{ opacity: isUpdating ? 0.6 : 1 }}
                  >
                    {selectedOption.text}
                    {isUpdating && (
                      <span style={{ marginLeft: "10px" }}>...</span>
                    )}
                    <div className="trigger-icons"></div>
                  </div>
                  <div
                    className={`select-dropdown ${getStatusClass(selectedOption.text)}`}
                    id="selectDropdown"
                  >
                    {selectOptions.map((option) => (
                      <div
                        key={option.value}
                        className={`select-option ${selectedOption.value === option.value ? "selected" : ""}`}
                        data-value={option.value}
                        onClick={() => handleOptionSelect(option)}
                        style={{
                          opacity: isUpdating ? 0.6 : 1,
                          pointerEvents: isUpdating ? "none" : "auto",
                        }}
                      >
                        {option.text}
                      </div>
                    ))}
                  </div>
                </div>
                <a className="#activeLink" href="#generalData">
                  Общие сведенья
                </a>
                <a href="#passportData">Паспортные данные</a>
                <a href="#familyData">Состав семьи</a>
                <a href="#legalData">Юридический статус</a>
              </div>
              <div
                className="navArea"
                style={{ marginTop: "3rem" }}
              >
                <textarea
                  name="comment"
                  id="commentArea"
                  placeholder="Написать комментарий"
                  value={commentValue}
                  onChange={handleCommentChange}
                ></textarea>
                <button id="addComment" onClick={handleAddComment}>
                  Оставить коментарий
                </button>
              </div>
            </div>
            <p
              style={{
                position: "absolute",
                top: "-3.7rem",
                left: "0",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                cursor: "pointer",
              }}
              onClick={() => setSelectedVacancyKey(null)}
            >
              <Image
                src="/images/icons/arrow-left.svg"
                alt="Back"
                width={16}
                height={16}
              />
              Вернуться к списку
            </p>

            <div className={`formRow ${formStyles.formRow}`} id="generalData">
              <h3
                style={{ width: "auto", display: "flex", alignItems: "center" }}
                className={formStyles.formRowH3}
              >
                {[
                  `${candidateData.last_name || ""} ${candidateData.first_name || ""} ${candidateData.middle_name || ""}`.trim(),
                  candidateData.birth_date
                    ? `${new Date().getFullYear() - new Date(candidateData.birth_date).getFullYear()} лет`
                    : "",
                ]
                  .filter(Boolean)
                  .join(",    ")}
              </h3>
            </div>
            <div className={`formRow ${formStyles.formRow}`} id="vacancyData">
              <h4
                style={{
                  width: "auto",
                  display: "flex",
                  alignItems: "center",
                  marginTop: "0",
                }}
                className={formStyles.formRowH4}
              >
                {candidateData.vacancy?.attributes?.title ||
                  "Вакансия не указана"}
              </h4>
            </div>
            <span id="line"></span>
            <div
              className={`formRow justify-space-between ${formStyles.formRow}`}
              id="submissionData"
            >
              <p style={{ fontSize: "16px" }} className={formStyles.formRowP}>
                Дата подачи
              </p>
              <p style={{ fontSize: "16px" }} className={formStyles.formRowP}>
                {formatDate(candidateData.created_at)}
              </p>
            </div>

            {candidateData.reason_for_changing_surnames && (
              <div
                id="surnameChangeReason"
                className="toggle-block"
                style={{ width: "100%" }}
              >
                <div className="formRow">
                  <div className="input-container">
                    <label
                      htmlFor="reasonOfChange"
                      id="formLabel"
                      className="formLabel"
                    >
                      Причина изменения фамилии
                    </label>
                    <input
                      type="text"
                      name="reasonOfChange"
                      id="reasonOfChange"
                      className="formInput big"
                      placeholder="Опишите, почему поменяли фамилию"
                      value={candidateData.reason_for_changing_surnames || ""}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            )}

            <div
              className={`formRow justify-space-between ${formStyles.formRow}`}
            >
              <div
                className={`input-container w-49 ${formStyles.inputContainer}`}
              >
                <label
                  htmlFor="birthDate"
                  id="formLabel"
                  className={`formLabel ${formStyles.formLabel}`}
                >
                  Дата рождения
                </label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="birthDate"
                  id="birthDate"
                  className={`formInput ${formStyles.formInput}`}
                  placeholder="01.01.1990"
                  value={formatDate(candidateData.birth_date)}
                  readOnly
                />
              </div>
              <div
                className={`input-container w-49 ${formStyles.inputContainer}`}
              >
                <label
                  htmlFor="birthPlace"
                  id="formLabel"
                  className={`formLabel ${formStyles.formLabel}`}
                >
                  Место рождения
                </label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="birthPlace"
                  id="birthPlace"
                  className={`formInput ${formStyles.formInput}`}
                  placeholder="Страна и город"
                  value={`${candidateData.country_birth || ""}, ${candidateData.city_birth || ""}`}
                  readOnly
                />
              </div>
            </div>
            <div
              className={`formRow justify-space-between ${formStyles.formRow}`}
            >
              <div
                className={`input-container w-49 ${formStyles.inputContainer}`}
              >
                <label
                  htmlFor="mobileNumber"
                  id="mobileNumber"
                  className={`formLabel ${formStyles.formLabel}`}
                >
                  Мобильный телефон
                </label>
                <input
                  style={{ width: "100%" }}
                  type="tel"
                  name="mobileNumber"
                  id="mobileNumber"
                  className={`formInput ${formStyles.formInput}`}
                  placeholder="+7(999)999-99-99"
                  value={formatPhone(candidateData.mobile_phone_candidate)}
                  readOnly
                />
              </div>
              <div
                className={`input-container w-49 ${formStyles.inputContainer}`}
              >
                <label
                  htmlFor="domesticNumber"
                  id="domesticNumber"
                  className={`formLabel ${formStyles.formLabel}`}
                >
                  Домашний телефон
                </label>
                <input
                  style={{ width: "100%" }}
                  type="tel"
                  name="domesticNumber"
                  id="domesticNumber"
                  className={`formInput ${formStyles.formInput}`}
                  placeholder="999 999"
                  value={formatPhone(candidateData.home_phone_candidate)}
                  readOnly
                />
              </div>
            </div>
            <div
              className={`formRow justify-space-between ${formStyles.formRow}`}
            >
              <div
                className={`input-container w-49 ${formStyles.inputContainer}`}
              >
                <label
                  htmlFor="email"
                  id="email"
                  className={`formLabel ${formStyles.formLabel}`}
                >
                  E-mail
                </label>
                <input
                  style={{ width: "100%" }}
                  type="email"
                  name="email"
                  id="email"
                  className={`formInput ${formStyles.formInput}`}
                  value={candidateData.mail_candidate || ""}
                  placeholder="example@gmail.com"
                  readOnly
                />
              </div>
              <div
                className={`input-container w-49 ${formStyles.inputContainer}`}
              >
                <label
                  htmlFor="INN"
                  id="INN"
                  className={`formLabel ${formStyles.formLabel}`}
                >
                  ИНН
                </label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="INN"
                  id="INN"
                  className={`formInput ${formStyles.formInput}`}
                  value={candidateData.inn || ""}
                  placeholder="123456789012"
                  readOnly
                />
              </div>
            </div>

            {/* Показываем раздел образования только если есть данные */}
            {(candidateData.level_educational ||
              educationalInstitutions.length > 0 ||
              courses.length > 0) && (
              <>
                <div
                  className={`formRow flex-direction-column ${formStyles.formRow}`}
                  style={{ marginTop: "50px" }}
                >
                  <h3 className={formStyles.formRowH3}>
                    Образование и профессиональный опыт
                  </h3>
                </div>

                {candidateData.level_educational && (
                  <div className={`formRow ${formStyles.formRow}`}>
                    <div
                      className={`input-container ${formStyles.inputContainer}`}
                    >
                      <label
                        htmlFor="educationLevel"
                        className={`formLabel ${formStyles.formLabel}`}
                      >
                        Уровень образования
                      </label>
                      <input
                        style={{ width: "100%" }}
                        type="text"
                        name="educationLevel"
                        id="educationLevel"
                        className={`formInput ${formStyles.formInput}`}
                        value={candidateData.level_educational || ""}
                        readOnly
                      />
                    </div>
                  </div>
                )}

                {/* Динамические данные об образовательных учреждениях */}
                {educationalInstitutions.length > 0 &&
                  educationalInstitutions.map(
                    (institution: any, index: number) => (
                      <div
                        key={index}
                        className={`formRow ${formStyles.formRow}`}
                      >
                        <table
                          className={`inputTable showTable ${formStyles.inputTable}`}
                        >
                          <tbody>
                            <tr>
                              <td colSpan={2}>
                                <input
                                  type="text"
                                  name={`nameInstitution${index + 1}`}
                                  placeholder="Полное наименование учебного заведения"
                                  value={institution?.institution_name || ""}
                                  readOnly
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <input
                                  type="text"
                                  name={`dateOfEntrance${index + 1}`}
                                  placeholder="Дата поступления"
                                  value={formatDate(institution?.start_date)}
                                  readOnly
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  name={`dateOfEnding${index + 1}`}
                                  placeholder="Дата окончания"
                                  value={formatDate(institution?.end_date)}
                                  readOnly
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <input
                                  type="text"
                                  name={`typeOfEducation${index + 1}`}
                                  placeholder="Форма обучения"
                                  value={institution?.education_type || ""}
                                  readOnly
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  name={`diplomaSpeciality${index + 1}`}
                                  placeholder="Специальность по диплому"
                                  value={institution?.specialty || ""}
                                  readOnly
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )
                  )}

                {/* Динамические данные о курсах */}
                {courses.length > 0 &&
                  courses.map((course: any, index: number) => (
                    <div
                      key={index}
                      className={`formRow ${formStyles.formRow}`}
                    >
                      <table
                        className={`inputTable showTable ${formStyles.inputTable}`}
                      >
                        <tbody>
                          <tr>
                            <td colSpan={2}>
                              <input
                                type="text"
                                name={`courseName${index + 1}`}
                                placeholder="Полное наименование учебного заведения"
                                value={course?.institution_name || ""}
                                readOnly
                              />
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}>
                              <input
                                type="text"
                                name={`courseTitle${index + 1}`}
                                placeholder="Название курса/тренинга"
                                value={course?.course_name || ""}
                                readOnly
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <input
                                type="text"
                                name={`courseStartDate${index + 1}`}
                                placeholder="Дата начала"
                                value={formatDate(course?.start_date)}
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name={`courseEndDate${index + 1}`}
                                placeholder="Дата окончания"
                                value={formatDate(course?.end_date)}
                                readOnly
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ))}

                <div className={`formRow ${formStyles.formRow}`}>
                  <div
                    className={`input-container ${formStyles.inputContainer}`}
                  >
                    <label
                      htmlFor="professionalExperience"
                      className={`formLabel ${formStyles.formLabel}`}
                    >
                      Профессиональный опыт
                    </label>
                    <input
                      style={{ width: "100%" }}
                      type="text"
                      name="professionalExperience"
                      id="professionalExperience"
                      className={`formInput ${formStyles.formInput}`}
                      value={
                        candidateData.organization_name
                          ? "Опыт есть"
                          : "Опыт отсутствует"
                      }
                      readOnly
                    />
                  </div>
                </div>
              </>
            )}

            {/* Динамические данные о последнем месте работы */}
            {candidateData.organization_name && (
              <div
                className={`formRow ${formStyles.formRow}`}
                style={{
                  opacity: 1,
                  height: "550px",
                  overflow: "hidden",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <table
                  className={`inputTable showTable ${formStyles.inputTable}`}
                  style={{ height: "auto", minHeight: "350px" }}
                >
                  <tbody>
                    <tr>
                      <td
                        style={{
                          borderTopLeftRadius: "16px",
                          borderTopRightRadius: 0,
                        }}
                      >
                        <input
                          type="text"
                          name="companyName"
                          placeholder="Полное наименование предприятия"
                          value={candidateData.organization_name || ""}
                          readOnly
                        />
                      </td>
                      <td
                        style={{
                          borderTopRightRadius: "16px",
                          borderTopLeftRadius: 0,
                        }}
                      >
                        <input
                          type="text"
                          name="companyPhone"
                          placeholder="Телефон предприятия"
                          value={candidateData.organization_phone || ""}
                          readOnly
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <input
                          type="text"
                          name="companyActivity"
                          placeholder="Сфера деятельности предприятия"
                          value={candidateData.field_of_activity || ""}
                          readOnly
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <input
                          type="text"
                          name="companyAddress"
                          placeholder="Адрес предприятия"
                          value={candidateData.organization_address || ""}
                          readOnly
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="text"
                          name="position"
                          placeholder="Должность"
                          value={candidateData.organization_job_title || ""}
                          readOnly
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="salary"
                          placeholder="Уровень заработной платы"
                          value={candidateData.organization_price || ""}
                          readOnly
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="text"
                          name="hireDate"
                          placeholder="Дата приема (месяц, год)"
                          value={formatDate(candidateData.date_of_hiring)}
                          readOnly
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="dismissalDate"
                          placeholder="Дата увольнения (месяц, год)"
                          value={formatDate(candidateData.date_of_dismissal)}
                          readOnly
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <input
                          type="text"
                          name="dismissalReason"
                          placeholder="Причина увольнения"
                          value={candidateData.reason_for_dismissal || ""}
                          readOnly
                        />
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={2}
                        style={{
                          borderBottomLeftRadius: "16px",
                          borderBottomRightRadius: "16px",
                        }}
                      >
                        <input
                          type="text"
                          name="referenceContact"
                          placeholder="ФИО и номер телефона лица, к которому можно обратиться за рекомендацией"
                          value={candidateData.recommendation_contact || ""}
                          readOnly
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            <div
              className={`formRow ${formStyles.formRow}`}
              style={{ marginTop: "50px" }}
              id="passportData"
            >
              <h3 className={formStyles.formRowH3}>Паспортные данные</h3>
            </div>

            <div
              className={`formRow justify-space-between ${formStyles.formRow}`}
            >
              <div
                className={`input-container w-49 ${formStyles.inputContainer}`}
              >
                <label
                  htmlFor="passwordSeriaNumber"
                  id="passwordSeriaNumber"
                  className={`formLabel ${formStyles.formLabel}`}
                >
                  Серия и номер
                </label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="passwordSeriaNumber"
                  id="passwordSeriaNumber"
                  className={`formInput ${formStyles.formInput}`}
                  placeholder="1234 567890"
                  value={`${candidateData.passport_series || ""} ${candidateData.passport_number || ""}`}
                  readOnly
                />
              </div>
              <div
                className={`input-container w-49 ${formStyles.inputContainer}`}
              >
                <label
                  htmlFor="dateOfIssue"
                  id="dateOfIssue"
                  className={`formLabel ${formStyles.formLabel}`}
                >
                  Дата выдачи
                </label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="dateOfIssue"
                  id="dateOfIssue"
                  className={`formInput ${formStyles.formInput}`}
                  placeholder="01.01.1990"
                  value={formatDate(candidateData.passport_issued_date)}
                  readOnly
                />
              </div>
            </div>
            <div className={`formRow ${formStyles.formRow}`}>
              <div className={`input-container ${formStyles.inputContainer}`}>
                <label
                  htmlFor="issuedBy"
                  id="issuedBy"
                  className={`formLabel ${formStyles.formLabel}`}
                >
                  Кем выдан
                </label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="issuedBy"
                  id="issuedBy"
                  className={`formInput ${formStyles.formInput}`}
                  placeholder="ОФУМС России"
                  value={candidateData.passport_issued || ""}
                  readOnly
                />
              </div>
            </div>
            <div className={`formRow ${formStyles.formRow}`}>
              <div className={`input-container ${formStyles.inputContainer}`}>
                <label
                  htmlFor="adressOfPermanentReg"
                  id="adressOfPermanentReg"
                  className={`formLabel ${formStyles.formLabel}`}
                >
                  Адрес постоянной регистрации
                </label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="adressOfPermanentReg"
                  id="adressOfPermanentReg"
                  className={`formInput ${formStyles.formInput}`}
                  placeholder="Адрес постоянной регистрации"
                  value={candidateData.permanent_registration_address || ""}
                  readOnly
                />
              </div>
            </div>
            <div className={`formRow ${formStyles.formRow}`}>
              <div className={`input-container ${formStyles.inputContainer}`}>
                <label
                  htmlFor="adressOfTemporaryReg"
                  id="adressOfTemporaryReg"
                  className={`formLabel ${formStyles.formLabel}`}
                >
                  Адрес временной регистрации
                </label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="adressOfTemporaryReg"
                  id="adressOfTemporaryReg"
                  className={`formInput ${formStyles.formInput}`}
                  placeholder="Адрес временной регистрации"
                  value={candidateData.temporary_registration_address || ""}
                  readOnly
                />
              </div>
            </div>
            <div className={`formRow ${formStyles.formRow}`}>
              <div className={`input-container ${formStyles.inputContainer}`}>
                <label
                  htmlFor="adressOfFactialLiving"
                  id="adressOfFactialLiving"
                  className={`formLabel ${formStyles.formLabel}`}
                >
                  Адрес фактического проживания
                </label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="adressOfFactialLiving"
                  id="adressOfFactialLiving"
                  className={`formInput ${formStyles.formInput}`}
                  placeholder="Адрес фактического проживания"
                  value={candidateData.actual_residence_address || ""}
                  readOnly
                />
              </div>
            </div>

            <div
              className={`formRow ${formStyles.formRow}`}
              style={{ marginTop: "50px" }}
              id="familyData"
            >
              <h3 className={formStyles.formRowH3}>Состав семьи</h3>
            </div>
            <div className={`formRow ${formStyles.formRow}`}>
              <div className={`input-container ${formStyles.inputContainer}`}>
                <label
                  htmlFor="maritalStatus"
                  id="maritalStatus"
                  className={`formLabel ${formStyles.formLabel}`}
                >
                  Семейное положение
                </label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="maritalStatus"
                  id="maritalStatus"
                  className={`formInput ${formStyles.formInput}`}
                  placeholder="Семейное положение"
                  value={
                    candidateData.marital_statuses?.attributes?.title || ""
                  }
                  readOnly
                />
              </div>
            </div>

            {hasPartner && candidateData.family_partner && (
              <div className={`formRow ${formStyles.formRow}`}>
                <table
                  className={`inputTable showTable ${formStyles.inputTable}`}
                >
                  <tbody>
                    <tr>
                      <td colSpan={2}>
                        <input
                          type="text"
                          name="FIOSuprug"
                          placeholder="ФИО супруга(-и)"
                          value={
                            candidateData.family_partner[0]?.full_name || ""
                          }
                          readOnly
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="text"
                          name="dateOfBirthTable"
                          placeholder="Дата рождения"
                          value={formatDate(
                            candidateData.family_partner[0]?.birth_date
                          )}
                          readOnly
                        />
                      </td>
                      <td>
                        <input
                          type="tel"
                          name="phoneNumberTable"
                          placeholder="Телефон"
                          value={candidateData.family_partner[0]?.phone || ""}
                          readOnly
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="text"
                          name="placeOfStudy"
                          placeholder="Место учебы/работы, рабочий телефон"
                          value={
                            candidateData.family_partner[0]?.work_study_place ||
                            ""
                          }
                          readOnly
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="placeOfLiving"
                          placeholder="Место проживания"
                          value={
                            candidateData.family_partner[0]
                              ?.residence_address || ""
                          }
                          readOnly
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {hasAdultChildren && candidateData.adult_children && (
              <>
                <div
                  className={`formRow flex-direction-column ${formStyles.formRow}`}
                >
                  <h3 className={formStyles.formRowH3}>
                    Данные совершеннолетнего ребенка
                  </h3>
                </div>
                <div className={`formRow ${formStyles.formRow}`}>
                  <div
                    className={`input-container ${formStyles.inputContainer}`}
                  >
                    <label
                      htmlFor="hasGraduatedChild"
                      id="hasGraduatedChild"
                      className={`formLabel ${formStyles.formLabel}`}
                    >
                      Наличие совершеннолетних детей
                    </label>
                    <input
                      style={{ width: "100%" }}
                      type="text"
                      name="hasGraduatedChild"
                      id="hasGraduatedChild"
                      className={`formInput ${formStyles.formInput}`}
                      value="Есть"
                      readOnly
                    />
                  </div>
                </div>
                {candidateData.adult_children.map((child, index) => (
                  <div
                    key={index}
                    id="doesHaveAdultChildren"
                    className={`toggle-block ${formStyles.toggleBlock}`}
                    style={{ width: "100%" }}
                  >
                    <div className={`formRow showTable ${formStyles.formRow}`}>
                      <table
                        className={`inputTable showTable ${formStyles.inputTable}`}
                      >
                        <tbody>
                          <tr>
                            <td colSpan={2}>
                              <input
                                type="text"
                                name={`FIOChildren${index + 1}`}
                                placeholder="ФИО ребенка"
                                value={child?.full_name || ""}
                                readOnly
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <input
                                type="text"
                                name={`dateOfBirthChildren${index + 1}`}
                                placeholder="Дата рождения"
                                value={formatDate(child?.birth_date)}
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                type="tel"
                                name={`phoneNumberChildren${index + 1}`}
                                placeholder="Телефон"
                                value={child?.phone || ""}
                                readOnly
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <input
                                type="text"
                                name={`placeOfStudyChildren${index + 1}`}
                                placeholder="Место учебы/работы, рабочий телефон"
                                value={child?.work_study_place || ""}
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name={`placeOfLivingChildren${index + 1}`}
                                placeholder="Место проживания"
                                value={child?.residence_address || ""}
                                readOnly
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </>
            )}

            {hasAdultFamilyMembers && candidateData.adult_family_members && (
              <>
                <div
                  className={`formRow flex-direction-column ${formStyles.formRow}`}
                >
                  <h3 className={formStyles.formRowH3}>
                    2. Члены семьи старше 18 лет
                  </h3>
                </div>

                {candidateData.adult_family_members.map((member, index) => (
                  <div
                    key={index}
                    id="doesHaveAdultRelative"
                    className={`toggle-block ${formStyles.toggleBlock}`}
                    style={{ width: "100%" }}
                  >
                    <div className={`formRow ${formStyles.formRow}`}>
                      <table
                        className={`inputTable showTable ${formStyles.inputTable}`}
                      >
                        <tbody>
                          <tr>
                            <td colSpan={2}>
                              <input
                                type="text"
                                name={`FIORelative${index + 1}`}
                                placeholder="Степень родства, ФИО члена семьи"
                                value={member?.relationship_and_name || ""}
                                readOnly
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <input
                                type="text"
                                name={`dateOfBirthRelative${index + 1}`}
                                placeholder="Дата рождения"
                                value={formatDate(member?.birth_date)}
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                type="tel"
                                name={`phoneNumberRelative${index + 1}`}
                                placeholder="Телефон"
                                value={member?.phone || ""}
                                readOnly
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <input
                                type="text"
                                name={`placeOfStudyRelative${index + 1}`}
                                placeholder="Место учебы/работы, рабочий телефон"
                                value={member?.work_study_place || ""}
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name={`placeOfLivingRelative${index + 1}`}
                                placeholder="Место проживания"
                                value={member?.residence_address || ""}
                                readOnly
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </>
            )}

            <div
              className={`formRow flex-direction-column ${formStyles.formRow}`}
              style={{ marginTop: "50px" }}
              id="legalData"
            >
              <h3 className={formStyles.formRowH3}>Юридический статус</h3>
            </div>
            <div className={`formRow ${formStyles.formRow}`}>
              <div className={`input-container ${formStyles.inputContainer}`}>
                <label
                  htmlFor="militaryDuty"
                  id="militaryDuty"
                  className={`formLabel ${formStyles.formLabel}`}
                >
                  Статус военнообязанного
                </label>
                <input
                  type="text"
                  name="militaryDuty"
                  id="militaryDuty"
                  className={`formInput big ${formStyles.formInput}`}
                  value={
                    candidateData.serviceman
                      ? "Является военнообязанным"
                      : "Не является военнообязанным"
                  }
                  readOnly
                />
              </div>
            </div>
            <div className={`formRow ${formStyles.formRow}`}>
              <div className={`input-container ${formStyles.inputContainer}`}>
                <label
                  htmlFor="reasonOfChange"
                  id="formLabel"
                  className={`formLabel ${formStyles.formLabel}`}
                >
                  Наличие уголовной или административной ответственности
                </label>
                <input
                  type="text"
                  name="reasonOfChange"
                  id="reasonOfChange"
                  className={`formInput big ${formStyles.formInput}`}
                  value={
                    candidateData.law_breaker !== "Нет" ? "Да, имеется" : "Нет"
                  }
                  readOnly
                />
              </div>
            </div>
            {candidateData.law_breaker &&
              candidateData.law_breaker !== "Нет" && (
                <div className={`formRow ${formStyles.formRow}`}>
                  <div
                    className={`input-container ${formStyles.inputContainer}`}
                  >
                    <label
                      htmlFor="whyPrisoner"
                      id="whyPrisoner"
                      className={`formLabel ${formStyles.formLabel}`}
                    >
                      Причины привлечения к уголовной или административной
                      ответственности
                    </label>
                    <input
                      type="text"
                      name="whyPrisoner"
                      id="whyPrisoner"
                      className={`formInput big ${formStyles.formInput}`}
                      value={candidateData.law_breaker || ""}
                      readOnly
                    />
                  </div>
                </div>
              )}
            <div className={`formRow ${formStyles.formRow}`}>
              <div className={`input-container ${formStyles.inputContainer}`}>
                <label
                  htmlFor="isLegalEntity"
                  id="isLegalEntity"
                  className={`formLabel ${formStyles.formLabel}`}
                >
                  Является или нет (со-)учредителем юридического лица
                </label>
                <input
                  type="text"
                  name="isLegalEntity"
                  id="isLegalEntity"
                  className={`formInput big ${formStyles.formInput}`}
                  value={candidateData.legal_entity !== "Нет" ? "Да" : "Нет"}
                  readOnly
                />
              </div>
            </div>
            {candidateData.legal_entity &&
              candidateData.legal_entity !== "Нет" && (
                <div className={`formRow ${formStyles.formRow}`}>
                  <div
                    className={`input-container ${formStyles.inputContainer}`}
                  >
                    <label
                      htmlFor="LegalEntityActivity"
                      id="LegalEntityActivity"
                      className={`formLabel ${formStyles.formLabel}`}
                    >
                      Вид деятельности юридического лица
                    </label>
                    <input
                      type="text"
                      name="LegalEntityActivity"
                      id="LegalEntityActivity"
                      className={`formInput big ${formStyles.formInput}`}
                      value={candidateData.legal_entity || ""}
                      readOnly
                    />
                  </div>
                </div>
              )}
          </div>
        </section>
      </main>
    </>
  )
}

export default ShowForm
