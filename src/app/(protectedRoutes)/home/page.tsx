import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Post from "../_components/Post";
import PostForm from "../_components/PostForm";
import Tab from "./_components/Tab";
import TabContextProvider from "./context/TabContextProvider";
import styles from "./page.module.css";
import { restFetcher } from "@/hooks/fetcher";
import { revalidatePath } from "next/cache";

async function getPostsByRecommend() {
  const res = await restFetcher({
    path: "api/post",
    method: "GET",
    next: {
      tags: ["posts", "recommends"],
    },
    params: "recommends",
  });

  if (!res?.ok) {
    throw new Error("Failed to fetch posts...");
  }

  revalidatePath("/home");

  return res.json();
}

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts", "recommends"],
    queryFn: getPostsByRecommend,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={styles.main}>
      <HydrationBoundary state={dehydratedState}>
        <TabContextProvider>
          <Tab />
          <PostForm />
          <Post />
          <Post />
          <Post />
        </TabContextProvider>
      </HydrationBoundary>
    </div>
  );
}
