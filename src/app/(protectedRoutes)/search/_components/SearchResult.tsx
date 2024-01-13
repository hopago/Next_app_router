"use client"

import { Post as IPost } from "@/model/Post"
import { useQuery } from "@tanstack/react-query"
import Post from '@/app/(protectedRoutes)/_components/Post';
import { getSearchResult } from "../_services/getSearchResult";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();

  const { data } = useQuery<
    IPost[],
    Object,
    IPost[],
    [_1: string, _2: string, Props["searchParams"], userId?: string]
  >({
    queryKey: ["posts", "search", searchParams, session?.user?.email as string],
    queryFn: getSearchResult,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return data?.map((post: IPost) => <Post key={post.postId} post={post} />);
}
