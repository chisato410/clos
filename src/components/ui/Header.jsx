// src/components/ui/Header.jsx
import styles from "./Header.module.scss";
import logo from "../../assets/logo.svg"; // ロゴのファイル名に合わせて変更してください

export default function Header() {
  return (
    <header className={styles.header}>
      {/* titleはスクリーンリーダー用にalt属性などに入れます */}
      <img src={logo} alt="clos logo" className={styles.logo} />
    </header>
  );
}
