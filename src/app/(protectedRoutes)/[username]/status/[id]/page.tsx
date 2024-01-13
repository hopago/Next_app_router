"use client"

import styles from './singlePost.module.css';
import CommentForm from './_components/CommentForm';
import Comments from './_components/Comments';
import SinglePost from './_components/SinglePost';
import { useParams } from 'next/navigation';
import { HydrationBoundary, dehydrate, useQueryClient } from '@tanstack/react-query';
import { getSinglePost } from './_services/getSinglePost';
import { getComments } from './_services/getComments';
import BackButton from '@/app/(protectedRoutes)/_components/BackButton';

export default async function page() {
  const { id: postId } = useParams();

  const queryClient = useQueryClient();

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
    <div className={styles.main}>
      <div className={styles.header}>
        <BackButton />
        <h3 className={styles.headerTitle}>게시하기</h3>
      </div>
      <HydrationBoundary state={dehydratedState}>
        <SinglePost />
        <CommentForm />
        <div>
          <Comments />
        </div>
      </HydrationBoundary>
    </div>
  );
}
