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
  type?: "text" | "phone" | "date" | string;
  prefix?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
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
  
  const formatPhoneNumber = (input: string): string => {
    // Удаляем все символы кроме цифр
    const numbers = input.replace(/\D/g, '');
    
    let cleanNumbers = numbers;
    if (numbers.startsWith('8')) {
      cleanNumbers = '7' + numbers.slice(1);
    }
    
    cleanNumbers = cleanNumbers.slice(0, 11);
    
    if (cleanNumbers.length === 0) return '';
    if (cleanNumbers.length <= 1) return `+${cleanNumbers}`;
    if (cleanNumbers.length <= 4) return `+${cleanNumbers.slice(0, 1)} ${cleanNumbers.slice(1)}`;
    if (cleanNumbers.length <= 7) return `+${cleanNumbers.slice(0, 1)} ${cleanNumbers.slice(1, 4)} ${cleanNumbers.slice(4)}`;
    if (cleanNumbers.length <= 9) return `+${cleanNumbers.slice(0, 1)} ${cleanNumbers.slice(1, 4)} ${cleanNumbers.slice(4, 7)} ${cleanNumbers.slice(7)}`;
    
    return `+${cleanNumbers.slice(0, 1)} ${cleanNumbers.slice(1, 4)} ${cleanNumbers.slice(4, 7)} ${cleanNumbers.slice(7, 9)} ${cleanNumbers.slice(9, 11)}`;
  };

  const formatDate = (input: string): string => {
    const numbers = input.replace(/\D/g, '');
    
    const limitedNumbers = numbers.slice(0, 8);
    
    if (limitedNumbers.length === 0) return '';
    if (limitedNumbers.length <= 2) return limitedNumbers;
    if (limitedNumbers.length <= 4) return `${limitedNumbers.slice(0, 2)}.${limitedNumbers.slice(2)}`;
    
    return `${limitedNumbers.slice(0, 2)}.${limitedNumbers.slice(2, 4)}.${limitedNumbers.slice(4)}`;
  };

  const handleInputChange = (inputValue: string) => {
    let formattedValue = inputValue;

    if (type === "phone") {
      formattedValue = formatPhoneNumber(inputValue);
    } else if (type === "date") {
      formattedValue = formatDate(inputValue);
    }

    onChange(formattedValue);
  };

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
          type="text"
          id={name}
          name={name}
          className={styles.inputContainer__input}
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          required={required}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default InputContainer;