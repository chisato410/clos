import { NavLink } from "react-router-dom";
import styles from "./BottomNav.module.scss";

export default function BottomNav() {
  return (
    <nav className={styles.nav}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/closet">Closet</NavLink>
      <NavLink to="/add">Add</NavLink>
      <NavLink to="/memo">Memo</NavLink>
      <NavLink to="/settings">Settings</NavLink>
    </nav>
  );
}
