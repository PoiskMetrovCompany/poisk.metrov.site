"use client";
import React, { FC } from "react";

interface IChildrenTableProps {
  index: number;
  formData: Record<string, any>;
  setFormData: (updater: (prev: Record<string, any>) => Record<string, any>) => void;
}

const ChildrenTable: FC<IChildrenTableProps> = ({ index, formData, setFormData }) => {
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

  const formatNameInput = (value: string): string => {
    return value.replace(/[^а-яёА-ЯЁa-zA-Z\s\-]/g, '');
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

  return (
    <div className="formRow table-container" style={{
      opacity: 1,
      transform: 'translateY(0)',
      maxHeight: '220px',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      <table className="inputTable">
        <caption className="tableLabel">Данные совершеннолетнего ребенка</caption>
        <tbody>
          <tr>
            <td colSpan={2}>
              <input
                type="text"
                name={`FIOChildren${index}`}
                placeholder="ФИО ребенка"
                value={formData[`FIOChildren${index}`] || ''}
                onChange={(e) => {
                  const formattedValue = formatNameInput(e.target.value);
                  handleInputChange(`FIOChildren${index}`, formattedValue);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="text"
                name={`dateOfBirthChildren${index}`}
                placeholder="01.01.1990"
                maxLength={10}
                value={formData[`dateOfBirthChildren${index}`] || ''}
                onChange={(e) => handleDateChange(`dateOfBirthChildren${index}`, e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                name={`phoneNumberChildren${index}`}
                placeholder="+7 (905) 123-45-67"
                maxLength={18}
                value={formData[`phoneNumberChildren${index}`] || ''}
                onChange={(e) => handlePhoneChange(`phoneNumberChildren${index}`, e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="text"
                name={`placeOfStudyChildren${index}`}
                placeholder="Место учебы/работы, рабочий телефон"
                value={formData[`placeOfStudyChildren${index}`] || ''}
                onChange={(e) => handleInputChange(`placeOfStudyChildren${index}`, e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                name={`placeOfLivingChildren${index}`}
                placeholder="Место проживания"
                value={formData[`placeOfLivingChildren${index}`] || ''}
                onChange={(e) => handleInputChange(`placeOfLivingChildren${index}`, e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ChildrenTable;