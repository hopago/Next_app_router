"use client";

import { signOut, useSession } from "next-auth/react";
import styles from "./logoutButton.module.css";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const { data: me } = useSession();

  const onLogout = () => {
    signOut({
      redirect: false,
    })
      .then(() => {
        router.replace("/");
      })
      .catch((err) => console.error(err));
  };

  if (!me?.user) return null;

  return (
    <button className={styles.logoutButton} onClick={onLogout}>
      <div className={styles.logoutUserImage}>
        <img src={me.user.image!} alt={me.user.email!} />
      </div>
      <div className={styles.logoutUserName}>
        <div>{me.user.name}</div>
        <div>@{me.user.name}</div>
      </div>
    </button>
  );
}
