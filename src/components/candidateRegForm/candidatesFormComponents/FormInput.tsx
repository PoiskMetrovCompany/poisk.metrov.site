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
}) => {
  return (
    <div className={containerClassName}>
      <label htmlFor={name} className="formLabel">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        required={required}
      />
    </div>
  );
};
