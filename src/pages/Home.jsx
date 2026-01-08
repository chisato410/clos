import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layouts/AppLayout";
import HorizontalSection from "../components/features/HorizontalSection";
import styles from "./Home.module.scss";

export default function Home({ items = [], memos = [] }) {
  const navigate = useNavigate();

  // 丸アイコンメニュー
  const searchCategories = [
    { label: "カテゴリー", icon: "👕", color: "#6A8CAF", target: "すべて" },
    { label: "カラー", icon: "🎨", color: "#F2C94C", target: "すべて" },
    { label: "メーカー", icon: "🏢", color: "#EB5757", target: "すべて" },
    { label: "タグ", icon: "🏷️", color: "#27AE60", target: "すべて" },
    {
      label: "クローゼット",
      icon: "🚪",
      color: "#9B51E0",
      target: "クローゼット",
    },
    { label: "アーカイブ", icon: "📦", color: "#828282", target: "アーカイブ" },
  ];

  // フィルタリング
  const recentItems = [...items]
    .filter((i) => !i.isArchived)
    .reverse()
    .slice(0, 6);
  const archivedItems = [...items]
    .filter((i) => i.isArchived)
    .reverse()
    .slice(0, 6);

  // メモ：最新3件（memosが1件でも正しく表示されるように調整）
  const recentMemos =
    memos && memos.length > 0 ? [...memos].reverse().slice(0, 3) : [];

  return (
    <AppLayout title="ホーム">
      <div className={styles.container}>
        <div className={styles.searchWrapper}>
          <div className={styles.searchBar}>
            <span className={styles.searchIcon}>🔍</span>
            <input type="text" placeholder="すべてのアイテムから探す" />
          </div>
        </div>

        <div className={styles.findSection}>
          <h3 className={styles.sectionTitle}>探す</h3>
          <div className={styles.iconGrid}>
            {searchCategories.map((item, index) => (
              <div
                key={index}
                className={styles.iconItem}
                onClick={() =>
                  navigate("/closet", { state: { defaultFilter: item.target } })
                }
              >
                <div
                  className={styles.iconCircle}
                  style={{ backgroundColor: item.color }}
                >
                  {item.icon}
                </div>
                <span className={styles.iconLabel}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.historyContainer}>
          <HorizontalSection
            title="最近追加した服"
            data={recentItems}
            onMoreClick={() => navigate("/closet")}
          />
          <HorizontalSection
            title="アーカイブした服"
            data={archivedItems}
            onMoreClick={() =>
              navigate("/closet", { state: { defaultFilter: "アーカイブ" } })
            }
          />
          <HorizontalSection
            title="最近のメモ"
            data={recentMemos}
            type="memo"
            onMoreClick={() => navigate("/memo")}
          />
        </div>
      </div>
    </AppLayout>
  );
}
