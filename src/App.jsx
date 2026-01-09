import { useState, useEffect } from "react";
import AppRouter from "./router/AppRouter";

import imgRed from "./assets/themes/red.webp";
import imgYellow from "./assets/themes/yellow.webp";
import imgBlack from "./assets/themes/black.webp";
import imgBlue from "./assets/themes/blue.webp";
import imgGreen from "./assets/themes/green.webp";
import imgColor1 from "./assets/themes/color1.webp";
import imgColor2 from "./assets/themes/color2.webp";
import imgColor3 from "./assets/themes/color3.webp";
import imgColor4 from "./assets/themes/color4.webp";
import imgColor5 from "./assets/themes/color5.webp";

// 1. カラーテーマの定義 (Figmaのデザイン案に基づいたパレット)
const themes = {
  default: {
    primary: "#6a8caf",
    bg: "#f8f8f8",
    headerText: "#ffffff",
    preview: null,
  },
  black: {
    primary: "#333333",
    bg: "#f0f0f0",
    headerText: "#ffffff",
    preview: imgBlack,
  },
  red: {
    primary: "#EB5757",
    bg: "#fff5f5",
    headerText: "#ffffff",
    preview: imgRed,
  },
  yellow: {
    primary: "#F2C94C",
    bg: "#fffdf5",
    headerText: "#ffffff",
    preview: imgYellow,
  },
  blue: {
    primary: "#2D9CDB",
    bg: "#f5fbff",
    headerText: "#ffffff",
    preview: imgBlue,
  },
  green: {
    primary: "#27AE60",
    bg: "#f5fff7",
    headerText: "#ffffff",
    preview: imgGreen,
  },
  color1: {
    primary: "#BB6BD9",
    bg: "#faf5ff",
    headerText: "#ffffff",
    preview: imgColor1,
  },
  color2: {
    primary: "#9B51E0",
    bg: "#f6f0ff",
    headerText: "#ffffff",
    preview: imgColor2,
  },
  color3: {
    primary: "#56CCF2",
    bg: "#f0faff",
    headerText: "#ffffff",
    preview: imgColor3,
  },
  color4: {
    primary: "#6FCF97",
    bg: "#f0fffa",
    headerText: "#ffffff",
    preview: imgColor4,
  },
  color5: {
    primary: "#FF6B6B",
    bg: "#fff5f5",
    headerText: "#ffffff",
    preview: imgColor5,
  },
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
