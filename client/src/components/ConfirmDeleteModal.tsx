import React, { useState } from 'react';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string; // Optional name to show what is being deleted
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({isOpen,onClose,onConfirm,itemName = 'this item'}) => {
              const [isLoading, setIsLoading] = useState(false);

              const handleConfirm = async () => {
                setIsLoading(true);
                await onConfirm();
                setIsLoading(false);
              }

              if (!isOpen) return null;

              return (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                  <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 space-y-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                      Delete Confirmation
                    </h2>
                    <p className="text-sm text-gray-600">
                      Are you sure you want to delete <strong>{itemName}</strong>? This action cannot be undone.
                    </p>
                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        className="px-4 py-2 text-sm rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                        onClick={onClose}
                      >
                        Cancel
                      </button>
                      <button
                        className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
                        onClick={handleConfirm}
                      >
                        {isLoading? "Deleting..":"Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              );
};

