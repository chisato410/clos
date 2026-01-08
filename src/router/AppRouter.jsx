import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Closet from "../pages/Closet";
import Add from "../pages/Add";
import Memo from "../pages/Memo";
import Settings from "../pages/Settings";
import SubSelect from "../pages/SubSelect"; // ← 新しく作成したページをインポート

export default function AppRouter({
  items,
  setItems, // setItems を追加（Closetでの編集保存用）
  addItem,
  deleteItem,
  memos,
  setMemos,
  folders,
  setFolders,
}) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home items={items} memos={memos} />} />

        {/* クローゼットメイン画面 */}
        <Route
          path="/closet"
          element={
            <Closet items={items} setItems={setItems} deleteItem={deleteItem} />
          }
        />

        {/* カテゴリー・カラー・ブランドなどの選択画面（Figma案の再現） */}
        <Route path="/closet/select" element={<SubSelect items={items} />} />

        <Route path="/add" element={<Add addItem={addItem} />} />

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

        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}
