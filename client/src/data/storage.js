const KEY = "folder_data";

export const loadData = () => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error("Storage load error", e);
    return [];
  }
};

export const saveData = (data) => {
  localStorage.setItem(KEY, JSON.stringify(data));
};
