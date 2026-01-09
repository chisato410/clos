import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layouts/AppLayout";
import HorizontalSection from "../components/features/HorizontalSection";
import styles from "./Home.module.scss";

export default function Home({ items = [], memos = [] }) {
  const navigate = useNavigate();

  // 1. 「探す」セクションのメニュー定義（targetをSubSelectのロジックに合わせて修正）
  const searchCategories = [
    { label: "カテゴリー", icon: "👕", color: "#6A8CAF", target: "category" },
    { label: "カラー", icon: "🎨", color: "#F2C94C", target: "color" },
    { label: "メーカー", icon: "🏢", color: "#EB5757", target: "brand" },
    { label: "タグ", icon: "🏷️", color: "#27AE60", target: "tags" },
    {
      label: "クローゼット",
      icon: "🚪",
      color: "#9B51E0",
      target: "closet-only", // 直接遷移用フラグ
    },
    {
      label: "アーカイブ",
      icon: "📦",
      color: "#828282",
      target: "archive-only", // 直接遷移用フラグ
    },
  ];

  // 2. データのフィルタリングと最新順
  const recentItems = [...items]
    .filter((i) => !i.isArchived)
    .reverse()
    .slice(0, 6);

  const archivedItems = [...items]
    .filter((i) => i.isArchived)
    .reverse()
    .slice(0, 6);

  const recentMemos = Array.isArray(memos)
    ? [...memos].reverse().slice(0, 3)
    : [];

  // 3. アイテムクリック時の遷移ハンドラー
  const handleItemClick = (item, path) => {
    navigate(path, { state: { selectedItem: item } });
  };

  // 4. 「探す」アイコンクリック時の遷移ロジック
  const handleFindClick = (item) => {
    if (item.target === "closet-only") {
      // クローゼットは直接遷移（保存場所フィルタをセット）
      navigate("/closet", { state: { defaultFilter: "クローゼット" } });
    } else if (item.target === "archive-only") {
      // アーカイブは直接遷移（保存場所フィルタをセット）
      navigate("/closet", { state: { defaultFilter: "アーカイブ" } });
    } else {
      // カテゴリー/カラーなどは一度「選択画面」へ飛ばす
      navigate("/closet/select", {
        state: {
          type: item.target, // "category", "color", "brand" など
          label: item.label, // 表示用の見出し
        },
      });
    }
  };

  return (
    <AppLayout title="ホーム">
      <div className={styles.container}>
        {/* 検索バー */}
        <div className={styles.searchWrapper}>
          <div className={styles.searchBar}>
            <span className={styles.searchIcon}>🔍</span>
            <input type="text" placeholder="すべてのアイテムから探す" />
          </div>
        </div>

        {/* 探すセクション */}
        <div className={styles.findSection}>
          <div className={styles.iconGrid}>
            {searchCategories.map((item, index) => (
              <div
                key={index}
                className={styles.iconItem}
                onClick={() => handleFindClick(item)}
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

        {/* 履歴セクション */}
        <div className={styles.historyContainer}>
          <HorizontalSection
            title="最近追加した服"
            data={recentItems}
            onMoreClick={() =>
              navigate("/closet", { state: { defaultFilter: "クローゼット" } })
            }
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
