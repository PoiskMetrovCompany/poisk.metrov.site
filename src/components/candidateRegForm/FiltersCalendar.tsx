"use client"

import { useMutation } from "@tanstack/react-query"

import React, { RefObject, useEffect, useRef, useState } from "react"

import { useApiQuery } from "@/utils/hooks/use-api"

import styles from "./candidateLoginComponents.module.css"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

interface FilteredData {
  attributes: {
    data: any[]
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

interface VacancyOption {
  value: string
  text: string
  title: string | null
  key: string | null
}

interface VacancyApiItem {
  key: string
  title: string
}

interface VacanciesApiResponse {
  response: boolean
  attributes: VacancyApiItem[]
}

interface StatusFilter {
  value: string
  text: string
}

interface FiltersCalendarProps {
  isOpen: boolean
  onClose: () => void
  filtersButtonRef: RefObject<HTMLButtonElement | null>
  onFiltersApply: (data: FilteredData, filters: ActiveFilters) => void
  selectedCity: string
}

interface DateCell {
  day: number
  dateStr: string
  year: number
  month: number
  isSelected: boolean
  isInRange: boolean
  isStartDate: boolean
  isEndDate: boolean
}

interface MonthCell {
  month: number
  name: string
  dateStr: string
  year: number
  isSelected: boolean
  isInRange: boolean
  isStartDate: boolean
  isEndDate: boolean
}

interface YearCell {
  year: number
  dateStr: string
  isSelected: boolean
  isInRange: boolean
  isStartDate: boolean
  isEndDate: boolean
}

const FiltersCalendar: React.FC<FiltersCalendarProps> = ({
  isOpen,
  onClose,
  filtersButtonRef,
  onFiltersApply,
  selectedCity,
}) => {
  const [selectedFilters, setSelectedFilters] = useState<ActiveFilters>({
    status: ["showAll"],
    vacancy: ["showAll"],
    dateRange: {
      type: "dates",
      start: null,
      end: null,
    },
  })

  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [currentRangeType, setCurrentRangeType] = useState("dates")
  const [calendar1Date, setCalendar1Date] = useState(new Date(2022, 8, 1))
  const [calendar2Date, setCalendar2Date] = useState(new Date(2024, 8, 1))
  const [isCustomSelectOpen, setIsCustomSelectOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const [vacancyOptions, setVacancyOptions] = useState<VacancyOption[]>([])

  const {
    data: vacanciesData,
    isLoading: isLoadingVacancies,
    error: vacancyError,
  } = useApiQuery<VacanciesApiResponse>(
    ["vacancies"],
    `${API_BASE_URL}/vacancy/`,
    {
      enabled: true,
      staleTime: 5 * 60 * 1000,
      retry: 2,
    }
  )

  useEffect(() => {
    if (
      vacanciesData &&
      vacanciesData.response &&
      Array.isArray(vacanciesData.attributes)
    ) {
      const vacancies = [
        { value: "showAll", text: "Показать все", title: null, key: null },
        ...vacanciesData.attributes.map((vacancy: VacancyApiItem) => ({
          value: vacancy.key,
          text: vacancy.title,
          title: vacancy.title,
          key: vacancy.key,
        })),
      ]
      setVacancyOptions(vacancies)
    } else if (vacancyError) {
      setMockVacancies()
    }
  }, [vacanciesData, vacancyError])

  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ]

  const [candidatesError, setCandidatesError] = useState("")

  const calendarPanelRef = useRef<HTMLElement>(null)

  const statusFilters: StatusFilter[] = [
    { value: "showAll", text: "Показать все" },
    { value: "Новая анкета", text: "Новая анкета" },
    { value: "Проверен", text: "Проверен" },
    { value: "Нужна доработка", text: "Нужна доработка" },
    { value: "Отклонен", text: "Отклонен" },
  ]

  const formatApiDateRange = (startDate: Date, endDate: Date, type: string) => {
    if (!startDate || !endDate) return null

    const formatDate = (date: Date, rangeType: string) => {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, "0")
      const day = String(date.getDate()).padStart(2, "0")

      switch (rangeType) {
        case "years":
          return year.toString()
        case "months":
          return `${month}.${year}`
        case "dates":
          return `${day}.${month}.${year}`
        default:
          return ""
      }
    }

    const start = formatDate(startDate, type)
    const end = formatDate(endDate, type)

    return `${start},${end}`
  }

  const getStatusApiValues = (statusValues: string[]) => {
    if (statusValues.includes("showAll") || statusValues.length === 0) {
      return []
    }

    const statusMapping: Record<string, string> = {
      "Новая анкета": "Новая анкета",
      Проверен: "Проверен",
      "Нужна доработка": "Нужна доработка",
      Отклонен: "Отклонен",
    }

    return statusValues
      .filter((status) => statusMapping[status])
      .map((status) => statusMapping[status])
  }

  const getVacancyApiValues = (vacancyValues: string[]) => {
    if (vacancyValues.includes("showAll") || vacancyValues.length === 0) {
      return []
    }

    return vacancyValues
      .map((vacancyKey) => {
        const vacancy = vacancyOptions.find(
          (option) => option.value === vacancyKey
        )
        return vacancy ? vacancy.key : null
      })
      .filter(Boolean)
  }

  const getAccessTokenFromCookie = () => {
    const cookies = document.cookie.split(";")
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split("=")
      if (name === "access_token") {
        return value
      }
    }
    return null
  }

