import React, { FC } from "react"

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  header: string
  title: string
  confirmText?: string
  cancelText?: string
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  header,
  title,
  confirmText = "Да, удалить",
  cancelText = "Отмена"
}) => {
  if (!isOpen) return null

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className="modal-backdrop"
      onClick={handleBackdropClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000
      }}
    >
      <div 
        className="modal-content"
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "40px",
          maxWidth: "400px",
          width: "90%",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
        }}
      >
        <h3 style={{ marginBottom: "1rem", color: "#333" }}>
          {header}
        </h3>
        
        <p style={{ marginBottom: "2rem", color: "#666" }}>
          {title}
        </p>
        
        <div 
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "flex-end"
          }}
        >
          <button style={{marginBottom: "0"}}
            className="formBtn small btn-inactive"
            onClick={onClose}
          >
            {cancelText}
          </button>
          
          <button style={{marginBottom: "0"}}
            className="formBtn small btn-active"
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal