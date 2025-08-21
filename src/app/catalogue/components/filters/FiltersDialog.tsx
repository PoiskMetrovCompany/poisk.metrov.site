import React, { FC } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import styles from "./filters.module.scss"
import ActionButton from "@/components/ui/buttons/ActionButton"

import { useFiltersForm } from "./useFiltersForm"
import ApartmentFilters from "./filtersComponents/flitersBlocks/apartmentFilters"
import ComplexFilters from "./filtersComponents/flitersBlocks/complexFilters"
import PurchaseFilters from "./filtersComponents/flitersBlocks/purchaseFilters"
import IconImage from "@/components/ui/IconImage"

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

            {/* Блок "Квартира" */}
            <ApartmentFilters
              formData={{
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
              }}
              handleMultiSelect={handleMultiSelect}
              handleApartmentsSelect={handleApartmentsSelect}
              handleRangeInputChange={handleRangeInputChange}
              onCloseDialog={handleClose}
            />

            {/* Блок "Жилой комплекс" */}
            <ComplexFilters
              formData={{
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
              }}
              handleMultiSelect={handleMultiSelect}
              handleMetroTransportTypeSelect={handleMetroTransportTypeSelect}
              handleRangeInputChange={handleRangeInputChange}
            />

            {/* Блок "Покупка" */}
            <PurchaseFilters
              formData={{
                paymentMethod: formData.paymentMethod || [],
                mortgageType: formData.mortgageType || [],
                installmentPeriod: formData.installmentPeriod || [],
                downPayment: formData.downPayment || [],
                mortgagePrograms: formData.mortgagePrograms || [],
              }}
              handleMultiSelect={handleMultiSelect}
            />

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
                <ActionButton
                  className={
                    styles.catalogue__filters__container__showFlats__buttons__apply
                  }
                  onClick={handleApplyFilters}
                  type="primary"
                >
                  Показать 12166 предложений
                </ActionButton>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default FiltersDialog
