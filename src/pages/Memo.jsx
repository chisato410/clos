import { useState, useMemo } from "react";
import AppLayout from "../components/layouts/AppLayout";
import MemoNew from "../components/features/MemoNew";
import styles from "./Memo.module.scss";

export default function Memo({
  memos = [],
  setMemos,
  folders = [],
  setFolders,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMemo, setEditingMemo] = useState(null);
  const [viewMode, setViewMode] = useState("all");
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSaveMemo = (data) => {
    if (editingMemo) {
      setMemos(memos.map((m) => (m.id === data.id ? data : m)));
    } else {
      const newId = crypto.randomUUID ? crypto.randomUUID() : `m-${Date.now()}`;
      setMemos([...memos, { ...data, id: newId }]);
    }
    setEditingMemo(null);
    setIsModalOpen(false);
  };

  const handleDeleteMemo = (id) => {
    if (window.confirm("このメモを削除しますか？")) {
      setMemos(memos.filter((m) => m.id !== id));
      setEditingMemo(null);
      setIsModalOpen(false);
    }
  };

  const handleAddFolder = () => {
    const name = prompt("新しいフォルダ名を入力してください");
    if (name) {
      const newFolder = {
        id: `f-${Date.now()}`,
        name: name,
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      };
      setFolders([...folders, newFolder]);
    }
  };

  const displayMemos = useMemo(() => {
    let list = memos;
    if (viewMode === "folder" && selectedFolderId) {
      list = list.filter((m) => m.folderId === selectedFolderId);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      list = list.filter(
        (m) =>
          m.title?.toLowerCase().includes(query) ||
          m.content?.toLowerCase().includes(query)
      );
    }
    return list;
  }, [memos, viewMode, selectedFolderId, searchQuery]);

  const selectedFolderName = folders.find(
    (f) => f.id === selectedFolderId
  )?.name;

  return (
    <AppLayout title="メモ">
      <div className={styles.container}>
        {/* 固定ヘッダーエリア */}
        <div className={styles.fixedHeader}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="検索内容を入力"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className={styles.searchIcon}>🔍</span>
          </div>

          <button
            className={styles.newMemoBtn}
            onClick={() => {
              setEditingMemo(null);
              setIsModalOpen(true);
            }}
          >
            ＋ 新規メモ
          </button>
        </div>

        {/* タブ切り替えエリア */}
        <div className={styles.tabWrapper}>
          <div className={styles.tabContainer}>
            <button
              onClick={() => {
                setViewMode("all");
                setSelectedFolderId(null);
              }}
              className={viewMode === "all" ? styles.active : ""}
            >
              一覧
            </button>
            <button
              onClick={() => setViewMode("folder")}
              className={viewMode === "folder" ? styles.active : ""}
            >
              フォルダ別
            </button>
          </div>
        </div>

        {/* スクロール可能なコンテンツエリア */}
        <div className={styles.scrollArea}>
          {viewMode === "all" || (viewMode === "folder" && selectedFolderId) ? (
            <div className={styles.memoList}>
              {viewMode === "folder" && (
                <div className={styles.folderHeader}>
                  <button
                    onClick={() => setSelectedFolderId(null)}
                    className={styles.backBtn}
                  >
                    ＜ 戻る
                  </button>
                  <span className={styles.folderTitle}>
                    {selectedFolderName}
                  </span>
                </div>
              )}
              {displayMemos.map((memo) => (
                <div
                  key={memo.id}
                  className={styles.memoItem}
                  onClick={() => {
                    setEditingMemo(memo);
                    setIsModalOpen(true);
                  }}
                >
                  <div className={styles.memoText}>
                    <p className={styles.folderPath}>
                      {folders.find((f) => f.id === memo.folderId)?.name ||
                        "未分類"}{" "}
                      ＞
                    </p>
                    <h4 className={styles.memoTitle}>
                      {memo.title || "無題のメモ"}
                    </h4>
                    <p className={styles.memoSnippet}>{memo.content}</p>
                  </div>
                  {memo.image && (
                    <div className={styles.memoThumb}>
                      <img src={memo.image} alt="" />
                    </div>
                  )}
                </div>
              ))}
              {displayMemos.length === 0 && (
                <p className={styles.noData}>メモがありません</p>
              )}
            </div>
          ) : (
            <div className={styles.folderList}>
              {folders.map((folder) => (
                <div
                  key={folder.id}
                  className={styles.folderItem}
                  onClick={() => setSelectedFolderId(folder.id)}
                >
                  <div className={styles.folderLeft}>
                    <span
                      className={styles.colorDot}
                      style={{ backgroundColor: folder.color }}
                    ></span>
                    <span className={styles.folderName}>{folder.name}</span>
                  </div>
                  <div className={styles.folderRight}>
                    <span className={styles.count}>
                      {memos.filter((m) => m.folderId === folder.id).length}
                    </span>
                    <span className={styles.arrow}>＞</span>
                  </div>
                </div>
              ))}
              <button
                onClick={handleAddFolder}
                className={styles.addFolderAction}
              >
                ＋ フォルダを追加
              </button>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <MemoNew
          folders={folders}
          initialData={editingMemo}
          onSave={handleSaveMemo}
          onDelete={handleDeleteMemo}
          onClose={() => {
            setIsModalOpen(false);
            setEditingMemo(null);
          }}
        />
      )}
    </AppLayout>
  );
}
