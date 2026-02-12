import { useState } from "react";
import AddContent from "./AddContent";
import ContentAccordion from "./ContentAccodion";
import { ImCross } from "react-icons/im";

export default function ContentArea({ folders, setFolders, selectedId }) {
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

  if (!selectedId)
    return (
      <div className="text-xl font-bold tracking-wider h-50 flex items-center justify-center text-white text-center  rounded-2xl w-full">
        <h1 className="bg-zinc-600 border rounded-2xl px-10 ">Select a folder from the left panel to view its contents.</h1>
      </div>
    );

  const folder = findFolderById(folders, selectedId);
  const contents = (folder?.contents || []).filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className=" h-full flex flex-col gap-5 overflow-hidden justify-center  items-center">
      <div className="w-full shrink-0 p-5  ">
        <div className="flex justify-between items-center">
          <input
            className="w-120 py-1 px-2 bg-gray-200 text-lg text-black font-semi-bold tracking-wider border-white rounded-md placeholder:text-sm placeholder:font-medium focus:border-blue-500 outline-none focus:border-2"
            placeholder="Search title / description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="text-black py-1 rounded-md px-2 text-md font-bold shadow-2x bg-gray-300 hover:text-white hover:bg-blue-500 transition-all duration-700 ease-in-out"
            onClick={() => setShowAdd((p) => !p)}
          >
            {showAdd ? <ImCross className="text-[22px]" /> : "Add Content"}
          </button>
        </div>
      </div>

      {showAdd && <AddContent onAdd={addContent} />}

      {/* 👇 Scroll sirf accordion ke andar */}
      <div className="flex-1 overflow-y-auto w-full">
        <ContentAccordion onDelete={deleteContent} contents={contents} />
      </div>
    </div>
  );
}
