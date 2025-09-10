"use client"

import React, { useEffect, useState } from "react"

import Image from "next/image"

import { useApiMutation, useApiQuery } from "@/utils/hooks/use-api"

import styles from "./candidateLoginComponents.module.css"

import BigHeader from "./bigHeader"

interface SelectOption {
  value: string
  text: string
}

interface EducationalInstitution {
  institution_name?: string
  start_date?: string
  end_date?: string
  education_type?: string
  specialty?: string
}

interface Course {
  institution_name?: string
  course_name?: string
  start_date?: string
  end_date?: string
}

interface FamilyMember {
  full_name?: string
  birth_date?: string
  phone?: string
  work_study_place?: string
  residence_address?: string
}

interface AdultFamilyMember {
  relationship_and_name?: string
  birth_date?: string
  phone?: string
  work_study_place?: string
  residence_address?: string
}

interface ApiResponse {
  response?: boolean
  attributes?: CandidateData
}

interface CandidateData {
  id: string | number
  key?: string
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
    key?: string
    attributes?: {
      title?: string
    }
  }
  family_partner?: FamilyMember[] | FamilyMember
  adult_children?: FamilyMember[]
  adult_family_members?: AdultFamilyMember[]
  serviceman?: boolean | number
  law_breaker?: string
  legal_entity?: string
  status?: string
  comment?: string
  created_at?: string
  vacancy?: {
    key?: string
    attributes?: {
      title?: string
    }
  }
  reason_for_changing_surnames?: string
  city_work?: string
  is_data_processing?: boolean | number
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
  const [selectOptions, setSelectOptions] = useState<SelectOption[]>([])

  // Функция для получения токена из cookie
  const getAccessTokenFromCookie = (): string | null => {
    if (typeof document === "undefined") return null
    const cookies = document.cookie.split(";")
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split("=")
      if (name === "access_token") {
        return value
      }
    }
    return null
  }

  // Запрос для получения списка статусов
  const {
    data: statusesData,
    isLoading: isLoadingStatuses,
    error: statusesError,
  } = useApiQuery(
    ["candidate-statuses"],
    `${process.env.NEXT_PUBLIC_API_URL}/candidates/get-statuses`,
    {
      staleTime: 10 * 60 * 1000, // 10 минут
      retry: 2,
      useMock: !getAccessTokenFromCookie(),
      mockFn: async () => {
        console.log("Используем mock-данные для статусов")
        return [
          "Новая анкета",
          "Проверен",
          "Отклонен",
          "Нужна доработка",
          "Принят",
          "Не принят",
          "Вышел",
          "Не вышел",
        ]
      },
    }
  )

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
        sectionElement.style.setProperty("width", "50%", "important")
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
        sectionElement.style.setProperty("width", "50%", "important")
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

  // Функция для парсинга JSON строк
  const parseJsonField = <T,>(jsonString?: string): T[] => {
    if (!jsonString || jsonString === null || jsonString === "null") return []
    try {
      const parsed = JSON.parse(jsonString)
      return Array.isArray(parsed) ? parsed : []
    } catch (error) {
      console.error("Ошибка парсинга JSON:", error)
      return []
    }
  }

  const {
    data: candidateApiData,
    isLoading: isLoadingCandidate,
    error: candidateError,
  } = useApiQuery(
    ["candidate", vacancyKey],
    `${process.env.NEXT_PUBLIC_API_URL}/candidates/read?key=${encodeURIComponent(vacancyKey || "")}`,
    {
      enabled: !!vacancyKey,
      staleTime: 5 * 60 * 1000, // 5 минут
      retry: 2,
      useMock: !getAccessTokenFromCookie(),
      mockFn: async () => {
        console.log("Используем mock-данные для кандидата")
        setMockData()
        return null
      },
    }
  )

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
    } else if (selectOptions.length > 0) {
      // Если статус не найден, используем первый доступный
      setSelectedOption(selectOptions[0])
    }

    setCommentValue(mockData.comment || "")
  }

  // Обрабатываем данные статусов из API
  useEffect(() => {
    if (statusesData && Array.isArray(statusesData)) {
      console.log("Получены статусы от API:", statusesData)

      // Преобразуем массив строк в массив объектов SelectOption
      const options = statusesData.map((status: string) => ({
        value: getStatusValue(status),
        text: status,
      }))

      setSelectOptions(options)

      // Если у нас еще нет выбранного статуса, устанавливаем первый
      if (!selectedOption.value && options.length > 0) {
        setSelectedOption(options[0])
      }
    } else if (statusesError) {
      console.error("Ошибка при получении статусов:", statusesError)
      // Устанавливаем дефолтные статусы в случае ошибки
      const defaultOptions = [
        { value: "new", text: "Новая анкета" },
        { value: "needs-work", text: "Нужна доработка" },
        { value: "checked", text: "Проверен" },
        { value: "rejected", text: "Отклонен" },
      ]
      setSelectOptions(defaultOptions)
    }
  }, [statusesData, statusesError])

  // Функция для преобразования текста статуса в значение
  const getStatusValue = (statusText: string): string => {
    const statusMap: Record<string, string> = {
      "Новая анкета": "new",
      "Нужна доработка": "needs-work",
      Проверен: "checked",
      Отклонен: "rejected",
      Принят: "accepted",
      "Не принят": "not-accepted",
      Вышел: "started-working",
      "Не вышел": "not-started-working",
    }
    return (
      statusMap[statusText] || statusText.toLowerCase().replace(/\s+/g, "-")
    )
  }

  // Обрабатываем данные кандидата из API
  useEffect(() => {
    if (candidateApiData && typeof candidateApiData === "object") {
      const apiData = candidateApiData as ApiResponse
      console.log("Получены данные от API:", apiData)

      if (apiData.response && apiData.attributes) {
        // Данные находятся напрямую в attributes, а не в attributes.data
        const data = apiData.attributes

        console.log("Обрабатываем данные кандидата:", data)
        setCandidateData(data)

        // Устанавливаем текущий статус в селектор
        const currentStatus = data.status
        if (currentStatus) {
          const statusOption = selectOptions.find(
            (option) => option.text === currentStatus
          )

          if (statusOption) {
            setSelectedOption(statusOption)
          } else {
            // Если статус не найден в списке, создаем новый объект
            const newOption = {
              value: getStatusValue(currentStatus),
              text: currentStatus,
            }
            setSelectedOption(newOption)
          }
        }

        if (data.comment) {
          setCommentValue(data.comment)
        }
      }
    } else if (candidateError) {
      console.error("Ошибка при получении данных кандидата:", candidateError)
      setMockData() // Используем mock-данные в случае ошибки
    }
  }, [candidateApiData, candidateError, selectOptions])

  // Обрабатываем отсутствие vacancyKey
  useEffect(() => {
    if (!vacancyKey) {
      console.log("vacancyKey не передан")
      // vacancyKey обрабатывается в условии рендера компонента
    }
  }, [vacancyKey])

  // Функция для преобразования значения статуса в точно такой же формат как в API
  const mapStatusForAPI = (statusValue: string) => {
    const statusMap: Record<string, string> = {
      new: "Новая анкета",
      "needs-work": "Нужна доработка",
      checked: "Проверен",
      rejected: "Отклонен",
      accepted: "Принят",
      "not-accepted": "Не принят",
      "started-working": "Вышел",
      "not-started-working": "Не вышел",
    }
    return statusMap[statusValue] || statusValue
  }

  // Мутация для обновления статуса кандидата
  const updateCandidateMutation = useApiMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/candidates/update`,
    {
      onSuccess: (data) => {
        console.log("✅ Статус успешно обновлен:", data)
        setIsUpdating(false)
      },
      onError: (error) => {
        console.error("❌ Ошибка при обновлении статуса:", error)
        setIsUpdating(false)
      },
    }
  )

  // Мутация для обновления комментария кандидата
  const updateCommentMutation = useApiMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/candidates/update`,
    {
      onSuccess: (data) => {
        console.log("✅ Комментарий успешно отправлен:", data)
        setCommentValue("")
      },
      onError: (error) => {
        console.error("❌ Ошибка при отправке комментария:", error)
      },
    }
  )

  // Функция для отправки запроса обновления статуса
  const updateCandidateStatus = async (newStatus: string) => {
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
      await updateCandidateMutation.mutateAsync(requestData)
      return true
    } catch (error) {
      console.error("=== ОШИБКА ЗАПРОСА ===")
      console.error("Ошибка:", error)
      return false
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
      await updateCommentMutation.mutateAsync(requestData)
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
      case "Принят":
        return "status-accepted"
      case "Не принят":
        return "status-not"
      case "Вышел":
        return "status-startWorking"
      case "Не вышел":
        return "status-not"
      default:
        return "status-new" // по умолчанию
    }
  }

  // Функции для форматирования данных
  const formatDate = (dateString?: string) => {
    if (!dateString || dateString.trim() === "") return ""
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("ru-RU")
    } catch {
      return dateString
    }
  }

  const formatPhone = (phone?: string) => {
    if (!phone || phone.trim() === "") return ""
    return phone
  }

  const formatValue = (value?: string | number | boolean) => {
    if (value === null || value === undefined || value === "") return ""
    if (typeof value === "boolean") return value ? "Да" : "Нет"
    return String(value).trim()
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
  if (isLoadingCandidate) {
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
  if (candidateError) {
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
        <p style={{ color: "red", marginBottom: "20px" }}>
          Ошибка:{" "}
          {candidateError?.message || "Ошибка при загрузке данных кандидата"}
        </p>
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

  // Если данные кандидата еще не загружены, не рендерим основной контент
  if (!candidateData) {
    return (
      <>
        <BigHeader onCityChange={handleCityChange} activePage="candidates" />
        <main style={{ marginTop: "5rem" }}>
          <section>
            <div className="center-card big">
              <div style={{ textAlign: "center", padding: "20px" }}>
                Загрузка данных кандидата...
              </div>
            </div>
          </section>
        </main>
      </>
    )
  }

  // Парсим данные об образовании, курсах и работе
  const educationalInstitutions = parseJsonField<EducationalInstitution>(
    candidateData.educational_institution
  )
  const courses = parseJsonField<Course>(candidateData.courses)

  const hasPartner =
    candidateData.family_partner &&
    ((Array.isArray(candidateData.family_partner) &&
      candidateData.family_partner.length > 0) ||
      (!Array.isArray(candidateData.family_partner) &&
        candidateData.family_partner.full_name))

  const hasAdultChildren =
    candidateData.adult_children &&
    Array.isArray(candidateData.adult_children) &&
    candidateData.adult_children.length > 0

  const hasAdultFamilyMembers =
    candidateData.adult_family_members &&
    Array.isArray(candidateData.adult_family_members) &&
    candidateData.adult_family_members.length > 0

  // Проверяем наличие данных об образовании и курсах
  const hasEducationData =
    candidateData.level_educational ||
    (educationalInstitutions && educationalInstitutions.length > 0) ||
    (courses && courses.length > 0)

  // Проверяем наличие данных о работе
  const hasWorkExperience =
    candidateData.organization_name ||
    candidateData.organization_phone ||
    candidateData.field_of_activity ||
    candidateData.organization_address ||
    candidateData.organization_job_title ||
    candidateData.organization_price ||
    candidateData.date_of_hiring ||
    candidateData.date_of_dismissal ||
    candidateData.reason_for_dismissal ||
    candidateData.recommendation_contact

  return (
    <>
      <BigHeader onCityChange={handleCityChange} activePage="candidates" />
      <main style={{ marginTop: "5rem" }}>
        <section>
          <div className="center-card big">
            <div className="fixedMenu">
              <div className="navArea">
                <div
                  className={`yellowSelect ${isSelectOpen ? "open" : ""} ${isUpdating ? "updating" : ""} ${getStatusClass(selectedOption.text)}`}
                  id="customSelect"
                >
                  <div
                    className="select-trigger"
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
                  <div className="select-dropdown" id="selectDropdown">
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
              <div className="navArea" style={{ marginTop: "3rem" }}>
                <textarea
                  name="comment"
                  id="commentArea"
                  placeholder="Написать комментарий"
                  value={commentValue}
                  onChange={handleCommentChange}
                ></textarea>
                <button
                  style={{ marginTop: "20px" }}
                  id="addComment"
                  onClick={handleAddComment}
                >
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

            <div className="formRow justify-space-between" id="generalData">
              <h3
                style={{ width: "auto", display: "flex", alignItems: "center" }}
              >
                {[
                  `${formatValue(candidateData.last_name)} ${formatValue(candidateData.first_name)} ${formatValue(candidateData.middle_name)}`.trim(),
                  candidateData.birth_date
                    ? `${new Date().getFullYear() - new Date(candidateData.birth_date).getFullYear()} лет`
                    : "",
                ]
                  .filter(Boolean)
                  .join(",    ")}
              </h3>
              <p style={{ fontSize: "16px" }}>Дата подачи</p>
            </div>
            <span id="line"></span>
            <div
              className="formRow justify-space-between"
              style={{ marginTop: "0rem" }}
            >
              <h4
                style={{
                  width: "auto",
                  display: "flex",
                  alignItems: "center",
                  marginTop: "0",
                }}
              >
                {candidateData.vacancy?.attributes?.title ||
                  "Вакансия не указана"}
              </h4>
              <p style={{ fontSize: "16px" }}>
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

            <div className="formRow justify-space-between">
              <div className="input-container w-49">
                <label htmlFor="birthDate" id="formLabel" className="formLabel">
                  Дата рождения
                </label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="birthDate"
                  id="birthDate"
                  className="formInput"
                  placeholder="01.01.1990"
                  value={formatDate(candidateData.birth_date)}
                  readOnly
                />
              </div>
              <div className="input-container w-49">
                <label
                  htmlFor="birthPlace"
                  id="formLabel"
                  className="formLabel"
                >
                  Место рождения
                </label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="birthPlace"
                  id="birthPlace"
                  className="formInput"
                  placeholder="Страна и город"
                  value={`${candidateData.country_birth || ""}, ${candidateData.city_birth || ""}`}
                  readOnly
                />
              </div>
            </div>
            <div className="formRow justify-space-between">
              <div className="input-container w-49">
                <label
                  htmlFor="mobileNumber"
                  id="mobileNumber"
                  className="formLabel"
                >
                  Мобильный телефон
                </label>
                <input
                  style={{ width: "100%" }}
                  type="tel"
                  name="mobileNumber"
                  id="mobileNumber"
                  className="formInput"
                  placeholder="+7(999)999-99-99"
                  value={formatPhone(candidateData.mobile_phone_candidate)}
                  readOnly
                />
              </div>
              <div className="input-container w-49">
                <label
                  htmlFor="domesticNumber"
                  id="domesticNumber"
                  className="formLabel"
                >
                  Домашний телефон
                </label>
                <input
                  style={{ width: "100%" }}
                  type="tel"
                  name="domesticNumber"
                  id="domesticNumber"
                  className="formInput"
                  placeholder="999 999"
                  value={formatPhone(candidateData.home_phone_candidate)}
                  readOnly
                />
              </div>
            </div>
            <div className="formRow justify-space-between">
              <div className="input-container w-49">
                <label htmlFor="email" id="email" className="formLabel">
                  E-mail
                </label>
                <input
                  style={{ width: "100%" }}
                  type="email"
                  name="email"
                  id="email"
                  className="formInput"
                  value={candidateData.mail_candidate || ""}
                  placeholder="example@gmail.com"
                  readOnly
                />
              </div>
              <div className="input-container w-49">
                <label htmlFor="INN" id="INN" className="formLabel">
                  ИНН
                </label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="INN"
                  id="INN"
                  className="formInput"
                  value={candidateData.inn || ""}
                  placeholder="123456789012"
                  readOnly
                />
              </div>
            </div>

            {/* Показываем раздел образования только если есть данные */}
            {hasEducationData && (
              <>
                <div
                  className="formRow flex-direction-column"
                  style={{ marginTop: "50px" }}
                >
                  <h3>Образование и профессиональный опыт</h3>
                </div>

                {candidateData.level_educational &&
                  candidateData.level_educational.trim() && (
                    <div className="formRow">
                      <div className="input-container">
                        <label htmlFor="educationLevel" className="formLabel">
                          Уровень образования
                        </label>
                        <input
                          style={{ width: "100%" }}
                          type="text"
                          name="educationLevel"
                          id="educationLevel"
                          className="formInput"
                          value={candidateData.level_educational || ""}
                          readOnly
                        />
                      </div>
                    </div>
                  )}

                {/* Динамические данные об образовательных учреждениях */}
                {educationalInstitutions.length > 0 &&
                  educationalInstitutions.map(
                    (institution: EducationalInstitution, index: number) => (
                      <div key={index} className="formRow">
                        <table className="inputTable showTable">
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
                  courses.map((course: Course, index: number) => (
                    <div key={index} className="formRow">
                      <table className="inputTable showTable">
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

                <div className="formRow">
                  <div className="input-container">
                    <label
                      htmlFor="professionalExperience"
                      className="formLabel"
                    >
                      Профессиональный опыт
                    </label>
                    <input
                      style={{ width: "100%" }}
                      type="text"
                      name="professionalExperience"
                      id="professionalExperience"
                      className="formInput"
                      value={
                        hasWorkExperience ? "Опыт есть" : "Опыт отсутствует"
                      }
                      readOnly
                    />
                  </div>
                </div>
              </>
            )}

            {/* Динамические данные о последнем месте работы */}
            {hasWorkExperience && (
              <div
                className="formRow"
                style={{
                  opacity: 1,
                  height: "550px",
                  overflow: "hidden",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <table
                  className="inputTable showTable"
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
              className="formRow"
              style={{ marginTop: "50px" }}
              id="passportData"
            >
              <h3>Паспортные данные</h3>
            </div>

            <div className="formRow justify-space-between">
              <div className="input-container w-49">
                <label
                  htmlFor="passwordSeriaNumber"
                  id="passwordSeriaNumber"
                  className="formLabel"
                >
                  Серия и номер
                </label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="passwordSeriaNumber"
                  id="passwordSeriaNumber"
                  className="formInput"
                  placeholder="1234 567890"
                  value={`${candidateData.passport_series || ""} ${candidateData.passport_number || ""}`}
                  readOnly
                />
              </div>
              <div className="input-container w-49">
                <label
                  htmlFor="dateOfIssue"
                  id="dateOfIssue"
                  className="formLabel"
                >
                  Дата выдачи
                </label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="dateOfIssue"
                  id="dateOfIssue"
                  className="formInput"
                  placeholder="01.01.1990"
                  value={formatDate(candidateData.passport_issued_date)}
                  readOnly
                />
              </div>
            </div>
            <div className="formRow">
              <div className="input-container">
                <label htmlFor="issuedBy" id="issuedBy" className="formLabel">
                  Кем выдан
                </label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="issuedBy"
                  id="issuedBy"
                  className="formInput"
                  placeholder="ОФУМС России"
                  value={candidateData.passport_issued || ""}
                  readOnly
                />
              </div>
            </div>
            <div className="formRow">
              <div className="input-container">
                <label
                  htmlFor="adressOfPermanentReg"
                  id="adressOfPermanentReg"
                  className="formLabel"
                >
                  Адрес постоянной регистрации
                </label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="adressOfPermanentReg"
                  id="adressOfPermanentReg"
                  className="formInput"
                  placeholder="Адрес постоянной регистрации"
                  value={candidateData.permanent_registration_address || ""}
                  readOnly
                />
              </div>
            </div>
            <div className="formRow">
              <div className="input-container">
                <label
                  htmlFor="adressOfTemporaryReg"
                  id="adressOfTemporaryReg"
                  className="formLabel"
                >
                  Адрес временной регистрации
                </label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="adressOfTemporaryReg"
                  id="adressOfTemporaryReg"
                  className="formInput"
                  placeholder="Адрес временной регистрации"
                  value={candidateData.temporary_registration_address || ""}
                  readOnly
                />
              </div>
            </div>
            <div className="formRow">
              <div className="input-container">
                <label
                  htmlFor="adressOfFactialLiving"
                  id="adressOfFactialLiving"
                  className="formLabel"
                >
                  Адрес фактического проживания
                </label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="adressOfFactialLiving"
                  id="adressOfFactialLiving"
                  className="formInput"
                  placeholder="Адрес фактического проживания"
                  value={candidateData.actual_residence_address || ""}
                  readOnly
                />
              </div>
            </div>

            <div
              className="formRow"
              style={{ marginTop: "50px" }}
              id="familyData"
            >
              <h3>Состав семьи</h3>
            </div>
            <div className="formRow">
              <div className="input-container">
                <label
                  htmlFor="maritalStatus"
                  id="maritalStatus"
                  className="formLabel"
                >
                  Семейное положение
                </label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="maritalStatus"
                  id="maritalStatus"
                  className="formInput"
                  placeholder="Семейное положение"
                  value={
                    candidateData.marital_statuses?.attributes?.title || ""
                  }
                  readOnly
                />
              </div>
            </div>

            {hasPartner && candidateData.family_partner && (
              <div className="formRow">
                <table className="inputTable showTable">
                  <tbody>
                    <tr>
                      <td colSpan={2}>
                        <input
                          type="text"
                          name="FIOSuprug"
                          placeholder="ФИО супруга(-и)"
                          value={
                            Array.isArray(candidateData.family_partner)
                              ? candidateData.family_partner[0]?.full_name || ""
                              : candidateData.family_partner?.full_name || ""
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
                            Array.isArray(candidateData.family_partner)
                              ? candidateData.family_partner[0]?.birth_date
                              : candidateData.family_partner?.birth_date
                          )}
                          readOnly
                        />
                      </td>
                      <td>
                        <input
                          type="tel"
                          name="phoneNumberTable"
                          placeholder="Телефон"
                          value={
                            Array.isArray(candidateData.family_partner)
                              ? candidateData.family_partner[0]?.phone || ""
                              : candidateData.family_partner?.phone || ""
                          }
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
                            Array.isArray(candidateData.family_partner)
                              ? candidateData.family_partner[0]
                                  ?.work_study_place || ""
                              : candidateData.family_partner
                                  ?.work_study_place || ""
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
                            Array.isArray(candidateData.family_partner)
                              ? candidateData.family_partner[0]
                                  ?.residence_address || ""
                              : candidateData.family_partner
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
                <div className="formRow flex-direction-column">
                  <h3>Данные совершеннолетнего ребенка</h3>
                </div>
                <div className="formRow">
                  <div className="input-container">
                    <label
                      htmlFor="hasGraduatedChild"
                      id="hasGraduatedChild"
                      className="formLabel"
                    >
                      Наличие совершеннолетних детей
                    </label>
                    <input
                      style={{ width: "100%" }}
                      type="text"
                      name="hasGraduatedChild"
                      id="hasGraduatedChild"
                      className="formInput"
                      value="Есть"
                      readOnly
                    />
                  </div>
                </div>
                {candidateData.adult_children.map((child, index) => (
                  <div
                    key={index}
                    id="doesHaveAdultChildren"
                    className="toggle-block"
                    style={{ width: "100%" }}
                  >
                    <div className="formRow showTable">
                      <table className="inputTable showTable">
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
                <div className="formRow flex-direction-column">
                  <h3>2. Члены семьи старше 18 лет</h3>
                </div>

                {candidateData.adult_family_members.map((member, index) => (
                  <div
                    key={index}
                    id="doesHaveAdultRelative"
                    className="toggle-block"
                    style={{ width: "100%" }}
                  >
                    <div className="formRow">
                      <table className="inputTable showTable">
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
              className="formRow flex-direction-column"
              style={{ marginTop: "50px" }}
              id="legalData"
            >
              <h3>Юридический статус</h3>
            </div>
            <div className="formRow">
              <div className="input-container">
                <label
                  htmlFor="militaryDuty"
                  id="militaryDuty"
                  className="formLabel"
                >
                  Статус военнообязанного
                </label>
                <input
                  type="text"
                  name="militaryDuty"
                  id="militaryDuty"
                  className="formInput big"
                  value={
                    candidateData.serviceman === 1 ||
                    candidateData.serviceman === true
                      ? "Является военнообязанным"
                      : "Не является военнообязанным"
                  }
                  readOnly
                />
              </div>
            </div>
            <div className="formRow">
              <div className="input-container">
                <label
                  htmlFor="reasonOfChange"
                  id="formLabel"
                  className="formLabel"
                >
                  Наличие уголовной или административной ответственности
                </label>
                <input
                  type="text"
                  name="reasonOfChange"
                  id="reasonOfChange"
                  className="formInput big"
                  value={
                    candidateData.law_breaker !== "Нет" ? "Да, имеется" : "Нет"
                  }
                  readOnly
                />
              </div>
            </div>
            {candidateData.law_breaker &&
              candidateData.law_breaker !== "Нет" && (
                <div className="formRow">
                  <div className="input-container">
                    <label
                      htmlFor="whyPrisoner"
                      id="whyPrisoner"
                      className="formLabel"
                    >
                      Причины привлечения к уголовной или административной
                      ответственности
                    </label>
                    <input
                      type="text"
                      name="whyPrisoner"
                      id="whyPrisoner"
                      className="formInput big"
                      value={candidateData.law_breaker || ""}
                      readOnly
                    />
                  </div>
                </div>
              )}
            <div className="formRow">
              <div className="input-container">
                <label
                  htmlFor="isLegalEntity"
                  id="isLegalEntity"
                  className="formLabel"
                >
                  Является или нет (со-)учредителем юридического лица
                </label>
                <input
                  type="text"
                  name="isLegalEntity"
                  id="isLegalEntity"
                  className="formInput big"
                  value={candidateData.legal_entity !== "Нет" ? "Да" : "Нет"}
                  readOnly
                />
              </div>
            </div>
            {candidateData.legal_entity &&
              candidateData.legal_entity !== "Нет" && (
                <div className="formRow">
                  <div className="input-container">
                    <label
                      htmlFor="LegalEntityActivity"
                      id="LegalEntityActivity"
                      className="formLabel"
                    >
                      Вид деятельности юридического лица
                    </label>
                    <input
                      type="text"
                      name="LegalEntityActivity"
                      id="LegalEntityActivity"
                      className="formInput big"
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
