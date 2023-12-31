"use client";

import styles from "./login.module.css";
import { useState } from "react";

export default function LoginModal() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const onClose = () => {};

  const onSubmit = () => {};

  const onChangeId = () => {};

  const onChangePassword = () => {};

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <button className={styles.closeButton} onClick={onClose}>
            X
          </button>
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
