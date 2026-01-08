import styles from "./HorizontalSection.module.scss";

export default function HorizontalSection({
  title,
  data,
  type,
  onMoreClick,
  onItemClick,
}) {
  const isMemo = type === "memo";

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>{title}</h3>
      </div>

      {isMemo ? (
        /* メモ用の縦リスト表示 */
        <div className={styles.memoList}>
          {data && data.length > 0 ? (
            data.map((item) => (
              <div
                key={item.id}
                className={styles.memoListItem}
                onClick={() => onItemClick(item)} // クリックで遷移
                style={{ cursor: "pointer" }}
              >
                <div className={styles.memoInfo}>
                  <p className={styles.memoTitle}>
                    {item.title || "無題のメモ"}
                  </p>
                  <span className={styles.memoDate}>
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : "2026/01/08"}
                  </span>
                </div>
                {item.image && (
                  <img src={item.image} alt="" className={styles.memoThumb} />
                )}
              </div>
            ))
          ) : (
            <p className={styles.emptyText}>メモがありません</p>
          )}
          <button className={styles.listMoreBtn} onClick={onMoreClick}>
            メモをもっと見る ＞
          </button>
        </div>
      ) : (
        /* 服用の横スクロール表示 */
        <div className={styles.scrollWrapper}>
          <div className={styles.scrollContent}>
            {data && data.length > 0 ? (
              data.map((item) => (
                <div
                  key={item.id}
                  className={`${styles.itemCard} ${
                    item.isArchived ? styles.archived : ""
                  }`}
                  onClick={() => onItemClick(item)} // クリックで遷移
                  style={{ cursor: "pointer" }}
                >
                  {item.image ? (
                    <img src={item.image} alt="" />
                  ) : (
                    <div className={styles.placeholder}>👗</div>
                  )}
                </div>
              ))
            ) : (
              <p className={styles.emptyText}>アイテムがありません</p>
            )}
            <button className={styles.moreCard} onClick={onMoreClick}>
              <div className={styles.moreIcon}>＋</div>
              <span>もっと見る</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
