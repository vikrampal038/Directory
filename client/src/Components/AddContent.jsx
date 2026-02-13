import { useState } from "react";

export default function AddContent({ onAdd }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFile({
        name: f.name,
        data: reader.result,
      });
    };
    reader.readAsDataURL(f);
  };

  const submit = () => {
    if (!title) return alert("Title likho");

    onAdd({
      id: Date.now(),
      title,
      description: desc,
      file,
    });

    setTitle("");
    setDesc("");
    setFile(null);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl p-4 sm:p-6 bg-white rounded-2xl shadow-xl mx-auto">
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wider text-center">
        Add Content
      </h3>

      <div className="flex flex-col justify-center items-center gap-4 sm:gap-5 w-full">
        {/* Title */}
        <div className="w-full flex flex-col items-start gap-2">
          <label className="text-sm sm:text-base md:text-lg font-bold tracking-wider">
            Title
          </label>
          <input
            className="border py-2 px-3 rounded-md text-sm sm:text-base md:text-lg tracking-wide leading-6 placeholder:text-xs sm:placeholder:text-sm placeholder:font-medium w-full outline-none focus:border-2 focus:border-blue-500"
            placeholder="Your Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="w-full flex flex-col items-start gap-2">
          <label className="text-sm sm:text-base md:text-lg font-bold tracking-wider">
            Description
          </label>
          <textarea
            rows={4}
            className="border py-2 px-3 rounded-md text-sm sm:text-base md:text-md tracking-wide leading-7 placeholder:text-xs sm:placeholder:text-sm placeholder:font-medium w-full outline-none focus:border-2 focus:border-blue-500 resize-none"
            placeholder="Write Your Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        {/* Upload File */}
        <div className="w-full flex flex-col items-start gap-2">
          <label className="text-sm sm:text-base md:text-lg font-bold tracking-wider">
            Upload File
          </label>
          <input
            className="border py-2 px-3 rounded-md text-sm sm:text-base md:text-lg tracking-wide leading-6 w-full outline-none focus:border-2 focus:border-blue-500"
            type="file"
            onChange={handleFile}
          />
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold tracking-widest border py-2 px-6 rounded-md text-sm sm:text-base md:text-lg w-full sm:w-auto transition-all duration-300"
          onClick={submit}
        >
          Save
        </button>
      </div>
    </div>
  );
}
