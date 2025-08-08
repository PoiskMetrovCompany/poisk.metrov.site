import React, {FC} from "react";
import { FormRow } from "./FormRow";

const WorkExperienceTable: FC<{
  formData: Record<string, any>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}> = ({ formData, setFormData }) => {
  const formatDate = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 4) {
      return numbers.slice(0, 2) + '.' + numbers.slice(2);
    } else {
      return numbers.slice(0, 2) + '.' + numbers.slice(2, 4) + '.' + numbers.slice(4, 8);
    }
  };

  const formatMobilePhone = (value: string) => {
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

  return (
    <FormRow className="" style={{
      opacity: 1,
      height: '550px',
      overflow: 'hidden',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      <table className="inputTable" style={{height: 'auto', minHeight: '350px'}}>
        <caption className="tableLabel">
          Данные о последнем месте работы
        </caption>
        <tbody>
          <tr>
            <td style={{borderTopLeftRadius: '16px', borderTopRightRadius: 0}}>
              <input
                type="text"
                name="companyName"
                placeholder="Полное наименование предприятия"
                value={formData.companyName || ''}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
              />
            </td>
            <td style={{borderTopRightRadius: '16px', borderTopLeftRadius: 0 }}>
              <input
                type="text"
                name="companyPhone"
                placeholder="Телефон предприятия"
                maxLength={18}
                value={formData.companyPhone || ''}
                onChange={(e) => {
                  const formattedValue = formatMobilePhone(e.target.value);
                  handleInputChange('companyPhone', formattedValue);
                }}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <input
                type="text"
                name="companyActivity"
                placeholder="Сфера деятельности предприятия"
                value={formData.companyActivity || ''}
                onChange={(e) => handleInputChange('companyActivity', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <input
                type="text"
                name="companyAddress"
                placeholder="Адрес предприятия"
                value={formData.companyAddress || ''}
                onChange={(e) => handleInputChange('companyAddress', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="text"
                name="position"
                placeholder="Должность"
                value={formData.position || ''}
                onChange={(e) => handleInputChange('position', e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                name="salary"
                placeholder="Уровень заработной платы"
                value={formData.salary || ''}
                onChange={(e) => handleInputChange('salary', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="text"
                name="hireDate"
                placeholder="Дата приема (месяц, год)"
                maxLength={10}
                value={formData.hireDate || ''}
                onChange={(e) => handleDateChange('hireDate', e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                name="dismissalDate"
                placeholder="Дата увольнения (месяц, год)"
                maxLength={10}
                value={formData.dismissalDate || ''}
                onChange={(e) => handleDateChange('dismissalDate', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <input
                type="text"
                name="dismissalReason"
                placeholder="Причина увольнения"
                value={formData.dismissalReason || ''}
                onChange={(e) => handleInputChange('dismissalReason', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={{borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px'}}>
              <input
                type="text"
                name="referenceContact"
                placeholder="ФИО и номер телефона лица, к которому можно обратиться за рекомендацией"
                value={formData.referenceContact || ''}
                onChange={(e) => handleInputChange('referenceContact', e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </FormRow>
  );
};