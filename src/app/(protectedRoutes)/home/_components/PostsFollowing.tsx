"use client";

import { useQuery } from "@tanstack/react-query";
import getPostsByFollowing from "../services/getPostsByFollowing";
import Post from "../../_components/Post";
import { Post as TPost } from "@/model/Post";
import { useSession } from "next-auth/react";

export default function PostsFollowing() {
  const { data: session } = useSession();

  const { data, isError, error } = useQuery({
    queryKey: ["posts", "following"],
    queryFn: () => getPostsByFollowing({ userId: session?.user?.email! }),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    enabled: !!session?.user,
  });

  if (!data) return null;

  return data[0].map((post: TPost) => <Post post={post} key={post.postId} />);
}
