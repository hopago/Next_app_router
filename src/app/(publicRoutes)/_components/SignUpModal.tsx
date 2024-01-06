import styles from "./signup.module.css";
import BackButton from "./BackButton";
import { signUp } from "@/server-actions/auth/signup";

export default function SignUpModal() {
  const submit = async (formData: FormData) => {
    let shouldRedirect = false;

    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;
    const image = formData.get("image") as string;

    if (!id || !name || !password || !image) return;

    const signUpInfo = {
      id,
      name,
      password,
      image
    };

    const response = await signUp({ ...signUpInfo });

    if (!response) return;

    if (response.status === 407) {
      return {
        status: 407,
        message: "User already existed..."
      };
    }

    
  };

  return (
    <>
      <div className={styles.modalBackground}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <BackButton />
            <div>계정을 생성하세요.</div>
          </div>
          <form action={submit}>
            <div className={styles.modalBody}>
              <div className={styles.inputDiv}>
                <label className={styles.inputLabel} htmlFor="id">
                  아이디
                </label>
                <input
                  id="id"
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
                  type="file"
                  accept="image/*"
                  required
                />
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button type="submit" className={styles.actionButton}>
                가입하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
