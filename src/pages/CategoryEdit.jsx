import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layouts/AppLayout";
import styles from "./CategoryEdit.module.scss";

export default function CategoryEdit({ categories, setCategories }) {
  const navigate = useNavigate();
  const [newCategory, setNewCategory] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
    }
  };

  const handleRemove = (target) => {
    if (confirm(`カテゴリー「${target}」を削除しますか？`)) {
      setCategories(categories.filter((c) => c !== target));
    }
  };

  return (
    <AppLayout title="カテゴリーの編集" showBackButton>
      <div className={styles.container}>
        <div className={styles.description}>
          服を登録する際のカテゴリーを追加・削除できます。
        </div>

        <form className={styles.addSection} onSubmit={handleAdd}>
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="新しいカテゴリー（例：帽子）"
          />
          <button type="submit" disabled={!newCategory.trim()}>
            追加
          </button>
        </form>

        <div className={styles.list}>
          {categories.map((cat) => (
            <div key={cat} className={styles.item}>
              <span className={styles.name}>{cat}</span>
              <button
                type="button"
                onClick={() => handleRemove(cat)}
                className={styles.deleteBtn}
              >
                削除
              </button>
            </div>
          ))}
        </div>

        <div className={styles.actionArea}>
          <button className={styles.backBtn} onClick={() => navigate(-1)}>
            設定画面に戻る
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
