import { useState, useEffect } from "react";
import styles from "./MemoNew.module.scss";

export default function MemoNew({
  folders = [],
  initialData = null,
  onSave,
  onDelete,
  onClose,
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [folderId, setFolderId] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setContent(initialData.content || "");
      setFolderId(initialData.folderId || "");
      setImage(initialData.image || null);
    }
  }, [initialData]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: initialData?.id || `m${Date.now()}`,
      title,
      content,
      folderId,
      image,
      date: new Date().toLocaleDateString("ja-JP"),
    };
    onSave(data);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>{initialData ? "メモを編集" : "新規メモ"}</h2>
          <button onClick={onClose} className={styles.closeBtn}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>タイトル</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="タイトルを入力"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>フォルダ</label>
            <select
              value={folderId}
              onChange={(e) => setFolderId(e.target.value)}
            >
              <option value="">フォルダなし</option>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>内容</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="メモの内容を入力"
              rows={8}
            />
          </div>

          <div className={styles.formGroup}>
            <label>画像</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className={styles.fileInput}
            />
            {image && (
              <div className={styles.imagePreview}>
                <img src={image} alt="プレビュー" />
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className={styles.removeImageBtn}
                >
                  画像を削除
                </button>
              </div>
            )}
          </div>

          <div className={styles.modalFooter}>
            {initialData && (
              <button
                type="button"
                onClick={() => onDelete(initialData.id)}
                className={styles.deleteBtn}
              >
                削除
              </button>
            )}
            <div className={styles.actionBtns}>
              <button
                type="button"
                onClick={onClose}
                className={styles.cancelBtn}
              >
                キャンセル
              </button>
              <button type="submit" className={styles.saveBtn}>
                保存
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
