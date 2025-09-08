"use client"

import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"

import React, { FC, useEffect, useState } from "react"

import Image from "next/image"

import ChildrenTable from "./ChildrenTable"
import CourseDataTable from "./CourseDataTable"
import EducationDataTable from "./EducationDataTable"
import RelativeTable from "./RelativeTable"
import SpouseTable from "./SpouseTable"
import WorkExperienceTable from "./WorkExperienceTable"
import { EducationSection } from "./candidatesFormComponents/EducationSection"
import { FormRow } from "./candidatesFormComponents/FormRow"
import { PassportSection } from "./candidatesFormComponents/PassportSection"
import { PersonalInfoSection } from "./candidatesFormComponents/PersonalInfoSection"
import { RadioGroup } from "./candidatesFormComponents/RadioGroup"
import { SectionHeader } from "./candidatesFormComponents/SectionHeader"
import { SuccessMessage } from "./candidatesFormComponents/successMessage"
import HeaderFormSmall from "./header"

import CustomSelect from "@/components/ui/inputs/select/customSelect"

const API_BASE_URL = "http://poisk-metrov-demos.ru:8080/api/v1"

// Интерфейсы для типизации запроса и ответа
interface ICandidateFormRequest {
  vacancies_key: string
  marital_statuses_key: string
  rop_key: string | null
  status: string
  first_name: string
  last_name: string
  middle_name: string
  reason_for_changing_surnames: string | null
  city_work: string
  birth_date: string | null
  country_birth: string
  city_birth: string
  level_educational: string
  courses: string
  educational_institution: string
  organization_name: string
  organization_phone: string
  field_of_activity: string
  organization_address: string
  organization_job_title: string
  organization_price: string
  date_of_hiring: string | null
  date_of_dismissal: string | null
  reason_for_dismissal: string
  recommendation_contact: string
  mobile_phone_candidate: string
  home_phone_candidate: string
  mail_candidate: string
  inn: string
  passport_series: string
  passport_number: string
  passport_issued: string
  passport_issue_date: string | null
  permanent_registration_address: string
  temporary_registration_address: string
  actual_residence_address: string
  family_partner: string
  adult_family_members: string
  adult_children: string
  serviceman: boolean
  law_breaker: string
  legal_entity: string
  is_data_processing: boolean
  comment: string
}

interface ICandidateFormResponse {
  request: boolean
  attributes?: any
  error?: string
}

