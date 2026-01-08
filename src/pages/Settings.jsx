import AppLayout from "../components/layouts/AppLayout";
import styles from "./Settings.module.scss";

export default function Settings() {
  const settingsGroups = [
    {
      title: "アカウント",
      items: [
        {
          label: "プロフィール編集",
          icon: "👤",
          action: () => alert("プロフィール編集へ"),
        },
        {
          label: "メールアドレス",
          icon: "✉️",
          action: () => alert("メール設定へ"),
        },
      ],
    },
    {
      title: "アプリ設定",
      items: [
        {
          label: "カテゴリーの編集",
          icon: "👕",
          action: () => alert("カテゴリー編集へ"),
        },
        { label: "通知設定", icon: "🔔", action: () => alert("通知設定へ") },
        { label: "ダークモード", icon: "🌙", type: "toggle" },
      ],
    },
    {
      title: "データ・サポート",
      items: [
        {
          label: "データのバックアップ",
          icon: "☁️",
          action: () => alert("バックアップ中..."),
        },
        {
          label: "キャッシュを削除",
          icon: "🗑️",
          action: () => alert("削除完了"),
        },
        {
          label: "お問い合わせ",
          icon: "❓",
          action: () => alert("フォームを開く"),
        },
      ],
    },
    {
      title: "その他",
      items: [
        { label: "利用規約", icon: "📄", action: () => alert("規約を表示") },
        {
          label: "ログアウト",
          icon: "🚪",
          color: "#ff4d4f",
          action: () => alert("ログアウトしますか？"),
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
                    <div className={styles.toggle}>
                      <input type="checkbox" id={`toggle-${gIdx}-${iIdx}`} />
                      <label htmlFor={`toggle-${gIdx}-${iIdx}`}></label>
                    </div>
                  ) : (
                    <span className={styles.arrow}>＞</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className={styles.version}>Version 1.0.0</div>
      </div>
    </AppLayout>
  );
}
