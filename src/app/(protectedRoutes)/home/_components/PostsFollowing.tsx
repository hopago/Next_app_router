"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import getPostsByFollowing from "../_services/getPostsByFollowing";
import Post from "../../_components/Post";
import { Post as TPost } from "@/model/Post";
import { useSession } from "next-auth/react";

export default function PostsFollowing() {
  const { data: session } = useSession();

  const { data } = useSuspenseQuery({
    queryKey: ["posts", "following"],
    queryFn: () => getPostsByFollowing({ userId: session?.user?.email! }),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  if (!data) return null;

  return data.map((post: TPost) => <Post post={post} key={post.postId} />);
}
