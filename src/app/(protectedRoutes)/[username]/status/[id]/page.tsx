import BackButton from "@/app/(protectedRoutes)/_components/BackButton";
import styles from "./page.module.css";
import Post from "@/app/(protectedRoutes)/_components/Post";
import CommentForm from "./_components/CommentForm";

export default function page() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <BackButton />
        <h3 className={styles.headerTitle}>게시하기</h3>
      </div>
      <Post />
      <CommentForm />
      <div>
        <h3 className={styles.headerTitle}>답글</h3>
        <Post />
      </div>
    </main>
  );
}
