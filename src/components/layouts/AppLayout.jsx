// src/components/layout/AppLayout.jsx
import Header from "../ui/Header";
import BottomNav from "../ui/BottomNav";
import styles from "./AppLayout.module.scss";

export default function AppLayout({ children, title }) {
  return (
    <div className={styles.container}>
      <Header title={title} className={styles.header} />

      {/* ここがスクロールするメインコンテンツ */}
      <main className={styles.main}>{children}</main>

      <BottomNav className={styles.nav} />
    </div>
  );
}
