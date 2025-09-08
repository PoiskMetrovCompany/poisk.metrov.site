"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import React, { useEffect, useRef, useState } from "react"

import { useRouter } from "next/navigation"

import CandidatesTable from "@/components/candidateRegForm/CandidatesTable"
import FiltersCalendar from "@/components/candidateRegForm/FiltersCalendar"
import ShowForm from "@/components/candidateRegForm/ShowForm"
import BigHeader from "@/components/candidateRegForm/bigHeader"
import { ICandidate, ICandidatesResponse } from "@/types/Candidate"

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

const CandidatesLoginPage = () => {
  const router = useRouter()
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [selectedVacancyKey, setSelectedVacancyKey] = useState<string | null>(
    null
  )
  const [filteredData, setFilteredData] = useState<FilteredData | null>(null)
  const [activeFilters, setActiveFilters] = useState<ActiveFilters | null>(null)
  const [selectedCity, setSelectedCity] = useState("Новосибирск")
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  const filtersButtonRef = useRef<HTMLButtonElement>(null!)

  // Проверка авторизации при загрузке страницы
  useEffect(() => {
    const token = getAccessTokenFromCookie()
    if (!token) {
      console.log(
        "Токен авторизации не найден, перенаправляем на страницу входа"
      )
      router.push("/candidatesSecurityBlock/securityLogin")
      return
    }
    setIsCheckingAuth(false)
  }, [router])

  // Запрос для получения списка кандидатов
  const {
    data: candidatesData,
    isLoading: isLoadingCandidates,
    error: candidatesError,
    refetch: refetchCandidates,
  } = useQuery({
    queryKey: ["candidates"],
    queryFn: async (): Promise<ICandidatesResponse> => {
      const accessToken = getAccessTokenFromCookie()

      if (!accessToken) {
        throw new Error("Токен доступа не найден")
      }

      const response = await axios.get<ICandidatesResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/candidates/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
          timeout: 15000,
        }
      )

      return response.data
    },
    enabled: !isCheckingAuth, // Выполняем запрос только после проверки авторизации
    staleTime: 5 * 60 * 1000, // 5 минут
    retry: 2,
  })


  const candidatesFilteredData: FilteredData | null = candidatesData?.attributes
    ? {
        attributes: {
          data: candidatesData.attributes.data,
          current_page: candidatesData.attributes.current_page,
          last_page: candidatesData.attributes.last_page,
          total: candidatesData.attributes.total,
          per_page: candidatesData.attributes.per_page,
          from: candidatesData.attributes.from,
          to: candidatesData.attributes.to,
        },
      }
    : null

  const handleFiltersClick = () => {
    setIsCalendarOpen(true)
  }

  const handleCalendarClose = () => {
    setIsCalendarOpen(false)
  }

  const handleRowClick = (vacancyKey: string) => {
    setSelectedVacancyKey(vacancyKey)
  }

  const handleBackToList = () => {
    setSelectedVacancyKey(null)
  }

  const handleFiltersApply = (data: FilteredData, filters: ActiveFilters) => {
    setFilteredData(data)
    setActiveFilters(filters)
    setIsCalendarOpen(false)
    console.log("Фильтры применены:", filters)
    console.log("Отфильтрованные данные:", data)
  }

  const handleCityChange = (city: string) => {
    console.log("Изменение города на:", city)
    setSelectedCity(city)
    // Сбрасываем фильтры при смене города
    setFilteredData(null)
    setActiveFilters(null)
  }

  const handleFiltersReset = () => {
    setFilteredData(null)
    setActiveFilters(null)
    console.log("Фильтры сброшены")
  }

  // Показываем состояние загрузки во время проверки авторизации
  if (isCheckingAuth) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <p>Проверка авторизации...</p>
      </div>
    )
  }

  return (
    <>
      {!selectedVacancyKey && (
        <BigHeader onCityChange={handleCityChange} activePage="candidates" />
      )}
      <main>
        {selectedVacancyKey ? (
          <ShowForm
            vacancyKey={selectedVacancyKey}
            setSelectedVacancyKey={setSelectedVacancyKey}
            selectedCity={selectedCity}
          />
        ) : (
          <>
            {isLoadingCandidates && (
              <div style={{ textAlign: "center", padding: "20px" }}>
                Загрузка кандидатов...
              </div>
            )}
            {candidatesError && (
              <div
                style={{
                  textAlign: "center",
                  padding: "20px",
                  color: "#e74c3c",
                  backgroundColor: "#f8d7da",
                  border: "1px solid #f5c6cb",
                  borderRadius: "4px",
                  margin: "20px 0",
                }}
              >
                Ошибка при загрузке кандидатов: {candidatesError.message}
                <button
                  onClick={() => refetchCandidates()}
                  style={{
                    marginLeft: "10px",
                    padding: "5px 10px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Повторить
                </button>
              </div>
            )}
            {candidatesData && !isLoadingCandidates && !candidatesError && (
              <CandidatesTable
                onFiltersClick={handleFiltersClick}
                onRowClick={handleRowClick}
                filtersButtonRef={filtersButtonRef}
                filteredData={filteredData || candidatesFilteredData}
                activeFilters={activeFilters}
                onFiltersReset={handleFiltersReset}
                selectedCity={selectedCity}
              />
            )}
            <FiltersCalendar
              isOpen={isCalendarOpen}
              onClose={handleCalendarClose}
              filtersButtonRef={filtersButtonRef}
              onFiltersApply={handleFiltersApply}
              selectedCity={selectedCity}
            />
          </>
        )}
      </main>
    </>
  )
}

export default CandidatesLoginPage
