import { useState, useEffect } from "react";
import AppRouter from "./router/AppRouter";

// 1. カラーテーマの定義 (Figmaのデザイン案に基づいたパレット)
const themes = {
  default: { primary: "#6A8CAF", bg: "#f8f8f8", headerText: "#ffffff" },
  red: { primary: "#EB5757", bg: "#fff5f5", headerText: "#ffffff" },
  yellow: { primary: "#F2C94C", bg: "#fffdf5", headerText: "#ffffff" },
  green: { primary: "#27AE60", bg: "#f2faf5", headerText: "#ffffff" },
  blue: { primary: "#2F80ED", bg: "#f0f5ff", headerText: "#ffffff" },
  black: { primary: "#333333", bg: "#ffffff", headerText: "#ffffff" },
  pink: { primary: "#EF9A9A", bg: "#fff9f9", headerText: "#ffffff" },
};

export default function App() {
  // --- テーマ管理 ---
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem("app-theme") || "default";
  });

  useEffect(() => {
    const theme = themes[currentTheme] || themes.default;
    const root = document.documentElement;

    root.style.setProperty("--primary-color", theme.primary);
    root.style.setProperty("--theme-bg", theme.bg);
    root.style.setProperty("--header-text", theme.headerText);

    localStorage.setItem("app-theme", currentTheme);
  }, [currentTheme]);

  // --- カテゴリーデータ管理 (ここを追加) ---
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("closet-categories");
    const defaultCategories = [
      "トップス",
      "ボトムス",
      "ワンピース",
      "アウター",
      "シューズ",
      "バッグ",
      "アクセサリー",
    ];
    return saved ? JSON.parse(saved) : defaultCategories;
  });

  useEffect(() => {
    localStorage.setItem("closet-categories", JSON.stringify(categories));
  }, [categories]);

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
        setItems={setItems}
        addItem={addItem}
        deleteItem={deleteItem}
        memos={memos}
        setMemos={setMemos}
        folders={folders}
        setFolders={setFolders}
        // カテゴリー関連のPropsを追加
        categories={categories}
        setCategories={setCategories}
        // テーマ関連
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
        themes={themes}
      />
    </div>
  );
}
