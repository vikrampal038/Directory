import { useEffect, useState } from "react";
import { saveUserData, loadUserData } from "./data/storage";
import FolderTree from "./Components/FolderTree";
import ContentArea from "./Components/ContentArea";
import LoginModal from "./Components/LoginModal";
import { FiLogOut } from "react-icons/fi";

export default function App() {
  const [email, setEmail] = useState(
    () => localStorage.getItem("loggedInEmail") || null
  );

  const [folders, setFolders] = useState(() =>
    email ? loadUserData(email) : []
  );

  const [selectedId, setSelectedId] = useState(null);

  const loggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    if (email) {
      saveUserData(email, folders);
    }
  }, [folders, email]);

  const handleLoginSuccess = (userEmail) => {
    setEmail(userEmail);
    setFolders(loadUserData(userEmail)); // ✅ user-specific data
    localStorage.setItem("loggedInEmail", userEmail);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setEmail(null);
    setSelectedId(null);
  };

  // ✅ Logout Button JSX (logic App.jsx me hi rahega)
  const LogoutButton = (
    <button
      onClick={handleLogout}
      className="flex items-center justify-center gap-2 text-white bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all w-full sm:w-auto"
    >
      <FiLogOut className="text-sm" />
      Logout
    </button>
  );

  return (
    <>
      {!loggedIn && <LoginModal onSuccess={handleLoginSuccess} />}

      {loggedIn && (
        <div className="flex h-screen w-full flex-col sm:flex-row">
          {/* Sidebar */}
          <div className="bg-[#0F1A18] w-full sm:w-[40%] md:w-[30%] lg:w-[20%] h-[35vh] sm:h-full overflow-y-auto">
            <FolderTree
              data={folders}
              setData={setFolders}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          </div>

          {/* Content */}
          <div className="bg-[#12201E] flex-1 h-full overflow-hidden">
            <ContentArea
              folders={folders}
              setFolders={setFolders}
              selectedId={selectedId}
              rightActions={LogoutButton}  // ✅ Navbar ke saath align hoga
            />
          </div>
        </div>
      )}
    </>
  );
}
