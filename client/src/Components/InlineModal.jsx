import { useState } from "react";

export default function InlineModal({
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = false,
  onClose,
  onConfirm,
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-xl shadow-xl w-96">
        <h3 className="font-bold text-lg">{title}</h3>

        {description && (
          <p className="text-sm text-gray-600 mt-2">{description}</p>
        )}

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-1 rounded-md border"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={`px-4 py-1 rounded-md text-white ${
              danger ? "bg-red-600 hover:bg-red-700" : "bg-blue-600"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

