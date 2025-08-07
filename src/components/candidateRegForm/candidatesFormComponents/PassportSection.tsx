import React, { FC } from "react";
import { FormRow } from "./FormRow";
import { FormInput } from "./FormInput";

interface PassportSectionProps {
  formData: Record<string, any>;
  onFormDataChange: (name: string, value: string) => void;
  onDateChange: (name: string, value: string) => void;
  onPassportChange: (name: string, value: string) => void;
}

export const PassportSection: FC<PassportSectionProps> = ({
  formData,
  onFormDataChange,
  onDateChange,
  onPassportChange,
}) => {
  const formatDateInput = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
    return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4, 8)}`;
  };

  const formatPassportInput = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 4) return digits;
    return `${digits.slice(0, 4)} ${digits.slice(4, 10)}`;
  };

  return (
    <>
      <FormRow style={{marginTop: '50px'}}>
        <h3>Паспортные данные</h3>
      </FormRow>
      <FormRow className="justify-space-between">
        <div className="input-container w-49">
          <label htmlFor="passwordSeriaNumber" className="formLabel">Серия и номер</label>
          <input
            style={{width: '100%'}}
            type="text"
            name="passwordSeriaNumber"
            className="formInput"
            placeholder="1234 567890"
            maxLength={11}
            value={formData.passwordSeriaNumber || ''}
            onChange={(e) => onPassportChange('passwordSeriaNumber', formatPassportInput(e.target.value))}
          />
        </div>
        <div className="input-container w-49">
          <label htmlFor="dateOfIssue" className="formLabel">Дата выдачи</label>
          <input
            style={{width: '100%'}}
            type="text"
            name="dateOfIssue"
            className="formInput"
            placeholder="01.01.1990"
            maxLength={10}
            value={formData.dateOfIssue || ''}
            onChange={(e) => onDateChange('dateOfIssue', formatDateInput(e.target.value))}
          />
        </div>
      </FormRow>
      <FormRow>
        <FormInput
          label="Кем выдан"
          name="issuedBy"
          placeholder="ОФУМС России"
          value={formData.issuedBy || ''}
          onChange={(value) => onFormDataChange('issuedBy', value)}
          className="formInput"
        />
      </FormRow>
      <FormRow>
        <FormInput
          label="Адрес постоянной регистрации"
          name="adressOfPermanentReg"
          placeholder="Адрес постоянной регистрации"
          value={formData.adressOfPermanentReg || ''}
          onChange={(value) => onFormDataChange('adressOfPermanentReg', value)}
          className="formInput"
        />
      </FormRow>
      <FormRow>
        <FormInput
          label="Адрес временной регистрации"
          name="adressOfTemporaryReg"
          placeholder="Адрес временной регистрации"
          value={formData.adressOfTemporaryReg || ''}
          onChange={(value) => onFormDataChange('adressOfTemporaryReg', value)}
          className="formInput"
        />
      </FormRow>
      <FormRow>
        <FormInput
          label="Адрес фактического проживания"
          name="adressOfFactialLiving"
          placeholder="Адрес фактического проживания"
          value={formData.adressOfFactialLiving || ''}
          onChange={(value) => onFormDataChange('adressOfFactialLiving', value)}
          className="formInput"
        />
      </FormRow>
    </>
  );
};