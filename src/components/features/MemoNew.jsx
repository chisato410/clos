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
      ...initialData,
      title,
      content,
      folderId,
      image,
    };
    onSave(data);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>TITLE</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="タイトルを入力"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>FOLDER</label>
            <div className={styles.selectWrapper}>
              <select
                value={folderId}
                onChange={(e) => setFolderId(e.target.value)}
                className={styles.select}
              >
                <option value="">フォルダを選択</option>
                {folders.map((folder) => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>MEMO</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="メモの内容を入力"
              className={styles.textarea}
            />
          </div>

          <div className={styles.imageSection}>
            <input
              type="file"
              id="memo-image"
              accept="image/*"
              onChange={handleImageUpload}
              hidden
            />
            <label htmlFor="memo-image" className={styles.imageLabel}>
              {image ? "画像を貼り替え" : "＋ 画像を追加"}
            </label>
            {image && (
              <div className={styles.previewContainer}>
                <img src={image} alt="" className={styles.preview} />
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className={styles.removeBtn}
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          <div className={styles.footer}>
            {initialData && (
              <button
                type="button"
                onClick={() => onDelete(initialData.id)}
                className={styles.deleteLink}
              >
                このメモを削除する
              </button>
            )}
            <div className={styles.buttonGroup}>
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
