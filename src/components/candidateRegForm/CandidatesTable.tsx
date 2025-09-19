import { useMutation, useQueryClient } from "@tanstack/react-query"

import React, { RefObject, useEffect, useState } from "react"

import Image from "next/image"
import { useRouter } from "next/navigation"

import {
  ICandidate,
  ICandidateTableData,
  ICandidateTableItem,
  ICandidateTableResponse,
  ICandidatesResponse,
} from "@/types/Candidate"
import { useApiMutation } from "@/utils/hooks/use-api"

import styles from "./candidateLoginComponents.module.css"

import MobileCandidateCard from "./MobileCandidateCard"
import { FormRow } from "./candidatesFormComponents/FormRow"
import ConfirmationModal from "./confirmationalWindow"

interface Pagination {
  current_page: number
  last_page: number
  total: number
  per_page: number
  from: number
  to: number
}

interface FilteredData {
  attributes: {
    data: ICandidate[]
    current_page: number
    last_page: number
    total: number
    per_page: number
    from: number
    to: number
  }
}

interface ActiveFilters {
  status: string[]
  vacancy: string[]
  dateRange: {
    type: string
    start: Date | null
    end: Date | null
  }
}

interface CandidatesTableProps {
  onFiltersClick: () => void
  onRowClick: (vacancyKey: string) => void
  filtersButtonRef: RefObject<HTMLButtonElement | null>
  filteredData: ICandidatesResponse | null
  activeFilters: ActiveFilters | null
  onFiltersReset: () => void
  selectedCity: string
}

