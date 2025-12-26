import { useState, useEffect } from "react";
import styles from "./ClosetItemModal.module.scss";

const CATEGORIES = [
  "トップス",
  "ボトムス",
  "ワンピース",
  "アウター",
  "シューズ",
  "バッグ",
  "アクセサリー",
  "その他",
];

const GENRES = [
  "カジュアル",
  "フォーマル",
  "ストリート",
  "モード",
  "きれいめ",
  "ナチュラル",
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "フリー"];

const COLORS = [
  "黒",
  "白",
  "グレー",
  "ベージュ",
  "ブラウン",
  "ネイビー",
  "ブルー",
  "グリーン",
  "レッド",
  "ピンク",
  "イエロー",
  "パープル",
  "オレンジ",
  "その他",
];

export default function ClosetItemModal({
  initialData = null,
  onSave,
  onDelete,
  onClose,
}) {
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [genre, setGenre] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [isArchived, setIsArchived] = useState(false);
  const [memo, setMemo] = useState("");

  useEffect(() => {
    if (initialData) {
      setImage(initialData.image || null);
      setCategory(initialData.category || "");
      setGenre(initialData.genre || "");
      setSize(initialData.size || "");
      setColor(initialData.color || "");
      setBrand(initialData.brand || "");
      setPrice(initialData.price || "");
      setTags(initialData.tags || []);
      setIsArchived(initialData.isArchived || false);
      setMemo(initialData.memo || "");
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

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: initialData?.id || `c${Date.now()}`,
      image,
      category,
      genre,
      size,
      color,
      brand,
      price,
      tags,
      isArchived,
      memo,
      createdAt: initialData?.createdAt || new Date().toISOString(),
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
          <h2>{initialData ? "服を編集" : "服を追加"}</h2>
          <button onClick={onClose} className={styles.closeBtn}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* 画像アップロード */}
          <div className={styles.imageSection}>
            <label className={styles.imageUpload}>
              {image ? (
                <img src={image} alt="プレビュー" />
              ) : (
                <div className={styles.uploadPlaceholder}>
                  <span>＋</span>
                  <span>写真を追加する</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </label>
            {image && (
              <button
                type="button"
                onClick={() => setImage(null)}
                className={styles.removeImageBtn}
              >
                画像を削除
              </button>
            )}
          </div>

          {/* カテゴリー */}
          <div className={styles.formGroup}>
            <label>カテゴリー</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">選択する</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* ジャンル */}
          <div className={styles.formGroup}>
            <label>ジャンル</label>
            <select value={genre} onChange={(e) => setGenre(e.target.value)}>
              <option value="">選択する</option>
              {GENRES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* サイズ */}
          <div className={styles.formGroup}>
            <label>サイズ</label>
            <select value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="">選択する</option>
              {SIZES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* 色 */}
          <div className={styles.formGroup}>
            <label>色</label>
            <select value={color} onChange={(e) => setColor(e.target.value)}>
              <option value="">選択する</option>
              {COLORS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* ブランド */}
          <div className={styles.formGroup}>
            <label>ブランド</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="入力する"
            />
          </div>

          {/* 価格 */}
          <div className={styles.formGroup}>
            <label>価格</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="入力する"
            />
          </div>

          {/* タグ */}
          <div className={styles.formGroup}>
            <label>タグ（3つまで）</label>
            <div className={styles.tagContainer}>
              {tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className={styles.tagRemove}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            {tags.length < 3 && (
              <div className={styles.tagInput}>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder="入力する"
                />
                <button type="button" onClick={handleAddTag}>
                  追加
                </button>
              </div>
            )}
          </div>

          {/* 保存場所 */}
          <div className={styles.formGroup}>
            <label>保存場所</label>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  checked={!isArchived}
                  onChange={() => setIsArchived(false)}
                />
                クローゼット
              </label>
              <label>
                <input
                  type="radio"
                  checked={isArchived}
                  onChange={() => setIsArchived(true)}
                />
                アーカイブ
              </label>
            </div>
          </div>

          {/* メモ */}
          <div className={styles.formGroup}>
            <label>メモ</label>
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              rows={4}
              placeholder=""
            />
          </div>

          {/* フッター */}
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
            <button type="submit" className={styles.saveBtn}>
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
