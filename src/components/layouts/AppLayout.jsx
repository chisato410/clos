// アプリ全体に共通する枠（Header・Content・BottomNav の構造など）
import Header from "../ui/Header";
import BottomNav from "../ui/BottomNav";
import styles from "./AppLayout.module.scss";

export default function AppLayout({ title, children, showNav = true }) {
  return (
    <div className={styles.wrapper}>
      <Header title={title} />
      <main className={styles.main}>{children}</main>
      {showNav && <BottomNav />}
    </div>
  );
}
