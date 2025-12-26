import { useState } from "react";
import AppLayout from "../components/layouts/AppLayout";
import MemoNew from "../components/features/MemoNew";
import styles from "./Memo.module.scss";

export default function Memo({ memos, setMemos, folders = [], setFolders }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMemo, setEditingMemo] = useState(null);
  const [viewMode, setViewMode] = useState("all");

  const handleSaveMemo = (data) => {
    if (editingMemo) {
      setMemos(memos.map((m) => (m.id === data.id ? data : m)));
    } else {
      setMemos([...memos, data]);
    }
    setEditingMemo(null);
    setIsModalOpen(false);
  };

  const handleDeleteMemo = (id) => {
    setMemos(memos.filter((m) => m.id !== id));
    setEditingMemo(null);
    setIsModalOpen(false);
  };

  const addFolder = () => {
    const name = prompt("新しいフォルダ名を入力してください");
    if (name) {
      setFolders([
        ...folders,
        { id: `f${Date.now()}`, name, color: "#E0E0E0" },
      ]);
    }
  };

  return (
    <AppLayout title="メモ">
      <div className={styles.tabContainer}>
        <button
          onClick={() => setViewMode("all")}
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

      <div className={styles.content}>
        {viewMode === "all" ? (
          <div className={styles.memoGrid}>
            {memos.map((memo) => (
              <div
                key={memo.id}
                className={styles.memoCard}
                onClick={() => {
                  setEditingMemo(memo);
                  setIsModalOpen(true);
                }}
              >
                {memo.image && <img src={memo.image} alt="" />}
                <div className={styles.memoInfo}>
                  <h4>{memo.title}</h4>
                  <p>{memo.date}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.folderList}>
            {folders.map((folder) => (
              <div key={folder.id} className={styles.folderRow}>
                <span>{folder.name}</span>
                <span className={styles.count}>
                  {memos.filter((m) => m.folderId === folder.id).length}
                </span>
              </div>
            ))}
            <button onClick={addFolder} className={styles.addFolderBtn}>
              ＋ フォルダを追加
            </button>
          </div>
        )}
      </div>

      <button
        className={styles.fab}
        onClick={() => {
          setEditingMemo(null);
          setIsModalOpen(true);
        }}
      >
        ＋
      </button>

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
