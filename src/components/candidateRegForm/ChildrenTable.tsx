"use client";
import React, { FC } from "react";

interface IChildrenTableProps {
  index: number;
  formData: Record<string, any>;
  setFormData: (updater: (prev: Record<string, any>) => Record<string, any>) => void;
  requiredFields?: string[]; 
}

const ChildrenTable: FC<IChildrenTableProps> = ({ 
  index, 
  formData, 
  setFormData, 
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

  const isRequired = (fieldName: string): boolean => {
    // Обязательные типы полей независимо от индекса
    const alwaysRequiredTypes = ['FIOChildren', 'dateOfBirthChildren', 'phoneNumberChildren', 'placeOfStudyChildren'];
    
    // Проверяем, содержит ли название поля один из обязательных типов
    const isAlwaysRequired = alwaysRequiredTypes.some(type => fieldName.startsWith(type));
    
    // Поле обязательно, если оно в списке requiredFields или является всегда обязательным типом
    return requiredFields.includes(fieldName) || isAlwaysRequired;
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

  return (
    <div className="formRow table-container" style={{
      opacity: 1,
      transform: 'translateY(0)',
      maxHeight: '220px',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      <table className="inputTable">
        <caption className={`tableLabel ${requiredFields.length > 0 ? 'required' : ''}`}>
          Данные совершеннолетнего ребенка
        </caption>
        <tbody>
          <tr>
            <td colSpan={2} style={{borderTopLeftRadius: '16px', borderTopRightRadius: '16px'}}>
              {renderInputWithRequired(
                `FIOChildren${index}`,
                'ФИО ребенка',
                formData[`FIOChildren${index}`] || '',
                (e) => {
                  const formattedValue = formatNameInput(e.target.value);
                  handleInputChange(`FIOChildren${index}`, formattedValue);
                }
              )}
            </td>
          </tr>
          <tr>
            <td>
              {renderInputWithRequired(
                `dateOfBirthChildren${index}`,
                'Дата рождения',
                formData[`dateOfBirthChildren${index}`] || '',
                (e) => handleDateChange(`dateOfBirthChildren${index}`, e.target.value),
                10
              )}
            </td>
            <td>
              {renderInputWithRequired(
                `phoneNumberChildren${index}`,
                'Номер телефона',
                formData[`phoneNumberChildren${index}`] || '',
                (e) => handlePhoneChange(`phoneNumberChildren${index}`, e.target.value),
                18
              )}
            </td>
          </tr>
          <tr>
            <td>
              {renderInputWithRequired(
                `placeOfStudyChildren${index}`,
                'Место учебы/работы, рабочий телефон',
                formData[`placeOfStudyChildren${index}`] || '',
                (e) => handleInputChange(`placeOfStudyChildren${index}`, e.target.value)
              )}
            </td>
            <td style={{borderBottomRightRadius: '16px'}}>
              {renderInputWithRequired(
                `placeOfLivingChildren${index}`,
                'Место проживания',
                formData[`placeOfLivingChildren${index}`] || '',
                (e) => handleInputChange(`placeOfLivingChildren${index}`, e.target.value)
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ChildrenTable;