import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import PostForm from "../_components/PostForm";
import Tab from "./_components/Tab";
import TabContextProvider from "./context/TabContextProvider";
import styles from "./page.module.css";
import getPostsByRecommend from "./_services/getPostsByRecommend";
import TabDecider from "./_components/TabDecider";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts", "recommends"],
    queryFn: getPostsByRecommend,
    initialPageParam: 0,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={styles.main}>
      <HydrationBoundary state={dehydratedState}>
        <TabContextProvider>
          <Tab />
          <PostForm />
          <TabDecider />
        </TabContextProvider>
      </HydrationBoundary>
    </div>
  );
}
