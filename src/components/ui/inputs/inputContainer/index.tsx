"use client";
import React, { FC } from "react";
import styles from "./inputContainer.module.scss";
import clsx from "clsx";

interface InputContainerProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  name: string;
  type?: string;
  prefix?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string
}

const InputContainer: FC<InputContainerProps> = ({
  label,
  placeholder,
  value,
  onChange,
  name,
  type = "text",
  prefix,
  required = false,
  disabled = false,
  className
}) => {
  return (
    <div className={clsx(styles.inputContainer, className)}>
      <label 
        htmlFor={name}
        className={styles.inputContainer__label}
      >
        {label}
      </label>
      <div className={styles.inputContainer__wrapper}>
        {prefix && (
          <span className={styles.inputContainer__prefix}>
            {prefix}
          </span>
        )}
        <input
          type={type}
          id={name}
          name={name}
          className={styles.inputContainer__input}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default InputContainer;