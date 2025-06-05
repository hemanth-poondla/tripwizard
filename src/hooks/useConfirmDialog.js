import { useState } from "react";
import ConfirmDialog from "../components/ConfirmDialog/ConfirmDialog";

export default function useConfirmDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState({});

  const openDialog = ({ title, message, onConfirm, onCancel, confirmText, cancelText }) => {
    setConfig({
      title,
      message,
      onConfirm: () => {
        onConfirm?.();
        setIsOpen(false); // ✅ close on confirm
      },
      onCancel: () => {
        onCancel?.();
        setIsOpen(false); // ✅ close on cancel
      },
      confirmText,
      cancelText,
    });
    setIsOpen(true);
  };

  const ConfirmDialogComponent = () => (
    <ConfirmDialog
      show={isOpen}
      title={config.title}
      message={config.message}
      onConfirm={config.onConfirm}
      onCancel={config.onCancel}
      confirmText={config.confirmText}
      cancelText={config.cancelText}
    />
  );

  return {
    ConfirmDialogComponent,
    openDialog,
  };
}
