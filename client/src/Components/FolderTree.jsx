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
      <div className="sticky top-0 z-10 bg-[#1f1c1e] py-4 px-4 border-b border-white/10">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-bold tracking-widest">Explore</h3>
          <button
            onClick={() => setShowInput((p) => !p)}
            className="text-white flex items-center gap-2"
          >
            <FaPlus /> <span className="hidden sm:inline">New Folder</span>
          </button>
        </div>

        {showInput && (
          <div className="mt-2 flex gap-2 justify-between items-center  border border-white rounded-md">
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addRootFolder()}
              placeholder="Folder Name"
              className="py-1 px-2 rounded-md text-sm w-full outline-0  text-white"
            />

            <div className="flex justify-center items-center gap-3 bg-white p-1.5 rounded-r-sm">
              <button
                onClick={addRootFolder}
                className="hover:text-green-400 text-lg"
              >
                <FaPlus />
              </button>
              <button
                onClick={() => {
                  setShowInput(false);
                  setName("");
                }}
                className="hover:text-red-400 text-lg"
              >
                <MdDelete />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Scroll */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
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
