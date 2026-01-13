import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heic2any from "heic2any";
import AppLayout from "../components/layouts/AppLayout";
import styles from "./Add.module.scss";

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

export default function Add({ addItem, categories = [] }) {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsConverting(true);

    try {
      let processedFile = file;

      // HEICファイルの場合はJPEGに変換
      if (
        file.type === "image/heic" ||
        file.name.toLowerCase().endsWith(".heic")
      ) {
        const convertedBlob = await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 0.8,
        });
        processedFile = convertedBlob;
      }

      // プレビュー表示
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        setIsConverting(false);
      };
      reader.onerror = () => {
        alert("画像の読み込みに失敗しました");
        setIsConverting(false);
      };
      reader.readAsDataURL(processedFile);
    } catch (error) {
      console.error("画像変換エラー:", error);
      alert("画像の変換に失敗しました。別の画像を選択してください。");
      setIsConverting(false);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 3) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: `c${Date.now()}`,
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
      createdAt: new Date().toISOString(),
    };
    addItem(newItem);
    navigate("/closet");
  };

  return (
    <AppLayout title="追加">
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* 画像アップロード */}
          <div className={styles.imageSection}>
            <label className={styles.imageUpload}>
              {isConverting ? (
                <div className={styles.uploadPlaceholder}>
                  <span>変換中...</span>
                </div>
              ) : image ? (
                <img src={image} alt="プレビュー" />
              ) : (
                <div className={styles.uploadPlaceholder}>
                  <span>＋</span>
                  <span>写真を追加する</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*,.heic"
                onChange={handleImageUpload}
                style={{ display: "none" }}
                disabled={isConverting}
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
              {categories.map((cat) => (
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

          {/* 保存ボタン */}
          <button type="submit" className={styles.saveBtn}>
            保存
          </button>
        </form>
      </div>
    </AppLayout>
  );
}