  const setMockVacancies = () => {
    const mockVacancies = [
      { value: "showAll", text: "Показать все", title: null, key: null },
      {
        value: "bcb609e6-95ae-4168-a168-3491eb4d8681",
        text: "Специалист по продаже недвижимости",
        title: "Специалист по продаже недвижимости",
        key: "bcb609e6-95ae-4168-a168-3491eb4d8681",
      },
      {
        value: "38b54878-7910-4de7-bc85-9a0b0ccc8197",
        text: "Ипотечный специалист",
        title: "Ипотечный специалист",
        key: "38b54878-7910-4de7-bc85-9a0b0ccc8197",
      },
      {
        value: "db147302-cf22-4f1a-ae93-0e3e56d22131",
        text: "Бухгалтер",
        title: "Бухгалтер",
        key: "db147302-cf22-4f1a-ae93-0e3e56d22131",
      },
    ]
    setVacancyOptions(mockVacancies)
  }

  const executeFiltersQuery = async ({
    queryString,
  }: {
    queryString: string
  }) => {
    const accessToken = getAccessTokenFromCookie()
    if (!accessToken) {
      throw new Error("Токен доступа не найден")
    }

    const apiUrl = `${API_BASE_URL}/candidates${queryString ? "?" + queryString : ""}`

    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-CSRF-TOKEN": "p4RiyjWRDjpZo3M9akdBjm8tLR4AhkblqCoVUgmH",
        accept: "*/*",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  }

  const applyFiltersMutation = useMutation({
    mutationFn: executeFiltersQuery,
    onSuccess: (data) => {
      if (onFiltersApply) {
        const updatedFilters: ActiveFilters = {
          ...selectedFilters,
          dateRange: {
            type: currentRangeType,
            start: startDate ? new Date(startDate) : null,
            end: endDate ? new Date(endDate) : null,
          },
        }
        onFiltersApply(data, updatedFilters)
      }
    },
    onError: (error) => {
      setCandidatesError("Ошибка при загрузке данных кандидатов")
    },
  })

