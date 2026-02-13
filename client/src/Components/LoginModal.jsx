import { useState } from "react";
import { verifyLogin } from "../utils/loginAuth";

export default function LoginModal({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const ok = verifyLogin(email, password);
    if (!ok) {
      setError("Invalid email or password");
      return;
    }

    localStorage.setItem("loggedInEmail", email);
    localStorage.setItem("isLoggedIn", "true");
    onSuccess(email);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-3 sm:px-4">
      <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-[92%] sm:max-w-sm md:max-w-md animate-scaleIn">
        <h2 className="text-lg sm:text-xl font-bold mb-3 text-center">
          Login Required
        </h2>

        <input
          className="border w-full p-2 sm:p-2.5 rounded-md mb-2 text-sm sm:text-base"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border w-full p-2 sm:p-2.5 rounded-md mb-2 text-sm sm:text-base"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-500 text-xs sm:text-sm text-center">
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          className="bg-blue-600 hover:bg-blue-700 transition text-white w-full py-2 sm:py-2.5 rounded-md mt-3 text-sm sm:text-base"
        >
          Login
        </button>
      </div>
    </div>
  );
}
