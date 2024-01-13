"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getComments } from "../_services/getComments";
import { Comment as TComment } from "@/model/Comment";
import Post from "@/app/(protectedRoutes)/_components/Post";

export default function Comments({ postId: props_postId }: { postId?: string }) {
  const { id: postId } = useParams();

  const { data: comments } = useQuery<TComment[]>({
    queryKey: ["comments", postId],
    queryFn: () => getComments({ postId: postId as string }),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    enabled: !!postId,
  });

  if (!comments) return null;

  return (
    Array.isArray(comments) &&
    comments.length &&
    comments?.map((comment) => <Post key={comment.postId} post={comment} />)
  );
}
