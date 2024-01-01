import Link from "next/link";
import styles from "./post.module.css";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko');

export default function Post() {
  const target = {
    User: {
      id: "hopago",
      nickname: "호파고",
      image: "/free-icon-letter-h-7297840.png",
    },
    content: "호파고 코딩 중",
    createdAt: new Date(),
    Images: [],
  };

  return (
    <article className={styles.post}>
      <div className={styles.postWrapper}>
        <div className={styles.postUserSection}>
          <Link href={`/${target.User.id}`} className={styles.postUserImage}>
            <img src={target.User.image} alt={target.User.nickname} />
            <div className={styles.postShade} />
          </Link>
        </div>
        <div className={styles.postBody}>
          <div className={styles.postMeta}>
            <Link href={`/${target.User.id}`}>
              <span className={styles.postUserName}>
                {target.User.nickname}
              </span>
              &nbsp;
              <span className={styles.postUserId}>@{target.User.id}</span>
              &nbsp; · &nbsp;
            </Link>
            <span className={styles.postDate}>
              {dayjs(target.createdAt).fromNow()}
            </span>
          </div>
          <div>{target.content}</div>
          <div className={styles.postImageSection}></div>
          {/* <ActionButtons /> */}
        </div>
      </div>
    </article>
  );
}
