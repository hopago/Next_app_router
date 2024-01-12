"use client"

import { Post as IPost } from "@/model/Post"
import { useQuery } from "@tanstack/react-query"
import Post from '@/app/(protectedRoutes)/_components/Post';
import { getSearchResult } from "../_services/getSearchResult";

type Props = {
  searchParams: {
    q?: string;
    f?: string; 
    pf?: string;
  };
};

export default function SearchResult({
  searchParams,
}: {
  searchParams: Props["searchParams"];
}) {
  if (!searchParams.q) {
    return null;
  }

  const { data } = useQuery<
    IPost[],
    Object,
    IPost[],
    [_1: string, _2: string, Props["searchParams"]]
  >({
    queryKey: ["posts", "search", searchParams],
    queryFn: getSearchResult,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    enabled: !!searchParams.q
  });

  return data?.map((post: IPost) => <Post key={post.postId} post={post} />);
}
