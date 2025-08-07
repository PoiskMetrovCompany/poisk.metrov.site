import React, { FC } from "react";
import { FormRow } from "./FormRow";

interface SuccessMessageProps {
  onClose: () => void;
}

export const SuccessMessage: FC<SuccessMessageProps> = ({ onClose }) => {
  return (
    <div className="center-card" style={{ maxHeight: '364px' }}>
      <FormRow className="justify-center">
        <div className="successMarker">
          <svg width="56" height="56" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" fill="#e8f5e8" stroke="#4caf50" strokeWidth="2"/>
            <polyline points="12,20 17,25 28,14" stroke="#4caf50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </div>
      </FormRow>
      <FormRow className="justify-center">
        <h1>Анкета успешно отправлена</h1>
      </FormRow>
      <FormRow className="justify-center">
        <p>Мы успешно получили вашу анкету</p>
      </FormRow>
      <FormRow className="justify-center">
        <button
          id="closeNotification"
          className="formBtn btn-active"
          onClick={onClose}
        >
          Закрыть
        </button>
      </FormRow>
    </div>
  );
};