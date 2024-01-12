"use client"

import { useQuery } from "@tanstack/react-query"
import getPostsByRecommend from "../_services/getPostsByRecommend";
import Post from '../../_components/Post';
import { Post as TPost } from "@/model/Post";

export default function PostsRecommend() {
  const { data: posts } = useQuery({
    queryKey: ["posts", "recommends"],
    queryFn: getPostsByRecommend,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return posts?.map((post: TPost) => <Post key={post.postId} post={post} />);
}
