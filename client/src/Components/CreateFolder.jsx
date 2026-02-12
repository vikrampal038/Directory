const [show, setShow] = useState(false);

return (
  <>
    <button onClick={() => setShow(true)} className="border ml-2">+</button>

    {show && (
      <InlineModal
        title="New Folder"
        onClose={() => setShow(false)}
        onSubmit={(name) => {
          if (!name) return;
          onAdd(parentId, {
            id: Date.now(),
            name,
            children: [],
            contents: [],
          });
          setShow(false);
        }}
      />
    )}
  </>
);
