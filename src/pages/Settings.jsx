import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layouts/AppLayout";
import styles from "./Settings.module.scss";

// currentTheme, setCurrentTheme, themes を Props として受け取る
export default function Settings({ currentTheme, setCurrentTheme, themes }) {
  const navigate = useNavigate();

  // App.jsx の themes オブジェクトからカラーオプションのリストを生成
  const colorOptions = Object.keys(themes).map((key) => ({
    id: key,
    color: themes[key].primary,
  }));

  const settingsGroups = [
    {
      title: "テーマカラー",
      type: "colorPicker", // カラーグリッド表示用の特殊タイプ
    },
    {
      title: "アカウント",
      items: [
        {
          label: "プロフィール編集",
          icon: "👤",
          action: () => navigate("/settings/profile"),
        },
        {
          label: "メールアドレス",
          icon: "✉️",
          action: () => alert("メール設定機能は準備中です"),
        },
      ],
    },
    {
      title: "アプリ設定",
      items: [
        {
          label: "カテゴリーの編集",
          icon: "👕",
          action: () => navigate("/settings/category"),
        },
        {
          label: "通知設定",
          icon: "🔔",
          action: () => alert("通知設定は準備中です"),
        },
        { label: "ダークモード", icon: "🌙", type: "toggle" },
      ],
    },
    {
      title: "データ・サポート",
      items: [
        {
          label: "データのバックアップ",
          icon: "☁️",
          action: () => alert("バックアップ完了しました"),
        },
        {
          label: "キャッシュを削除",
          icon: "🗑️",
          action: () => alert("キャッシュを削除しました"),
        },
        {
          label: "お問い合わせ",
          icon: "❓",
          action: () => alert("ブラウザでフォームを開きます"),
        },
      ],
    },
    {
      title: "その他",
      items: [
        {
          label: "利用規約",
          icon: "📄",
          action: () => alert("利用規約を表示します"),
        },
        {
          label: "ログアウト",
          icon: "🚪",
          color: "#ff4d4f",
          action: () => confirm("ログアウトしますか？"),
        },
      ],
    },
  ];

  return (
    <AppLayout title="設定">
      <div className={styles.container}>
        {settingsGroups.map((group, gIdx) => (
          <div key={gIdx} className={styles.group}>
            <h3 className={styles.groupTitle}>{group.title}</h3>

            {/* カラーピッカーセクションのレンダリング */}
            {group.type === "colorPicker" ? (
              <div className={styles.colorGridWrapper}>
                <div className={styles.colorGrid}>
                  {colorOptions.map((opt) => (
                    <div
                      key={opt.id}
                      className={`${styles.colorCircle} ${
                        currentTheme === opt.id ? styles.active : ""
                      }`}
                      style={{ backgroundColor: opt.color }}
                      onClick={() => setCurrentTheme(opt.id)}
                    />
                  ))}
                </div>
              </div>
            ) : (
              /* 通常のリストアイテムのレンダリング */
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
