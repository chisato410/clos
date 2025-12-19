// src/components/ui/ClothingCard.jsx
import styles from "./ClothingCard.module.scss";

export default function ClothingCard({ item, onClick }) {
  return (
    <div className={styles.card} onClick={() => onClick && onClick(item.id)}>
      <div className={styles.imageWrapper}>
        <img src={item.image || "/placeholder-cloth.png"} alt={item.brand} />
      </div>
      <div className={styles.info}>
        <p className={styles.brand}>{item.brand || "No Brand"}</p>
        <span className={styles.category}>{item.category}</span>
      </div>
    </div>
  );
}
