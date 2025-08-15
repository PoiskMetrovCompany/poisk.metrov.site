"use client";
import React, { FC } from "react";

interface ISpouseTableProps {
  formData: Record<string, any>;
  setFormData: (updater: (prev: Record<string, any>) => Record<string, any>) => void;
  isVisible: boolean;
}

const SpouseTable: FC<ISpouseTableProps> = ({ formData, setFormData, isVisible }) => {
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
            <td colSpan={2}>
              <input
                type="text"
                name="FIOSuprug"
                placeholder="ФИО супруга(-и)"
                value={formData.FIOSuprug || ''}
                onChange={(e) => handleInputChange('FIOSuprug', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="text"
                name="dateOfBirthTable"
                placeholder="01.01.1990"
                maxLength={10}
                value={formData.dateOfBirthTable || ''}
                onChange={(e) => handleDateChange('dateOfBirthTable', e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                name="phoneNumberTable"
                placeholder="+7 (905) 123-45-67"
                maxLength={18}
                value={formData.phoneNumberTable || ''}
                onChange={(e) => handlePhoneChange('phoneNumberTable', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="text"
                name="placeOfStudy"
                placeholder="Место учебы/работы, рабочий телефон"
                value={formData.placeOfStudy || ''}
                onChange={(e) => handleInputChange('placeOfStudy', e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                name="placeOfLiving"
                placeholder="Место проживания"
                value={formData.placeOfLiving || ''}
                onChange={(e) => handleInputChange('placeOfLiving', e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SpouseTable;