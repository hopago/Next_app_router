"use client";

import ActionButtons from "@/app/(protectedRoutes)/_components/ActionButtons";
import styles from "../photoModal.module.css";
import { useQuery } from "@tanstack/react-query";
import { Post as TPost } from "@/model/Post";
import { getSinglePost } from "@/app/(protectedRoutes)/[username]/status/[id]/_services/getSinglePost";

export default function ImageZone({ postId }: { postId: string }) {
  const { data: post } = useQuery<
    TPost,
    Object,
    TPost,
    [_1: string, _2: string]
  >({
    queryKey: ["posts", postId],
    queryFn: () => getSinglePost({ postId: postId as string }),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  console.log(post);

  if (!post) {
    return null;
  }

  if (!post?.Images[0]) {
    return null;
  }

  return (
    <div className={styles.imageZone}>
      <img src={post.Images[0].link} alt={post.content} />
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${post.Images[0].link})` }}
      />
      <div className={styles.buttonZone}>
        <div className={styles.buttonInner}>
          <ActionButtons white />
        </div>
      </div>
    </div>
  );
}
