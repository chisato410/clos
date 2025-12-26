// src/pages/Closet.jsx
import AppLayout from "../components/layouts/AppLayout";
import styles from "./Closet.module.scss";

export default function Closet({ items, deleteItem }) {
  return (
    <AppLayout title="クローゼット">
      <div className={styles.grid}>
        {items.map((item) => (
          <div key={item.id} className={styles.card}>
            {/* 画像があれば表示 */}
            {item.image && <img src={item.image} alt={item.name} />}
            <div className={styles.info}>
              p{item.name}
              {/* 削除ボタンを追加 */}
              <button
                className={styles.deleteBtn}
                onClick={() => {
                  if (window.confirm("この服を削除しますか？")) {
                    deleteItem(item.id);
                  }
                }}
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
