import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Closet from "../pages/Closet";
import Memo from "../pages/Memo";
import Settings from "../pages/Settings";
import Add from "../pages/Add";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/closet" element={<Closet />} />
        <Route path="/add" element={<Add />} />
        <Route path="/memo" element={<Memo />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}
