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
        className={`flex items-center justify-between rounded-md px-1 py-1 hover:bg-white/5 ${
          selectedId === folder.id ? "bg-white/10" : ""
        }`}
      >
        {/* Arrow */}
        <span
          onClick={() => setOpen(!open)}
          className="cursor-pointer text-white"
        >
          {folder.children?.length ? (
            open ? (
              <MdOutlineKeyboardArrowDown size={18} />
            ) : (
              <MdOutlineKeyboardArrowRight size={18} />
            )
          ) : (
            ""
          )}
        </span>

        {/* Folder name */}
        <span
          onClick={() => setSelectedId(folder.id)}
          className="flex items-center gap-1.5 text-white text-sm sm:text-base cursor-pointer flex-1 truncate"
        >
          <FcOpenedFolder /> {folder.name}
        </span>

        {/* Actions */}
        <span className="flex items-center gap-3 text-white">
          <button
            onClick={() => {
              setShowInput(true);
              setConfirmDelete(false);
              setAskPassword(false);
            }}
            className="hover:text-[#5bd68e]"
          >
            <FaPlus />
          </button>

          <button
            onClick={() => {
              setConfirmDelete(true);
              setShowInput(false);
            }}
            className="hover:text-red-400"
          >
            <MdDelete />
          </button>
        </span>
      </div>

      {/* Inline Add Input */}
      {showInput && (
        <div className="ml-6 mt-1 flex gap-2 justify-between items-center border border-white rounded-md">
          <input
            autoFocus
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addSubFolder()}
            placeholder="New folder name"
            className="py-1 px-2 rounded-md text-sm w-full outline-0 text-white bg-transparent"
          />

          <div className="flex justify-center items-center gap-3 bg-white p-1.5 rounded-r-sm">
            <button onClick={addSubFolder} className="hover:text-green-400 text-lg">
              <FaPlus />
            </button>
            <button
              onClick={() => {
                setShowInput(false);
                setNewName("");
              }}
              className="hover:text-red-400 text-lg"
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

            deleteFolder(); // actual delete
          }}
        />
      )}

      {/* Children */}
      {open && folder.children?.length > 0 && (
        <div className="ml-4 mt-1 space-y-1">
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
