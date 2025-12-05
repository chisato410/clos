import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Closet from "./pages/Closet";
import ItemDetail from "./pages/ItemDetail";
import Upload from "./pages/Upload";
import MemoList from "./pages/MemoList";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/closet" element={<Closet />} />
        <Route path="/item/:id" element={<ItemDetail />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/memo" element={<MemoList />} />
      </Routes>
    </BrowserRouter>
  );
}
