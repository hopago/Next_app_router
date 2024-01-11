"use client";

import { signIn } from "next-auth/react";
import BackButton from "./BackButton";
import styles from "./login.module.css";
import { ChangeEvent, ChangeEventHandler, FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginModal() {
  const router = useRouter();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      await signIn("credentials", {
        username: id,
        password,
        redirect: false,
      });
      
      setMessage("");
      setId("");
      setPassword("");

      router.replace("/home");
    } catch (err: any) {
      setMessage("아이디 비밀번호가 일치하지 않습니다.")
    }
  };

  const onChangeId: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setId(e.target.value);
  };

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(e.target.value);
  };

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <BackButton />
          <div>로그인 하세요.</div>
        </div>
        <form onSubmit={onSubmit}>
          <div className={styles.modalBody}>
            <div className={styles.inputDiv}>
              <label className={styles.inputLabel} htmlFor="id">
                아이디
              </label>
              <input
                type="text"
                id="id"
                className={styles.input}
                value={id}
                onChange={onChangeId}
                placeholder=""
              />
            </div>
            <div className={styles.inputDiv}>
              <label className={styles.inputLabel} htmlFor="password">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                className={styles.input}
                value={password}
                onChange={onChangePassword}
              />
            </div>
            <div className={styles.message}>{message}</div>
          </div>
          <div className={styles.modalFooter}>
            <button className={styles.actionButton} disabled={!id && !password}>
              로그인하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
