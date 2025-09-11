"use client"

import React, { FC } from "react"

import styles from "./checkboxRow.module.scss"

interface CheckboxRowProps {
  privacyChecked: boolean
  onPrivacyChange: (checked: boolean) => void
  marketingChecked: boolean
  onMarketingChange: (checked: boolean) => void
  disabled?: boolean
  style?: React.CSSProperties
  idPrefix?: string
}

const CheckboxRow: FC<CheckboxRowProps> = ({
  privacyChecked,
  onPrivacyChange,
  marketingChecked,
  onMarketingChange,
  disabled = false,
  style,
  idPrefix = "default",
}) => {
  return (
    <div className={styles.checkboxRow} style={style}>
      {/* Первый чекбокс - политика конфиденциальности */}
      <div className={styles.checkboxRow__item}>
        <label
          className={styles.checkboxRow__customCheckbox}
          htmlFor={`${idPrefix}-privacy-policy`}
        >
          <input
            type="checkbox"
            name={`${idPrefix}-privacy-policy`}
            id={`${idPrefix}-privacy-policy`}
            checked={privacyChecked}
            onChange={(e) => onPrivacyChange(e.target.checked)}
            disabled={disabled}
            className={styles.checkboxRow__input}
          />
          <span className={styles.checkboxRow__checkmark}></span>
        </label>
        <label
          htmlFor={`${idPrefix}-privacy-policy`}
          className={styles.checkboxRow__label}
        >
          Я соглашаюсь с условиями{" "}
          <span className={styles.checkboxRow__linkText}>
            политики конфиденциальности и обработки персональных данных
          </span>
        </label>
      </div>

      {/* Второй чекбокс - рекламные рассылки */}
      <div className={styles.checkboxRow__item}>
        <label
          className={styles.checkboxRow__customCheckbox}
          htmlFor={`${idPrefix}-marketing`}
        >
          <input
            type="checkbox"
            name={`${idPrefix}-marketing`}
            id={`${idPrefix}-marketing`}
            checked={marketingChecked}
            onChange={(e) => onMarketingChange(e.target.checked)}
            disabled={disabled}
            className={styles.checkboxRow__input}
          />
          <span className={styles.checkboxRow__checkmark}></span>
        </label>
        <label
          htmlFor={`${idPrefix}-marketing`}
          className={styles.checkboxRow__label}
        >
          Я соглашаюсь с получением{" "}
          <span className={styles.checkboxRow__linkText}>
            рекламных рассылок
          </span>
        </label>
      </div>
    </div>
  )
}

export default CheckboxRow
