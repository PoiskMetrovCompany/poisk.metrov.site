"use client";
import React, { FC } from "react";


interface ICustomSelectProps {
  options: string[];
  placeholder: string;
  value: string;
  onChange?: (value: string) => void;
  show: boolean;
  onToggle: () => void;
  onSelect: (option: string) => void;
  isLoading?: boolean;
  error?: string;
}

const CustomSelect: FC<ICustomSelectProps> = ({ 
  options, 
  placeholder, 
  value, 
  show, 
  onToggle, 
  onSelect, 
  isLoading = false, 
  error = '' 
}) => (
  <div className="custom-select" style={{width: '100%'}}>
    <div
      className={`select-selected ${show ? 'select-arrow-active' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        if (!isLoading) {
          onToggle();
        }
      }}
      style={{
        opacity: isLoading ? 0.6 : 1,
        cursor: isLoading ? 'not-allowed' : 'pointer'
      }}
    >
      {isLoading ? 'Загрузка...' : (error ? 'Ошибка загрузки' : (value || placeholder))}
    </div>
    {!isLoading && !error && (
      <div className={`select-items ${!show ? 'select-hide' : ''}`}>
        {options.map((option, index) => (
          <div
            key={index}
            className={value === option ? 'same-as-selected' : ''}
            onClick={() => onSelect(option)}
          >
            {option}
          </div>
        ))}
      </div>
    )}
  </div>
);

export default CustomSelect;