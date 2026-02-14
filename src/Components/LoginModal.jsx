import { useState } from "react";
import { verifyLogin } from "../utils/loginAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginModal({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const user = verifyLogin(email, password);
    if (!user) {
      setError("Invalid email or password");
      return;
    }

    localStorage.setItem("loggedInEmail", user.email);
    localStorage.setItem("loggedInName", user.name);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify(user)); // ✅ important for delete password
    onSuccess(user.email);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-3 sm:px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-[92%] sm:max-w-sm md:max-w-md animate-scaleIn"
      >
        <h2 className="text-lg sm:text-xl font-bold mb-3 text-center">
          Login Required
        </h2>

        <input
          type="email"
          autoComplete="username" // ✅ add this
          className="border w-full p-2 sm:p-2.5 rounded-md mb-2 text-sm sm:text-base"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            autoComplete="current-password" // ✅ add this
            className="border w-full p-2 sm:p-2.5 rounded-md mb-2 text-sm sm:text-base"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowPass((p) => !p)}
            className="absolute right-3 top-3.75 text-xl text-black"
          >
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-xs sm:text-sm text-center">{error}</p>
        )}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition text-white w-full py-2 sm:py-2.5 rounded-md mt-3 text-sm sm:text-base"
        >
          Login
        </button>
      </form>
    </div>
  );
}
