"use client";
import React, { FC } from "react";
import styles from "./checkboxRow.module.scss";

interface CheckboxRowProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  text: string;
  linkText: string;
  linkHref: string;
  name: string;
  id: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const CheckboxRow: FC<CheckboxRowProps> = ({
  checked,
  onChange,
  text,
  linkText,
  linkHref,
  name,
  id,
  disabled = false,
  style
}) => {
  return (
    <div className={styles.checkboxRow} style={style}>
      <label className={styles.checkboxRow__customCheckbox} htmlFor={id}>
        <input
          type="checkbox"
          name={name}
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className={styles.checkboxRow__input}
        />
        <span className={styles.checkboxRow__checkmark}></span>
      </label>
      <label htmlFor={id} className={styles.checkboxRow__label}>
        {text} <span className={styles.checkboxRow__linkText}>{linkText}</span>
      </label>
    </div>
  );
};

export default CheckboxRow;