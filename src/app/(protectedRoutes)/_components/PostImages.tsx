import Link from "next/link";
import { Post } from "./Post";
import styles from "./post.module.css";
import cx from "classnames";

export default function PostImages({ target }: { target: Post }) {
  if (!target.Images) return null;
  if (!target.Images.length) return null;

  if (target.Images.length === 1) {
    return (
      <Link
        href={`/${target.User.id}/status/${target.postId}/photo/${target.Images[0]?.imageId}`}
        className={cx(styles.postImageSection, styles.oneImage)}
        style={{
          backgroundImage: `url(${target.Images[0]?.url})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      >
        <img src={target.Images[0]?.url} alt="Post Image" />
      </Link>
    );
  }

  if (target.Images.length === 2) {
    return (
      <div className={cx(styles.postImageSection, styles.twoImage)}>
        <Link
          href={`/${target.User.id}/status/${target.postId}/photo/${target.Images[0]?.imageId}`}
          style={{
            backgroundImage: `url(${target.Images[0]?.url})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></Link>
        <Link
          href={`/${target.User.id}/status/${target.postId}/photo/${target.Images[1]?.imageId}`}
          style={{
            backgroundImage: `url(${target.Images[1]?.url})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></Link>
      </div>
    );
  }

  if (target.Images.length === 3) {
    return (
      <div className={cx(styles.postImageSection, styles.threeImage)}>
        <Link
          href={`/${target.User.id}/status/${target.postId}/photo/${target.Images[0]?.imageId}`}
          style={{
            backgroundImage: `url(${target.Images[0]?.url})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></Link>
        <Link
          href={`/${target.User.id}/status/${target.postId}/photo/${target.Images[1]?.imageId}`}
          style={{
            backgroundImage: `url(${target.Images[1]?.url})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></Link>
        <Link
          href={`/${target.User.id}/status/${target.postId}/photo/${target.Images[2]?.imageId}`}
          style={{
            backgroundImage: `url(${target.Images[2]?.url})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></Link>
      </div>
    );
  }

  if (target.Images.length === 4) {
    return (
      <div className={cx(styles.postImageSection, styles.fourImage)}>
        <Link
          href={`/${target.User.id}/status/${target.postId}/photo/${target.Images[0]?.imageId}`}
          style={{
            backgroundImage: `url(${target.Images[0]?.url})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></Link>
        <Link
          href={`/${target.User.id}/status/${target.postId}/photo/${target.Images[1]?.imageId}`}
          style={{
            backgroundImage: `url(${target.Images[1]?.url})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></Link>
        <Link
          href={`/${target.User.id}/status/${target.postId}/photo/${target.Images[2]?.imageId}`}
          style={{
            backgroundImage: `url(${target.Images[2]?.url})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></Link>
        <Link
          href={`/${target.User.id}/status/${target.postId}/photo/${target.Images[3]?.imageId}`}
          style={{
            backgroundImage: `url(${target.Images[3]?.url})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></Link>
      </div>
    );
  }

  return null;
}
