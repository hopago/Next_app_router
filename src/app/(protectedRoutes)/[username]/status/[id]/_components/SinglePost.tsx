"use client";

import BackButton from "@/app/(publicRoutes)/_components/BackButton";
import { Post as TPost } from "@/model/Post";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getSinglePost } from "../_services/getSinglePost";
import styles from "../singlePost.module.css";
import Post from "@/app/(protectedRoutes)/_components/Post";

export default function SinglePost({
  postId: props_postId,
  noImage,
}: {
  postId?: string;
  noImage?: boolean;
}) {
  const { id: postId } = useParams();

  const {
    data: post,
    isSuccess,
    isError,
  } = useQuery<TPost>({
    queryKey: ["posts", props_postId ? props_postId : postId],
    queryFn: () =>
      getSinglePost({
        postId: props_postId ? props_postId : (postId as string),
      }),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  if (!post || isError) {
    return (
      <>
        <div className={styles.main}>
          <div className={styles.header}>
            <BackButton />
          </div>
          <div>
            <span>게시글을 찾을 수 없습니다</span>
          </div>
        </div>
      </>
    );
  }

  return isSuccess ? (
    <Post noImage={noImage} post={post} key={post.postId} />
  ) : null;
}
