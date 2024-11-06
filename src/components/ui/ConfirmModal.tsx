
import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold">Confirmação</h2>
        <p className="mt-2">{message}</p>
        <div className="flex justify-end mt-4">
          <button onClick={onCancel} className="mr-2 px-4 py-2 bg-gray-300 rounded">
            Cancelar
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
