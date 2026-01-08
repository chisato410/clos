import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layouts/AppLayout";
import HorizontalSection from "../components/features/HorizontalSection";
import styles from "./Home.module.scss";

export default function Home({ items = [], memos = [] }) {
  const navigate = useNavigate();

  // 1. 「探す」セクションのメニュー定義
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

  // 2. データのフィルタリングと最新順への並び替え
  // 最近追加した服（アーカイブ以外）
  const recentItems = [...items]
    .filter((i) => !i.isArchived)
    .reverse()
    .slice(0, 6);
  // アーカイブした服
  const archivedItems = [...items]
    .filter((i) => i.isArchived)
    .reverse()
    .slice(0, 6);
  // 最近のメモ（最新3件）
  const recentMemos = Array.isArray(memos)
    ? [...memos].reverse().slice(0, 3)
    : [];

  // 3. アイテムクリック時の遷移ハンドラー
  const handleItemClick = (item, path) => {
    // 遷移先にアイテム情報を渡す（Closet.jsxなどで受け取り、自動でモーダルを開くため）
    navigate(path, { state: { selectedItem: item } });
  };

  return (
    <AppLayout title="ホーム">
      <div className={styles.container}>
        {/* 検索バー  */}
        <div className={styles.searchWrapper}>
          <div className={styles.searchBar}>
            <span className={styles.searchIcon}>🔍</span>
            <input type="text" placeholder="すべてのアイテムから探す" />
          </div>
        </div>

        {/* 探すセクション: 丸アイコンメニュー */}
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

        {/* 履歴セクション (横スクロール服・縦リストメモ) */}
        <div className={styles.historyContainer}>
          <HorizontalSection
            title="最近追加した服"
            data={recentItems}
            onMoreClick={() => navigate("/closet")}
            onItemClick={(item) => handleItemClick(item, "/closet")}
          />

          <HorizontalSection
            title="アーカイブした服"
            data={archivedItems}
            onMoreClick={() =>
              navigate("/closet", { state: { defaultFilter: "アーカイブ" } })
            }
            onItemClick={(item) => handleItemClick(item, "/closet")}
          />

          <HorizontalSection
            title="最近のメモ"
            data={recentMemos}
            type="memo"
            onMoreClick={() => navigate("/memo")}
            onItemClick={(item) => handleItemClick(item, "/memo")}
          />
        </div>
      </div>
    </AppLayout>
  );
}
