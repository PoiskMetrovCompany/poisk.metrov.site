"use client";
import React, { FC } from "react";

interface ISpouseTableProps {
  formData: Record<string, any>;
  setFormData: (updater: (prev: Record<string, any>) => Record<string, any>) => void;
  isVisible: boolean;
  requiredFields?: string[];
}

const SpouseTable: FC<ISpouseTableProps> = ({ 
  formData, 
  setFormData, 
  isVisible, 
  requiredFields = [] 
}) => {
  const formatDate = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 4) {
      return numbers.slice(0, 2) + '.' + numbers.slice(2);
    } else {
      return numbers.slice(0, 2) + '.' + numbers.slice(2, 4) + '.' + numbers.slice(4, 8);
    }
  };

  const formatMobilePhone = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    let formattedNumbers = numbers;
    if (numbers.length > 0 && numbers[0] !== '7') {
      formattedNumbers = '7' + numbers;
    }
    
    if (formattedNumbers.length <= 1) {
      return '+7';
    } else if (formattedNumbers.length <= 4) {
      return '+7 (' + formattedNumbers.slice(1);
    } else if (formattedNumbers.length <= 7) {
      return '+7 (' + formattedNumbers.slice(1, 4) + ') ' + formattedNumbers.slice(4);
    } else if (formattedNumbers.length <= 9) {
      return '+7 (' + formattedNumbers.slice(1, 4) + ') ' + formattedNumbers.slice(4, 7) + '-' + formattedNumbers.slice(7);
    } else {
      return '+7 (' + formattedNumbers.slice(1, 4) + ') ' + formattedNumbers.slice(4, 7) + '-' + formattedNumbers.slice(7, 9) + '-' + formattedNumbers.slice(9, 11);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name: string, value: string) => {
    const formattedValue = formatDate(value);
    handleInputChange(name, formattedValue);
  };

  const handlePhoneChange = (name: string, value: string) => {
    const formattedValue = formatMobilePhone(value);
    handleInputChange(name, formattedValue);
  };

  const isRequired = (fieldName: string): boolean => {
    // Обязательные поля супруга (все кроме места проживания)
    const alwaysRequiredFields = ['FIOSuprug', 'dateOfBirthTable', 'phoneNumberTable', 'placeOfStudy'];
    
    // Поле обязательно, если оно в списке requiredFields или является всегда обязательным
    return requiredFields.includes(fieldName) || alwaysRequiredFields.includes(fieldName);
  };

  const renderInputWithRequired = (
    name: string, 
    placeholder: string, 
    value: string, 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    maxLength?: number
  ) => {
    const required = isRequired(name);
    
    return (
      <div className="custom-input-container">
        <input
          type="text"
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          required={required}
          maxLength={maxLength}
          className={value ? 'has-value' : ''}
        />
        <label htmlFor={name} className={`custom-placeholder ${required ? 'required' : ''}`}>
          {placeholder}
          {required && <span className="required-star"> *</span>}
        </label>
      </div>
    );
  };

  if (!isVisible) return null;

  return (
    <div className="formRow" style={{
      opacity: 1,
      maxHeight: '500px',
      overflow: 'hidden',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      <table className="inputTable">
        <caption className="tableLabel required">
          Данные супруга(-и)
        </caption>
        <tbody>
          <tr>
            <td colSpan={2} style={{borderTopLeftRadius: '16px', borderTopRightRadius: '16px'}}>
              {renderInputWithRequired(
                'FIOSuprug',
                'ФИО супруга(-и)',
                formData.FIOSuprug || '',
                (e) => handleInputChange('FIOSuprug', e.target.value)
              )}
            </td>
          </tr>
          <tr>
            <td>
              {renderInputWithRequired(
                'dateOfBirthTable',
                'Дата рождения',
                formData.dateOfBirthTable || '',
                (e) => handleDateChange('dateOfBirthTable', e.target.value),
                10
              )}
            </td>
            <td>
              {renderInputWithRequired(
                'phoneNumberTable',
                'Номер телефона',
                formData.phoneNumberTable || '',
                (e) => handlePhoneChange('phoneNumberTable', e.target.value),
                18
              )}
            </td>
          </tr>
          <tr>
            <td style={{borderBottomLeftRadius: '16px'}}>
              {renderInputWithRequired(
                'placeOfStudy',
                'Место учебы/работы, рабочий телефон',
                formData.placeOfStudy || '',
                (e) => handleInputChange('placeOfStudy', e.target.value)
              )}
            </td>
            <td style={{borderBottomRightRadius: '16px'}}>
              {renderInputWithRequired(
                'placeOfLiving',
                'Место проживания',
                formData.placeOfLiving || '',
                (e) => handleInputChange('placeOfLiving', e.target.value)
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SpouseTable;