const CandidatesTable: React.FC<CandidatesTableProps> = ({
  onFiltersClick,
  onRowClick,
  filtersButtonRef,
  filteredData,
  activeFilters,
  onFiltersReset,
  selectedCity,
}) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const getAccessToken = () => {
    if (typeof document === "undefined") return null

    const cookies = document.cookie.split(";")
    const tokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("access_token=")
    )
    return tokenCookie ? tokenCookie.split("=")[1] : null
  }

  const getROPKey = () => {
    if (typeof document === "undefined") return null

    const cookies = document.cookie.split(";")
    const ropKeyCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("ropKey=")
    )
    return ropKeyCookie ? ropKeyCookie.split("=")[1] : null
  }

  const token = getAccessToken()

  const [candidates, setCandidates] = useState<ICandidateTableItem[]>([])
  const [loading, setLoading] = useState(false) // Изменено на false, так как родительский компонент управляет загрузкой
  const [error, setError] = useState("")
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)
  const [pagination, setPagination] = useState<Pagination>({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 8,
    from: 0,
    to: 0,
  })

  const [isFormatDropdownOpen, setIsFormatDropdownOpen] = useState(false)
  const [selectedFormat, setSelectedFormat] = useState(".xlsx")
  const [isAuthorized, setIsAuthorized] = useState(true) // Теперь всегда true, так как проверка уже прошла

  // Состояние для модального окна удаления
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  // Адаптивные состояния
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  // Состояния для мобильной пагинации
  const [allCandidates, setAllCandidates] = useState<ICandidateTableItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMorePages, setHasMorePages] = useState(false)
  const [loadMoreLoading, setLoadMoreLoading] = useState(false)

  // API функции для tanstack/react-query
  const downloadSingleFile = async ({
    vacancyKey,
    candidateName,
    selectedFormat,
  }: {
    vacancyKey: string
    candidateName: string
    selectedFormat: string
  }) => {
    const token = getAccessToken()
    if (!token) {
      throw new Error("Токен авторизации не найден")
    }

    const endpoint = selectedFormat === ".pdf" ? "pdf-format" : "xlsx-format"
    const url = `${process.env.NEXT_PUBLIC_API_URL}/export/${endpoint}?keys=${encodeURIComponent(vacancyKey)}`

    const headers: Record<string, string> = {
      accept:
        selectedFormat === ".pdf" ? "application/pdf" : "application/json",
      Authorization: `Bearer ${token}`,
      "X-CSRF-TOKEN": "p4RiyjWRDjpZo3M9akdBjm8tLR4AhkblqCoVUgmH",
    }

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
      mode: "cors",
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Неавторизован. Пожалуйста, войдите в систему")
      } else if (response.status === 403) {
        throw new Error("Доступ запрещен")
      } else if (response.status === 404) {
        throw new Error("Файл не найден или некорректный ключ")
      } else {
        throw new Error(`Ошибка сервера: ${response.status}`)
      }
    }

    // Проверяем Content-Type в зависимости от формата
    const contentType = response.headers.get("content-type")
    if (selectedFormat === ".pdf") {
      if (!contentType || !contentType.includes("application/pdf")) {
      }
    } else if (selectedFormat === ".xlsx") {
      if (
        !contentType ||
        (!contentType.includes(
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) &&
          !contentType.includes("application/octet-stream"))
      ) {
      }
    }

    const blob = await response.blob()

    if (blob.size === 0) {
      throw new Error("Получен пустой файл")
    }

    return { blob, candidateName, selectedFormat }
  }

  const downloadMultipleFiles = async ({
    selectedKeys,
    selectedFormat,
  }: {
    selectedKeys: string[]
    selectedFormat: string
  }) => {
    const token = getAccessToken()
    if (!token) {
      throw new Error("Токен авторизации не найден")
    }

    const endpoint = selectedFormat === ".pdf" ? "pdf-format" : "xlsx-format"
    let url = `${process.env.NEXT_PUBLIC_API_URL}/export/${endpoint}`

    if (selectedKeys.length > 0) {
      const keysParam = selectedKeys.join(",")
      url += `?keys=${encodeURIComponent(keysParam)}`
    }

    const headers: Record<string, string> = {
      accept:
        selectedFormat === ".pdf" ? "application/pdf" : "application/json",
      Authorization: `Bearer ${token}`,
      "X-CSRF-TOKEN": "p4RiyjWRDjpZo3M9akdBjm8tLR4AhkblqCoVUgmH",
    }

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
      mode: "cors",
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Неавторизован. Пожалуйста, войдите в систему")
      } else if (response.status === 403) {
        throw new Error("Доступ запрещен")
      } else if (response.status === 404) {
        throw new Error("Файл не найден или некорректные ключи")
      } else {
        throw new Error(`Ошибка сервера: ${response.status}`)
      }
    }

    // Проверяем Content-Type для PDF
    if (selectedFormat === ".pdf") {
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/pdf")) {
      }
    }

    const blob = await response.blob()

    if (blob.size === 0) {
      throw new Error("Получен пустой файл")
    }

    return { blob, selectedKeys, selectedFormat }
  }

  const deleteCandidates = async ({
    selectedKeys,
  }: {
    selectedKeys: string[]
  }) => {
    const token = getAccessToken()
    if (!token) {
      throw new Error("Токен авторизации не найден")
    }

    const keysParam = selectedKeys.join(",")
    const url = `${process.env.NEXT_PUBLIC_API_URL}/candidates/destroy?keys=${encodeURIComponent(keysParam)}`

    const headers: Record<string, string> = {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
      "X-CSRF-TOKEN": "p4RiyjWRDjpZo3M9akdBjm8tLR4AhkblqCoVUgmH",
    }

    const response = await fetch(url, {
      method: "DELETE",
      headers: headers,
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Неавторизован. Пожалуйста, войдите в систему")
      } else if (response.status === 403) {
        throw new Error("Доступ запрещен")
      } else if (response.status === 404) {
        throw new Error("Анкеты не найдены")
      } else {
        throw new Error(`Ошибка сервера: ${response.status}`)
      }
    }

    return { deletedKeys: selectedKeys }
  }

  // Мутации для tanstack/react-query
  const singleDownloadMutation = useMutation({
    mutationFn: downloadSingleFile,
    onSuccess: ({ blob, candidateName, selectedFormat }) => {
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = downloadUrl
      link.style.display = "none"

      const fileName = `${candidateName.replace(/\s+/g, "_")}_${
        new Date().toISOString().split("T")[0]
      }${selectedFormat}`
      link.download = fileName

      document.body.appendChild(link)
      link.click()

      // Небольшая задержка перед удалением ссылки
      setTimeout(() => {
        document.body.removeChild(link)
        window.URL.revokeObjectURL(downloadUrl)
      }, 100)
    },
    onError: (error) => {
      alert(`Ошибка при скачивании файла: ${error.message}`)
    },
  })

  const multipleDownloadMutation = useMutation({
    mutationFn: downloadMultipleFiles,
    onSuccess: ({ blob, selectedKeys, selectedFormat }) => {
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = downloadUrl
      link.style.display = "none"

      const fileName =
        selectedKeys.length > 0
          ? `candidates_export_${
              new Date().toISOString().split("T")[0]
            }${selectedFormat}`
          : `all_candidates_export_${
              new Date().toISOString().split("T")[0]
            }${selectedFormat}`
      link.download = fileName

      document.body.appendChild(link)
      link.click()

      // Небольшая задержка перед удалением ссылки
      setTimeout(() => {
        document.body.removeChild(link)
        window.URL.revokeObjectURL(downloadUrl)
      }, 100)

      const exportMessage =
        selectedKeys.length > 0
          ? `Успешно скачано ${selectedKeys.length} анкет в формате ${selectedFormat}`
          : `Успешно скачаны все анкеты в формате ${selectedFormat}`
    },
    onError: (error) => {
      alert(`Ошибка при скачивании файла: ${error.message}`)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteCandidates,
    onSuccess: ({ deletedKeys }) => {
      const deletedCount = deletedKeys.length
      

      setCandidates((prev) =>
        prev.filter((candidate) => !deletedKeys.includes(candidate.vacancyKey))
      )
      

      setPagination((prev) => {
        const newTotal = Math.max(0, prev.total - deletedCount)
        const newTo = Math.max(0, prev.to - deletedCount)
        

        let newCurrentPage = prev.current_page
        if (prev.current_page > 1 && newTo <= (prev.current_page - 1) * prev.per_page) {
          newCurrentPage = prev.current_page - 1
        }
        

        const newLastPage = Math.max(1, Math.ceil(newTotal / prev.per_page))
        

        if (newCurrentPage > newLastPage) {
          newCurrentPage = newLastPage
        }
        

        if (newCurrentPage !== prev.current_page) {
          setTimeout(() => {
            fetchCandidates(newCurrentPage, activeFilters !== null)
          }, 100)
        }
        
        return {
          ...prev,
          total: newTotal,
          to: newTo,
          current_page: newCurrentPage,
          last_page: newLastPage,
          from: newTotal > 0 ? (newCurrentPage - 1) * prev.per_page + 1 : 0,
        }
      })
      
      setSelectedKeys([])
      setIsDeleteModalOpen(false)

      // Инвалидируем кэш кандидатов для обновления данных
      queryClient.invalidateQueries({ queryKey: ["candidates"] })
    },
    onError: (error) => {
      alert(`Ошибка при удалении: ${error.message}`)
    },
  })

  useEffect(() => {
    const applyStyles = (element: Element) => {
      const sectionElement = element as HTMLElement
      sectionElement.style.setProperty("max-width", "none", "important")
      sectionElement.style.setProperty("width", "100%", "important")
      sectionElement.style.setProperty("margin", "0", "important")
    }

    const sectionElement = document.querySelector("section")

    if (sectionElement) {
      applyStyles(sectionElement)
    } else {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element
              if (element.tagName === "SECTION") {
                applyStyles(element)
                observer.disconnect()
              } else if (element.querySelector) {
                const section = element.querySelector("section")
                if (section) {
                  applyStyles(section)
                  observer.disconnect()
                }
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
        const sectionElement = document.querySelector("section")
        if (sectionElement) {
          sectionElement.style.removeProperty("max-width")
          sectionElement.style.removeProperty("width")
          sectionElement.style.removeProperty("margin")
        }
      }
    }

    return () => {
      const sectionElement = document.querySelector("section")
      if (sectionElement) {
        sectionElement.style.removeProperty("max-width")
        sectionElement.style.removeProperty("width")
        sectionElement.style.removeProperty("margin")
      }
    }
  }, [])

  // Адаптивная логика
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width < 1440)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const getCsrfToken = () => {
    const metaTag = document.querySelector('meta[name="csrf-token"]')
    return metaTag ? metaTag.getAttribute("content") : null
  }

  const formatDateTime = (dateString: string) => {
    if (!dateString) return "Не указано"

    try {
      const date = new Date(dateString)
      const day = date.getDate().toString().padStart(2, "0")
      const month = (date.getMonth() + 1).toString().padStart(2, "0")
      const year = date.getFullYear()
      const hours = date.getHours().toString().padStart(2, "0")
      const minutes = date.getMinutes().toString().padStart(2, "0")

      return `${day}.${month}.${year} ${hours}:${minutes}`
    } catch (err) {
      return "Неверная дата"
    }
  }

  const transformCandidateToTableItem = (
    candidate: ICandidate
  ): ICandidateTableItem => ({
    id: candidate.id.toString(),
    name: `${candidate.last_name} ${candidate.first_name} ${
      candidate.middle_name || ""
    }`.trim(),
    rop:
      candidate.work_team && candidate.work_team !== "Административный состав"
        ? candidate.work_team
        : "-",
    datetime: formatDateTime(candidate.created_at || new Date().toISOString()),
    vacancy: candidate.vacancy?.attributes?.title || "Не указана",
    status: candidate.status || "Не определен",
    statusID: getStatusId(candidate.status),
    hasVacancyComment: candidate.comment,
    vacancyKey: candidate.key,
    fullData: {
      id: candidate.id,
      key: candidate.key,
      last_name: candidate.last_name,
      first_name: candidate.first_name,
      middle_name: candidate.middle_name,
      created_at: candidate.created_at,
      status: candidate.status,
      comment: candidate.comment,
      work_team: candidate.work_team,
      vacancy: candidate.vacancy,
    },
  })

  const getStatusId = (status: string) => {
    switch (status) {
      case "Новая анкета":
        return "new"
      case "Проверен":
        return "checked"
      case "Нужна доработка":
        return "needRevision"
      case "Отклонен":
        return "rejected"
      case "Принят":
        return "accepted"
      case "Не принят":
        return "not"
      case "Вышел":
        return "startWorking"
      case "Не вышел":
        return "not"
      default:
        return "new"
    }
  }

  const getStatusText = (status: string) => {
    return status
  }

  const handleCheckboxChange = (vacancyKey: string, isChecked: boolean) => {
    setSelectedKeys((prev) => {
      if (isChecked) {
        return prev.includes(vacancyKey) ? prev : [...prev, vacancyKey]
      } else {
        return prev.filter((key) => key !== vacancyKey)
      }
    })
  }

  const handleSelectAll = () => {
    const allVacancyKeys = candidates.map((candidate) => candidate.vacancyKey)
    const allSelected = allVacancyKeys.every((key) =>
      selectedKeys.includes(key)
    )

    if (allSelected) {
      setSelectedKeys((prev) =>
        prev.filter((key) => !allVacancyKeys.includes(key))
      )
    } else {
      setSelectedKeys((prev) => {
        const newKeys = allVacancyKeys.filter((key) => !prev.includes(key))
        return [...prev, ...newKeys]
      })
    }
  }

  // Функция для обработки удаления
  const handleDelete = () => {
    if (selectedKeys.length === 0) {
      return
    }

    deleteMutation.mutate({ selectedKeys })
  }

  const handleDeleteClick = () => {
    if (selectedKeys.length === 0) {
      return
    }
    setIsDeleteModalOpen(true)
  }

  const handleSingleDownload = (vacancyKey: string, candidateName: string) => {
    singleDownloadMutation.mutate({ vacancyKey, candidateName, selectedFormat })
  }

  const handleDownload = () => {
    multipleDownloadMutation.mutate({ selectedKeys, selectedFormat })
  }

  // Утилиты для работы с фильтрами
  const formatApiDateRange = (
    startDate: Date,
    endDate: Date,
    type: string
  ): string | null => {
    if (!startDate || !endDate) return null

    const formatDate = (date: Date): string => {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, "0")
      const day = String(date.getDate()).padStart(2, "0")
      return `${year}-${month}-${day}`
    }

    const formatMonth = (date: Date): string => {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, "0")
      return `${year}-${month}`
    }

    const formatYear = (date: Date): string => {
      return String(date.getFullYear())
    }

    switch (type) {
      case "dates":
        return `${formatDate(startDate)},${formatDate(endDate)}`
      case "months":
        return `${formatMonth(startDate)},${formatMonth(endDate)}`
      case "years":
        return `${formatYear(startDate)},${formatYear(endDate)}`
      default:
        return `${formatDate(startDate)},${formatDate(endDate)}`
    }
  }

  const getStatusApiValues = (statusFilters: string[]): string[] => {
    const statusMap: Record<string, string> = {
      showAll: "",
      new: "Новая анкета",
      checked: "Проверен",
      "needs-work": "Нужна доработка",
      rejected: "Отклонен",
      hired: "Принят",
      not_hired: "Не принят",
      start_work: "Вышел",
      not_start_work: "Не вышел",
    }

    return statusFilters
      .filter((status) => status !== "showAll")
      .map((status) => statusMap[status] || status)
      .filter(Boolean)
  }

  const getVacancyApiValues = (vacancyFilters: string[]): string[] => {
    return vacancyFilters.filter((vacancy) => vacancy !== "showAll")
  }

  const buildFiltersQueryString = (filters: ActiveFilters | null): string => {
    if (!filters) return ""

    const queryParams: string[] = []

    // Добавляем город
    if (selectedCity) {
      queryParams.push(`city_work=${encodeURIComponent(selectedCity)}`)
    }

    const ropKey = getROPKey()
    if (ropKey) {
      queryParams.push(`rop_key=${encodeURIComponent(ropKey)}`)
    }

    // Добавляем диапазон дат
    if (filters.dateRange.start && filters.dateRange.end) {
      const dateRange = formatApiDateRange(
        filters.dateRange.start,
        filters.dateRange.end,
        filters.dateRange.type
      )

      if (dateRange) {
        switch (filters.dateRange.type) {
          case "years":
            queryParams.push(`year_range=${dateRange}`)
            break
          case "months":
            queryParams.push(`month_range=${dateRange}`)
            break
          case "dates":
            queryParams.push(`date_range=${dateRange}`)
            break
        }
      }
    }

    // Добавляем статусы
    const statusValues = getStatusApiValues(filters.status)
    if (statusValues.length > 0) {
      queryParams.push(`candidate_statuses=${statusValues.join(",")}`)
    }

    // Добавляем вакансии
    const vacancyValues = getVacancyApiValues(filters.vacancy)
    if (vacancyValues.length > 0) {
      queryParams.push(`vacancy_keys=${vacancyValues.join(",")}`)
    }

    return queryParams.join("&")
  }

  const fetchCandidates = async (page = 1, useFilters = false) => {
    setError("")
    setLoading(true)

    try {
      const token = getAccessToken()
      if (!token) {
        throw new Error("Токен авторизации не найден")
      }

      const ropKey = getROPKey()

      // Проверяем доступность cookie
      if (typeof document === "undefined") {
        setLoading(false)
        return
      }

      // Формируем базовый URL с пагинацией
      let url = `${process.env.NEXT_PUBLIC_API_URL}/candidates/?page=${page}&city_work=${encodeURIComponent(
        selectedCity
      )}`

      if (ropKey) {
        url += `&rop_key=${encodeURIComponent(ropKey)}`
      }

      // Если есть активные фильтры, добавляем их к URL
      if (useFilters && activeFilters) {
        const filtersQueryString = buildFiltersQueryString(activeFilters)
        if (filtersQueryString) {
          // Убираем city_work и rop_key из filtersQueryString, так как они уже есть в базовом URL
          const filtersWithoutDuplicates = filtersQueryString.replace(
            /(city_work=[^&]*&?|rop_key=[^&]*&?)/g,
            ""
          )
          if (filtersWithoutDuplicates) {
            url += `&${filtersWithoutDuplicates}`
          }
        }
      }

      const headers: Record<string, string> = {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": "p4RiyjWRDjpZo3M9akdBjm8tLR4AhkblqCoVUgmH",
      }

      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      })

      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`)
      }

      const data: ICandidatesResponse = await response.json()

      if (data.response && data.attributes) {
        const transformedCandidates = data.attributes.data.map(
          (candidate: ICandidate) => transformCandidateToTableItem(candidate)
        )

        setCandidates(transformedCandidates)
        setAllCandidates(transformedCandidates)
        setCurrentPage(data.attributes.current_page)
        setHasMorePages(
          data.attributes.current_page < data.attributes.last_page
        )
        setPagination({
          current_page: data.attributes.current_page,
          last_page: data.attributes.last_page,
          total: data.attributes.total,
          per_page: data.attributes.per_page,
          from: data.attributes.from,
          to: data.attributes.to,
        })
      } else {
        throw new Error("Неверный формат ответа сервера")
      }
    } catch (err) {
      console.error("Ошибка при загрузке кандидатов:", err)
      const mockCandidates: ICandidateTableItem[] = [
        {
          id: "1",
          name: "Иванов Иван Иванович",
          rop: "-",
          datetime: "15.01.2025 14:30",
          vacancy: "Frontend разработчик",
          status: "Новая анкета",
          statusID: "new",
          hasVacancyComment: "Требует дополнительной проверки",
          vacancyKey: "mock-key-1",
          fullData: {
            id: 1,
            key: "mock-key-1",
            last_name: "Иванов",
            first_name: "Иван",
            middle_name: "Иванович",
            created_at: "2025-01-15T14:30:00Z",
            status: "Новая анкета",
            comment: "Требует дополнительной проверки",
            work_team: "Административный состав",
            vacancy: {
              attributes: {
                title: "Frontend разработчик",
              },
            },
          },
        },
        {
          id: "2",
          name: "Петров Петр Петрович",
          rop: "Маликова Е.",
          datetime: "14.01.2025 10:15",
          vacancy: "Backend разработчик",
          status: "Проверен",
          statusID: "checked",
          hasVacancyComment: "Мутный челик, не понравился",
          vacancyKey: "mock-key-2",
          fullData: {
            id: 2,
            key: "mock-key-2",
            last_name: "Петров",
            first_name: "Петр",
            middle_name: "Петрович",
            created_at: "2025-01-14T10:15:00Z",
            status: "Проверен",
            comment: "Мутный челик, не понравился",
            work_team: "Команда разработки",
            vacancy: {
              attributes: {
                title: "Backend разработчик",
              },
            },
          },
        },
        {
          id: "3",
          name: "Сидорова Анна Михайловна",
          rop: "Маликова Е.",
          datetime: "13.01.2025 16:45",
          vacancy: "UI/UX дизайнер",
          status: "Нужна доработка",
          statusID: "needRevision",
          hasVacancyComment: "Необходимо уточнить опыт работы",
          vacancyKey: "mock-key-3",
          fullData: {
            id: 3,
            key: "mock-key-3",
            last_name: "Сидорова",
            first_name: "Анна",
            middle_name: "Михайловна",
            created_at: "2025-01-13T16:45:00Z",
            status: "Нужна доработка",
            comment: "Необходимо уточнить опыт работы",
            work_team: "Команда дизайна",
            vacancy: {
              attributes: {
                title: "UI/UX дизайнер",
              },
            },
          },
        },
        {
          id: "4",
          name: "Козлов Алексей Владимирович",
          rop: "Маликова Е.",
          datetime: "12.01.2025 09:20",
          vacancy: "Project Manager",
          status: "Отклонен",
          statusID: "rejected",
          hasVacancyComment: "Не соответствует требованиям",
          vacancyKey: "mock-key-4",
          fullData: {
            id: 4,
            key: "mock-key-4",
            last_name: "Козлов",
            first_name: "Алексей",
            middle_name: "Владимирович",
            created_at: "2025-01-12T09:20:00Z",
            status: "Отклонен",
            comment: "Не соответствует требованиям",
            work_team: "Управление проектами",
            vacancy: {
              attributes: {
                title: "Project Manager",
              },
            },
          },
        },
        {
          id: "5",
          name: "Козлов Алексей Владимирович",
          rop: "Маликова Е.",
          datetime: "12.01.2025 09:20",
          vacancy: "Project Manager",
          status: "Принят",
          statusID: "hired",
          hasVacancyComment: "Отличный кандидат",
          vacancyKey: "mock-key-5",
          fullData: {
            id: 5,
            key: "mock-key-5",
            last_name: "Козлов",
            first_name: "Алексей",
            middle_name: "Владимирович",
            created_at: "2025-01-12T09:20:00Z",
            status: "Принят",
            comment: "Отличный кандидат",
            work_team: "Управление проектами",
            vacancy: {
              attributes: {
                title: "Project Manager",
              },
            },
          },
        },
        {
          id: "6",
          name: "Смирнова Елена Петровна",
          rop: "Маликова Е.",
          datetime: "11.01.2025 15:30",
          vacancy: "UI/UX дизайнер",
          status: "Вышел",
          statusID: "start_work",
          hasVacancyComment: "Начал работу",
          vacancyKey: "mock-key-6",
          fullData: {
            id: 6,
            key: "mock-key-6",
            last_name: "Смирнова",
            first_name: "Елена",
            middle_name: "Петровна",
            created_at: "2025-01-11T15:30:00Z",
            status: "Вышел",
            comment: "Начал работу",
            work_team: "Команда дизайна",
            vacancy: {
              attributes: {
                title: "UI/UX дизайнер",
              },
            },
          },
        },
        {
          id: "7",
          name: "Петров Сергей Иванович",
          rop: "Маликова Е.",
          datetime: "10.01.2025 12:15",
          vacancy: "Backend разработчик",
          status: "Не принят",
          statusID: "not_hired",
          hasVacancyComment: "Не подошел по требованиям",
          vacancyKey: "mock-key-7",
          fullData: {
            id: 7,
            key: "mock-key-7",
            last_name: "Петров",
            first_name: "Сергей",
            middle_name: "Иванович",
            created_at: "2025-01-10T12:15:00Z",
            status: "Не принят",
            comment: "Не подошел по требованиям",
            work_team: "Команда разработки",
            vacancy: {
              attributes: {
                title: "Backend разработчик",
              },
            },
          },
        },
        {
          id: "8",
          name: "Козлова Мария Сергеевна",
          rop: "Маликова Е.",
          datetime: "09.01.2025 18:45",
          vacancy: "Frontend разработчик",
          status: "Не вышел",
          statusID: "not_start_work",
          hasVacancyComment: "Не явился на работу",
          vacancyKey: "mock-key-8",
          fullData: {
            id: 8,
            key: "mock-key-8",
            last_name: "Козлова",
            first_name: "Мария",
            middle_name: "Сергеевна",
            created_at: "2025-01-09T18:45:00Z",
            status: "Не вышел",
            comment: "Не явился на работу",
            work_team: "Команда разработки",
            vacancy: {
              attributes: {
                title: "Frontend разработчик",
              },
            },
          },
        },
      ]

      setCandidates(mockCandidates)
      setAllCandidates(mockCandidates)
      setCurrentPage(1)
      setHasMorePages(false)
      setPagination({
        current_page: 1,
        last_page: 1,
        total: 8,
        per_page: 8,
        from: 1,
        to: 8,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRowClick = (
    candidate: ICandidateTableItem,
    event: React.MouseEvent
  ) => {
    if (
      (event.target as HTMLElement).tagName === "INPUT" ||
      (event.target as HTMLElement).closest("button") ||
      (event.target as HTMLElement).closest("label")
    ) {
      return
    }

    if (onRowClick) {
      onRowClick(candidate.vacancyKey)
    }
  }

  const handlePageChange = (page: number) => {
    if (
      page >= 1 &&
      page <= pagination.last_page &&
      page !== pagination.current_page
    ) {
      // Передаем true если есть активные фильтры, иначе false
      const hasActiveFilters =
        activeFilters !== null &&
        ((activeFilters.status &&
          activeFilters.status.length > 0 &&
          !activeFilters.status.includes("showAll")) ||
          (activeFilters.vacancy &&
            activeFilters.vacancy.length > 0 &&
            !activeFilters.vacancy.includes("showAll")) ||
          (activeFilters.dateRange &&
            activeFilters.dateRange.start !== null &&
            activeFilters.dateRange.end !== null))

      fetchCandidates(page, hasActiveFilters)
    }
  }

  const handleLoadMore = async () => {
    if (loadMoreLoading || !hasMorePages) return

    setLoadMoreLoading(true)
    const nextPage = currentPage + 1

    try {
      const token = getAccessToken()
      if (!token) {
        throw new Error("Токен авторизации не найден")
      }

      let url = `${process.env.NEXT_PUBLIC_API_URL}/candidates/?page=${nextPage}&city_work=${encodeURIComponent(
        selectedCity
      )}`

      const headers: Record<string, string> = {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": "p4RiyjWRDjpZo3M9akdBjm8tLR4AhkblqCoVUgmH",
      }

      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      })

      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`)
      }

      const data: ICandidatesResponse = await response.json()

      if (data.response && data.attributes) {
        const newCandidates = data.attributes.data.map(
          (candidate: ICandidate) => transformCandidateToTableItem(candidate)
        )

        setAllCandidates((prev) => [...prev, ...newCandidates])
        setCandidates((prev) => [...prev, ...newCandidates])
        setCurrentPage(nextPage)
        setHasMorePages(nextPage < data.attributes.last_page)
      }
    } catch (err) {
      console.error("Ошибка при загрузке дополнительных кандидатов:", err)
    } finally {
      setLoadMoreLoading(false)
    }
  }

  const generatePageNumbers = () => {
    const { current_page, last_page } = pagination
    const pages: (number | string)[] = []

    if (last_page <= 5) {
      for (let i = 1; i <= last_page; i++) {
        pages.push(i)
      }
    } else {
      if (current_page <= 3) {
        pages.push(1, 2, 3, "...", last_page)
      } else if (current_page >= last_page - 2) {
        pages.push(1, "...", last_page - 2, last_page - 1, last_page)
      } else {
        pages.push(
          1,
          "...",
          current_page - 1,
          current_page,
          current_page + 1,
          "...",
          last_page
        )
      }
    }

    return pages
  }

  useEffect(() => {
    if (filteredData) {
      const transformedCandidates = filteredData.attributes.data.map(
        (candidate: ICandidate) => transformCandidateToTableItem(candidate)
      )
      setCandidates(transformedCandidates)
      setAllCandidates(transformedCandidates)
      setCurrentPage(filteredData.attributes.current_page)
      setHasMorePages(
        filteredData.attributes.current_page < filteredData.attributes.last_page
      )
      setPagination({
        current_page: filteredData.attributes.current_page,
        last_page: filteredData.attributes.last_page,
        total: filteredData.attributes.total,
        per_page: filteredData.attributes.per_page,
        from: filteredData.attributes.from,
        to: filteredData.attributes.to,
      })

      // Сбрасываем выбранные элементы при применении фильтров
      setSelectedKeys([])
    }
  }, [filteredData])

  useEffect(() => {
    // Добавляем небольшую задержку, чтобы убедиться, что cookie доступны
    const timer = setTimeout(() => {
      if (!filteredData && candidates.length === 0) {
        fetchCandidates(1, false)
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Добавляем небольшую задержку для доступа к cookie
    const timer = setTimeout(() => {
      if (selectedCity && !filteredData && candidates.length > 0) {
        fetchCandidates(1, false)
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [selectedCity])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (candidates.length === 0 && !loading && !filteredData) {
        fetchCandidates(1, false)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {}, [selectedKeys])

  const handleFormatDropdownToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFormatDropdownOpen(!isFormatDropdownOpen)
  }

  const handleFormatSelect = (format: string) => {
    setSelectedFormat(format)
    setIsFormatDropdownOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isFormatDropdownOpen &&
        !(e.target as HTMLElement).closest(".download-button-group")
      ) {
        setIsFormatDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isFormatDropdownOpen])

  return (
    <>
      <section style={{ flexWrap: "wrap", minHeight: "auto", padding: "0" }}>
        <FormRow className="w-80 filtersRow" justifyContent="space-between">
          <div className="flex-direction-column">
            <h1 className="tableHeading">Кандидаты</h1>
            <button className="aButton" id="checkAll" onClick={handleSelectAll}>
              {candidates.length > 0 &&
              candidates.every((c) => selectedKeys.includes(c.vacancyKey))
                ? "Снять выбор со всех"
                : "Выбрать всех"}
            </button>
          </div>
          <button
            ref={filtersButtonRef}
            id="filters"
            aria-label="Нажмите, чтобы открыть фильтры"
            onClick={onFiltersClick}
          >
            <Image
              src="/images/candidatesSecurityImg/filters.webp"
              alt="PNG картинка, фильтров"
              width={20}
              height={20}
            />
            Фильтры
          </button>
        </FormRow>

        {candidates.length === 0 ? (
          <div
            className="w-80"
            style={{ textAlign: "center", padding: "40px" }}
          >
            <p>Нет данных для отображения</p>
            {loading && <p>Загрузка данных...</p>}
            {error && (
              <p style={{ color: "red", marginTop: "10px" }}>Ошибка: {error}</p>
            )}
          </div>
        ) : (
          <>
            {/* Десктопная версия таблицы */}
            <div className="desktop-table-container">
              <table className="candidatesTable w-80">
                <thead>
                  <tr style={{ border: "0" }}>
                    <th></th>
                    <th>ФИО Кандидата</th>
                    <th>РОП</th>
                    <th>Дата и время</th>
                    <th>Вакансия</th>
                    <th style={{ textAlign: "right", paddingRight: "30px" }}>
                      Статус
                    </th>
                    <th style={{ width: "100px" }}></th>
                  </tr>
                </thead>
                <tbody id="candidatesTableBody">
                  {candidates.map((candidate) => (
                    <tr
                      key={candidate.id}
                      data-keyvacancy={candidate.vacancyKey}
                      onClick={(e) => handleRowClick(candidate, e)}
                      style={{ cursor: "pointer" }}
                    >
                      <td>
                        <label
                          className="custom-checkbox"
                          htmlFor={`personalData${candidate.id}`}
                        >
                          <input
                            type="checkbox"
                            name="personalData"
                            id={`personalData${candidate.id}`}
                            checked={selectedKeys.includes(
                              candidate.vacancyKey
                            )}
                            onChange={(e) =>
                              handleCheckboxChange(
                                candidate.vacancyKey,
                                e.target.checked
                              )
                            }
                          />
                          <span className="checkmark"></span>
                        </label>
                      </td>
                      <td>{candidate.name}</td>
                      <td>{candidate.rop}</td>
                      <td>{candidate.datetime}</td>
                      <td>{candidate.vacancy}</td>
                      <td
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginRight: "20px",
                        }}
                      >
                        <p className="status" id={candidate.statusID}>
                          {getStatusText(candidate.status)}
                        </p>
                      </td>
                      <td>
                        {candidate.hasVacancyComment && (
                          <button
                            id={`radactBtn${candidate.id}`}
                            className="redactBtn"
                            onClick={(e) => e.stopPropagation()}
                            onMouseEnter={() => setActiveTooltip(candidate.id)}
                            onMouseLeave={() => setActiveTooltip(null)}
                          >
                            <Image
                              src="/images/candidatesSecurityImg/pen.webp"
                              alt="Кнопка комментария"
                              width={20}
                              height={20}
                            />
                            <div
                              className={`comment-tooltip ${
                                activeTooltip === candidate.id ? "visible" : ""
                              }`}
                            >
                              {candidate.hasVacancyComment}
                            </div>
                          </button>
                        )}
                        <button
                          id={`downloadBtn${candidate.id}`}
                          className={"downloadBtn"}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSingleDownload(
                              candidate.vacancyKey,
                              candidate.name
                            )
                          }}
                          disabled={singleDownloadMutation.isPending}
                          title={
                            singleDownloadMutation.isPending
                              ? "Скачивание..."
                              : `Скачать анкету в формате ${selectedFormat}`
                          }
                        >
                          {singleDownloadMutation.isPending ? (
                            <span>⏳</span>
                          ) : (
                            <Image
                              src="/images/icons/download.svg"
                              alt="Download"
                              width={20}
                              height={20}
                            />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Мобильная версия карточек */}
            <div className="mobile-cards-container">
              {candidates.map((candidate) => (
                <MobileCandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  isSelected={selectedKeys.includes(candidate.vacancyKey)}
                  onCheckboxChange={handleCheckboxChange}
                  onRowClick={handleRowClick}
                  onSingleDownload={handleSingleDownload}
                  singleDownloadLoading={{
                    [candidate.vacancyKey]: singleDownloadMutation.isPending,
                  }}
                  activeTooltip={activeTooltip}
                  setActiveTooltip={setActiveTooltip}
                  getStatusText={getStatusText}
                />
              ))}
            </div>

            {/* Мобильная пагинация */}
            {isMobile ? (
              <div className="mobile-pagination-container">
                <div className="load-more-section">
                  <button
                    className="load-more-btn"
                    onClick={handleLoadMore}
                    disabled={!hasMorePages || loadMoreLoading}
                  >
                    {loadMoreLoading ? "Загрузка..." : "Показать еще"}
                  </button>
                </div>
                <div className="download-button-group">
                  <button
                    className="deleteBtn"
                    onClick={handleDeleteClick}
                    disabled={
                      selectedKeys.length === 0 || deleteMutation.isPending
                    }
                  >
                    {deleteMutation.isPending ? "Удаление..." : "Удалить"}
                  </button>
                  <button
                    className="download-btn primary"
                    onClick={handleDownload}
                    disabled={multipleDownloadMutation.isPending}
                  >
                    {multipleDownloadMutation.isPending
                      ? "Скачивание..."
                      : "Скачать выбранные"}
                  </button>
                  <button
                    className="download-btn dropdown-toggle"
                    onClick={handleFormatDropdownToggle}
                    disabled={multipleDownloadMutation.isPending}
                  >
                    <span className="format-text">{selectedFormat}</span>
                    <Image
                      src="/images/icons/chevron-down.svg"
                      alt="Dropdown"
                      width={16}
                      height={16}
                      className="chevron-down"
                    />
                  </button>
                  <div
                    className={`file-formats-card ${
                      isFormatDropdownOpen ? "" : "hide"
                    }`}
                  >
                    <div
                      className="format-item"
                      onClick={() => handleFormatSelect(".xlsx")}
                    >
                      .xlsx
                    </div>
                    <div
                      className="format-item"
                      onClick={() => handleFormatSelect(".pdf")}
                    >
                      .pdf
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Десктопная пагинация */
              <FormRow
                className="w-80 pagination-container"
                justifyContent="space-between"
                style={{ marginTop: "2rem", padding: "0 20px" }}
              >
                <div className="left-side">
                  <button
                    id="prevBtn"
                    className={`navBtn ${
                      pagination.current_page === 1 ? "inactive" : ""
                    }`}
                    onClick={() =>
                      handlePageChange(pagination.current_page - 1)
                    }
                    disabled={pagination.current_page === 1}
                  >
                    {isTablet ? "Пред" : "Предыдущая"}
                  </button>
                  <div className="pagination">
                    {generatePageNumbers().map((page, index) => (
                      <button
                        key={index}
                        className={`paginationBtn ${
                          page === pagination.current_page ? "active" : ""
                        }`}
                        onClick={() =>
                          typeof page === "number"
                            ? handlePageChange(page)
                            : undefined
                        }
                        disabled={typeof page !== "number"}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button
                    id="nexBtn"
                    className={`navBtn ${
                      pagination.current_page === pagination.last_page
                        ? "inactive"
                        : ""
                    }`}
                    onClick={() =>
                      handlePageChange(pagination.current_page + 1)
                    }
                    disabled={pagination.current_page === pagination.last_page}
                  >
                    {isTablet ? "След" : "Следующая"}
                  </button>
                </div>
                <div className="download-button-group right-side">
                  <button
                    className="deleteBtn"
                    onClick={handleDeleteClick}
                    disabled={
                      selectedKeys.length === 0 || deleteMutation.isPending
                    }
                  >
                    {deleteMutation.isPending ? "Удаление..." : "Удалить"}
                  </button>
                  <button
                    className="download-btn primary"
                    onClick={handleDownload}
                    disabled={multipleDownloadMutation.isPending}
                  >
                    {multipleDownloadMutation.isPending
                      ? "Скачивание..."
                      : "Скачать"}
                  </button>
                  <button
                    className="download-btn dropdown-toggle"
                    onClick={handleFormatDropdownToggle}
                    disabled={multipleDownloadMutation.isPending}
                  >
                    <span className="format-text">{selectedFormat}</span>
                    <Image
                      src="/images/icons/chevron-down.svg"
                      alt="Dropdown"
                      width={16}
                      height={16}
                      className="chevron-down"
                    />
                  </button>
                  <div
                    className={`file-formats-card ${
                      isFormatDropdownOpen ? "" : "hide"
                    }`}
                  >
                    <div
                      className="format-item"
                      onClick={() => handleFormatSelect(".xlsx")}
                    >
                      .xlsx
                    </div>
                    <div
                      className="format-item"
                      onClick={() => handleFormatSelect(".pdf")}
                    >
                      .pdf
                    </div>
                  </div>
                </div>
              </FormRow>
            )}
          </>
        )}
      </section>

      {/* Модальное окно подтверждения удаления */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        header="Удалить анкеты?"
        title="Вы точно уверены, что хотите удалить эту вакансию из анкет кандидатов?"
        confirmText="Да, удалить"
        cancelText="Отмена"
      />
    </>
  )
}

export default CandidatesTable
