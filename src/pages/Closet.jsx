import { useState, useEffect, useRef, useMemo } from "react";
import { useLocation } from "react-router-dom";
import AppLayout from "../components/layouts/AppLayout";
import ClosetItemModal from "../components/features/ClosetItemModal";
import styles from "./Closet.module.scss";

export default function Closet({ items, setItems }) {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [tempSearchQuery, setTempSearchQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("すべて");
  const [archiveFilter, setArchiveFilter] = useState(
    location.state?.defaultFilter || "すべて"
  );
  const [sortBy, setSortBy] = useState("newest");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => setShowScrollTop(container.scrollTop > 300);
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

  const categories = [
    "すべて",
    ...new Set(items.map((i) => i.category).filter(Boolean)),
  ];

  const filteredAndSortedItems = useMemo(() => {
    return items
      .filter((item) => {
        const matchesCategory =
          filterCategory === "すべて" || item.category === filterCategory;
        const matchesArchive =
          archiveFilter === "すべて" ||
          (archiveFilter === "クローゼット" && !item.isArchived) ||
          (archiveFilter === "アーカイブ" && item.isArchived);
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          !searchQuery ||
          item.category?.toLowerCase().includes(query) ||
          item.brand?.toLowerCase().includes(query) ||
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

        <div className={styles.grid}>
          {filteredAndSortedItems.map((item) => (
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
          ))}
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
