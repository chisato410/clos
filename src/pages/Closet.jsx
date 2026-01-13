import { useState, useEffect, useRef, useMemo } from "react";
import { useLocation } from "react-router-dom";
import AppLayout from "../components/layouts/AppLayout";
import ClosetItemModal from "../components/features/ClosetItemModal";
import styles from "./Closet.module.scss";

export default function Closet({ items, setItems }) {
  const location = useLocation();
  const containerRef = useRef(null);

  // --- location.state から初期状態を定義 ---

  // 1. 保存場所フィルタ（アーカイブなど）
  const [archiveFilter, setArchiveFilter] = useState(
    location.state?.defaultFilter || "すべて"
  );

  // 2. ★重要：SubSelect から渡されたフィルタ値（カテゴリー、ブランド、カラーなど）を初期セット
  const [filterCategory, setFilterCategory] = useState(
    location.state?.filterType === "category"
      ? location.state.filterValue
      : "すべて"
  );

  // 3. 検索ワード（カテゴリー以外のフィルタ値は検索クエリとしてセット）
  const [tempSearchQuery, setTempSearchQuery] = useState(
    location.state?.filterType !== "category"
      ? location.state?.filterValue || ""
      : ""
  );
  const [searchQuery, setSearchQuery] = useState(
    location.state?.filterType !== "category"
      ? location.state?.filterValue || ""
      : ""
  );

  // 4. その他の状態
  const [sortBy, setSortBy] = useState("newest");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // 5. モーダル管理
  const [editingItem, setEditingItem] = useState(
    location.state?.selectedItem || null
  );
  const [isModalOpen, setIsModalOpen] = useState(
    !!location.state?.selectedItem
  );

  // スクロール監視
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => setShowScrollTop(container.scrollTop > 300);
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // ハンドラー
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(tempSearchQuery);
  };

  const handleSaveItem = (data) => {
    if (editingItem) {
      setItems(items.map((item) => (item.id === data.id ? data : item)));
    } else {
      setItems([...items, data]);
    }
    setEditingItem(null);
    setIsModalOpen(false);
  };

  const handleDeleteItem = (id) => {
    if (window.confirm("この服を削除しますか？")) {
      setItems(items.filter((item) => item.id !== id));
      setEditingItem(null);
      setIsModalOpen(false);
    }
  };

  const handleCardClick = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  // カテゴリー一覧の生成
  const categories = useMemo(() => {
    return ["すべて", ...new Set(items.map((i) => i.category).filter(Boolean))];
  }, [items]);

  // フィルタリングとソートの実行
  const filteredAndSortedItems = useMemo(() => {
    return items
      .filter((item) => {
        // カテゴリー一致
        const matchesCategory =
          filterCategory === "すべて" || item.category === filterCategory;

        // 保存場所（クローゼット/アーカイブ）一致
        const matchesArchive =
          archiveFilter === "すべて" ||
          (archiveFilter === "クローゼット" && !item.isArchived) ||
          (archiveFilter === "アーカイブ" && item.isArchived);

        // 検索ワード一致（ブランド、タグ、カラー、メモなど広範囲をカバー）
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          !searchQuery ||
          item.category?.toLowerCase().includes(query) ||
          item.brand?.toLowerCase().includes(query) ||
          item.color?.toLowerCase().includes(query) || // カラー検索を追加
          item.genre?.toLowerCase().includes(query) || // ジャンル検索を追加
          item.tags?.some((t) => t.toLowerCase().includes(query));

        return matchesCategory && matchesArchive && matchesSearch;
      })
      .sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return sortBy === "newest" ? dateB - dateA : dateA - dateB;
      });
  }, [items, searchQuery, filterCategory, archiveFilter, sortBy]);

  return (
    <AppLayout title="クローゼット">
      <div className={styles.container} ref={containerRef}>
        <div className={styles.headerSection}>
          <form className={styles.searchBar} onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="検索内容を入力"
              value={tempSearchQuery}
              onChange={(e) => setTempSearchQuery(e.target.value)}
            />
            <button type="submit" className={styles.searchSubmitBtn}>
              検索
            </button>
          </form>

          <div className={styles.controls}>
            <div className={styles.selectWrapper}>
              <span className={styles.selectLabel}>カテゴリー</span>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className={styles.ghostSelect}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.selectWrapper}>
              <span className={styles.selectLabel}>保存場所</span>
              <select
                value={archiveFilter}
                onChange={(e) => setArchiveFilter(e.target.value)}
                className={styles.ghostSelect}
              >
                <option value="すべて">すべて</option>
                <option value="クローゼット">クローゼット</option>
                <option value="アーカイブ">アーカイブ</option>
              </select>
            </div>

            <div className={styles.selectWrapper}>
              <span className={styles.selectLabel}>並び替え</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.ghostSelect}
              >
                <option value="newest">新しい順</option>
                <option value="oldest">古い順</option>
              </select>
            </div>
          </div>
        </div>

        {/* フィルタ値が表示されている場合にリセットできるボタン（任意） */}
        {(filterCategory !== "すべて" || searchQuery !== "") && (
          <div className={styles.filterStatus}>
            絞り込み中:{" "}
            {filterCategory !== "すべて" ? filterCategory : searchQuery}
            <button
              className={styles.clearFilterBtn}
              onClick={() => {
                setFilterCategory("すべて");
                setSearchQuery("");
                setTempSearchQuery("");
              }}
            >
              解除
            </button>
          </div>
        )}

        <div className={styles.grid}>
          {filteredAndSortedItems.length > 0 ? (
            filteredAndSortedItems.map((item) => (
              <div
                key={item.id}
                className={`${styles.card} ${
                  item.isArchived ? styles.isArchived : ""
                }`}
                onClick={() => handleCardClick(item)}
              >
                {item.image ? (
                  <img src={item.image} alt="" />
                ) : (
                  <div className={styles.noImage}>No Image</div>
                )}
                {item.isArchived && (
                  <span className={styles.archiveBadge}>ARCHIVE</span>
                )}
              </div>
            ))
          ) : (
            <div className={styles.emptyMsg}>該当する服がありません</div>
          )}
        </div>

        {showScrollTop && (
          <button
            className={styles.scrollTopBtn}
            onClick={() =>
              containerRef.current?.scrollTo({ top: 0, behavior: "smooth" })
            }
          >
            ↑
          </button>
        )}
      </div>

      {isModalOpen && (
        <ClosetItemModal
          initialData={editingItem}
          onSave={handleSaveItem}
          onDelete={handleDeleteItem}
          onClose={() => {
            setIsModalOpen(false);
            setEditingItem(null);
          }}
        />
      )}
    </AppLayout>
  );
}
