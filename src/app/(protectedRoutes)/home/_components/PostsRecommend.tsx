"use client";

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import getPostsByRecommend from "../_services/getPostsByRecommend";
import Post from "../../_components/Post";
import { Post as TPost } from "@/model/Post";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import styles from "../page.module.css";

export default function PostsRecommend() {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isPending,
    isError,
    error
  } = useInfiniteQuery<
    TPost[],
    Object,
    InfiniteData<TPost[]>,
    [_1: string, _2: string],
    number
  >({
    queryKey: ["posts", "recommends"],
    queryFn: getPostsByRecommend,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    initialPageParam: 0,
    getNextPageParam: (prevPost) => prevPost.at(-1)?.postId,
  });

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isPending) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <svg
          className={styles.loader}
          height="100%"
          viewBox="0 0 32 32"
          width={40}
        >
          <circle
            cx="16"
            cy="16"
            fill="none"
            r="14"
            strokeWidth="4"
            style={{ stroke: "rgb(29, 155, 240)", opacity: 0.2 }}
          ></circle>
          <circle
            cx="16"
            cy="16"
            fill="none"
            r="14"
            strokeWidth="4"
            style={{
              stroke: "rgb(29, 155, 240)",
              strokeDasharray: 80,
              strokeDashoffset: 60,
            }}
          ></circle>
        </svg>
      </div>
    );
  }

  if (isError) {
    console.log(error);
    return "게시물을 가져오지 못했어요"
  }

  return (
    <>
      {posts?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.map((post) => (
            <Post key={post.postId} post={post} />
          ))}
        </Fragment>
      ))}
      <div ref={ref} style={{ height: 50 }} />
    </>
  );
}
