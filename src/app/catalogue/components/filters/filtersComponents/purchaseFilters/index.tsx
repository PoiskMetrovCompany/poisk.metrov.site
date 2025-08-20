import React, { FC } from "react"
import styles from "./purchaseFilters.module.scss"
import FiltersButton from "@/components/ui/buttons/FiltersButton"
import {
  PAYMENT_METHOD_OPTIONS,
  MORTGAGE_TYPE_OPTIONS,
  INSTALLMENT_PERIOD_OPTIONS,
  DOWN_PAYMENT_OPTIONS,
  MORTGAGE_PROGRAMS_OPTIONS,
} from "../../types"

interface PurchaseFiltersProps {
  formData: {
    paymentMethod: string[]
    mortgageType: string[]
    installmentPeriod: string[]
    downPayment: string[]
    mortgagePrograms: string[]
  }
  handleMultiSelect: (
    field:
      | "paymentMethod"
      | "mortgageType"
      | "installmentPeriod"
      | "downPayment"
      | "mortgagePrograms",
    value: string
  ) => void
}

const PurchaseFilters: FC<PurchaseFiltersProps> = ({
  formData,
  handleMultiSelect,
}) => {
  return (
    <div className={styles.purchaseFilters}>
      <div className={styles.purchaseFilters__title}>Покупка</div>

      {/* Способ оплаты */}
      <div className={styles.purchaseFilters__section}>
        <div className={styles.purchaseFilters__section__label}>
          Способ оплаты
        </div>
        <div className={styles.purchaseFilters__section__options}>
          {PAYMENT_METHOD_OPTIONS.map((option) => (
            <FiltersButton
              key={option}
              text={option}
              isActive={formData.paymentMethod.includes(option)}
              onClick={() => handleMultiSelect("paymentMethod", option)}
            />
          ))}
        </div>
      </div>

      {/* Ипотека */}
      <div className={styles.purchaseFilters__section}>
        <div className={styles.purchaseFilters__section__label}>Ипотека</div>
        <div className={styles.purchaseFilters__section__options}>
          {MORTGAGE_TYPE_OPTIONS.map((option) => (
            <FiltersButton
              key={option}
              text={option}
              isActive={formData.mortgageType.includes(option)}
              onClick={() => handleMultiSelect("mortgageType", option)}
            />
          ))}
        </div>
      </div>

      {/* Рассрочка */}
      <div className={styles.purchaseFilters__section}>
        <div className={styles.purchaseFilters__section__label}>Рассрочка</div>
        <div className={styles.purchaseFilters__section__options}>
          {INSTALLMENT_PERIOD_OPTIONS.map((option) => (
            <FiltersButton
              key={option}
              text={option}
              isActive={formData.installmentPeriod.includes(option)}
              onClick={() => handleMultiSelect("installmentPeriod", option)}
            />
          ))}
        </div>
      </div>

      {/* Первоначальный взнос */}
      <div className={styles.purchaseFilters__section}>
        <div className={styles.purchaseFilters__section__label}>
          Первоначальный взнос
        </div>
        <div className={styles.purchaseFilters__section__options}>
          {DOWN_PAYMENT_OPTIONS.map((option) => (
            <FiltersButton
              key={option}
              text={option}
              isActive={formData.downPayment.includes(option)}
              onClick={() => handleMultiSelect("downPayment", option)}
            />
          ))}
        </div>
      </div>

      {/* Ипотечные программы */}
      <div className={styles.purchaseFilters__section}>
        <div className={styles.purchaseFilters__section__label}>
          Ипотечные программы
        </div>
        <div className={styles.purchaseFilters__section__options}>
          {MORTGAGE_PROGRAMS_OPTIONS.map((option) => (
            <FiltersButton
              key={option}
              text={option}
              isActive={formData.mortgagePrograms.includes(option)}
              onClick={() => handleMultiSelect("mortgagePrograms", option)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PurchaseFilters
