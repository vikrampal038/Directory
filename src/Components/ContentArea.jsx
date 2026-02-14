import { useState } from "react";
import AddContent from "./AddContent";
import ContentAccordion from "./ContentAccodion";
import { ImCross } from "react-icons/im";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

export default function ContentArea({
  folders,
  setFolders,
  selectedId,
}) {
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState("");

  const findFolderById = (items, id) => {
    for (let it of items) {
      if (it.id === id) return it;
      if (it.children) {
        const found = findFolderById(it.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const deleteContent = (contentId) => {
    const update = (items) =>
      items.map((it) => {
        if (it.id === selectedId) {
          return {
            ...it,
            contents: it.contents.filter((c) => c.id !== contentId),
          };
        }
        if (it.children) return { ...it, children: update(it.children) };
        return it;
      });

    setFolders(update(folders));
  };

  const addContent = (content) => {
    const update = (items) =>
      items.map((it) => {
        if (it.id === selectedId) {
          return { ...it, contents: [...(it.contents || []), content] };
        }
        if (it.children) return { ...it, children: update(it.children) };
        return it;
      });

    setFolders(update(folders));
    setShowAdd(false);
  };

  const folder = selectedId ? findFolderById(folders, selectedId) : null;

  const contents = (folder?.contents || []).filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* 🔥 Navbar – hamesha visible */}
      <div className="w-full shrink-0 py-3 border-b border-white/10 px-3 sm:px-5 bg-[#111D1B]">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between sm:items-center w-full">
          {/* Search */}
          <div className="flex items-center bg-[#1C2826] px-3 gap-2 rounded-full w-full sm:w-[60%] md:w-[50%]">
            <FaSearch className="text-[#606867] text-[14px]" />
            <input
              className="w-full py-1 px-2 text-sm sm:text-base text-[#606867] bg-transparent placeholder:text-xs sm:placeholder:text-sm outline-none"
              placeholder="Search title / description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              disabled={!selectedId}
            />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 justify-end w-full sm:w-auto">
            <button
              disabled={!selectedId}
              className={`flex items-center gap-2 py-1.5 rounded-full px-3 text-xs sm:text-sm font-bold shadow-2xl transition-all duration-300
                ${
                  selectedId
                    ? "bg-[#2BD4BD] hover:bg-[#2bacd4] text-black"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}
              onClick={() => setShowAdd((p) => !p)}
            >
              {showAdd ? (
                <>
                  <ImCross className="text-[14px]" />
                  Close
                </>
              ) : (
                <>
                  <AiFillPlusCircle className="text-[14px]" />
                  Add Content
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Add content panel */}
      {showAdd && selectedId && <AddContent onAdd={addContent} />}

      {/* 🔥 Content / Empty State */}
      <div className="flex-1 overflow-y-auto w-full p-2 sm:p-4">
        {!selectedId ? (
          <div className="h-full flex items-center justify-center text-white text-center">
            <h1 className="bg-zinc-600 border rounded-2xl px-6 py-3 text-sm sm:text-lg font-semibold tracking-wide">
              Select a folder from the left panel to view its contents.
            </h1>
          </div>
        ) : (
          <ContentAccordion onDelete={deleteContent} contents={contents} />
        )}
      </div>
    </div>
  );
}
