import { useLocation, useNavigate } from "react-router-dom";
import AppLayout from "../components/layouts/AppLayout";
import styles from "./SubSelect.module.scss";

export default function SubSelect({ items = [] }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Homeから渡された遷移情報（type: "category", label: "カテゴリー" など）を取得
  const { type, label } = location.state || {
    type: "category",
    label: "カテゴリー",
  };

  // 1. 重複を除いたリストを作成（例：全アイテムからブランド名を抽出）
  const options = [
    ...new Set(
      items.flatMap((item) => {
        const val = item[type];
        if (!val) return [];
        return Array.isArray(val) ? val : [val]; // タグなどの配列対応
      })
    ),
  ].sort();

  // 2. その項目に該当する最初の画像をアイコンとして取得
  const getThumbnail = (val) => {
    const found = items.find((item) => {
      const field = item[type];
      return Array.isArray(field) ? field.includes(val) : field === val;
    });
    return found?.image || null;
  };

  return (
    <AppLayout title={label} showBackButton>
      <div className={styles.container}>
        <div className={styles.header}>
          <span>{label}</span>
        </div>
        <div className={styles.list}>
          {options.length > 0 ? (
            options.map((opt) => (
              <div
                key={opt}
                className={styles.listItem}
                onClick={() =>
                  navigate("/closet", {
                    state: { filterValue: opt, filterType: type },
                  })
                }
              >
                <div className={styles.thumbnail}>
                  {getThumbnail(opt) ? (
                    <img src={getThumbnail(opt)} alt="" />
                  ) : (
                    <div className={styles.noImg} />
                  )}
                </div>
                <span className={styles.name}>{opt}</span>
                <span className={styles.arrow}>＞</span>
              </div>
            ))
          ) : (
            <div className={styles.empty}>データがありません</div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
