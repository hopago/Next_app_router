"use client";

import { useQuery } from "@tanstack/react-query";
import Post from "../_components/Post";
import styles from "./page.module.css";
import { User } from "@/model/User";
import { getUser } from "./_services/getUser";
import { Post as TPost } from "@/model/Post";
import { getPostsByUserId } from "./_services/getPostsByUserId";
import { useParams } from "next/navigation";
import BackButton from "../_components/BackButton";

export default function page() {
  const params = useParams();

  const { username: userId } = params; 

  const {
    data: user,
    isError,
    error,
    isSuccess
  } = useQuery<User>({
    queryKey: ["users", userId],
    queryFn: () => getUser({ userId: userId as string }),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    enabled: !!userId,
  });

  const { data: posts, isSuccess: isPostSuccess } = useQuery<TPost[]>({
    queryKey: ["posts", userId],
    queryFn: () => getPostsByUserId({ userId: userId as string }),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    enabled: !!userId,
  });

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <BackButton />
        <h3 className={styles.headerTitle}>{user?.nickname}</h3>
      </div>
      <div className={styles.userZone}>
        {isSuccess && (
          <>
            <div className={styles.userImage}>
              <img src={user?.image} alt={user?.id} />
            </div>
            <div className={styles.userName}>
              <div>{user?.nickname}</div>
              <div>@{user?.id}</div>
            </div>
            <button className={styles.followButton}>팔로우</button>
          </>
        )}
        {isError && error?.message === "User not found..." && (
          <>
            <div>계정이 존재하지 않습니다</div>
          </>
        )}
      </div>
      <div>
        {isSuccess &&
          isPostSuccess &&
          posts?.map((post) => <Post key={post.postId} post={post} />)}
      </div>
    </main>
  );
}
