import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layouts/AppLayout";
import styles from "./ProfileEdit.module.scss";

export default function ProfileEdit() {
  const navigate = useNavigate();
  const [name, setName] = useState("ユーザー名");
  const [bio, setBio] = useState("クローゼット管理中！");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("プロフィールを保存しました");
    navigate("/settings");
  };

  return (
    <AppLayout title="プロフィール編集" showBackButton>
      <div className={styles.container}>
        <form onSubmit={handleSave} className={styles.profileForm}>
          <div className={styles.imageSection}>
            <div className={styles.avatarWrapper}>
              {image ? (
                <img src={image} alt="プロフィール" className={styles.avatar} />
              ) : (
                <div className={styles.placeholder}>👤</div>
              )}
              <label className={styles.cameraIcon}>
                📷
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <p className={styles.imageHint}>写真を変更する</p>
          </div>

          <div className={styles.formFields}>
            <div className={styles.inputGroup}>
              <label>名前</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="お名前を入力"
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label>自己紹介</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="自己紹介を入力してください"
                rows={4}
              />
            </div>
          </div>

          {/* ボタンエリアを横並びに変更 */}
          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => navigate(-1)}
            >
              戻る
            </button>
            <button type="submit" className={styles.saveBtn}>
              保存する
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
