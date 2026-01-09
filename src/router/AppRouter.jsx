import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Closet from "../pages/Closet";
import Add from "../pages/Add";
import Memo from "../pages/Memo";
import Settings from "../pages/Settings";
import SubSelect from "../pages/SubSelect";
import ProfileEdit from "../pages/ProfileEdit";
import CategoryEdit from "../pages/CategoryEdit";

export default function AppRouter({
  items,
  setItems,
  addItem,
  deleteItem,
  memos,
  setMemos,
  folders,
  setFolders,
  currentTheme,
  setCurrentTheme,
  themes,
  // --- カテゴリー関連のPropsを追加 ---
  categories,
  setCategories,
}) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home items={items} memos={memos} />} />
        <Route
          path="/closet"
          element={
            <Closet items={items} setItems={setItems} deleteItem={deleteItem} />
          }
        />
        <Route path="/closet/select" element={<SubSelect items={items} />} />

        {/* 服の追加画面にカテゴリー情報を渡す */}
        <Route
          path="/add"
          element={<Add addItem={addItem} categories={categories} />}
        />

        <Route
          path="/memo"
          element={
            <Memo
              memos={memos}
              setMemos={setMemos}
              folders={folders}
              setFolders={setFolders}
            />
          }
        />

        {/* --- 設定画面関連 --- */}
        <Route
          path="/settings"
          element={
            <Settings
              currentTheme={currentTheme}
              setCurrentTheme={setCurrentTheme}
              themes={themes}
            />
          }
        />

        <Route path="/settings/profile" element={<ProfileEdit />} />

        {/* カテゴリー編集画面にデータと更新関数を渡す */}
        <Route
          path="/settings/category"
          element={
            <CategoryEdit
              categories={categories}
              setCategories={setCategories}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
