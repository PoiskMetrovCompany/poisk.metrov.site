import React, { FC } from "react";

interface RadioOption<T = string | boolean> {
  value: T;
  label: string;
}

interface RadioGroupProps<T = string | boolean> {
  name: string;
  options: RadioOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export const RadioGroup = <T extends string | boolean>({
  name,
  options,
  value,
  onChange,
  className = "input-container big",
}: RadioGroupProps<T>) => {
  return (
    <div className={className} style={{ gap: "20px", display: "flex" }}>
      {options.map((option) => (
        <label key={String(option.value)} className="custom-radio">
          <input
            type="radio"
            name={name}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
          />
          <span className="radiomark"></span>
          {option.label}
        </label>
      ))}
    </div>
  );
};