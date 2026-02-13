import { useState } from "react";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { FcOpenedFolder } from "react-icons/fc";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import InlineModal from "./InlineModal";
import AdminPasswordModal from "./AdminPasswordModal";
import { verifyAdminPassword } from "../utils/adminAuth";

export default function FolderNode({
  folder,
  setData,
  selectedId,
  setSelectedId,
}) {
  const [open, setOpen] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [newName, setNewName] = useState("");

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [askPassword, setAskPassword] = useState(false);

  const addSubFolder = () => {
    if (!newName.trim()) return;

    setData((prev) => {
      const addToTree = (items) =>
        items.map((item) => {
          if (item.id === folder.id) {
            return {
              ...item,
              children: [
                ...(item.children || []),
                {
                  id: Date.now(),
                  name: newName.trim(),
                  children: [],
                  contents: [],
                },
              ],
            };
          }
          if (item.children?.length) {
            return { ...item, children: addToTree(item.children) };
          }
          return item;
        });

      return addToTree(prev);
    });

    setNewName("");
    setShowInput(false);
  };

  const deleteFolder = () => {
    setData((prev) => {
      const removeFromTree = (items) =>
        items
          .filter((item) => item.id !== folder.id)
          .map((item) => ({
            ...item,
            children: item.children ? removeFromTree(item.children) : [],
          }));

      return removeFromTree(prev);
    });

    setConfirmDelete(false);
    setAskPassword(false);
  };

  return (
    <div className="w-full relative">
      <div
        className={`flex items-center justify-between gap-2 rounded-md px-2 py-1.5 sm:px-2 sm:py-1 hover:bg-white/5 ${
          selectedId === folder.id ? "bg-white/10" : ""
        }`}
      >
        {/* Arrow */}
        <span
          onClick={() => setOpen(!open)}
          className="cursor-pointer text-white shrink-0"
        >
          {folder.children?.length ? (
            open ? (
              <MdOutlineKeyboardArrowDown size={18} />
            ) : (
              <MdOutlineKeyboardArrowRight size={18} />
            )
          ) : (
            <span className="w-[18px] inline-block" />
          )}
        </span>

        {/* Folder name */}
        <span
          onClick={() => setSelectedId(folder.id)}
          className="flex items-center gap-1.5 text-white text-xs sm:text-sm md:text-base cursor-pointer flex-1 truncate"
        >
          <FcOpenedFolder className="shrink-0" />
          <span className="truncate">{folder.name}</span>
        </span>

        {/* Actions */}
        <span className="flex items-center gap-2 sm:gap-3 text-white shrink-0">
          <button
            onClick={() => {
              setShowInput(true);
              setConfirmDelete(false);
              setAskPassword(false);
            }}
            className="hover:text-[#5bd68e] p-1 sm:p-0 text-sm sm:text-base"
          >
            <FaPlus />
          </button>

          <button
            onClick={() => {
              setConfirmDelete(true);
              setShowInput(false);
            }}
            className="hover:text-red-400 p-1 sm:p-0 text-sm sm:text-base"
          >
            <MdDelete />
          </button>
        </span>
      </div>

      {/* Inline Add Input */}
      {showInput && (
        <div className="ml-4 sm:ml-6 mt-1 flex flex-col sm:flex-row gap-2 justify-between items-stretch sm:items-center border border-white/20 rounded-md p-1">
          <input
            autoFocus
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addSubFolder()}
            placeholder="New folder name"
            className="py-1 px-2 rounded-md text-xs sm:text-sm w-full outline-0 text-white bg-transparent"
          />

          <div className="flex justify-end sm:justify-center items-center gap-3 bg-white p-1.5 rounded-md sm:rounded-r-sm">
            <button onClick={addSubFolder} className="hover:text-green-400 text-base sm:text-lg">
              <FaPlus />
            </button>
            <button
              onClick={() => {
                setShowInput(false);
                setNewName("");
              }}
              className="hover:text-red-400 text-base sm:text-lg"
            >
              <MdDelete />
            </button>
          </div>
        </div>
      )}

      {/* Step 1: Confirm delete */}
      {confirmDelete && !askPassword && (
        <InlineModal
          title="⚠️ Permanently delete this folder?"
          description="All subfolders and contents will be deleted."
          confirmText="Yes, Delete"
          cancelText="Cancel"
          danger
          onClose={() => setConfirmDelete(false)}
          onConfirm={() => setAskPassword(true)}
        />
      )}

      {/* Step 2: Ask password */}
      {askPassword && (
        <AdminPasswordModal
          onClose={() => {
            setAskPassword(false);
            setConfirmDelete(false);
          }}
          onConfirm={(password, setError) => {
            const ok = verifyAdminPassword(password);
            if (!ok) {
              setError("Incorrect password");
              return;
            }

            deleteFolder();
          }}
        />
      )}

      {/* Children */}
      {open && folder.children?.length > 0 && (
        <div className="ml-3 sm:ml-4 mt-1 space-y-1">
          {folder.children.map((child) => (
            <FolderNode
              key={child.id}
              folder={child}
              setData={setData}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
