import { restFetcher } from "@/hooks/fetcher";
import { revalidatePath } from "next/cache";

export default async function getPostsByRecommend({
  pageParam,
}: {
  pageParam: number;
}) {
  const res = await restFetcher({
    path: "api/posts",
    method: "GET",
    next: {
      tags: ["posts", "recommends"],
    },
    query: ["fetchType", "cursor"],
    queryValue: ["recommends", pageParam.toString()],
  });

  if (!res?.ok) {
    throw new Error("Failed to fetch posts...");
  }

  return res.json();
}
