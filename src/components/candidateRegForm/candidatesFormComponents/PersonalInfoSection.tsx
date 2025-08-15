import React, { FC } from "react";
import { FormRow } from "./FormRow";
import { FormInput } from "./FormInput";
import { RadioGroup } from "./RadioGroup";
import CustomSelect from "../CustomSelect";

interface PersonalInfoSectionProps {
  formData: Record<string, any>;
  onFormDataChange: (name: string, value: string) => void;
  selectedVacancy: string;
  setSelectedVacancy: React.Dispatch<React.SetStateAction<string>>;
  selectedCity: string;
  setSelectedCity: React.Dispatch<React.SetStateAction<string>>;
  vacancyOptions: string[];
  cityOptions: string[];
  showVacancyOptions: boolean;
  setShowVacancyOptions: React.Dispatch<React.SetStateAction<boolean>>;
  showCityOptions: boolean;
  setShowCityOptions: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingVacancies: boolean;
  vacancyError: string;
  loadVacancies: () => void;
  surnameChanged: boolean;
  setSurnameChanged: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PersonalInfoSection: FC<PersonalInfoSectionProps> = ({
  formData,
  onFormDataChange,
  selectedVacancy,
  setSelectedVacancy,
  selectedCity,
  setSelectedCity,
  vacancyOptions,
  cityOptions,
  showVacancyOptions,
  setShowVacancyOptions,
  showCityOptions,
  setShowCityOptions,
  isLoadingVacancies,
  vacancyError,
  loadVacancies,
  surnameChanged,
  setSurnameChanged,
}) => {
  const formatNameInput = (value: string) => {
    return value.replace(/[^а-яёА-ЯЁ\s]/g, '');
  };

  const formatDateInput = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
    return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4, 8)}`;
  };

  const formatMobilePhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length === 0) return '';
    if (digits.length <= 1) return `+7 (${digits}`;
    if (digits.length <= 4) return `+7 (${digits.slice(1)}`;
    if (digits.length <= 7) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4)}`;
    if (digits.length <= 9) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
    return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
  };

  const formatHomePhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 3) return digits;
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)}`;
  };

  const formatINN = (value: string) => {
    return value.replace(/\D/g, '');
  };

  return (
    <>
      <FormRow>
        <div className="input-container">
          <label htmlFor="Vacancy" className="formLabel required">Вакансия</label>
          <CustomSelect
            options={vacancyOptions}
            placeholder="Выберите вакансию, на которую подаетесь"
            value={selectedVacancy}
            show={showVacancyOptions}
            isLoading={isLoadingVacancies}
            error={vacancyError}
            onToggle={() => {
              setShowVacancyOptions(!showVacancyOptions);
              setShowCityOptions(false);
            }}
            onSelect={(option) => {
              setSelectedVacancy(option);
              setShowVacancyOptions(false);
            }}
          />
          {vacancyError && (
            <div className="error-message" style={{ marginTop: '5px', fontSize: '14px', color: '#e74c3c' }}>
              {vacancyError}
              <button
                onClick={loadVacancies}
                style={{
                  marginLeft: '10px',
                  background: 'none',
                  border: 'none',
                  color: '#3498db',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Повторить
              </button>
            </div>
          )}
        </div>
      </FormRow>

      <FormRow>
        <div className="input-container">
          <label htmlFor="City" className="formLabel required">Город работы</label>
          <CustomSelect
            options={cityOptions}
            placeholder="Выберите город в котором хотите работать"
            value={selectedCity}
            show={showCityOptions}
            isLoading={false}
            error=""
            onToggle={() => {
              setShowCityOptions(!showCityOptions);
              setShowVacancyOptions(false);
            }}
            onSelect={(option) => {
              setSelectedCity(option);
              setShowCityOptions(false);
            }}
          />
        </div>
      </FormRow>

      <FormRow>
        <FormInput
          label="ФИО"
          name="FIO"
          required={true}
          placeholder="Иванов Иван Иванович"
          value={formData.FIO || ''}
          onChange={(value) => onFormDataChange('FIO', formatNameInput(value))}
        />
      </FormRow>

      <FormRow className="justify-flex-start">
        <RadioGroup
          name="surnameChanged"
          options={[
            { value: true, label: 'Я менял(-а) фамилию' },
            { value: false, label: 'Я не менял(-а) фамилию' }
          ]}
          value={surnameChanged}
          onChange={setSurnameChanged}
        />
      </FormRow>

      {surnameChanged && (
        <div className="toggle-block" style={{width: '100%'}}>
          <FormRow>
            <FormInput
              label="Причина изменения фамилии"
              name="reasonOfChange"
              placeholder="Опишите, почему поменяли фамилию"
              value={formData.reasonOfChange || ''}
              onChange={(value) => onFormDataChange('reasonOfChange', value)}
            />
          </FormRow>
        </div>
      )}

      <FormRow className="justify-space-between">
        <FormInput
          label="Дата рождения"
          name="birthDate"
          required={true}
          type="text"
          placeholder="01.01.1990"
          maxLength={10}
          value={formData.birthDate || ''}
          onChange={(value) => onFormDataChange('birthDate', formatDateInput(value))}
          containerClassName="input-container w-49"
        />

        <FormInput
          label="Место рождения"
          name="birthPlace"
          required={true}
          type="text"
          placeholder="Страна, город"
          value={formData.birthPlace || ''}
          onChange={(value) => onFormDataChange('birthPlace', value)}
          containerClassName="input-container w-49"
        />
      </FormRow>

      <FormRow className="justify-space-between">
        <FormInput
          label="Мобильный телефон"
          name="mobileNumber"
          required={true}
          type="text"
          placeholder="+7 (905) 123-45-67"
          maxLength={18}
          value={formData.mobileNumber || ''}
          onChange={(value) => onFormDataChange('mobileNumber', formatMobilePhone(value))}
          containerClassName="input-container w-49"
        />

        <FormInput
          label="Домашний телефон"
          name="domesticNumber"
          required={true}
          type="text"
          placeholder="999 999"
          maxLength={7}
          value={formData.domesticNumber || ''}
          onChange={(value) => onFormDataChange('domesticNumber', formatHomePhone(value))}
          containerClassName="input-container w-49"
        />
      </FormRow>

      <FormRow className="justify-space-between">
        <FormInput
          label="E-mail"
          required={true}
          name="email"
          type="email"
          placeholder="example@gmail.com"
          value={formData.email || ''}
          onChange={(value) => onFormDataChange('email', value)}
          containerClassName="input-container w-49"
          className="formInput"
        />

        <FormInput
          label="ИНН"
          required={true}
          name="INN"
          type="tel"
          placeholder="123456789012"
          maxLength={12}
          value={formData.INN || ''}
          onChange={(value) => onFormDataChange('INN', formatINN(value))}
          containerClassName="input-container w-49"
        />
      </FormRow>
    </>
  );
};