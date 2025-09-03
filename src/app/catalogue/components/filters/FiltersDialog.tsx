import * as Dialog from "@radix-ui/react-dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

import React, { FC, useEffect, useMemo, useState } from "react"

import { useFilters } from "@/contexts/FiltersContext"

import styles from "./filters.module.scss"

import ApartmentFilters from "./filtersComponents/flitersBlocks/apartmentFilters"
import ComplexFilters from "./filtersComponents/flitersBlocks/complexFilters"
import PurchaseFilters from "./filtersComponents/flitersBlocks/purchaseFilters"
import { FiltersFormData } from "./types"
import { useFiltersForm } from "./useFiltersForm"

import IconImage from "@/components/ui/IconImage"
import ActionButton from "@/components/ui/buttons/ActionButton"
import IconButton from "@/components/ui/buttons/IconButton"

interface FiltersDialogProps {
  isMap?: boolean
  haveToSelectType?: boolean
  open: boolean
  onOpenChange: (open: boolean) => void
  onApplyFilters?: (formData: FiltersFormData) => void
}

const FiltersDialog: FC<FiltersDialogProps> = ({
  isMap = false,
  haveToSelectType = false,
  open,
  onOpenChange,
  onApplyFilters,
}) => {
  const [showApartmentTypeSelection, setShowApartmentTypeSelection] =
    useState(false)

  const {
    form,
    formData,

    // Функции
    resetFilters,
    getActiveFiltersCount,
    handleRangeChange,
    handleRangeInputChange,
    handleMultiSelect,
    handleSingleSelect,
    handlePropertyTypeSelect,
    handleApartmentsSelect,
    handleMetroTransportTypeSelect,
  } = useFiltersForm()

  // Синхронизируем данные из контекста
  const { filtersData, setFiltersData, selectedPropertyType } = useFilters()

  // Обновляем formData при изменении filtersData
  useEffect(() => {
    setFiltersData(formData)
  }, [formData, setFiltersData])

  // Мемоизируем данные для ApartmentFilters
  const apartmentFormData = useMemo(
    () => ({
      propertyType: filtersData.propertyType || "",
      rooms: filtersData.rooms || [],
      priceMin: filtersData.priceMin,
      priceMax: filtersData.priceMax,
      floorMin: filtersData.floorMin,
      floorMax: filtersData.floorMax,
      floorOptions: filtersData.floorOptions || [],
      flatAreaMin: filtersData.flatAreaMin,
      flatAreaMax: filtersData.flatAreaMax,
      livingAreaMin: filtersData.livingAreaMin,
      livingAreaMax: filtersData.livingAreaMax,
      ceilingHeight: filtersData.ceilingHeight || [],
      layout: filtersData.layout || [],
      finish: filtersData.finish || [],
      bathroom: filtersData.bathroom || [],
      apartments: filtersData.apartments || "",
      features: filtersData.features || [],
    }),
    [filtersData]
  )

  // Мемоизируем данные для ComplexFilters
  const complexFormData = useMemo(
    () => ({
      buildingType: filtersData.buildingType || [],
      builder: filtersData.builder || [],
      completionDate: filtersData.completionDate || [],
      metroDistance: filtersData.metroDistance || [],
      metroTransportType: filtersData.metroTransportType || "",
      elevator: filtersData.elevator || [],
      floorsInBuildingMin: filtersData.floorsInBuildingMin,
      floorsInBuildingMax: filtersData.floorsInBuildingMax,
      parking: filtersData.parking || [],
      security: filtersData.security || [],
    }),
    [filtersData]
  )

  // Мемоизируем данные для PurchaseFilters
  const purchaseFormData = useMemo(
    () => ({
      paymentMethod: filtersData.paymentMethod || [],
      mortgageType: filtersData.mortgageType || [],
      installmentPeriod: filtersData.installmentPeriod || [],
      downPayment: filtersData.downPayment || [],
      mortgagePrograms: filtersData.mortgagePrograms || [],
    }),
    [filtersData]
  )

  const handleApplyFilters = () => {
    form.handleSubmit()
    if (onApplyFilters) {
      onApplyFilters(filtersData)
    }
    onOpenChange(false)
  }

  const handleClose = () => {
    onOpenChange(false)
    setShowApartmentTypeSelection(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.dialogOverlay} />
        <Dialog.Content
          className={styles.dialogContent}
          onEscapeKeyDown={handleClose}
          onInteractOutside={handleClose}
        >
          <Dialog.Title asChild>
            <VisuallyHidden>Фильтры поиска недвижимости</VisuallyHidden>
          </Dialog.Title>
          <Dialog.Description asChild>
            <VisuallyHidden>
              Настройте параметры поиска для квартир, жилых комплексов и условий
              покупки
            </VisuallyHidden>
          </Dialog.Description>

          <div className={styles.catalogue__filters__container}>
            {/* <div className={styles.catalogue__filters__container__head}>
              <FiltersHeader onClose={handleClose} onReset={resetFilters} />
            </div> */}

            <div className={styles.catalogue__filters__container__content}>
              {/* Блок "Квартира" */}
              <ApartmentFilters
                formData={apartmentFormData}
                haveToSelectType={haveToSelectType}
                showApartmentTypeSelection={showApartmentTypeSelection}
                setShowApartmentTypeSelection={setShowApartmentTypeSelection}
                handleMultiSelect={handleMultiSelect}
                handleSingleSelect={handleSingleSelect}
                handlePropertyTypeSelect={handlePropertyTypeSelect}
                handleApartmentsSelect={handleApartmentsSelect}
                handleRangeInputChange={handleRangeInputChange}
                onCloseDialog={handleClose}
              />

              {/* Блок "Жилой комплекс" */}
              {!showApartmentTypeSelection && (
                <ComplexFilters
                  formData={complexFormData}
                  handleMultiSelect={handleMultiSelect}
                  handleSingleSelect={handleSingleSelect}
                  handleMetroTransportTypeSelect={
                    handleMetroTransportTypeSelect
                  }
                  handleRangeInputChange={handleRangeInputChange}
                />
              )}

              {/* Блок "Покупка" */}
              {/* {!showApartmentTypeSelection && (
                <PurchaseFilters
                  formData={purchaseFormData}
                  handleMultiSelect={handleMultiSelect}
                  handleSingleSelect={handleSingleSelect}
                />
              )} */}
            </div>

            <div className={styles.catalogue__filters__container__showFlats}>
              <button
                className={
                  styles.catalogue__filters__container__showFlats__save
                }
              >
                <IconImage
                  iconLink="/images/icons/heartOrange.svg"
                  alt="Сохранить поиск"
                  className={
                    styles.catalogue__filters__container__showFlats__save__icon
                  }
                />
                Сохранить поиск
              </button>

              <div
                className={
                  styles.catalogue__filters__container__showFlats__buttons
                }
              >
                <ActionButton
                  type="gray"
                  className={
                    styles.catalogue__filters__container__showFlats__buttons__clear
                  }
                  onClick={resetFilters}
                >
                  Сбросить фильтры{" "}
                  <span
                    className={
                      styles.catalogue__filters__container__showFlats__buttons__clear__count
                    }
                  >
                    {getActiveFiltersCount()}
                  </span>
                </ActionButton>
                <div
                  className={
                    styles.catalogue__filters__container__showFlats__buttons__apply__wrapper
                  }
                >
                  <ActionButton
                    className={
                      styles.catalogue__filters__container__showFlats__buttons__apply
                    }
                    onClick={handleApplyFilters}
                    type="primary"
                  >
                    Показать{" "}
                    <span>
                      {selectedPropertyType === "Квартира" ? "квартиры" : "ЖК"}
                    </span>
                  </ActionButton>

                  <IconButton
                    iconLink="/images/icons/heart.svg"
                    onClick={handleClose}
                    className={
                      styles.catalogue__filters__container__showFlats__buttons__apply__heart
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default FiltersDialog
