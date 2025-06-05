import React from "react";
import "./ConfirmDialog.css";

export default function ConfirmDialog({
  show,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "Cancel",
}) {
  if (!show) return null;

  const handleConfirm = () => {
    if (typeof onConfirm === "function") {
      onConfirm();
    }
  };

  const handleCancel = () => {
    if (typeof onCancel === "function") {
      onCancel();
    }
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <h3 className="dialog-title">{title}</h3>
        <p className="dialog-message">{message}</p>
        <div className="dialog-actions">
          <button className="dialog-btn cancel" onClick={handleCancel}>
            {cancelText}
          </button>
          <button className="dialog-btn confirm" onClick={handleConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
