// src/pages/Closet.jsx
import AppLayout from "../components/layouts/AppLayout";
import ClothingCard from "../components/ui/ClothingCard";
import styles from "./Closet.module.scss";

export default function Closet({ items }) {
  return (
    <AppLayout title="クローゼット">
      <div className={styles.container}>
        {/* 絞り込み・並び替えエリア */}
        <div className={styles.filterBar}>
          <button>絞り込み</button>
          <button>並びび替え</button>
        </div>

        {/* グリッド部分 */}
        <div className={styles.grid}>
          {items.map((item) => (
            <ClothingCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
