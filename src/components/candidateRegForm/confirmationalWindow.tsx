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
  cancelText = "Отмена",
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
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content-confirmation">
        <h3
          style={{ marginBottom: "1rem", color: "#333", textAlign: "center" }}
        >
          {header}
        </h3>

        <p style={{ marginBottom: "2rem", color: "#666", textAlign: "center" }}>
          {title}
        </p>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "space-between",
          }}
        >
          <button
            style={{ marginBottom: "0" }}
            className="formBtn small btn-inactive"
            onClick={onClose}
          >
            {cancelText}
          </button>

          <button
            style={{ marginBottom: "0", marginRight: "0" }}
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
