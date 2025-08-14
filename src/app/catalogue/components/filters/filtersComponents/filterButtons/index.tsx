import React, { FC } from "react"
import styles from "./filterButtons.module.scss"
import FiltersButton from "@/components/ui/buttons/FiltersButton"

interface FilterButtonsProps {
  selectedCompletionDate: string[]
  selectedBathroom: string[]
  selectedPaymentMethods: string[]
  selectedMetroDistance: string[]
  selectedRegistration: string[]
  selectedApartments: string 
  
  // Обработчики кнопок фильтров
  handleCompletionDateSelect: (date: string) => void
  handleBathroomSelect: (bathroom: string) => void
  handlePaymentMethodSelect: (method: string) => void
  handleMetroDistanceSelect: (distance: string) => void
  handleRegistrationSelect: (registration: string) => void
  handleApartmentsSelect: (apartments: string) => void
}

const FilterButtons: FC<FilterButtonsProps> = ({
  selectedCompletionDate,
  selectedBathroom,
  selectedPaymentMethods,
  selectedMetroDistance,
  selectedRegistration,
  selectedApartments,
  handleCompletionDateSelect,
  handleBathroomSelect,
  handlePaymentMethodSelect,
  handleMetroDistanceSelect,
  handleRegistrationSelect,
  handleApartmentsSelect,
}) => {
  return (
    <div className={styles.catalogue__filters__container__buttonsSection}>
      <div
        className={
          styles.catalogue__filters__container__buttonsSection__filterButtons
        }
      >
        <div
          className={
            styles.catalogue__filters__container__buttonsSection__filterButtons__header
          }
        >
          Срок сдачи
        </div>
        <div
          className={
            styles.catalogue__filters__container__buttonsSection__filterButtons__buttonRow
          }
        >
          <FiltersButton 
            text="Сдан" 
            isActive={selectedCompletionDate.includes("Сдан")}
            onClick={() => handleCompletionDateSelect("Сдан")}
          />
          <FiltersButton 
            text="2025" 
            isActive={selectedCompletionDate.includes("2025")}
            onClick={() => handleCompletionDateSelect("2025")}
          />
          <FiltersButton 
            text="2026" 
            isActive={selectedCompletionDate.includes("2026")}
            onClick={() => handleCompletionDateSelect("2026")}
          />
          <FiltersButton 
            text="2027" 
            isActive={selectedCompletionDate.includes("2027")}
            onClick={() => handleCompletionDateSelect("2027")}
          />
          <FiltersButton 
            text="2028" 
            isActive={selectedCompletionDate.includes("2028")}
            onClick={() => handleCompletionDateSelect("2028")}
          />
        </div>
      </div>
      <div
        className={
          styles.catalogue__filters__container__buttonsSection__filterButtons
        }
      >
        <div
          className={
            styles.catalogue__filters__container__buttonsSection__filterButtons__header
          }
        >
          Санузел
        </div>
        <div
          className={
            styles.catalogue__filters__container__buttonsSection__filterButtons__buttonRow
          }
        >
          <FiltersButton 
            text="Совмещенный" 
            isActive={selectedBathroom.includes("Совмещенный")}
            onClick={() => handleBathroomSelect("Совмещенный")}
          />
          <FiltersButton 
            text="2 сан. узла и более" 
            isActive={selectedBathroom.includes("2 сан. узла и более")}
            onClick={() => handleBathroomSelect("2 сан. узла и более")}
          />
          <FiltersButton 
            text="5 сан. узлов" 
            isActive={selectedBathroom.includes("5 сан. узлов")}
            onClick={() => handleBathroomSelect("5 сан. узлов")}
          />
          <FiltersButton 
            text="Раздельный" 
            isActive={selectedBathroom.includes("Раздельный")}
            onClick={() => handleBathroomSelect("Раздельный")}
          />
          <FiltersButton 
            text="6 сан. узлов" 
            isActive={selectedBathroom.includes("6 сан. узлов")}
            onClick={() => handleBathroomSelect("6 сан. узлов")}
          />
        </div>
      </div>
      <div
        className={
          styles.catalogue__filters__container__buttonsSection__filterButtons
        }
      >
        <div
          className={
            styles.catalogue__filters__container__buttonsSection__filterButtons__header
          }
        >
          Способы оплаты
        </div>
        <div
          className={
            styles.catalogue__filters__container__buttonsSection__filterButtons__buttonRow
          }
        >
          <FiltersButton 
            text="Ипотека" 
            isActive={selectedPaymentMethods.includes("Ипотека")}
            onClick={() => handlePaymentMethodSelect("Ипотека")}
          />
          <FiltersButton 
            text="Рассрочка" 
            isActive={selectedPaymentMethods.includes("Рассрочка")}
            onClick={() => handlePaymentMethodSelect("Рассрочка")}
          />
          <FiltersButton 
            text="Военная ипотека" 
            isActive={selectedPaymentMethods.includes("Военная ипотека")}
            onClick={() => handlePaymentMethodSelect("Военная ипотека")}
          />
          <FiltersButton 
            text="Субсидия" 
            isActive={selectedPaymentMethods.includes("Субсидия")}
            onClick={() => handlePaymentMethodSelect("Субсидия")}
          />
          <FiltersButton 
            text="Материнский капитал" 
            isActive={selectedPaymentMethods.includes("Материнский капитал")}
            onClick={() => handlePaymentMethodSelect("Материнский капитал")}
          />
        </div>
      </div>
      <div
        className={
          styles.catalogue__filters__container__buttonsSection__filterButtons
        }
      >
        <div
          className={
            styles.catalogue__filters__container__buttonsSection__filterButtons__header
          }
        >
          Расстояние до метро
        </div>
        <div
          className={
            styles.catalogue__filters__container__buttonsSection__filterButtons__buttonRow
          }
        >
          <FiltersButton 
            text="до 5 минут пешком" 
            isActive={selectedMetroDistance.includes("до 5 минут пешком")}
            onClick={() => handleMetroDistanceSelect("до 5 минут пешком")}
          />
          <FiltersButton 
            text="до 10 минут пешком" 
            isActive={selectedMetroDistance.includes("до 10 минут пешком")}
            onClick={() => handleMetroDistanceSelect("до 10 минут пешком")}
          />
          <FiltersButton 
            text="до 15 минут пешком" 
            isActive={selectedMetroDistance.includes("до 15 минут пешком")}
            onClick={() => handleMetroDistanceSelect("до 15 минут пешком")}
          />
          <FiltersButton 
            text="до 20 минут пешком" 
            isActive={selectedMetroDistance.includes("до 20 минут пешком")}
            onClick={() => handleMetroDistanceSelect("до 20 минут пешком")}
          />
          <FiltersButton 
            text="до 10 минут на транспорте" 
            isActive={selectedMetroDistance.includes("до 10 минут на транспорте")}
            onClick={() => handleMetroDistanceSelect("до 10 минут на транспорте")}
          />
          <FiltersButton 
            text="до 20 минут на транспорте" 
            isActive={selectedMetroDistance.includes("до 20 минут на транспорте")}
            onClick={() => handleMetroDistanceSelect("до 20 минут на транспорте")}
          />
          <FiltersButton 
            text="до 30 минут на транспорте" 
            isActive={selectedMetroDistance.includes("до 30 минут на транспорте")}
            onClick={() => handleMetroDistanceSelect("до 30 минут на транспорте")}
          />
          <FiltersButton 
            text="до 40 минут на транспорте" 
            isActive={selectedMetroDistance.includes("до 40 минут на транспорте")}
            onClick={() => handleMetroDistanceSelect("до 40 минут на транспорте")}
          />
        </div>
      </div>
      <div
        className={
          styles.catalogue__filters__container__buttonsSection__filterButtons
        }
      >
        <div
          className={
            styles.catalogue__filters__container__buttonsSection__filterButtons__header
          }
        >
          Прописка
        </div>
        <div
          className={
            styles.catalogue__filters__container__buttonsSection__filterButtons__buttonRow
          }
        >
          <FiltersButton 
            text="Новосибирск" 
            isActive={selectedRegistration.includes("Новосибирск")}
            onClick={() => handleRegistrationSelect("Новосибирск")}
          />
          <FiltersButton 
            text="Новосибирская область" 
            isActive={selectedRegistration.includes("Новосибирская область")}
            onClick={() => handleRegistrationSelect("Новосибирская область")}
          />
        </div>
      </div>
      <div
        className={
          styles.catalogue__filters__container__buttonsSection__filterButtons
        }
      >
        <div
          className={
            styles.catalogue__filters__container__buttonsSection__filterButtons__header
          }
        >
          Апартаменты
        </div>
        <div
          className={
            styles.catalogue__filters__container__buttonsSection__filterButtons__buttonRow
          }
        >
          <FiltersButton 
            text="Только апартаменты" 
            isActive={selectedApartments === "Только апартаменты"}
            onClick={() => handleApartmentsSelect("Только апартаменты")}
          />
          <FiltersButton 
            text="Исключить апартаменты" 
            isActive={selectedApartments === "Исключить апартаменты"}
            onClick={() => handleApartmentsSelect("Исключить апартаменты")}
          />
        </div>
      </div>
    </div>
  )
}

export default FilterButtons