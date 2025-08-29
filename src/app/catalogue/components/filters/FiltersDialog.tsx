import * as Dialog from "@radix-ui/react-dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

import React, { FC, useMemo } from "react"

import styles from "./filters.module.scss"

import ApartmentFilters from "./filtersComponents/flitersBlocks/apartmentFilters"
import ComplexFilters from "./filtersComponents/flitersBlocks/complexFilters"
import PurchaseFilters from "./filtersComponents/flitersBlocks/purchaseFilters"
import { useFiltersForm } from "./useFiltersForm"

import IconImage from "@/components/ui/IconImage"
import ActionButton from "@/components/ui/buttons/ActionButton"
import IconButton from "@/components/ui/buttons/IconButton"

interface FiltersDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const FiltersDialog: FC<FiltersDialogProps> = ({ open, onOpenChange }) => {
  const {
    form,
    formData,

    // Функции
    resetFilters,
    getActiveFiltersCount,
    handleRangeChange,
    handleRangeInputChange,
    handleMultiSelect,
    handleApartmentsSelect,
    handleMetroTransportTypeSelect,
  } = useFiltersForm()

  // Мемоизируем данные для ApartmentFilters
  const apartmentFormData = useMemo(
    () => ({
      rooms: formData.rooms || [],
      priceMin: formData.priceMin,
      priceMax: formData.priceMax,
      floorMin: formData.floorMin,
      floorMax: formData.floorMax,
      floorOptions: formData.floorOptions || [],
      flatAreaMin: formData.flatAreaMin,
      flatAreaMax: formData.flatAreaMax,
      livingAreaMin: formData.livingAreaMin,
      livingAreaMax: formData.livingAreaMax,
      ceilingHeight: formData.ceilingHeight || [],
      layout: formData.layout || [],
      finish: formData.finish || [],
      bathroom: formData.bathroom || [],
      apartments: formData.apartments || "",
      features: formData.features || [],
    }),
    [formData]
  )

  // Мемоизируем данные для ComplexFilters
  const complexFormData = useMemo(
    () => ({
      buildingType: formData.buildingType || [],
      builder: formData.builder || [],
      completionDate: formData.completionDate || [],
      metroDistance: formData.metroDistance || [],
      metroTransportType: formData.metroTransportType || "",
      elevator: formData.elevator || [],
      floorsInBuildingMin: formData.floorsInBuildingMin,
      floorsInBuildingMax: formData.floorsInBuildingMax,
      parking: formData.parking || [],
      security: formData.security || [],
    }),
    [formData]
  )

  // Мемоизируем данные для PurchaseFilters
  const purchaseFormData = useMemo(
    () => ({
      paymentMethod: formData.paymentMethod || [],
      mortgageType: formData.mortgageType || [],
      installmentPeriod: formData.installmentPeriod || [],
      downPayment: formData.downPayment || [],
      mortgagePrograms: formData.mortgagePrograms || [],
    }),
    [formData]
  )

  const handleApplyFilters = () => {
    form.handleSubmit()
    onOpenChange(false)
  }

  const handleClose = () => {
    onOpenChange(false)
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

          <div className={styles.catalogue__filters__container}>
            {/* <div className={styles.catalogue__filters__container__head}>
              <FiltersHeader onClose={handleClose} onReset={resetFilters} />
            </div> */}

            <div className={styles.catalogue__filters__container__content}>
              {/* Блок "Квартира" */}
              <ApartmentFilters
                formData={apartmentFormData}
                handleMultiSelect={handleMultiSelect}
                handleApartmentsSelect={handleApartmentsSelect}
                handleRangeInputChange={handleRangeInputChange}
                onCloseDialog={handleClose}
              />

              {/* Блок "Жилой комплекс" */}
              <ComplexFilters
                formData={complexFormData}
                handleMultiSelect={handleMultiSelect}
                handleMetroTransportTypeSelect={handleMetroTransportTypeSelect}
                handleRangeInputChange={handleRangeInputChange}
              />

              {/* Блок "Покупка" */}
              <PurchaseFilters
                formData={purchaseFormData}
                handleMultiSelect={handleMultiSelect}
              />
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
                    Показать <span>12166 предложений</span>
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
