import Link from "next/link";
import styles from "./post.module.css";
import cx from "classnames";
import { Post } from "@/model/Post";

export default function PostImages({ post }: { post: Post }) {
  if (!post.Images) return null;
  if (!post.Images.length) return null;

  if (post.Images.length === 1) {
    return (
      <Link
        href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0]?.imageId}`}
        className={cx(styles.postImageSection, styles.oneImage)}
        style={{
          backgroundImage: `url(${post.Images[0]?.link})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      >
        <img src={post.Images[0]?.link} alt="Post Image" />
      </Link>
    );
  }

  if (post.Images.length === 2) {
    return (
      <div className={cx(styles.postImageSection, styles.twoImage)}>
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0]?.imageId}`}
          style={{
            backgroundImage: `url(${post.Images[0]?.link})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></Link>
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[1]?.imageId}`}
          style={{
            backgroundImage: `url(${post.Images[1]?.link})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></Link>
      </div>
    );
  }

  if (post.Images.length === 3) {
    return (
      <div className={cx(styles.postImageSection, styles.threeImage)}>
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0]?.imageId}`}
          style={{
            backgroundImage: `url(${post.Images[0]?.link})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></Link>
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[1]?.imageId}`}
          style={{
            backgroundImage: `url(${post.Images[1]?.link})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></Link>
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[2]?.imageId}`}
          style={{
            backgroundImage: `url(${post.Images[2]?.link})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></Link>
      </div>
    );
  }

  if (post.Images.length === 4) {
    return (
      <div className={cx(styles.postImageSection, styles.fourImage)}>
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0]?.imageId}`}
          style={{
            backgroundImage: `url(${post.Images[0]?.link})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></Link>
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[1]?.imageId}`}
          style={{
            backgroundImage: `url(${post.Images[1]?.link})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></Link>
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[2]?.imageId}`}
          style={{
            backgroundImage: `url(${post.Images[2]?.link})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></Link>
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[3]?.imageId}`}
          style={{
            backgroundImage: `url(${post.Images[3]?.link})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></Link>
      </div>
    );
  }

  return null;
}
