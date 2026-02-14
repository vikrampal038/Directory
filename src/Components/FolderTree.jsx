import { useState } from "react";
import FolderNode from "./FolderNode";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function FolderTree({
  data = [],
  setData,
  selectedId,
  setSelectedId,
}) {
  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState("");

  const addRootFolder = () => {
    if (!name.trim()) return;

    setData((prev) => [
      ...prev,
      { id: Date.now(), name: name.trim(), children: [], contents: [] },
    ]);

    setName("");
    setShowInput(false);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-[#0F1A18] py-3 sm:py-4 px-3 sm:px-4 border-b border-white/10">
        <div className="flex justify-between items-center gap-2">
          <h3 className="text-white font-bold tracking-widest text-sm sm:text-base">
            Process App
          </h3>
          <button
            onClick={() => setShowInput((p) => !p)}
            className="text-white flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base hover:text-[#2BD4BD] transition"
          >
            <FaPlus className="text-sm sm:text-base" />
            <span className="hidden sm:inline">New Folder</span>
          </button>
        </div>

        {showInput && (
          <div className="mt-2 flex flex-col sm:flex-row gap-2 justify-between items-stretch sm:items-center border border-white/20 rounded-md p-1">
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addRootFolder()}
              placeholder="Folder Name"
              className="py-1 px-2 rounded-md text-xs sm:text-sm w-full outline-0 text-white bg-transparent"
            />

            <div className="flex justify-end sm:justify-center items-center gap-3 bg-white p-1.5 rounded-md sm:rounded-r-sm">
              <button
                onClick={addRootFolder}
                className="hover:text-green-400 text-base sm:text-lg"
              >
                <FaPlus />
              </button>
              <button
                onClick={() => {
                  setShowInput(false);
                  setName("");
                }}
                className="hover:text-red-400 text-base sm:text-lg"
              >
                <MdDelete />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Scroll */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-4 py-2 sm:py-3 space-y-1.5 sm:space-y-2">
        {data.map((folder) => (
          <FolderNode
            key={folder.id}
            folder={folder}
            setData={setData}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        ))}
      </div>
    </div>
  );
}
