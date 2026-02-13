import { useEffect, useState } from "react";
import { saveData, loadData } from "./data/storage";
import FolderTree from "./Components/FolderTree";
import ContentArea from "./Components/ContentArea";

export default function App() {
  const [folders, setFolders] = useState(() => loadData() || []);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    saveData(folders);
  }, [folders]);

  return (
    <div className="flex h-screen w-full">
      {/* Left Sidebar */}
      <div className="bg-[#1f1c1e] w-[70%] sm:w-[40%] md:w-[30%] lg:w-[20%] h-full">
        <FolderTree
          data={folders}
          setData={setFolders}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      </div>

      {/* Right Content */}
      <div className="bg-[#232025] h-full flex-1">
        <ContentArea
          folders={folders}
          setFolders={setFolders}
          selectedId={selectedId}
        />
      </div>
    </div>
  );
}
