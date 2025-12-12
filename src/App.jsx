import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Closet from "./pages/Closet";
import ItemDetail from "./pages/ItemDetail";
import AddItem from "./pages/AddItem";
import SelectCategory from "./pages/SelectCategory";
import SelectType from "./pages/SelectType";
import MemoList from "./pages/MemoList";
import MemoNew from "./pages/MemoNew";
import MemoFolder from "./pages/MemoFolder";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/closet" element={<Closet />} />
        <Route path="/closet/:id" element={<ItemDetail />} />
        <Route path="/add" element={<AddItem />} />
        <Route path="/select/category" element={<SelectCategory />} />
        <Route path="/select/type" element={<SelectType />} />
        <Route path="/memo" element={<MemoList />} />
        <Route path="/memo/new" element={<MemoNew />} />
        <Route path="/memo/folder" element={<MemoFolder />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
