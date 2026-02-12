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

    // reset form
    setTitle("");
    setDesc("");
    setFile(null);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5 w-200 p-5 bg-white rounded-2xl">
      <h3 className="text-3xl font-bold tracking-wider">Add Content</h3>

      <div className="flex flex-col justify-center items-center gap-5 w-full">
        {/* for Title Input */}
        <div className="w-full flex flex-col items-start gap-2">
          <label className="text-lg font-bold tracking-wider">Title</label>
          <input
            className="border py-1 px-2 rounded-md text-xl tracking-wide leading-6 placeholder:text-sm placeholder:font-medium w-full outline-none focus:border-2 focus:border-blue-500"
            placeholder="Your Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* for Description Input */}
        <div className="w-full flex flex-col items-start gap-2">
          <label className="text-lg font-bold tracking-wider">
            Description
          </label>
          <textarea
            className="border py-1 px-2 rounded-md text-md  tracking-wide leading-7 placeholder:text-sm placeholder:font-medium w-full outline-none focus:border-2 focus:border-blue-500"
            placeholder="Write Your Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        {/* for Description Input */}
        <div className="w-full flex flex-col items-start gap-2">
          <label className="text-lg font-bold tracking-wider">Upload File</label>
          <input
            className="border py-1 px-2 rounded-md text-xl tracking-wide leading-6 placeholder:text-sm placeholder:font-medium w-full outline-none focus:border-2 focus:border-blue-500"
            type="file"
            onChange={handleFile}
          />
        </div>

        <button
          className="bg-blue-500 text-white font-bold tracking-widest border py-1 px-2 rounded-md text-xl w-50 "
          onClick={submit}
        >
          Save
        </button>
      </div>
    </div>
  );
}
