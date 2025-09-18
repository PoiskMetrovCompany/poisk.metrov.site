"use client"

import React from "react"

import Image from "next/image"

interface Candidate {
  id: string
  name: string
  rop: string
  datetime: string
  vacancy: string
  status: string
  statusID: string
  hasVacancyComment: string
  vacancyKey: string
  fullData: any
}

interface MobileCandidateCardProps {
  candidate: Candidate
  isSelected: boolean
  onCheckboxChange: (vacancyKey: string, isChecked: boolean) => void
  onRowClick: (candidate: Candidate, event: React.MouseEvent) => void
  onSingleDownload: (vacancyKey: string, candidateName: string) => void
  singleDownloadLoading: Record<string, boolean>
  activeTooltip: string | null
  setActiveTooltip: (id: string | null) => void
  getStatusText: (status: string) => string
}

const MobileCandidateCard: React.FC<MobileCandidateCardProps> = ({
  candidate,
  isSelected,
  onCheckboxChange,
  onRowClick,
  onSingleDownload,
  singleDownloadLoading,
  activeTooltip,
  setActiveTooltip,
  getStatusText,
}) => {
  const handleCardClick = (e: React.MouseEvent) => {
    onRowClick(candidate, e)
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    onCheckboxChange(candidate.vacancyKey, e.target.checked)
  }

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onSingleDownload(candidate.vacancyKey, candidate.name)
  }

  return (
    <div
      className="mobile-candidate-card"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      {/* Верхняя часть с чекбоксом, статусом и кнопками */}
      <div className="mobile-card-header">
        <div className="mobile-card-left">
          <label
            className="custom-checkbox"
            htmlFor={`mobilePersonalData${candidate.id}`}
            onClick={handleButtonClick}
          >
            <input
              type="checkbox"
              name="personalData"
              id={`mobilePersonalData${candidate.id}`}
              checked={isSelected}
              onChange={handleCheckboxChange}
            />
            <span className="checkmark"></span>
          </label>
          <div className="mobile-status-badge" id={candidate.statusID}>
            {getStatusText(candidate.status)}
          </div>
        </div>
        <div className="mobile-card-right">
          {candidate.hasVacancyComment && (
            <button
              id={`mobileRadactBtn${candidate.id}`}
              className="redactBtn"
              onClick={handleButtonClick}
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
            id={`mobileDownloadBtn${candidate.id}`}
            className="downloadBtn"
            onClick={handleDownloadClick}
            disabled={singleDownloadLoading[candidate.vacancyKey]}
            title={
              singleDownloadLoading[candidate.vacancyKey]
                ? "Скачивание..."
                : "Скачать анкету в PDF"
            }
          >
            {singleDownloadLoading[candidate.vacancyKey] ? (
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
        </div>
      </div>

      {/* Основная информация */}
      <div className="mobile-card-content">
        <div className="mobile-card-info">
          <div className="mobile-info-line">
            <span className="mobile-info-value">{candidate.name}</span>
          </div>
          <div className="mobile-info-line">
            <span className="mobile-info-value">{candidate.rop}</span>
          </div>
          <div className="mobile-info-line">
            <span className="mobile-info-label">РОП:</span>
            <span className="mobile-info-value">{candidate.rop}</span>
          </div>
          <div className="mobile-info-line">
            <span className="mobile-info-value">{candidate.datetime}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileCandidateCard
