import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layouts/AppLayout";
import styles from "./Settings.module.scss";

export default function Settings({ currentTheme, setCurrentTheme, themes }) {
  const navigate = useNavigate();

  // テーマを初期状態に戻す関数
  const handleReset = () => {
    if (confirm("テーマカラーを初期状態に戻しますか？")) {
      setCurrentTheme("default");
    }
  };

  const colorOptions = Object.keys(themes)
    .filter((key) => key !== "default")
    .map((key) => ({
      id: key,
      color: themes[key].primary,
      preview: themes[key].preview,
    }));

  const settingsGroups = [
    {
      title: "アプリ設定",
      items: [
        {
          label: "カテゴリーの編集",
          icon: "👕",
          action: () => navigate("/settings/category"),
        },
      ],
    },
    {
      title: "テーマカラー",
      type: "colorPicker",
    },
  ];

  return (
    <AppLayout title="設定">
      <div className={styles.container}>
        {settingsGroups.map((group, gIdx) => (
          <div key={gIdx} className={styles.group}>
            {/* ヘッダー部分をリセットボタン対応に変更 */}
            <div className={styles.groupHeader}>
              <h3 className={styles.groupTitle}>{group.title}</h3>
              {group.type === "colorPicker" && (
                <button className={styles.resetBtn} onClick={handleReset}>
                  リセット
                </button>
              )}
            </div>

            {group.type === "colorPicker" ? (
              <div className={styles.colorGridWrapper}>
                <div className={styles.colorGrid}>
                  {colorOptions.map((opt) => (
                    <div
                      key={opt.id}
                      className={`${styles.colorCircle} ${
                        currentTheme === opt.id ? styles.active : ""
                      }`}
                      onClick={() => setCurrentTheme(opt.id)}
                    >
                      <img
                        src={opt.preview}
                        alt={opt.id}
                        className={styles.themeImage}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className={styles.list}>
                {group.items.map((item, iIdx) => (
                  <div
                    key={iIdx}
                    className={styles.item}
                    onClick={item.action}
                    style={{ color: item.color || "inherit" }}
                  >
                    <span className={styles.icon}>{item.icon}</span>
                    <span className={styles.label}>{item.label}</span>
                    {item.type === "toggle" ? (
                      <div
                        className={styles.toggle}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input type="checkbox" id={`toggle-${gIdx}-${iIdx}`} />
                        <label htmlFor={`toggle-${gIdx}-${iIdx}`}></label>
                      </div>
                    ) : (
                      <span className={styles.arrow}>＞</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className={styles.version}>Version 1.0.0</div>
      </div>
    </AppLayout>
  );
}
