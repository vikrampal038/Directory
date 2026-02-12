import { useState } from "react";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
  MdDelete,
} from "react-icons/md";
import InlineModal from "./InlineModal";
import AdminPasswordModal from "./AdminPasswordModal";
import { verifyAdminPassword } from "../utils/adminAuth";

export default function ContentAccordion({ contents, onDelete }) {
  const [openId, setOpenId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [askPassword, setAskPassword] = useState(false);

  if (!contents.length)
    return (
      <div className="text-xl font-bold tracking-wider h-50 flex items-center justify-center text-white text-center rounded-2xl w-full">
        <h1 className="bg-zinc-600 border rounded-2xl px-10">
          This folder is empty. Add some content to get started.
        </h1>
      </div>
    );

  return (
    <div className="flex flex-col justify-center items-center gap-2 w-full">
      {contents.map((c) => (
        <div key={c.id} className="w-[90%]">
          <div
            className="w-full cursor-pointer p-2 rounded-lg bg-[#f5f5f5] flex justify-between items-center"
            onClick={() => setOpenId(openId === c.id ? null : c.id)}
          >
            <strong>{c.title}</strong>

            <div className="flex items-center gap-2">
              {openId === c.id ? (
                <MdOutlineKeyboardArrowUp size={25} />
              ) : (
                <MdOutlineKeyboardArrowDown size={25} />
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteId(c.id);
                }}
                className="text-red-600 hover:text-red-800"
              >
                <MdDelete size={22} />
              </button>
            </div>
          </div>

          {openId === c.id && (
            <div className="p-2.5 flex flex-col justify-center items-start gap-5 w-full">
              {/* ✅ Description ko steps/list me convert kiya */}
              <div className="text-white w-full">
                <ul className="list-disc pl-6 space-y-2">
                  {c.description
                    ?.split("\n")
                    .filter((line) => line.trim() !== "")
                    .map((line, index) => (
                      <li key={index} className="leading-7 wrap-break-word">
                        {line}
                      </li>
                    ))}
                </ul>
              </div>

              {c.file && c.file.data?.startsWith("data:image") && (
                <img
                  src={c.file.data}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg"
                />
              )}

              {c.file && !c.file.data?.startsWith("data:image") && (
                <iframe
                  src={c.file.data}
                  title="Preview"
                  className="w-full h-[70vh] rounded-md"
                />
              )}
            </div>
          )}
        </div>
      ))}

      {/* Step 1: Confirm delete */}
      {deleteId && !askPassword && (
        <InlineModal
          title="⚠️ Permanently delete this content?"
          description="This action cannot be undone."
          confirmText="Yes, Delete"
          cancelText="Cancel"
          danger
          onClose={() => setDeleteId(null)}
          onConfirm={() => setAskPassword(true)}
        />
      )}

      {/* Step 2: Ask password */}
      {askPassword && (
        <AdminPasswordModal
          onClose={() => {
            setAskPassword(false);
            setDeleteId(null);
          }}
          onConfirm={(password, setError) => {
            const ok = verifyAdminPassword(password);
            if (!ok) {
              setError("Incorrect password");
              return;
            }

            onDelete(deleteId); // actual delete
            setAskPassword(false);
            setDeleteId(null);
          }}
        />
      )}
    </div>
  );
}
