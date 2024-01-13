import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import styles from "./photoModal.module.css";
import { getSinglePost } from "@/app/(protectedRoutes)/[username]/status/[id]/_services/getSinglePost";
import { getComments } from "@/app/(protectedRoutes)/[username]/status/[id]/_services/getComments";
import SinglePost from "@/app/(protectedRoutes)/[username]/status/[id]/_components/SinglePost";
import CommentForm from "@/app/(protectedRoutes)/[username]/status/[id]/_components/CommentForm";
import Comments from "@/app/(protectedRoutes)/[username]/status/[id]/_components/Comments";
import PhotoModalCloseButton from "./_components/PhotoModalCloseButton";
import ImageZone from "./_components/ImageZone";

type Props = {
  params: {
    id: string;
  };
};

export default async function page({ params }: Props) {
  const { id: postId } = params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts", postId],
    queryFn: () => getSinglePost({ postId: postId as string }),
  });
  await queryClient.prefetchQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments({ postId: postId as string }),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={styles.container}>
      <HydrationBoundary state={dehydratedState}>
        <PhotoModalCloseButton />
        <ImageZone postId={postId} />
        <div className={styles.commentZone}>
          <SinglePost postId={postId} noImage />
          <CommentForm postId={postId} />
          <Comments postId={postId} />
        </div>
      </HydrationBoundary>
    </div>
  );
}
