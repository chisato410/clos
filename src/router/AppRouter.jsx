import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Closet from "../pages/Closet";
import Add from "../pages/Add";
import Memo from "../pages/Memo";
import Settings from "../pages/Settings";

export default function AppRouter({
  items,
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
        <Route path="/" element={<Home items={items} />} />
        <Route
          path="/closet"
          element={<Closet items={items} deleteItem={deleteItem} />}
        />
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
