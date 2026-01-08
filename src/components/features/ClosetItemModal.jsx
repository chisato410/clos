import { useState } from "react";
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
  // --- モード管理ステート ---
  const [isEditing, setIsEditing] = useState(!initialData);

  // --- フォームステート (初期値として initialData を反映) ---
  const [image, setImage] = useState(initialData?.image || null); // ← ここを修正しました
  const [category, setCategory] = useState(initialData?.category || "");
  const [genre, setGenre] = useState(initialData?.genre || "");
  const [size, setSize] = useState(initialData?.size || "");
  const [color, setColor] = useState(initialData?.color || "");
  const [brand, setBrand] = useState(initialData?.brand || "");
  const [price, setPrice] = useState(initialData?.price || "");
  const [tags, setTags] = useState(initialData?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [isArchived, setIsArchived] = useState(
    initialData?.isArchived || false
  );
  const [memo, setMemo] = useState(initialData?.memo || "");

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
    setIsEditing(false);
  };

  return (
    <div
      className={styles.modalOverlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>
            {isEditing ? (initialData ? "服を編集" : "服を追加") : "服の詳細"}
          </h2>
          <button onClick={onClose} className={styles.closeBtn}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* 画像セクション */}
          <div className={styles.imageSection}>
            {isEditing ? (
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
            ) : (
              <div className={styles.imagePreview}>
                {image ? (
                  <img
                    src={image}
                    alt="アイテム"
                    className={styles.mainImage}
                  />
                ) : (
                  <div className={styles.noImage}>No Image</div>
                )}
              </div>
            )}
            {isEditing && image && (
              <button
                type="button"
                onClick={() => setImage(null)}
                className={styles.removeImageBtn}
              >
                画像を削除
              </button>
            )}
          </div>

          <div className={styles.infoGrid}>
            <DetailItem
              label="カテゴリー"
              value={category}
              isEditing={isEditing}
            >
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
            </DetailItem>

            <DetailItem label="ジャンル" value={genre} isEditing={isEditing}>
              <select value={genre} onChange={(e) => setGenre(e.target.value)}>
                <option value="">選択する</option>
                {GENRES.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </DetailItem>

            <DetailItem label="サイズ" value={size} isEditing={isEditing}>
              <select value={size} onChange={(e) => setSize(e.target.value)}>
                <option value="">選択する</option>
                {SIZES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </DetailItem>

            <DetailItem label="色" value={color} isEditing={isEditing}>
              <select value={color} onChange={(e) => setColor(e.target.value)}>
                <option value="">選択する</option>
                {COLORS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </DetailItem>

            <DetailItem label="ブランド" value={brand} isEditing={isEditing}>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="入力する"
              />
            </DetailItem>

            <DetailItem label="価格" value={price} isEditing={isEditing}>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="入力する"
              />
            </DetailItem>
          </div>

          <div className={styles.formGroup}>
            <label>タグ</label>
            <div className={styles.tagContainer}>
              {tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className={styles.tagRemove}
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
              {!isEditing && tags.length === 0 && (
                <span className={styles.emptyVal}>なし</span>
              )}
            </div>
            {isEditing && tags.length < 3 && (
              <div className={styles.tagInput}>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="タグを追加"
                />
                <button type="button" onClick={handleAddTag}>
                  追加
                </button>
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>保存場所</label>
            {isEditing ? (
              <div className={styles.radioGroup}>
                <label>
                  <input
                    type="radio"
                    checked={!isArchived}
                    onChange={() => setIsArchived(false)}
                  />{" "}
                  クローゼット
                </label>
                <label>
                  <input
                    type="radio"
                    checked={isArchived}
                    onChange={() => setIsArchived(true)}
                  />{" "}
                  アーカイブ
                </label>
              </div>
            ) : (
              <p className={styles.viewValue}>
                {isArchived ? "アーカイブ" : "クローゼット"}
              </p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>メモ</label>
            {isEditing ? (
              <textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                rows={4}
                placeholder="メモを入力..."
              />
            ) : (
              <p className={styles.viewValue}>{memo || "なし"}</p>
            )}
          </div>

          <div className={styles.modalFooter}>
            {isEditing ? (
              <>
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
                  保存する
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className={styles.editBtn}
              >
                編集する
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

function DetailItem({ label, value, isEditing, children }) {
  return (
    <div className={styles.formGroup}>
      <label>{label}</label>
      {isEditing ? (
        children
      ) : (
        <p className={styles.viewValue}>{value || "未設定"}</p>
      )}
    </div>
  );
}
