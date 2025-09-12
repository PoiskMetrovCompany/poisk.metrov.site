"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import React, { useEffect, useRef, useState } from "react"

import { useRouter } from "next/navigation"

import CandidatesTable from "@/components/candidateRegForm/CandidatesTable"
import FiltersCalendar from "@/components/candidateRegForm/FiltersCalendar"
import ShowForm from "@/components/candidateRegForm/ShowForm"
import BigHeader from "@/components/candidateRegForm/bigHeader"
import {
  CandidateStatus,
  ICandidate,
  ICandidatesResponse,
} from "@/types/Candidate"

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

type FilterStatus = CandidateStatus | "showAll"

interface ActiveFilters {
  status: FilterStatus[]
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
  const [filteredData, setFilteredData] = useState<ICandidatesResponse | null>(
    null
  )
  const [activeFilters, setActiveFilters] = useState<ActiveFilters | null>(null)
  const [selectedCity, setSelectedCity] = useState("Новосибирск")
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  const filtersButtonRef = useRef<HTMLButtonElement>(null!)

  useEffect(() => {
    const token = getAccessTokenFromCookie()
    if (!token) {
      router.push("/candidatesSecurityBlock/securityLogin")
      return
    }
    setIsCheckingAuth(false)
  }, [router])

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
    enabled: !isCheckingAuth,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  })

  const candidatesFilteredData: ICandidatesResponse | null =
    candidatesData || null

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

  const handleFiltersApply = (
    data: ICandidatesResponse,
    filters: ActiveFilters
  ) => {
    setFilteredData(data)
    setActiveFilters(filters)
    setIsCalendarOpen(false)
  }

  const handleCityChange = (city: string) => {
    setSelectedCity(city)
    setFilteredData(null)
    setActiveFilters(null)
  }

  const handleFiltersReset = () => {
    setFilteredData(null)
    setActiveFilters(null)
  }

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
