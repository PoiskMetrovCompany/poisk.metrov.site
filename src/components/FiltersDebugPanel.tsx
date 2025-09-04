"use client"

import React, { useEffect, useState } from "react"

import { useFiltersStore } from "@/stores/useFiltersStore"
import { getCurrentUrlParams, hasActiveFiltersInUrl } from "@/utils/urlParams"

const FiltersDebugPanel: React.FC = () => {
  const { filtersData, loadFromUrl, syncWithUrl, resetFilters } =
    useFiltersStore()

  const [isClient, setIsClient] = useState(false)
  const [currentUrlParams, setCurrentUrlParams] = useState<URLSearchParams>(
    new URLSearchParams()
  )
  const [hasFilters, setHasFilters] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setCurrentUrlParams(getCurrentUrlParams())
    setHasFilters(hasActiveFiltersInUrl())
  }, [])

  const handleLoadFromUrl = () => {
    loadFromUrl()
  }

  const handleSyncToUrl = () => {
    syncWithUrl()
  }

  const handleReset = () => {
    resetFilters()
  }

  // Не рендерим ничего до гидратации
  if (!isClient) {
    return null
  }

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        background: "#f0f0f0",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "12px",
        maxWidth: "300px",
        zIndex: 1000,
      }}
    >
      <h4>Debug: Фильтры в URL</h4>

      <div>
        <strong>Тип недвижимости:</strong> {filtersData.propertyType}
      </div>

      <div>
        <strong>Активные фильтры в URL:</strong> {hasFilters ? "Да" : "Нет"}
      </div>

      <div>
        <strong>Текущие параметры URL:</strong>
        <pre style={{ fontSize: "10px", overflow: "auto" }}>
          {currentUrlParams.toString() || "Нет параметров"}
        </pre>
      </div>

      <div style={{ marginTop: "10px" }}>
        <button onClick={handleLoadFromUrl} style={{ marginRight: "5px" }}>
          Загрузить из URL
        </button>
        <button onClick={handleSyncToUrl} style={{ marginRight: "5px" }}>
          Синхронизировать с URL
        </button>
        <button onClick={handleReset}>Сбросить</button>
      </div>

      <div style={{ marginTop: "10px" }}>
        <strong>Состояние фильтров:</strong>
        <pre style={{ fontSize: "10px", overflow: "auto", maxHeight: "100px" }}>
          {JSON.stringify(filtersData, null, 2)}
        </pre>
      </div>
    </div>
  )
}

export default FiltersDebugPanel
