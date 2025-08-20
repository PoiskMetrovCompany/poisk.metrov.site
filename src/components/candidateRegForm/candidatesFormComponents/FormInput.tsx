import React, { FC } from "react";

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  className?: string;
  containerClassName?: string;
  required?: boolean;
  error?: boolean; // Добавляем проп для ошибки
}

export const FormInput: FC<FormInputProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  maxLength,
  className = "formInput big",
  containerClassName = "input-container",
  required = false,
  error = false,
}) => {
  return (
    <div className={containerClassName}>
      <label 
        htmlFor={name} 
        className={`formLabel ${required ? 'required' : ''} ${error ? 'error' : ''}`}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className={`${className} ${error ? 'error' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        required={required}
        style={{
          borderColor: error ? '#e74c3c' : undefined,
          borderWidth: error ? '1.5px' : undefined
        }}
      />
    </div>
  );
};