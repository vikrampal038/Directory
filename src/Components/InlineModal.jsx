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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3 sm:px-4">
      <div className="bg-white p-4 sm:p-5 rounded-xl shadow-xl w-full max-w-[92%] sm:max-w-sm md:max-w-md">
        <h3 className="font-bold text-base sm:text-lg">{title}</h3>

        {description && (
          <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
            {description}
          </p>
        )}

        <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-4 sm:mt-5">
          <button
            onClick={onClose}
            className="px-3 sm:px-4 py-1.5 rounded-md border text-xs sm:text-sm hover:bg-gray-100 transition"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={`px-3 sm:px-4 py-1.5 rounded-md text-white text-xs sm:text-sm transition ${
              danger ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
