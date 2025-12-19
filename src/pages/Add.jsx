// src/pages/Add.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layouts/AppLayout";
import styles from "./Add.module.scss";

export default function Add({ addItem }) {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    category: "トップス",
    brand: "",
    status: "active", // active = クローゼット, archived = アーカイブ
    memo: "",
  });

  // 画像を選択した時の処理
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newItem = {
      ...form,
      id: Date.now(),
      image: preview,
    };
    addItem(newItem); // App.jsxの関数を呼ぶ
    navigate("/closet"); // 保存したら一覧へ
  };

  return (
    <AppLayout title="追加">
      <form className={styles.form} onSubmit={handleSave}>
        {/* 画像アップロード枠 */}
        <div className={styles.photoFrame}>
          <label className={styles.uploadLabel}>
            {preview ? (
              <img src={preview} alt="preview" />
            ) : (
              <span>＋ 写真を追加する</span>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </label>
        </div>

        {/* 入力エリア */}
        <div className={styles.inputGroup}>
          <label>カテゴリー</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option>トップス</option>
            <option>ボトムス</option>
            <option>アウター</option>
            <option>シューズ</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label>ブランド</label>
          <input
            type="text"
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
            placeholder="入力する"
          />
        </div>

        <div className={styles.radioGroup}>
          <p>保存場所</p>
          <label>
            <input
              type="radio"
              checked={form.status === "active"}
              onChange={() => setForm({ ...form, status: "active" })}
            />{" "}
            クローゼット
          </label>
          <label>
            <input
              type="radio"
              checked={form.status === "archived"}
              onChange={() => setForm({ ...form, status: "archived" })}
            />{" "}
            アーカイブ
          </label>
        </div>

        <button type="submit" className={styles.saveBtn}>
          保存
        </button>
      </form>
    </AppLayout>
  );
}
