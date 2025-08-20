import React, { FC } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import styles from "./filters.module.scss"
import ActionButton from "@/components/ui/buttons/ActionButton"
import FiltersHeader from "./filtersComponents/head"
import ApartmentFilters from "./filtersComponents/apartmentFilters"
import ComplexFilters from "./filtersComponents/complexFilters"
import PurchaseFilters from "./filtersComponents/purchaseFilters"
import { useFiltersForm } from "./useFiltersForm"

interface FiltersDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const FiltersDialog: FC<FiltersDialogProps> = ({ open, onOpenChange }) => {
  const {
    form,
    formData,

    // Состояния показа опций селектов
    showOptions,

    // Рефы
    refs,

    // Функции
    resetFilters,

    // Универсальные обработчики
    handleSelectToggle,
    handleSelectChange,
    handleRangeChange,
    handleMultiSelect,
    handleApartmentsSelect,
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
            <div className={styles.catalogue__filters__container__head}>
              <FiltersHeader onClose={handleClose} onReset={resetFilters} />
            </div>

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
              handleRangeChange={handleRangeChange}
            />

            {/* Блок "Жилой комплекс" */}
            <ComplexFilters
              formData={{
                buildingType: formData.buildingType || [],
                builder: formData.builder || [],
                completionDate: formData.completionDate || [],
                metroDistance: formData.metroDistance || [],
                elevator: formData.elevator || [],
                floorsInBuildingMin: formData.floorsInBuildingMin,
                floorsInBuildingMax: formData.floorsInBuildingMax,
                parking: formData.parking || [],
                security: formData.security || [],
              }}
              handleMultiSelect={handleMultiSelect}
              handleRangeChange={handleRangeChange}
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
              <ActionButton onClick={handleApplyFilters}>
                Показать 11714 квартир
              </ActionButton>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default FiltersDialog
