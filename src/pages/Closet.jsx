import { useState, useEffect, useRef, useMemo } from "react";
import AppLayout from "../components/layouts/AppLayout";
import ClosetItemModal from "../components/features/ClosetItemModal";
import styles from "./Closet.module.scss";

export default function Closet({ items, setItems }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [tempSearchQuery, setTempSearchQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("すべて");
  const [sortBy, setSortBy] = useState("newest");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      setShowScrollTop(container.scrollTop > 300);
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

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

  const scrollToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const categories = [
    "すべて",
    ...new Set(items.map((item) => item.category).filter(Boolean)),
  ];

  const filteredAndSortedItems = useMemo(() => {
    return items
      .filter((item) => {
        const matchesCategory =
          filterCategory === "すべて" || item.category === filterCategory;
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          !searchQuery ||
          item.category?.toLowerCase().includes(query) ||
          item.brand?.toLowerCase().includes(query) ||
          item.tags?.some((tag) => tag.toLowerCase().includes(query));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "newest")
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        if (sortBy === "oldest")
          return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
        return 0;
      });
  }, [items, searchQuery, filterCategory, sortBy]);

  return (
    <AppLayout title="クローゼット">
      <div className={styles.container} ref={containerRef}>
        {/* ヘッダーエリア（パディングあり） */}
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
              <span className={styles.selectLabel}>絞り込み</span>
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

        {/* グリッドエリア（幅100%） */}
        <div className={styles.grid}>
          {filteredAndSortedItems.map((item) => (
            <div
              key={item.id}
              className={styles.card}
              onClick={() => handleCardClick(item)}
            >
              {item.image ? (
                <img src={item.image} alt={item.brand} />
              ) : (
                <div className={styles.noImage}>No Image</div>
              )}
            </div>
          ))}
        </div>

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
