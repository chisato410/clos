import AppLayout from "../components/layouts/AppLayout";
import styles from "./Closet.module.scss";

export default function Closet() {
  return (
    <AppLayout title="クローゼット">
      <div className={styles.container}>
        {/* 上部メニュー */}
        <div className={styles.topBar}>
          <div className={styles.filters}>
            <button className={styles.filterBtn}>絞り込み</button>
            <button className={styles.sortBtn}>並び替え</button>
          </div>
        </div>

        {/* アイテムグリッド */}
        <div className={styles.grid}>
          {/* ダミーの服アイテム */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className={styles.item}>
              <img
                src="https://via.placeholder.com/300x400?text=Item"
                alt="item"
              />
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
