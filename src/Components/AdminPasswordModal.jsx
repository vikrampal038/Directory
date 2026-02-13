import { useState } from "react";

export default function AdminPasswordModal({ onClose, onConfirm }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-50 px-3 sm:px-4">
      <div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md">
        <h3 className="font-bold text-base sm:text-lg md:text-xl">
          Admin Password Required
        </h3>

        <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
          Only admin can delete folders or contents.
        </p>

        <input
          type="password"
          className="border w-full p-2 sm:p-2.5 rounded-md mt-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-600 text-xs sm:text-sm mt-1">{error}</p>
        )}

        <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-3 py-1.5 sm:py-1 border rounded-md text-sm sm:text-base hover:bg-gray-100 transition-all duration-200"
          >
            Cancel
          </button>

          <button
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 sm:py-1 rounded-md text-sm sm:text-base transition-all duration-200"
            onClick={() => {
              if (!password) {
                setError("Password required");
                return;
              }
              onConfirm(password, setError);
            }}
          >
            Verify & Delete
          </button>
        </div>
      </div>
    </div>
  );
}
