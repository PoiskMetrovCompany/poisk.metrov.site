import React, { FC } from "react";
import { FormRow } from "./FormRow";
import Image from "next/image";
interface SuccessMessageProps {
  onClose: () => void;
}

export const SuccessMessage: FC<SuccessMessageProps> = ({ onClose }) => {
  return (
    <div className="center-card" style={{ maxHeight: '364px' }}>
      <FormRow className="justify-center">
        <div className="successMarker">
        <Image 
            src="/images/icons/success-check.svg" 
            alt="Success" 
            width={56} 
            height={56} 
        />
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