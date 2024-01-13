"use client";

import { useRouter } from "next/navigation";
import styles from "./post.module.css";
import { Post } from "@/model/Post";

type Props = {
  post: Post;
  children: React.ReactNode;
};

export default function PostArticle({ children, post }: Props) {
  const router = useRouter();

  const onClick = () => {
    router.push(`/${post.User.id}/status/${post.postId}`);
  };

  return (
    <article onClickCapture={onClick} className={styles.post}>
      {children}
    </article>
  );
}
