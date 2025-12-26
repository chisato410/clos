import { useState, useEffect, useRef } from "react";
import AppLayout from "../components/layouts/AppLayout";
import ClosetItemModal from "../components/features/ClosetItemModal";
import styles from "./Closet.module.scss";

export default function Closet({ items, setItems }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("すべて");
  const [sortBy, setSortBy] = useState("newest");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const containerRef = useRef(null);

  // スクロール位置を監視
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setShowScrollTop(container.scrollTop > 300);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

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

  const handleQuickDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm("この服を削除しますか？")) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const scrollToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  // カテゴリー一覧を取得
  const categories = [
    "すべて",
    ...new Set(items.map((item) => item.category).filter(Boolean)),
  ];

  // フィルタリングと並び替え
  const filteredAndSortedItems = items
    .filter((item) => {
      // カテゴリーフィルター
      if (filterCategory !== "すべて" && item.category !== filterCategory) {
        return false;
      }
      // 検索フィルター
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          item.category?.toLowerCase().includes(query) ||
          item.brand?.toLowerCase().includes(query) ||
          item.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
          item.memo?.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "brand":
          return (a.brand || "").localeCompare(b.brand || "");
        case "category":
          return (a.category || "").localeCompare(b.category || "");
        default:
          return 0;
      }
    });

  return (
    <AppLayout title="クローゼット">
      <div className={styles.container} ref={containerRef}>
        {/* 検索・フィルターエリア */}
        <div className={styles.filterSection}>
          {/* 検索バー */}
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* フィルター・ソートコントロール */}
          <div className={styles.controls}>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className={styles.filterSelect}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.sortSelect}
            >
              <option value="newest">新しい順</option>
              <option value="oldest">古い順</option>
              <option value="brand">ブランド順</option>
              <option value="category">カテゴリー順</option>
            </select>
          </div>
        </div>

        {/* グリッド */}
        <div className={styles.grid}>
          {filteredAndSortedItems.map((item) => (
            <div
              key={item.id}
              className={styles.card}
              onClick={() => handleCardClick(item)}
            >
              <button
                className={styles.deleteBtn}
                onClick={(e) => handleQuickDelete(e, item.id)}
              >
                ×
              </button>
              {item.image ? (
                <img src={item.image} alt={item.brand || "服"} />
              ) : (
                <div className={styles.noImage}>画像なし</div>
              )}
              <div className={styles.info}>
                <div className={styles.category}>{item.category}</div>
                {item.brand && <div className={styles.brand}>{item.brand}</div>}
              </div>
            </div>
          ))}
        </div>

        {/* FABボタン
        <button
          className={styles.fab}
          onClick={() => {
            setEditingItem(null);
            setIsModalOpen(true);
          }}
        >
          ＋
        </button> */}

        {/* トップへ戻るボタン */}
        {showScrollTop && (
          <button className={styles.scrollTopBtn} onClick={scrollToTop}>
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
