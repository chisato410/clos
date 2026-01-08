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
        {/* 設定画面関連 */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/profile" element={<ProfileEdit />} />
        <Route path="/settings/category" element={<CategoryEdit />} />
      </Routes>
    </BrowserRouter>
  );
}
