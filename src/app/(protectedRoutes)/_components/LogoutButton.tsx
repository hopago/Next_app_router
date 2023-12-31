"use client";

import styles from "./logoutButton.module.css";

export default function LogoutButton() {
  const onLogout = () => {};

  const me = {
    id: "hopago",
    nickname: "호파고",
    image: "/free-icon-letter-h-7297840.png",
  };

  return (
    <button className={styles.logoutButton} onClick={onLogout}>
      <div className={styles.logoutUserImage}>
        <img src={me.image} alt={me.id} />
      </div>
      <div className={styles.logoutUserName}>
        <div>{me.nickname}</div>
        <div>@{me.id}</div>
      </div>
    </button>
  );
}
