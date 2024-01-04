import Link from "next/link";
import styles from "./post.module.css";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import ActionButtons from "./ActionButtons";
import PostArticle from "./PostArticle";
import { faker } from "@faker-js/faker";

dayjs.extend(relativeTime);
dayjs.locale("ko");

type PostImage = {
  imageId: number;
  url: string;
}

export type Post = {
    postId: number;
    content: string;
    User: {
      id: string;
      nickname: string;
      image: string;
    };
    createdAt: Date;
    Images: (PostImage | null)[];
}

export default function Post({ noImage }: { noImage?: boolean }) {
  const target: Post = {
    postId: 1,
    User: {
      id: "hopago",
      nickname: "호파고",
      image: "/free-icon-letter-h-7297840.png",
    },
    content: "호파고 코딩 중",
    createdAt: new Date(),
    Images: [],
  };

  if (Math.random() > 0.5 && !noImage) {
    target.Images.push({
      imageId: target.Images.length + 1,
      url: faker.image.urlLoremFlickr(),
    });
  }

  return (
    <PostArticle post={target}>
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
          <div className={styles.postImageSection}>
            {target.Images && target.Images.length > 0 ? (
              <Link
                href={`/${target.User.id}/status/${target.postId}/photo/${target.Images[0]?.imageId}`}
                className={styles.postImageSection}
              >
                <img src={target.Images[0]?.url} alt="Post Image" />
              </Link>
            ) : null}
          </div>
          <ActionButtons />
        </div>
      </div>
    </PostArticle>
  );
}
