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
      <div className="text-sm sm:text-lg md:text-xl font-bold tracking-wider min-h-40 sm:min-h-48 flex items-center justify-center text-white text-center rounded-2xl w-full px-3">
        <h1 className="bg-zinc-600 border rounded-2xl px-4 py-2 sm:px-6 md:px-10">
          This folder is empty. Add some content to get started.
        </h1>
      </div>
    );

  return (
    <div className="flex flex-col justify-center items-center gap-2 sm:gap-3 w-full px-2 sm:px-0">
      {contents.map((c) => (
        <div
          key={c.id}
          className="w-full max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-4xl justify-center items-center"
        >
          <div
            className="w-full cursor-pointer py-2 px-2 sm:py-2 sm:px-2 rounded-lg bg-[#f5f5f5] flex justify-between items-center gap-2"
            onClick={() => setOpenId(openId === c.id ? null : c.id)}
          >
            <strong className="text-sm sm:text-base md:text-lg truncate">
              {c.title}
            </strong>

            <div className="flex items-center gap-2 shrink-0">
              {openId === c.id ? (
                <MdOutlineKeyboardArrowUp className="text-lg sm:text-xl md:text-2xl" />
              ) : (
                <MdOutlineKeyboardArrowDown className="text-lg sm:text-xl md:text-2xl" />
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteId(c.id);
                }}
                className="text-red-600 hover:text-red-800 p-1 rounded-md hover:bg-red-100 transition"
              >
                <MdDelete className="text-base sm:text-lg md:text-xl" />
              </button>
            </div>
          </div>

          {openId === c.id && (
            <div className="p-2 sm:p-3 md:p-4 flex flex-col justify-center items-start gap-4 sm:gap-5 w-full">
              {/* ✅ Description as bullet points */}
              <div className="text-white w-full text-sm sm:text-base leading-relaxed">
                <ul className="list-disc pl-5 sm:pl-6 space-y-1.5 sm:space-y-2">
                  {c.description
                    ?.split("\n")
                    .filter((line) => line.trim() !== "")
                    .map((line, index) => (
                      <li
                        key={index}
                        className="leading-6 sm:leading-7 wrap-break-word"
                      >
                        {line}
                      </li>
                    ))}
                </ul>
              </div>

              {c.file && c.file.data?.startsWith("data:image") && (
                <img
                  src={c.file.data}
                  className="w-full max-h-[40vh] sm:max-h-[60vh] md:max-h-[70vh] object-contain rounded-lg border"
                />
              )}

              {c.file && !c.file.data?.startsWith("data:image") && (
                <iframe
                  src={c.file.data}
                  title="Preview"
                  className="w-full h-[40vh] sm:h-[55vh] md:h-[70vh] rounded-md border"
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

            onDelete(deleteId);
            setAskPassword(false);
            setDeleteId(null);
          }}
        />
      )}
    </div>
  );
}
