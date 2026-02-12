// AdminPasswordModal.jsx
import { useState } from "react";

export default function AdminPasswordModal({ onClose, onConfirm }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-xl shadow-xl w-96">
        <h3 className="font-bold text-lg">Admin Password Required</h3>
        <p className="text-sm text-gray-600 mt-1">
          Only admin can delete folders or contents.
        </p>

        <input
          type="password"
          className="border w-full p-2 rounded-md mt-3"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-3 py-1 border rounded-md">
            Cancel
          </button>
          <button
            className="bg-red-600 text-white px-3 py-1 rounded-md"
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
