// src/components/ui/BottomNav.jsx
import { NavLink } from "react-router-dom";
import styles from "./BottomNav.module.scss";

// assetsからアイコンをインポート（ファイル名は実際の名前へ変更してください）
import homeIcon from "../../assets/btn_home.svg";
import closetIcon from "../../assets/btn_clos.svg";
import addIcon from "../../assets/btn_add.svg";
import memoIcon from "../../assets/btn_memo.svg";
import settingsIcon from "../../assets/btn_settings.svg";

export default function BottomNav() {
  const navItems = [
    { to: "/", icon: homeIcon, label: "Home" },
    { to: "/closet", icon: closetIcon, label: "Closet" },
    { to: "/add", icon: addIcon, label: "Add" },
    { to: "/memo", icon: memoIcon, label: "Memo" },
    { to: "/settings", icon: settingsIcon, label: "Settings" },
  ];

  return (
    <nav className={styles.nav}>
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          <img src={item.icon} alt={item.label} className={styles.icon} />
          <span className={styles.label}>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
