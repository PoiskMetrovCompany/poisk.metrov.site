import React, { FC } from "react"
import styles from "./ranges.module.scss"
import Range from "@/components/ui/inputs/range"

interface FilterRangesProps {
  // Данные формы для ranges
  formData: {
    priceMin: number
    priceMax: number
    floorMin: number
    floorMax: number
    flatAreaMin: number
    flatAreaMax: number
    kitchenAreaMin: number
    kitchenAreaMax: number
  }
  
  // Обработчики изменения ranges
  handlePriceRangeChange: (range: [number, number]) => void
  handleFloorRangeChange: (range: [number, number]) => void
  handleFlatAreaRangeChange: (range: [number, number]) => void
  handleKitchenAreaRangeChange: (range: [number, number]) => void
}

const FilterRanges: FC<FilterRangesProps> = ({
  formData,
  handlePriceRangeChange,
  handleFloorRangeChange,
  handleFlatAreaRangeChange,
  handleKitchenAreaRangeChange,
}) => {
  return (
    <div className={styles.catalogue__filters__container__range}>
      {/* Стоимость */}
      <Range
        title="Стоимость, млн ₽"
        min={4}
        max={15}
        step={1}
        value={[formData.priceMin, formData.priceMax]}
        onValueChange={handlePriceRangeChange}
        formatLabel={(value) => `${value}`}
        className={styles.whiteLabel}
      />

      {/* Этаж */}
      <Range
        title="Этаж"
        min={1}
        max={30}
        step={1}
        value={[formData.floorMin, formData.floorMax]}
        onValueChange={handleFloorRangeChange}
        formatLabel={(value) => `${value}`}
        className={styles.whiteLabel}
      />

      {/* Площадь квартиры */}
      <Range
        title="Площадь квартиры, м²"
        min={20}
        max={200}
        step={5}
        value={[formData.flatAreaMin, formData.flatAreaMax]}
        onValueChange={handleFlatAreaRangeChange}
        formatLabel={(value) => `${value}м²`}
        className={styles.whiteLabel}
      />

      {/* Площадь кухни */}
      <Range
        title="Площадь кухни, м²"
        min={5}
        max={30}
        step={1}
        value={[formData.kitchenAreaMin, formData.kitchenAreaMax]}
        onValueChange={handleKitchenAreaRangeChange}
        formatLabel={(value) => `${value}м²`}
        className={styles.whiteLabel}
      />
    </div>
  )
}

export default FilterRanges