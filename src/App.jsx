// src/App.jsx
import { useState, useEffect } from "react";
import AppRouter from "./router/AppRouter";

export default function App() {
  // 全体のデータ（LocalStorageで保存）
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("my-closet-items");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("my-closet-items", JSON.stringify(items));
  }, [items]);

  // 服を追加する関数
  const addItem = (newItem) => setItems([...items, newItem]);

  // 服を削除する関数
  const deleteItem = (id) => setItems(items.filter((item) => item.id !== id));

  return (
    <div className="app-container">
      <AppRouter items={items} addItem={addItem} deleteItem={deleteItem} />
    </div>
  );
}
