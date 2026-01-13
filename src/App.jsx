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
    accent: "#000000",
    preview: null,
    logoFilter: "invert(0)",
  },
  black: {
    primary: "#1E1E1E",
    bg: "#f0f0f0",
    accent: "#1E1E1E",
    preview: imgBlack,
    logoFilter: "invert(100%)",
  },
  red: {
    primary: "#88212D",
    bg: "#FCF2F2",
    accent: "#88212D",
    preview: imgRed,
    logoFilter: "invert(100%)",
  },
  yellow: {
    primary: "#FFB330",
    bg: "#FFFEE9",
    accent: "#FFB330",
    preview: imgYellow,
    logoFilter: "invert(0)",
  },
  blue: {
    primary: "#2D4C8C",
    bg: "#EFF3FC",
    accent: "#2D4C8C",
    preview: imgBlue,
    logoFilter: "invert(100%)",
  },
  green: {
    primary: "#1A540F",
    bg: "#F1F6F0",
    accent: "#1A540F",
    preview: imgGreen,
    logoFilter: "invert(100%)",
  },
  color1: {
    primary: "#E55C5C",
    bg: "#EAEAEA",
    accent: "#71B1FF",
    preview: imgColor1,
    logoFilter: "invert(0)",
  },
  color2: {
    primary: "#FFD209",
    bg: "#088BC3",
    accent: "#F4484B",
    preview: imgColor2,
    logoFilter: "invert(0)",
  },
  color3: {
    primary: "#72D5D8",
    bg: "#F9BCD2",
    accent: "#F9BCD2",
    preview: imgColor3,
    logoFilter: "invert(0)",
  },
  color4: {
    primary: "#F9F9F9",
    bg: "#EAC806",
    accent: "#414B7D",
    preview: imgColor4,
    logoFilter: "invert(0)",
  },
  color5: {
    primary: "#475B1A",
    bg: "#FFF8EF",
    accent: "#FF7700",
    preview: imgColor5,
    logoFilter: "invert(100%)",
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
    root.style.setProperty("--header-text", theme.accent);
    root.style.setProperty("--accent-color", theme.accent);
    root.style.setProperty("--logo-filter", theme.logoFilter || "invert(0)");

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
