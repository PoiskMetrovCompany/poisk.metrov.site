"use client";

import React, { useState, useRef } from "react";
import BigHeader from "@/components/candidateRegForm/bigHeader";
import CandidatesTable from "@/components/candidateRegForm/CandidatesTable";
import ShowForm from "@/components/candidateRegForm/ShowForm";
import FiltersCalendar from "@/components/candidateRegForm/FiltersCalendar";

interface FilteredData {
  attributes: {
    data: any[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
    from: number;
    to: number;
  };
}

interface ActiveFilters {
  status: string[];
  vacancy: string[];
  dateRange: {
    type: string;
    start: Date | null;
    end: Date | null;
  };
}

const CandidatesLoginPage = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedVacancyKey, setSelectedVacancyKey] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<FilteredData | null>(null);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters | null>(null);
  const [selectedCity, setSelectedCity] = useState('Новосибирск');

  const filtersButtonRef = useRef<HTMLButtonElement>(null!);

  const handleFiltersClick = () => {
    setIsCalendarOpen(true);
  };

  const handleCalendarClose = () => {
    setIsCalendarOpen(false);
  };

  const handleRowClick = (vacancyKey: string) => {
    setSelectedVacancyKey(vacancyKey);
  };

  const handleBackToList = () => {
    setSelectedVacancyKey(null);
  };

  const handleFiltersApply = (data: FilteredData, filters: ActiveFilters) => {
    setFilteredData(data);
    setActiveFilters(filters);
    setIsCalendarOpen(false);
  };

  const handleCityChange = (city: string) => {
    console.log('Изменение города на:', city);
    setSelectedCity(city);
    // Сбрасываем фильтры при смене города
    setFilteredData(null);
    setActiveFilters(null);
  };

  const handleFiltersReset = () => {
    setFilteredData(null);
    setActiveFilters(null);
  };

  return (
    <>
      {!selectedVacancyKey && <BigHeader onCityChange={handleCityChange} activePage="candidates" />}
      <main>
        {selectedVacancyKey ? (
          <ShowForm
            vacancyKey={selectedVacancyKey}
            setSelectedVacancyKey={setSelectedVacancyKey}
            selectedCity={selectedCity}
          />
        ) : (
          <>
            <CandidatesTable
              onFiltersClick={handleFiltersClick}
              onRowClick={handleRowClick}
              filtersButtonRef={filtersButtonRef}
              filteredData={filteredData}
              activeFilters={activeFilters}
              onFiltersReset={handleFiltersReset}
              selectedCity={selectedCity}
            />
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
  );
};

export default CandidatesLoginPage;