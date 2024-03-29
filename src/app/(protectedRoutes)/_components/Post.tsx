import Link from "next/link";
import styles from "./post.module.css";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import ActionButtons from "./ActionButtons";
import PostArticle from "./PostArticle";
import PostImages from "./PostImages";
import { Post } from "@/model/Post";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function Post({
  post,
  noImage
}: {
  noImage?: boolean;
  post: Post;
}) {
  return (
    <PostArticle post={post}>
      <div className={styles.postWrapper}>
        <div className={styles.postUserSection}>
          <Link href={`/${post.User.id}`} className={styles.postUserImage}>
            <img src={post.User.image} alt={post.User.nickname} />
            <div className={styles.postShade} />
          </Link>
        </div>
        <div className={styles.postBody}>
          <div className={styles.postMeta}>
            <Link href={`${post.User.id}`}>
              <span className={styles.postUserName}>{post.User.nickname}</span>
              &nbsp;
              <span className={styles.postUserId}>@{post.User.id}</span>
              &nbsp; · &nbsp;
            </Link>
            <span className={styles.postDate}>
              {dayjs(post.createdAt).fromNow()}
            </span>
          </div>
          <div>{post.content}</div>
          {!noImage && (
            <div className={styles.postImageSection}>
              <PostImages post={post} />
            </div>
          )}
          <ActionButtons />
        </div>
      </div>
    </PostArticle>
  );
}
