import { useState, useEffect } from "react";
import AppRouter from "./router/AppRouter";

export default function App() {
  // --- 服データ管理 ---
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("my-closet-items");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("my-closet-items", JSON.stringify(items));
  }, [items]);

  const addItem = (newItem) => setItems([...items, newItem]);
  const deleteItem = (id) => setItems(items.filter((item) => item.id !== id));

  // --- メモデータ管理 ---
  const [memos, setMemos] = useState(() => {
    const saved = localStorage.getItem("closet-memos");
    return saved ? JSON.parse(saved) : [];
  });

  // --- フォルダデータ管理 ---
  const [folders, setFolders] = useState(() => {
    const saved = localStorage.getItem("closet-folders");
    return saved
      ? JSON.parse(saved)
      : [
          { id: "f1", name: "欲しいもの", color: "#FFDADA" },
          { id: "f2", name: "コーデ案", color: "#DFFFD8" },
        ];
  });

  useEffect(() => {
    localStorage.setItem("closet-memos", JSON.stringify(memos));
    localStorage.setItem("closet-folders", JSON.stringify(folders));
  }, [memos, folders]);

  return (
    <div className="app-container">
      <AppRouter
        items={items}
        addItem={addItem}
        deleteItem={deleteItem}
        memos={memos}
        setMemos={setMemos}
        folders={folders}
        setFolders={setFolders}
      />
    </div>
  );
}