  const handleCustomSelectToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsCustomSelectOpen(!isCustomSelectOpen)
  }

  const handleRangeTypeSelect = (type: string) => {
    setCurrentRangeType(type)
    setStartDate(null)
    setEndDate(null)
    setIsCustomSelectOpen(false)
  }

  const handleFilterToggle = (filter: "status" | "vacancy", value: string) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev }

      if (filter === "status" || filter === "vacancy") {
        if (value === "showAll") {
          // Если нажата "Показать все", очищаем все остальные фильтры этого типа
          newFilters[filter] = ["showAll"]
        } else {
          // Если нажат любой другой фильтр
          if (newFilters[filter].includes("showAll")) {
            // Убираем "Показать все" и добавляем выбранный фильтр
            newFilters[filter] = [value]
          } else {
            // Обычная логика добавления/удаления фильтра
            if (newFilters[filter].includes(value)) {
              newFilters[filter] = newFilters[filter].filter((v) => v !== value)
              // Если не осталось выбранных фильтров, возвращаем "Показать все"
              if (newFilters[filter].length === 0) {
                newFilters[filter] = ["showAll"]
              }
            } else {
              newFilters[filter] = [...newFilters[filter], value]
            }
          }
        }
      }

      return newFilters
    })
  }

  const handleCalendarNavigation = (calendar: number, direction: number) => {
    if (calendar === 1) {
      const newDate = new Date(calendar1Date)
      if (currentRangeType === "dates") {
        newDate.setMonth(newDate.getMonth() + direction)
      } else if (currentRangeType === "months") {
        newDate.setFullYear(newDate.getFullYear() + direction)
      }
      setCalendar1Date(newDate)
    } else {
      const newDate = new Date(calendar2Date)
      if (currentRangeType === "dates") {
        newDate.setMonth(newDate.getMonth() + direction)
      } else if (currentRangeType === "months") {
        newDate.setFullYear(newDate.getFullYear() + direction)
      }
      setCalendar2Date(newDate)
    }
  }

  const handleDateClick = (
    dateStr: string,
    year?: number,
    month?: number,
    day?: number
  ) => {
    const selectedDate = new Date(dateStr)

    if (currentRangeType === "dates") {
      if (startDate && startDate.getTime() === selectedDate.getTime()) {
        setStartDate(null)
        setEndDate(null)
      } else if (!startDate || (startDate && endDate)) {
        setStartDate(selectedDate)
        setEndDate(null)
      } else if (selectedDate < startDate) {
        setEndDate(startDate)
        setStartDate(selectedDate)
      } else {
        setEndDate(selectedDate)
      }
    } else if (currentRangeType === "months") {
      const selectedMonth = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        1
      )
      if (startDate && startDate.getTime() === selectedMonth.getTime()) {
        setStartDate(null)
        setEndDate(null)
      } else if (!startDate || (startDate && endDate)) {
        setStartDate(selectedMonth)
        setEndDate(null)
      } else if (selectedMonth < startDate) {
        setEndDate(startDate)
        setStartDate(selectedMonth)
      } else {
        setEndDate(selectedMonth)
      }
    } else if (currentRangeType === "years") {
      const selectedYear = new Date(selectedDate.getFullYear(), 0, 1)
      if (startDate && startDate.getTime() === selectedYear.getTime()) {
        setStartDate(null)
        setEndDate(null)
      } else if (!startDate || (startDate && endDate)) {
        setStartDate(selectedYear)
        setEndDate(null)
      } else if (selectedYear < startDate) {
        setEndDate(startDate)
        setStartDate(selectedYear)
      } else {
        setEndDate(selectedYear)
      }
    }
  }

  const handleApplyFilters = () => {
    setCandidatesError("")

    const updatedFilters: ActiveFilters = {
      ...selectedFilters,
      dateRange: {
        type: currentRangeType,
        start: startDate ? new Date(startDate) : null,
        end: endDate ? new Date(endDate) : null,
      },
    }

    const queryParams: string[] = []

    if (selectedCity) {
      queryParams.push(`city_work=${encodeURIComponent(selectedCity)}`)
    }

    if (updatedFilters.dateRange.start && updatedFilters.dateRange.end) {
      const dateRange = formatApiDateRange(
        updatedFilters.dateRange.start,
        updatedFilters.dateRange.end,
        updatedFilters.dateRange.type
      )

      if (dateRange) {
        switch (updatedFilters.dateRange.type) {
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

    const statusValues = getStatusApiValues(updatedFilters.status)
    if (statusValues.length > 0) {
      queryParams.push(`candidate_statuses=${statusValues.join(",")}`)
    }

    const vacancyValues = getVacancyApiValues(updatedFilters.vacancy)
    if (vacancyValues.length > 0) {
      queryParams.push(`vacancy_keys=${vacancyValues.join(",")}`)
    }

    const queryString = queryParams.join("&")

    applyFiltersMutation.mutate({ queryString })
  }

  // Функции для генерации календаря
  const generateCalendar = (
    year: number,
    month: number
  ): (DateCell | null)[][] => {
    const firstDay = new Date(year, month, 1).getDay()
    const startDayIndex = firstDay === 0 ? 6 : firstDay - 1
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const calendar: (DateCell | null)[][] = []
    let date = 1

    for (let i = 0; i < 6; i++) {
      const week: (DateCell | null)[] = []
      let isRowEmpty = true

      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < startDayIndex) || date > daysInMonth) {
          week.push(null)
        } else {
          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`
          week.push({
            day: date,
            dateStr,
            year,
            month,
            isSelected: isDateSelected(dateStr),
            isInRange: isDateInRange(dateStr),
            isStartDate: isStartDate(dateStr),
            isEndDate: isEndDate(dateStr),
          })
          date++
          isRowEmpty = false
        }
      }

      if (!isRowEmpty || i === 0) {
        calendar.push(week)
      }
      if (date > daysInMonth) break
    }

    return calendar
  }

  const generateMonthsCalendar = (year: number): MonthCell[][] => {
    const months: MonthCell[][] = []
    for (let i = 0; i < 3; i++) {
      const row: MonthCell[] = []
      for (let j = 0; j < 4; j++) {
        const monthIndex = i * 4 + j
        if (monthIndex >= 12) break
        const dateStr = `${year}-${String(monthIndex + 1).padStart(2, "0")}-01`
        row.push({
          month: monthIndex,
          name: monthNames[monthIndex],
          dateStr,
          year,
          isSelected: isMonthSelected(year, monthIndex),
          isInRange: isMonthInRange(year, monthIndex),
          isStartDate: isMonthStartDate(year, monthIndex),
          isEndDate: isMonthEndDate(year, monthIndex),
        })
      }
      months.push(row)
    }
    return months
  }

  const generateYearsCalendar = (): YearCell[][] => {
    const startYear = 2020
    const endYear = 2025
    const years: YearCell[][] = []

    for (let i = 0; i < Math.ceil((endYear - startYear + 1) / 3); i++) {
      const row: YearCell[] = []
      for (let j = 0; j < 3; j++) {
        const yearIndex = startYear + i * 3 + j
        if (yearIndex > endYear) break
        const dateStr = `${yearIndex}-01-01`
        row.push({
          year: yearIndex,
          dateStr,
          isSelected: isYearSelected(yearIndex),
          isInRange: isYearInRange(yearIndex),
          isStartDate: isYearStartDate(yearIndex),
          isEndDate: isYearEndDate(yearIndex),
        })
      }
      years.push(row)
    }
    return years
  }

  // Функции для проверки выбранности дат
  const isDateSelected = (dateStr: string): boolean => {
    if (!startDate) return false
    const date = new Date(dateStr)
    return (
      startDate.getTime() === date.getTime() ||
      Boolean(endDate && endDate.getTime() === date.getTime())
    )
  }

  const isDateInRange = (dateStr: string) => {
    if (!startDate || !endDate) return false
    const date = new Date(dateStr)
    return date > startDate && date < endDate
  }

  const isStartDate = (dateStr: string) => {
    if (!startDate) return false
    const date = new Date(dateStr)
    return startDate.getTime() === date.getTime()
  }

  const isEndDate = (dateStr: string) => {
    if (!startDate || !endDate) return false
    const date = new Date(dateStr)
    return endDate.getTime() === date.getTime()
  }

  const isMonthSelected = (year: number, monthIndex: number): boolean => {
    if (!startDate) return false
    const monthDate = new Date(year, monthIndex, 1)
    return Boolean(
      (startDate && startDate.getTime() === monthDate.getTime()) ||
        (endDate && endDate.getTime() === monthDate.getTime())
    )
  }

  const isMonthInRange = (year: number, monthIndex: number) => {
    if (!startDate || !endDate) return false
    const monthDate = new Date(year, monthIndex, 1)
    return monthDate > startDate && monthDate < endDate
  }

  const isMonthStartDate = (year: number, monthIndex: number) => {
    if (!startDate) return false
    const monthDate = new Date(year, monthIndex, 1)
    return startDate.getTime() === monthDate.getTime()
  }

  const isMonthEndDate = (year: number, monthIndex: number) => {
    if (!startDate || !endDate) return false
    const monthDate = new Date(year, monthIndex, 1)
    return endDate.getTime() === monthDate.getTime()
  }

  const isYearSelected = (year: number): boolean => {
    if (!startDate) return false
    const yearDate = new Date(year, 0, 1)
    return Boolean(
      (startDate && startDate.getTime() === yearDate.getTime()) ||
        (endDate && endDate.getTime() === yearDate.getTime())
    )
  }

  const isYearInRange = (year: number) => {
    if (!startDate || !endDate) return false
    const yearDate = new Date(year, 0, 1)
    return yearDate > startDate && yearDate < endDate
  }

  const isYearStartDate = (year: number) => {
    if (!startDate) return false
    const yearDate = new Date(year, 0, 1)
    return startDate.getTime() === yearDate.getTime()
  }

  const isYearEndDate = (year: number) => {
    if (!startDate || !endDate) return false
    const yearDate = new Date(year, 0, 1)
    return endDate.getTime() === yearDate.getTime()
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isCustomSelectOpen &&
        !(e.target as HTMLElement).closest(".custom-select")
      ) {
        setIsCustomSelectOpen(false)
      }
      if (
        isOpen &&
        calendarPanelRef.current &&
        !calendarPanelRef.current.contains(e.target as Node) &&
        filtersButtonRef.current &&
        !filtersButtonRef.current.contains(e.target as Node)
      ) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isCustomSelectOpen, isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
    }

    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  return (
    <>
      <aside
        className={`calendar-filter-panel ${isOpen ? "open" : ""}`}
        id="calendarPanel"
        ref={calendarPanelRef}
      >
        <div
          className="filters-window"
          style={{ height: "105%", paddingBottom: "50px" }}
        >
          <div
            className="formRow flex-direction-column"
            style={{ marginTop: "20px" }}
          >
            <div className="custom-select">
              <div
                className={`select-selected ${isCustomSelectOpen ? "select-arrow-active" : ""}`}
                onClick={handleCustomSelectToggle}
              >
                {currentRangeType === "dates"
                  ? "Диапазон дат"
                  : currentRangeType === "months"
                    ? "Диапазон месяцев"
                    : "Диапазон годов"}
              </div>
              <div
                className={`select-items ${isCustomSelectOpen ? "" : "select-hide"}`}
              >
                <div
                  className={
                    currentRangeType === "dates" ? "same-as-selected" : ""
                  }
                  onClick={() => handleRangeTypeSelect("dates")}
                >
                  Диапазон дат
                </div>
                <div
                  className={
                    currentRangeType === "months" ? "same-as-selected" : ""
                  }
                  onClick={() => handleRangeTypeSelect("months")}
                >
                  Диапазон месяцев
                </div>
                <div
                  className={
                    currentRangeType === "years" ? "same-as-selected" : ""
                  }
                  onClick={() => handleRangeTypeSelect("years")}
                >
                  Диапазон годов
                </div>
              </div>
            </div>
          </div>

          <div className="calendar-container">
            <div className="calendar-wrapper">
              <div className="calendar-header">
                <span
                  className="nav-arrow"
                  style={{
                    display: currentRangeType === "years" ? "none" : "inline",
                  }}
                  onClick={() => handleCalendarNavigation(1, -1)}
                >
                  &#8249;
                </span>
                <span className="month-year">
                  {currentRangeType === "dates"
                    ? `${monthNames[calendar1Date.getMonth()]} ${calendar1Date.getFullYear()}`
                    : currentRangeType === "months"
                      ? calendar1Date.getFullYear()
                      : "ОТ"}
                </span>
                <span
                  className="nav-arrow"
                  style={{
                    display: currentRangeType === "years" ? "none" : "inline",
                  }}
                  onClick={() => handleCalendarNavigation(1, 1)}
                >
                  &#8250;
                </span>
              </div>
              <table className="calendar">
                <thead
                  style={{
                    display: currentRangeType === "dates" ? "" : "none",
                  }}
                >
                  <tr>
                    <th>Пн</th>
                    <th>Вт</th>
                    <th>Ср</th>
                    <th>Чт</th>
                    <th>Пт</th>
                    <th>Сб</th>
                    <th>Вс</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRangeType === "dates" &&
                    generateCalendar(
                      calendar1Date.getFullYear(),
                      calendar1Date.getMonth()
                    ).map((week, weekIndex) => (
                      <tr key={weekIndex}>
                        {week.map((day, dayIndex) => (
                          <td
                            key={dayIndex}
                            className={
                              day
                                ? [
                                    day.isInRange ? "in-range" : "",
                                    day.isStartDate ? "start-date" : "",
                                    day.isEndDate ? "end-date" : "",
                                    day.isStartDate && endDate
                                      ? "start-date-bg"
                                      : "",
                                    day.isEndDate && startDate
                                      ? "end-date-bg"
                                      : "",
                                  ]
                                    .filter(Boolean)
                                    .join(" ")
                                : ""
                            }
                            onClick={
                              day
                                ? () =>
                                    handleDateClick(
                                      day.dateStr,
                                      day.year,
                                      day.month,
                                      day.day
                                    )
                                : undefined
                            }
                            style={{
                              cursor: day ? "pointer" : "default",
                              position: "relative",
                            }}
                          >
                            {day && (
                              <span className="day-number">{day.day}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  {currentRangeType === "months" &&
                    generateMonthsCalendar(calendar1Date.getFullYear()).map(
                      (row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((month, monthIndex) => (
                            <td
                              key={monthIndex}
                              colSpan={
                                monthIndex === 3 && rowIndex === 2 ? 3 : 2
                              }
                              className={[
                                month.isInRange ? "in-range" : "",
                                month.isStartDate ? "start-date" : "",
                                month.isEndDate ? "end-date" : "",
                                month.isStartDate && endDate
                                  ? "start-date-bg"
                                  : "",
                                month.isEndDate && startDate
                                  ? "end-date-bg"
                                  : "",
                              ]
                                .filter(Boolean)
                                .join(" ")}
                              onClick={() =>
                                handleDateClick(
                                  month.dateStr,
                                  month.year,
                                  month.month
                                )
                              }
                              style={{
                                cursor: "pointer",
                                position: "relative",
                              }}
                            >
                              {month.name}
                            </td>
                          ))}
                        </tr>
                      )
                    )}
                  {currentRangeType === "years" &&
                    generateYearsCalendar().map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((year, yearIndex) => (
                          <td
                            key={yearIndex}
                            colSpan={yearIndex === 2 ? 1 : 3}
                            className={[
                              year.isInRange ? "in-range" : "",
                              year.isStartDate ? "start-date" : "",
                              year.isEndDate ? "end-date" : "",
                              year.isStartDate && endDate
                                ? "start-date-bg"
                                : "",
                              year.isEndDate && startDate ? "end-date-bg" : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                            onClick={() =>
                              handleDateClick(year.dateStr, year.year)
                            }
                            style={{ cursor: "pointer", position: "relative" }}
                          >
                            {year.year}
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div
              className={`calendar-wrapper ${isMobile ? "mobile-hidden" : ""}`}
            >
              <div className="calendar-header">
                <span
                  className="nav-arrow"
                  style={{
                    display: currentRangeType === "years" ? "none" : "inline",
                  }}
                  onClick={() => handleCalendarNavigation(2, -1)}
                >
                  &#8249;
                </span>
                <span className="month-year">
                  {currentRangeType === "dates"
                    ? `${monthNames[calendar2Date.getMonth()]} ${calendar2Date.getFullYear()}`
                    : currentRangeType === "months"
                      ? calendar2Date.getFullYear()
                      : "ДО"}
                </span>
                <span
                  className="nav-arrow"
                  style={{
                    display: currentRangeType === "years" ? "none" : "inline",
                  }}
                  onClick={() => handleCalendarNavigation(2, 1)}
                >
                  &#8250;
                </span>
              </div>
              <table className="calendar">
                <thead
                  style={{
                    display: currentRangeType === "dates" ? "" : "none",
                  }}
                >
                  <tr>
                    <th>Пн</th>
                    <th>Вт</th>
                    <th>Ср</th>
                    <th>Чт</th>
                    <th>Пт</th>
                    <th>Сб</th>
                    <th>Вс</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRangeType === "dates" &&
                    generateCalendar(
                      calendar2Date.getFullYear(),
                      calendar2Date.getMonth()
                    ).map((week, weekIndex) => (
                      <tr key={weekIndex}>
                        {week.map((day, dayIndex) => (
                          <td
                            key={dayIndex}
                            className={
                              day
                                ? [
                                    day.isInRange ? "in-range" : "",
                                    day.isStartDate ? "start-date" : "",
                                    day.isEndDate ? "end-date" : "",
                                    day.isStartDate && endDate
                                      ? "start-date-bg"
                                      : "",
                                    day.isEndDate && startDate
                                      ? "end-date-bg"
                                      : "",
                                  ]
                                    .filter(Boolean)
                                    .join(" ")
                                : ""
                            }
                            onClick={
                              day
                                ? () =>
                                    handleDateClick(
                                      day.dateStr,
                                      day.year,
                                      day.month,
                                      day.day
                                    )
                                : undefined
                            }
                            style={{
                              cursor: day ? "pointer" : "default",
                              position: "relative",
                            }}
                          >
                            {day && (
                              <span className="day-number">{day.day}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  {currentRangeType === "months" &&
                    generateMonthsCalendar(calendar2Date.getFullYear()).map(
                      (row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((month, monthIndex) => (
                            <td
                              key={monthIndex}
                              colSpan={
                                monthIndex === 3 && rowIndex === 2 ? 3 : 2
                              }
                              className={[
                                month.isInRange ? "in-range" : "",
                                month.isStartDate ? "start-date" : "",
                                month.isEndDate ? "end-date" : "",
                                month.isStartDate && endDate
                                  ? "start-date-bg"
                                  : "",
                                month.isEndDate && startDate
                                  ? "end-date-bg"
                                  : "",
                              ]
                                .filter(Boolean)
                                .join(" ")}
                              onClick={() =>
                                handleDateClick(
                                  month.dateStr,
                                  month.year,
                                  month.month
                                )
                              }
                              style={{
                                cursor: "pointer",
                                position: "relative",
                              }}
                            >
                              {month.name}
                            </td>
                          ))}
                        </tr>
                      )
                    )}
                  {currentRangeType === "years" &&
                    generateYearsCalendar().map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((year, yearIndex) => (
                          <td
                            key={yearIndex}
                            colSpan={yearIndex === 2 ? 1 : 3}
                            className={[
                              year.isInRange ? "in-range" : "",
                              year.isStartDate ? "start-date" : "",
                              year.isEndDate ? "end-date" : "",
                              year.isStartDate && endDate
                                ? "start-date-bg"
                                : "",
                              year.isEndDate && startDate ? "end-date-bg" : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                            onClick={() =>
                              handleDateClick(year.dateStr, year.year)
                            }
                            style={{ cursor: "pointer", position: "relative" }}
                          >
                            {year.year}
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="formRow">
            <h3 style={{ textAlign: "left" }}>Фильтр по статусу</h3>
          </div>
          <div
            className="formRow justify-flex-start"
            style={{ flexWrap: "wrap" }}
          >
            {statusFilters.map((filter) => (
              <button
                key={filter.value}
                className={`filterButton ${selectedFilters.status.includes(filter.value) ? "active" : ""}`}
                onClick={() => handleFilterToggle("status", filter.value)}
                disabled={applyFiltersMutation.isPending}
              >
                {filter.text}
              </button>
            ))}
          </div>

          <div className="formRow">
            <h3 style={{ textAlign: "left" }}>Фильтр по вакансии</h3>
          </div>
          <div
            className="formRow justify-flex-start"
            style={{ flexWrap: "wrap" }}
          >
            {/* Показываем индикатор загрузки или ошибку */}
            {isLoadingVacancies && (
              <div style={{ padding: "10px", color: "#666", fontSize: "14px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      border: "2px solid #f3f3f3",
                      borderTop: "2px solid #EC7D3F",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  ></div>
                  Загрузка вакансий...
                </div>
              </div>
            )}
            {vacancyError && (
              <div
                style={{
                  padding: "10px",
                  backgroundColor: "#ffeaea",
                  border: "1px solid #e74c3c",
                  borderRadius: "4px",
                  color: "#c0392b",
                  fontSize: "14px",
                  maxWidth: "100%",
                }}
              >
                {vacancyError}
                <button
                  onClick={() => window.location.reload()}
                  style={{
                    marginLeft: "10px",
                    background: "none",
                    border: "none",
                    color: "#3498db",
                    cursor: "pointer",
                    textDecoration: "underline",
                    fontSize: "14px",
                  }}
                >
                  Повторить
                </button>
              </div>
            )}
            {/* Отображаем кнопки фильтров, загруженные из API */}
            {!isLoadingVacancies &&
              !vacancyError &&
              vacancyOptions.map((filter) => (
                <button
                  key={filter.value}
                  className={`filterButton ${selectedFilters.vacancy.includes(filter.value) ? "active" : ""}`}
                  onClick={() => handleFilterToggle("vacancy", filter.value)}
                  disabled={applyFiltersMutation.isPending}
                >
                  {filter.text}
                </button>
              ))}
          </div>

          <div
            className="formRow justify-center"
            style={{ marginTop: "25px", gap: "1rem" }}
          >
            <button
              className={`formBtn ${applyFiltersMutation.isPending ? "btn-inactive" : "btn-active"}`}
              onClick={handleApplyFilters}
              disabled={applyFiltersMutation.isPending}
              style={{
                position: "relative",
                minWidth: "140px",
                height: "45px",
              }}
            >
              {applyFiltersMutation.isPending ? (
                <>
                  <span style={{ opacity: 0 }}>Применить</span>
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "18px",
                        height: "18px",
                        border: "2px solid #f3f3f3",
                        borderTop: "2px solid #EC7D3F",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                      }}
                    ></div>
                    <span style={{ fontSize: "14px", color: "#666" }}>
                      Загрузка...
                    </span>
                  </div>
                </>
              ) : (
                "Применить"
              )}
            </button>
            <button
              className="formBtn btn-inactive"
              onClick={() => {
                setSelectedFilters({
                  status: ["showAll"],
                  vacancy: ["showAll"],
                  dateRange: { type: "dates", start: null, end: null },
                })
                setStartDate(null)
                setEndDate(null)
                setCurrentRangeType("dates")
                setCandidatesError("")
                // Сбрасываем состояние мобильного календаря
                if (isMobile) {
                  setIsMobile(false)
                  setTimeout(() => setIsMobile(window.innerWidth <= 768), 0)
                }
              }}
              disabled={applyFiltersMutation.isPending}
              style={{
                minWidth: "140px",
                height: "45px",
              }}
            >
              Сбросить
            </button>
          </div>
        </div>
      </aside>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .filterButton:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .formBtn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .calendar td {
          position: relative;
        }

        ${
          currentRangeType === "dates"
            ? `
          .calendar td.start-date::after,
          .calendar td.end-date::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 30px;
            height: 30px;
            background-color: #EC7D3F;
            border-radius: 50%;
            z-index: 0;
          }
        `
            : `
          .calendar td.start-date::after,
          .calendar td.end-date::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 62px;
            height: 32px;
            background-color: #EC7D3F;
            border-radius: 16px;
            z-index: -1;
          }
        `
        }

        .calendar td .day-number,
        .calendar td {
          position: relative;
          z-index: 1;
        }
      `,
        }}
      />
    </>
  )
}

export default FiltersCalendar