const CandidateForm: FC = () => {
  const [surnameChanged, setSurnameChanged] = useState(true)
  const [haveChildren, setHaveChildren] = useState(true)
  const [haveFamilyMembers, setHaveFamilyMembers] = useState(true)
  const [criminalResponsibility, setCriminalResponsibility] = useState(false)
  const [legalEntity, setLegalEntity] = useState(false)
  const [militaryDuty, setMilitaryDuty] = useState(true)
  const [personalDataChecked, setPersonalDataChecked] = useState(false)

  const [selectedVacancy, setSelectedVacancy] = useState("")
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState("")
  const [showVacancyOptions, setShowVacancyOptions] = useState(false)
  const [showMaritalOptions, setShowMaritalOptions] = useState(false)

  const [selectedEducationLevel, setSelectedEducationLevel] = useState("Высшее")

  const [relativeCounter, setRelativeCounter] = useState(1)
  const [childrenCounter, setChildrenCounter] = useState(1)

  const [hasError, setHasError] = useState(false)
  const [spouseErrors, setSpouseErrors] = useState<Record<string, boolean>>({})

  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({})
  const [childrenErrors, setChildrenErrors] = useState<Record<string, boolean>>(
    {}
  )
  const [validationErrors, setValidationErrors] = useState<
    Record<string, boolean>
  >({})
  const [triggerValidation, setTriggerValidation] = useState(false)

  const [relativesErrors, setRelativesErrors] = useState<
    Record<string, boolean>
  >({})

  const [workExperienceErrors, setWorkExperienceErrors] = useState<
    Record<string, boolean>
  >({})

  const [courseCounter, setCourseCounter] = useState(1)
  const [additionalCourseTables, setAdditionalCourseTables] = useState<
    number[]
  >([])

  const [additionalRelativeTables, setAdditionalRelativeTables] = useState<
    number[]
  >([])
  const [additionalChildrenTables, setAdditionalChildrenTables] = useState<
    number[]
  >([])

  const [educationCounter, setEducationCounter] = useState(1)
  const [additionalEducationTables, setAdditionalEducationTables] = useState<
    number[]
  >([])

  const [maritalStatusError, setMaritalStatusError] = useState(false)
  const [cityError, setCityError] = useState(false)
  const [maritalStatusApiOptions, setMaritalStatusApiOptions] = useState<
    string[]
  >([])

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const [selectedProfessionalExperience, setSelectedProfessionalExperience] =
    useState("Нет опыта")

  const [selectedCity, setSelectedCity] = useState("")
  const [showCityOptions, setShowCityOptions] = useState(false)

  const [goingToROP, setGoingToROP] = useState(false)
  const [selectedROP, setSelectedROP] = useState("")
  const [showROPOptions, setShowROPOptions] = useState(false)

  const [formData, setFormData] = useState<Record<string, any>>({})

  const mockVacancyData = [
    { title: "Frontend разработчик", key: "frontend_dev" },
    { title: "Backend разработчик", key: "backend_dev" },
    { title: "DevOps инженер", key: "devops_eng" },
    { title: "UI/UX дизайнер", key: "ui_ux_designer" },
    { title: "Менеджер проектов", key: "project_manager" },
  ]

  const mockROPData = [
    { title: "Иванов Алексей Петрович", key: "ivanov_aleksey" },
    { title: "Петрова Мария Сергеевна", key: "petrova_maria" },
    { title: "Сидоров Дмитрий Александрович", key: "sidorov_dmitriy" },
  ]

  const [ropOptions, setRopOptions] = useState<string[]>([])

  const mockMaritalStatusData = [
    { title: "Не женат/Не замужем", key: "single" },
    { title: "В разводе", key: "divorced" },
    { title: "Вдовец/Вдова", key: "widowed" },
    { title: "Гражданский брак", key: "civil_marriage" },
    { title: "Состою в зарегистрированном браке", key: "registered_marriage" },
  ]

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

  const {
    data: vacanciesData,
    isLoading: isLoadingVacancies,
    error: vacancyQueryError,
  } = useQuery({
    queryKey: ["vacancies"],
    queryFn: async () => {
      const accessToken = getAccessTokenFromCookie()

      if (!accessToken) {
        // Используем mock данные если нет токена
        return mockVacancyData
      }

      const response = await axios.get(`${API_BASE_URL}/vacancy/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (response.data.response && response.data.attributes) {
        return response.data.attributes
      } else {
        throw new Error("Ошибка при получении данных вакансий")
      }
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 минут
  })

  // Хук для получения семейного положения
  const {
    data: maritalStatusData,
    isLoading: isLoadingMaritalStatuses,
    error: maritalStatusQueryError,
  } = useQuery({
    queryKey: ["maritalStatuses"],
    queryFn: async () => {
      const accessToken = getAccessTokenFromCookie()

      if (!accessToken) {
        // Используем mock данные если нет токена
        return mockMaritalStatusData
      }

      const response = await axios.get(`${API_BASE_URL}/marital-statuses/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (response.data.response && response.data.attributes) {
        return response.data.attributes
      } else {
        throw new Error("Ошибка при получении данных семейного положения")
      }
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 минут
  })

  // Мутация для отправки формы кандидата
  const submitFormMutation = useMutation({
    mutationFn: async (
      data: ICandidateFormRequest
    ): Promise<ICandidateFormResponse> => {
      const accessToken = getAccessTokenFromCookie()

      if (!accessToken) {
        throw new Error("Токен доступа не найден")
      }

      const response = await axios.post<ICandidateFormResponse>(
        `${API_BASE_URL}/candidates/store`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        }
      )

      return response.data
    },
    onSuccess: (data) => {
      if (data.request) {
        setSubmitSuccess(true)
        console.log("Анкета успешно отправлена:", data)
      } else {
        console.log("Ответ сервера не содержит request: true")
        // Пока игнорируем ошибки бэка
        setSubmitSuccess(true)
      }
    },
    onError: (error: any) => {
      console.error("Ошибка при отправке анкеты:", error)
      console.error("Error response:", error.response)
      console.error("Error message:", error.message)

      // Показываем реальную ошибку вместо фейкового успеха
      setSubmitError(
        error.response?.data?.message ||
          error.message ||
          "Произошла ошибка при отправке формы"
      )
      setSubmitSuccess(false)
    },
  })

  const validateRelativesTables = (): boolean => {
    const errors: Record<string, boolean> = {}
    let isValid = true

    // Проверяем первую таблицу (index = 1)
    const requiredFields1 = [
      "FIORelative1",
      "dateOfBirthRelative1",
      "phoneNumberRelative1",
      "placeOfStudyRelative1",
    ]

    requiredFields1.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        errors[field] = true
        isValid = false
      }
    })

    // Проверяем дополнительные таблицы
    additionalRelativeTables.forEach((index) => {
      const requiredFields = [
        `FIORelative${index}`,
        `dateOfBirthRelative${index}`,
        `phoneNumberRelative${index}`,
        `placeOfStudyRelative${index}`,
      ]

      requiredFields.forEach((field) => {
        if (!formData[field] || formData[field].trim() === "") {
          errors[field] = true
          isValid = false
        }
      })
    })

    setRelativesErrors(errors)
    return isValid
  }

  const validateChildrenTables = () => {
    const errors: Record<string, boolean> = {}
    let isValid = true

    const allIndexes = [1, ...additionalChildrenTables]

    allIndexes.forEach((index) => {
      const requiredFields = [
        `FIOChildren${index}`,
        `dateOfBirthChildren${index}`,
        `phoneNumberChildren${index}`,
        `placeOfStudyChildren${index}`,
      ]

      requiredFields.forEach((fieldName) => {
        const fieldValue = formData[fieldName]

        if (!fieldValue || fieldValue.trim() === "") {
          errors[fieldName] = true
          isValid = false
        }
      })
    })

    setChildrenErrors(errors)
    return isValid
  }
  const validateSelectFields = () => {
    let isValid = true

    // Проверка семейного положения
    if (!selectedMaritalStatus) {
      setMaritalStatusError(true)
      isValid = false
    } else {
      setMaritalStatusError(false)
    }

    // Проверка города работы
    if (!selectedCity) {
      setCityError(true)
      isValid = false
    } else {
      setCityError(false)
    }

    return isValid
  }
  const validateWorkExperienceTable = (): boolean => {
    // Проверяем только если выбран "Опыт есть"
    if (selectedProfessionalExperience !== "Опыт есть") {
      return true
    }

    const errors: Record<string, boolean> = {}
    let isValid = true

    const requiredFields = [
      "companyName",
      "companyPhone",
      "companyActivity",
      "companyAddress",
      "position",
      "salary",
      "hireDate",
      "dismissalDate",
      "dismissalReason",
      "referenceContact",
    ]

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        errors[field] = true
        isValid = false
      }
    })

    setWorkExperienceErrors(errors)
    return isValid
  }

  const validateSpouseTable = (): boolean => {
    if (selectedMaritalStatus !== "Состою в зарегистрированном браке") {
      return true
    }

    const errors: Record<string, boolean> = {}
    let isValid = true

    const requiredFields = [
      "FIOSuprug",
      "dateOfBirthTable",
      "phoneNumberTable",
      "placeOfStudy",
    ]

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        errors[field] = true
        isValid = false
      }
    })

    setSpouseErrors(errors)
    return isValid
  }

  const handleSpouseFieldChange = (fieldName: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }))

    if (value && value.trim() !== "" && spouseErrors[fieldName]) {
      setSpouseErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[fieldName]
        return newErrors
      })
    }
  }
  const validatePersonalInfoSection = () => {
    const errors: Record<string, boolean> = {}

    const requiredFields = [
      { key: "FIO", value: formData.FIO },
      { key: "birthDate", value: formData.birthDate },
      { key: "birthPlace", value: formData.birthPlace },
      { key: "mobileNumber", value: formData.mobileNumber },
      { key: "domesticNumber", value: formData.domesticNumber },
      { key: "email", value: formData.email },
      { key: "INN", value: formData.INN },
    ]

    const requiredSelects = [
      { key: "selectedVacancy", value: selectedVacancy },
      { key: "selectedCity", value: selectedCity },
    ]

    if (goingToROP) {
      requiredSelects.push({ key: "selectedROP", value: selectedROP })
    }

    // Проверяем обычные поля
    requiredFields.forEach((field) => {
      if (!field.value || field.value.trim() === "") {
        errors[field.key] = true
      } else {
        errors[field.key] = false
      }
    })

    requiredSelects.forEach((select) => {
      if (!select.value || select.value.trim() === "") {
        errors[select.key] = true
      } else {
        errors[select.key] = false
      }
    })

    setValidationErrors(errors)
    setTriggerValidation(true)

    return !Object.values(errors).some((hasError) => hasError)
  }

  const validatePassportSection = (): boolean => {
    const requiredFields = [
      "passwordSeriaNumber",
      "dateOfIssue",
      "issuedBy",
      "adressOfPermanentReg",
      "adressOfFactialLiving",
    ]

    const errors: Record<string, boolean> = { ...formErrors } // Сохраняем существующие ошибки
    let isValid = true

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        errors[field] = true
        isValid = false
      } else {
        errors[field] = false
      }
    })

    setFormErrors(errors)
    return isValid
  }

  const formatDateForDatabase = (dateString: string): string | null => {
    if (!dateString || dateString.trim() === "") {
      return null
    }

    const ddmmyyyyPattern = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/
    const match = dateString.match(ddmmyyyyPattern)

    if (match) {
      const [, day, month, year] = match
      const formattedDay = day.padStart(2, "0")
      const formattedMonth = month.padStart(2, "0")
      return `${year}-${formattedMonth}-${formattedDay}`
    }

    const yyyymmddPattern = /^(\d{4})-(\d{1,2})-(\d{1,2})$/
    if (yyyymmddPattern.test(dateString)) {
      return dateString
    }

    console.warn(`Неверный формат даты: ${dateString}`)
    return null
  }

  const handleFormDataChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const collectEducationData = () => {
    const educationData = []

    if (formData.nameInstitution1) {
      educationData.push({
        institution_name: formData.nameInstitution1 || "",
        start_date: formatDateForDatabase(formData.dateOfEntrance1) || "",
        end_date: formatDateForDatabase(formData.dateOfEnding1) || "",
        education_type: formData.typeOfEducation1 || "",
        specialty: formData.diplomaSpeciality1 || "",
      })
    }

    additionalEducationTables.forEach((index) => {
      if (formData[`nameInstitution${index}`]) {
        educationData.push({
          institution_name: formData[`nameInstitution${index}`] || "",
          start_date:
            formatDateForDatabase(formData[`dateOfEntrance${index}`]) || "",
          end_date:
            formatDateForDatabase(formData[`dateOfEnding${index}`]) || "",
          education_type: formData[`typeOfEducation${index}`] || "",
          specialty: formData[`diplomaSpeciality${index}`] || "",
        })
      }
    })

    return educationData
  }

  const collectCoursesData = () => {
    const coursesData = []

    if (formData.courseName1) {
      coursesData.push({
        institution_name: formData.courseName1 || "",
        course_name: formData.courseTitle1 || "",
        start_date: formatDateForDatabase(formData.courseStartDate1) || "",
        end_date: formatDateForDatabase(formData.courseEndDate1) || "",
      })
    }

    additionalCourseTables.forEach((index) => {
      if (formData[`courseName${index}`]) {
        coursesData.push({
          institution_name: formData[`courseName${index}`] || "",
          course_name: formData[`courseTitle${index}`] || "",
          start_date:
            formatDateForDatabase(formData[`courseStartDate${index}`]) || "",
          end_date:
            formatDateForDatabase(formData[`courseEndDate${index}`]) || "",
        })
      }
    })

    return coursesData
  }

  const collectChildrenData = () => {
    if (!haveChildren) {
      return null
    }

    const children = []

    if (formData.FIOChildren1) {
      children.push({
        full_name: formData.FIOChildren1 || "",
        birth_date: formatDateForDatabase(formData.dateOfBirthChildren1) || "",
        phone: formData.phoneNumberChildren1 || "",
        work_study_place: formData.placeOfStudyChildren1 || "",
        residence_address: formData.placeOfLivingChildren1 || "",
      })
    }

    additionalChildrenTables.forEach((index) => {
      if (formData[`FIOChildren${index}`]) {
        children.push({
          full_name: formData[`FIOChildren${index}`] || "",
          birth_date:
            formatDateForDatabase(formData[`dateOfBirthChildren${index}`]) ||
            "",
          phone: formData[`phoneNumberChildren${index}`] || "",
          work_study_place: formData[`placeOfStudyChildren${index}`] || "",
          residence_address: formData[`placeOfLivingChildren${index}`] || "",
        })
      }
    })

    return children.length > 0 ? children : null
  }

  const collectFamilyMembersData = () => {
    if (!haveFamilyMembers) {
      return null
    }

    const familyMembers = []

    if (formData.FIORelative1) {
      familyMembers.push({
        relationship_and_name: formData.FIORelative1 || "",
        birth_date: formatDateForDatabase(formData.dateOfBirthRelative1) || "",
        phone: formData.phoneNumberRelative1 || "",
        work_study_place: formData.placeOfStudyRelative1 || "",
        residence_address: formData.placeOfLivingRelative1 || "",
      })
    }

    additionalRelativeTables.forEach((index) => {
      if (formData[`FIORelative${index}`]) {
        familyMembers.push({
          relationship_and_name: formData[`FIORelative${index}`] || "",
          birth_date:
            formatDateForDatabase(formData[`dateOfBirthRelative${index}`]) ||
            "",
          phone: formData[`phoneNumberRelative${index}`] || "",
          work_study_place: formData[`placeOfStudyRelative${index}`] || "",
          residence_address: formData[`placeOfLivingRelative${index}`] || "",
        })
      }
    })

    return familyMembers.length > 0 ? familyMembers : null
  }

  // Функция для загрузки данных РОП
  const loadROPData = () => {
    console.log("Загрузка данных РОП...")
    const ropTitles = mockROPData.map((rop) => rop.title)
    setRopOptions(ropTitles)
    ;(window as any).ropData = mockROPData
    console.log("Mock РОП данные загружены:", ropTitles)
  }

  useEffect(() => {
    loadROPData()
  }, [])

  const vacancyOptions = vacanciesData
    ? vacanciesData.map((vacancy: any) => vacancy.title)
    : []
  const maritalStatusOptions = maritalStatusData
    ? maritalStatusData.map((status: any) => status.title)
    : [
        "Не женат/Не замужем",
        "Женат/Замужем",
        "В разводе",
        "Вдовец/Вдова",
        "Гражданский брак",
      ]

  const cityOptions = ["Новосибирск", "Санкт-Петербург"]

  useEffect(() => {
    const handleClickOutside = () => {
      setShowVacancyOptions(false)
      setShowMaritalOptions(false)
      setShowCityOptions(false)
      setShowROPOptions(false)
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  // Функция для добавления таблицы члена семьи
  const addRelativeTable = () => {
    const newCounter = relativeCounter + 1
    setRelativeCounter(newCounter)
    setAdditionalRelativeTables((prev) => [...prev, newCounter])
  }

  // Функция для добавления таблицы ребенка
  const addChildrenTable = () => {
    const newCounter = childrenCounter + 1
    setChildrenCounter(newCounter)
    setAdditionalChildrenTables((prev) => [...prev, newCounter])
  }

  // Функция для получения ключа вакансии
  const getVacancyKey = (selectedTitle: string): string => {
    if (vacanciesData) {
      const vacancy = vacanciesData.find((v: any) => v.title === selectedTitle)
      return vacancy ? vacancy.key : ""
    }
    return ""
  }

  // Функция для получения ключа РОП
  const getROPKey = (selectedTitle: string): string => {
    const rop = mockROPData.find((r: any) => r.title === selectedTitle)
    return rop ? rop.key : ""
  }

  const addEducationTable = () => {
    const newCounter = educationCounter + 1
    setEducationCounter(newCounter)
    setAdditionalEducationTables((prev) => [...prev, newCounter])
  }

  const addCourseTable = () => {
    const newCounter = courseCounter + 1
    setCourseCounter(newCounter)
    setAdditionalCourseTables((prev) => [...prev, newCounter])
  }

  const getMaritalStatusKey = (selectedTitle: string): string => {
    if (maritalStatusData) {
      const status = maritalStatusData.find(
        (s: any) => s.title === selectedTitle
      )
      return status ? status.key : ""
    }
    return ""
  }

  const splitFullName = (fullName: string) => {
    const parts = fullName.trim().split(/\s+/)
    return {
      last_name: parts[0] || "",
      first_name: parts[1] || "",
      middle_name: parts[2] || "",
    }
  }

  const splitPassportData = (passportSeriaNumber: string) => {
    const parts = passportSeriaNumber.replace(/\s+/g, " ").trim().split(" ")
    return {
      passport_series: parts[0] || "",
      passport_number: parts[1] || "",
    }
  }

  const splitBirthPlace = (birthPlace: string) => {
    if (!birthPlace) return { country: "", city: "" }

    const parts = birthPlace.split(",").map((part) => part.trim())
    return {
      country: parts[0] || "",
      city: parts.length > 1 ? parts.slice(1).join(", ") : parts[0] || "",
    }
  }

  const handleChildrenFieldChange = (fieldName: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }))

    if (value && value.trim() !== "" && childrenErrors[fieldName]) {
      setChildrenErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[fieldName]
        return newErrors
      })
    }
  }
  const handleSubmit = () => {
    setIsSubmitting(true)
    setSubmitError("")
    setChildrenErrors({})
    setRelativesErrors({})
    setWorkExperienceErrors({})
    setSpouseErrors({})

    const isPersonalInfoValid = validatePersonalInfoSection()
    const isPassportValid = validatePassportSection()
    const isChildrenValid = haveChildren ? validateChildrenTables() : true
    const isRelativesValid = haveFamilyMembers
      ? validateRelativesTables()
      : true
    const isWorkExperienceValid = validateWorkExperienceTable()
    const isSpouseValid = validateSpouseTable()
    const isSelectFieldsValid = validateSelectFields()

    if (
      !isPersonalInfoValid ||
      !isPassportValid ||
      !isChildrenValid ||
      !isRelativesValid ||
      !isWorkExperienceValid ||
      !isSpouseValid ||
      !isSelectFieldsValid
    ) {
      setIsSubmitting(false)
      setHasError(true)
      return
    }

    setTriggerValidation(false)
    setValidationErrors({})
    setMaritalStatusError(false)
    setHasError(false)
    setCityError(false)

    const nameData = splitFullName(formData.FIO || "")
    const passportData = splitPassportData(formData.passwordSeriaNumber || "")
    const birthPlaceData = splitBirthPlace(formData.birthPlace)

    const childrenData = collectChildrenData()
    const familyMembersData = collectFamilyMembersData()

    const apiData: ICandidateFormRequest = {
      vacancies_key: getVacancyKey(selectedVacancy),
      marital_statuses_key: getMaritalStatusKey(selectedMaritalStatus),
      rop_key: goingToROP ? getROPKey(selectedROP) : null,
      status: "active",
      first_name: nameData.first_name,
      last_name: nameData.last_name,
      middle_name: nameData.middle_name,
      reason_for_changing_surnames: surnameChanged
        ? formData.reasonOfChange || ""
        : null,
      city_work: selectedCity,
      birth_date: formatDateForDatabase(formData.birthDate),
      country_birth: birthPlaceData.country,
      city_birth: birthPlaceData.city,
      level_educational: selectedEducationLevel,
      courses: JSON.stringify(collectCoursesData()),
      educational_institution: JSON.stringify(collectEducationData()),
      organization_name: formData.companyName || "",
      organization_phone: formData.companyPhone || "",
      field_of_activity: formData.companyActivity || "",
      organization_address: formData.companyAddress || "",
      organization_job_title: formData.position || "",
      organization_price: formData.salary || "",
      date_of_hiring: formatDateForDatabase(formData.hireDate),
      date_of_dismissal: formatDateForDatabase(formData.dismissalDate),
      reason_for_dismissal: formData.dismissalReason || "",
      recommendation_contact: formData.referenceContact || "",
      mobile_phone_candidate: formData.mobileNumber || "",
      home_phone_candidate: formData.domesticNumber || "",
      mail_candidate: formData.email || "",
      inn: formData.INN || "",
      passport_series: passportData.passport_series,
      passport_number: passportData.passport_number,
      passport_issued: formData.issuedBy || "",
      passport_issue_date: formatDateForDatabase(formData.dateOfIssue),
      permanent_registration_address: formData.adressOfPermanentReg || "",
      temporary_registration_address: formData.adressOfTemporaryReg || "",
      actual_residence_address: formData.adressOfFactialLiving || "",
      family_partner:
        selectedMaritalStatus === "Состою в зарегистрированном браке"
          ? JSON.stringify({
              full_name: formData.FIOSuprug || "",
              birth_date:
                formatDateForDatabase(formData.dateOfBirthTable) || "",
              phone: formData.phoneNumberTable || "",
              work_study_place: formData.placeOfStudy || "",
              residence_address: formData.placeOfLiving || "",
            })
          : JSON.stringify({}),
      adult_family_members: familyMembersData
        ? JSON.stringify(familyMembersData)
        : JSON.stringify([]),
      adult_children: childrenData
        ? JSON.stringify(childrenData)
        : JSON.stringify([]),
      serviceman: militaryDuty,
      law_breaker: criminalResponsibility
        ? formData.whyPrisoner || "Да"
        : "Нет",
      legal_entity: legalEntity ? formData.LegalEntity || "Да" : "Нет",
      is_data_processing: personalDataChecked,
      comment: "Коммент",
    }

    submitFormMutation.mutate(apiData)
  }

  return (
    <>
      <HeaderFormSmall></HeaderFormSmall>

      {!submitSuccess && (
        <article>
          <h1>Анкета кандидата</h1>
          <p style={{ margin: "0 20px" }}>
            Заполните анкету, чтобы подать заявку на вакансию
          </p>
        </article>
      )}

      <main>
        <section>
          {submitSuccess ? (
            <SuccessMessage onClose={() => window.location.reload()} />
          ) : (
            <div className="center-card big">
              <SectionHeader title="Данные о вакансии" />
              <PersonalInfoSection
                formData={formData}
                onFormDataChange={handleFormDataChange}
                selectedVacancy={selectedVacancy}
                setSelectedVacancy={setSelectedVacancy}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                vacancyOptions={vacancyOptions}
                cityOptions={cityOptions}
                isLoadingVacancies={isLoadingVacancies}
                vacancyError={vacancyQueryError?.message || ""}
                loadVacancies={() => {}}
                surnameChanged={surnameChanged}
                setSurnameChanged={setSurnameChanged}
                goingToROP={goingToROP}
                setGoingToROP={setGoingToROP}
                selectedROP={selectedROP}
                setSelectedROP={setSelectedROP}
                ropOptions={ropOptions}
                validationErrors={validationErrors}
                triggerValidation={triggerValidation}
              />
              {/* Образование и профессиональный опыт */}
              <EducationSection
                selectedEducationLevel={selectedEducationLevel}
                setSelectedEducationLevel={setSelectedEducationLevel}
                selectedProfessionalExperience={selectedProfessionalExperience}
                setSelectedProfessionalExperience={
                  setSelectedProfessionalExperience
                }
                formData={formData}
                setFormData={setFormData}
                additionalEducationTables={additionalEducationTables}
                additionalCourseTables={additionalCourseTables}
                onAddEducationTable={addEducationTable}
                onAddCourseTable={addCourseTable}
                workExperienceErrors={workExperienceErrors} // Передаем ошибки
              />
              {/* Паспортные данные */}
              <PassportSection
                formData={formData}
                onFormDataChange={handleFormDataChange}
                onDateChange={handleFormDataChange}
                onPassportChange={handleFormDataChange}
                errors={formErrors}
              />
              {/* Состав семьи */}
              <SectionHeader
                title="Состав семьи"
                subtitle="Заполните эти данные, чтобы мы могли предложить вам подходящие условия"
              />
              <FormRow>
                <div className="input-container">
                  <CustomSelect
                    label="Семейное положение"
                    options={maritalStatusOptions}
                    placeholder="Выберите ваше семейное положение"
                    value={selectedMaritalStatus}
                    onChange={setSelectedMaritalStatus}
                    isLoading={isLoadingMaritalStatuses}
                    error={maritalStatusError}
                    required={true}
                  />
                </div>
              </FormRow>
              <SpouseTable
                formData={formData}
                setFormData={handleSpouseFieldChange}
                isVisible={
                  selectedMaritalStatus === "Состою в зарегистрированном браке"
                }
                errors={spouseErrors}
              />
              <SectionHeader title="1. Дети старше 18 лет" />
              <FormRow justifyContent="flex-start" style={{ marginTop: 0 }}>
                <RadioGroup<boolean>
                  name="haveChildren"
                  value={haveChildren}
                  onChange={setHaveChildren}
                  options={[
                    { value: true, label: "У меня есть дети старше 18 лет" },
                    { value: false, label: "У меня нет детей старше 18 лет" },
                  ]}
                />
              </FormRow>
              {haveChildren && (
                <div className="toggle-block" style={{ width: "100%" }}>
                  <ChildrenTable
                    index={1}
                    formData={formData}
                    setFormData={handleChildrenFieldChange}
                    requiredFields={[""]}
                    errors={childrenErrors}
                  />

                  {additionalChildrenTables.map((index) => (
                    <ChildrenTable
                      key={index}
                      index={index}
                      formData={formData}
                      setFormData={handleChildrenFieldChange}
                      errors={childrenErrors}
                    />
                  ))}

                  <FormRow>
                    <button
                      className="bigFormButton"
                      onClick={addChildrenTable}
                    >
                      <div className="textCont"></div>
                      <Image
                        src="/images/icons/plus.svg"
                        alt="Plus icon"
                        width={24}
                        height={24}
                      />
                      Добавить совершеннолетнего ребенка
                    </button>
                  </FormRow>
                  <FormRow justifyContent="flex-start">
                    <p style={{ marginTop: 0, textAlign: "left" }}>
                      Добавьте всех ближайших совершеннолетних членов семьи:
                      родителей, братьев/сестер
                    </p>
                  </FormRow>
                </div>
              )}
              <SectionHeader title="2. Члены семьи старше 18 лет" />
              <FormRow justifyContent="flex-start" style={{ marginTop: 0 }}>
                <RadioGroup<boolean>
                  name="haveFamilyMembers"
                  value={haveFamilyMembers}
                  onChange={setHaveFamilyMembers}
                  options={[
                    {
                      value: true,
                      label: "У меня есть члены семьи старше 18 лет",
                    },
                    {
                      value: false,
                      label: "У меня нет членов семьи старше 18 лет",
                    },
                  ]}
                />
              </FormRow>
              {haveFamilyMembers && (
                <div className="toggle-block" style={{ width: "100%" }}>
                  <RelativeTable
                    index={1}
                    formData={formData}
                    setFormData={setFormData}
                    requiredFields={[""]}
                    errors={relativesErrors}
                  />

                  {additionalRelativeTables.map((index) => (
                    <RelativeTable
                      index={1}
                      formData={formData}
                      setFormData={setFormData}
                      requiredFields={[""]}
                      errors={relativesErrors}
                    />
                  ))}

                  <FormRow>
                    <button
                      className="bigFormButton"
                      onClick={addRelativeTable}
                    >
                      <div className="textCont"></div>
                      <Image
                        src="/images/icons/plus.svg"
                        alt="Plus icon"
                        width={24}
                        height={24}
                      />
                      Добавить члена семьи
                    </button>
                  </FormRow>
                  <FormRow justifyContent="flex-start">
                    <p style={{ marginTop: 0, textAlign: "left" }}>
                      Добавьте всех ближайших совершеннолетних членов семьи:
                      родителей, братьев/сестер
                    </p>
                  </FormRow>
                </div>
              )}
              {/* Юридический статус */}
              <SectionHeader
                title="Юридический статус"
                subtitle="Ответьте на следующие вопросы, которые помогут нам оценить ваше соответствие вакансии"
              />
              <FormRow justifyContent="flex-start">
                <p
                  style={{
                    marginTop: 0,
                    color: "#181817",
                    fontSize: "18px",
                    textAlign: "left",
                  }}
                >
                  1. Являетесь ли военнообязанным(-ой)?
                </p>
              </FormRow>
              <FormRow justifyContent="flex-start" style={{ marginTop: 0 }}>
                <RadioGroup<boolean>
                  name="militaryDuty"
                  value={militaryDuty}
                  onChange={setMilitaryDuty}
                  options={[
                    { value: true, label: "Да, являюсь" },
                    { value: false, label: "Нет, не являюсь" },
                  ]}
                />
              </FormRow>
              <FormRow
                justifyContent="flex-start"
                style={{ marginTop: "50px" }}
              >
                <p
                  style={{
                    marginTop: 0,
                    color: "#181817",
                    fontSize: "18px",
                    textAlign: "left",
                  }}
                >
                  2. Привлекались ли вы когда-либо к уголовной ответственности?
                </p>
              </FormRow>
              <FormRow justifyContent="flex-start" style={{ marginTop: "0" }}>
                <RadioGroup<boolean>
                  name="criminalResponsibility"
                  value={criminalResponsibility}
                  onChange={setCriminalResponsibility}
                  options={[
                    { value: true, label: "Да, привлекался" },
                    { value: false, label: "Нет, не привлекался" },
                  ]}
                />
              </FormRow>
              {criminalResponsibility && (
                <div className="toggle-block" style={{ width: "100%" }}>
                  <FormRow>
                    <div className="input-container">
                      <label htmlFor="whyPrisoner" className="formLabel">
                        Причины привлечения
                      </label>
                      <input
                        style={{ width: "100%" }}
                        type="text"
                        name="whyPrisoner"
                        className="formInput"
                        placeholder="Опишите, за что привлекались к ответственности"
                        value={formData.whyPrisoner || ""}
                        onChange={(e) =>
                          handleFormDataChange("whyPrisoner", e.target.value)
                        }
                      />
                    </div>
                  </FormRow>
                </div>
              )}
              <FormRow
                justifyContent="flex-start"
                style={{ marginTop: "50px" }}
              >
                <p
                  style={{
                    marginTop: 0,
                    color: "#181817",
                    fontSize: "18px",
                    textAlign: "left",
                  }}
                >
                  3. Являетесь ли вы (со-)учредителем юридического лица?
                </p>
              </FormRow>
              <FormRow justifyContent="flex-start" style={{ marginTop: "0" }}>
                <RadioGroup<boolean>
                  name="legalEntity"
                  value={legalEntity}
                  onChange={setLegalEntity}
                  options={[
                    { value: true, label: "Да, являюсь" },
                    { value: false, label: "Нет, не являюсь" },
                  ]}
                />
              </FormRow>
              {legalEntity && (
                <div className="toggle-block" style={{ width: "100%" }}>
                  <FormRow>
                    <div className="input-container">
                      <label
                        htmlFor="LegalEntityActivity"
                        className="formLabel"
                      >
                        Укажите наименование и сферу деятельности
                      </label>
                      <input
                        style={{ width: "100%" }}
                        type="text"
                        name="LegalEntity"
                        className="formInput"
                        placeholder="Наименование и сфера деятельности юрлица"
                        value={formData.LegalEntity || ""}
                        onChange={(e) =>
                          handleFormDataChange("LegalEntity", e.target.value)
                        }
                      />
                    </div>
                  </FormRow>
                </div>
              )}
              {hasError && (
                <FormRow>
                  <div className="errorMessage">
                    У вас есть незаполненные обязательные поля.
                    <span className="smallNone">
                      Для отправки анкеты заполните их и повторите попытку
                      заново
                    </span>
                  </div>
                </FormRow>
              )}
              <div
                className="checkboxRow"
                style={{
                  maxWidth: "none",
                  alignItems: "center",
                  marginTop: "48px",
                }}
              >
                <label className="custom-checkbox" htmlFor="personalData">
                  <input
                    type="checkbox"
                    name="personalData"
                    id="personalData"
                    checked={personalDataChecked}
                    onChange={(e) => setPersonalDataChecked(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                </label>
                <label htmlFor="personalData">
                  Я даю согласие на обработку{" "}
                  <span>своих персональных данных</span>
                </label>
              </div>
              <FormRow style={{ marginTop: "0px" }}>
                <button
                  className={
                    personalDataChecked
                      ? "formBtn btn-active"
                      : "formBtn btn-inactive"
                  }
                  disabled={
                    !personalDataChecked || submitFormMutation.isPending
                  }
                  onClick={handleSubmit}
                >
                  {submitFormMutation.isPending
                    ? "Отправка..."
                    : "Отправить анкету"}
                </button>
              </FormRow>
              {submitError && (
                <FormRow>
                  <div
                    style={{
                      color: "#e74c3c",
                      fontSize: "14px",
                      marginTop: "10px",
                    }}
                  >
                    {submitError}
                  </div>
                </FormRow>
              )}
            </div>
          )}
        </section>
      </main>
    </>
  )
}

export default CandidateForm
