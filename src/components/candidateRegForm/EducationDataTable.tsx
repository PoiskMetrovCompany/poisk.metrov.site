"use client";
import React, { FC } from "react";

interface IEducationDataTableProps {
  index: number;
  formData: Record<string, any>;
  setFormData: (updater: (prev: Record<string, any>) => Record<string, any>) => void;
}

const EducationDataTable: FC<IEducationDataTableProps> = ({ index, formData, setFormData }) => {
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

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name: string, value: string) => {
    const formattedValue = formatDate(value);
    handleInputChange(name, formattedValue);
  };

  return (
    <div className="formRow table-container" style={{
      opacity: 1,
      transform: 'translateY(0)',
      maxHeight: '216px',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      <table className="inputTable">
        <caption className="tableLabel">Данные об образовательном учреждении</caption>
        <tbody>
          <tr>
            <td colSpan={2}>
              <input
                type="text"
                name={`nameInstitution${index}`}
                placeholder="Полное наименование учебного заведения"
                value={formData[`nameInstitution${index}`] || ''}
                onChange={(e) => handleInputChange(`nameInstitution${index}`, e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="text"
                name={`dateOfEntrance${index}`}
                placeholder="01.01.1990"
                maxLength={10}
                value={formData[`dateOfEntrance${index}`] || ''}
                onChange={(e) => handleDateChange(`dateOfEntrance${index}`, e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                name={`dateOfEnding${index}`}
                placeholder="01.01.1994"
                maxLength={10}
                value={formData[`dateOfEnding${index}`] || ''}
                onChange={(e) => handleDateChange(`dateOfEnding${index}`, e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="text"
                name={`typeOfEducation${index}`}
                placeholder="Форма обучения (дневная/вечерняя/заочная)"
                value={formData[`typeOfEducation${index}`] || ''}
                onChange={(e) => handleInputChange(`typeOfEducation${index}`, e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                name={`diplomaSpeciality${index}`}
                placeholder="Специальность по диплому"
                value={formData[`diplomaSpeciality${index}`] || ''}
                onChange={(e) => handleInputChange(`diplomaSpeciality${index}`, e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EducationDataTable;