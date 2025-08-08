"use client";
import React, { FC, useState, useEffect } from "react";

interface IDeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  roleName: string;
}

const DeleteConfirmationModal: FC<IDeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  roleName
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      // Небольшая задержка для плавного появления
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`modal-overlay ${isVisible ? 'show' : ''}`}
      onClick={handleOverlayClick}
    >
      <main className="modal-content">
        <section>
          <div className="center-card" style={{maxHeight: '263px'}}>
            <h1>Удалить вакансию</h1>
            <p>Вы точно уверены, что хотите удалить эту вакансию из анкет кандидатов?</p>
            <div className="formRow justify-space-between">
              <button 
                style={{maxWidth: '150px'}} 
                className="formBtn btn-active" 
                onClick={onClose}
              >
                Нет, оставить
              </button>
              <button 
                style={{maxWidth: '150px'}} 
                className="formBtn btn-inactive" 
                onClick={handleConfirm}
              >
                Да, удалить
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DeleteConfirmationModal;