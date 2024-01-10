"use client"

import styles from "./signup.module.css";
import BackButton from "./BackButton";
import { signUp } from "../_lib/sign-up";
import { useFormState, useFormStatus } from "react-dom";

function handleMessage(message: string | undefined, field: string) {
  if (!message) return;
  if (message === `Field ${field} is required.`) {
    return "모든 영역을 입력하세요.";
  }
  if (message === "User already existed...") {
    return "이미 사용 중인 아이디입니다.";
  }
  if (message === "Internal server error...") {
    return "서버 에러입니다. 다시 시도해주세요."
  }
}

export default function SignUpModal() {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(signUp, { message: "" });

  return (
    <>
      <div className={styles.modalBackground}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <BackButton />
            <div>계정을 생성하세요.</div>
          </div>
          <form action={formAction}>
            <div className={styles.modalBody}>
              <div className={styles.inputDiv}>
                <label className={styles.inputLabel} htmlFor="id">
                  아이디
                </label>
                <input
                  id="id"
                  name="id"
                  className={styles.input}
                  type="text"
                  placeholder=""
                  required
                />
              </div>
              <div className={styles.inputDiv}>
                <label className={styles.inputLabel} htmlFor="name">
                  닉네임
                </label>
                <input
                  id="name"
                  name="name"
                  className={styles.input}
                  type="text"
                  placeholder=""
                  required
                />
              </div>
              <div className={styles.inputDiv}>
                <label className={styles.inputLabel} htmlFor="password">
                  비밀번호
                </label>
                <input
                  id="password"
                  name="password"
                  className={styles.input}
                  type="password"
                  placeholder=""
                  required
                />
              </div>
              <div className={styles.inputDiv}>
                <label className={styles.inputLabel} htmlFor="image">
                  프로필
                </label>
                <input
                  id="image"
                  className={styles.input}
                  name="image"
                  type="file"
                  accept="image/*"
                  required
                />
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button
                type="submit"
                className={styles.actionButton}
                disabled={pending}
              >
                가입하기
              </button>
              <div className={styles.error}>
                {handleMessage(
                  state?.message.split("|")[0],
                  state?.message.split("|")[1]
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
