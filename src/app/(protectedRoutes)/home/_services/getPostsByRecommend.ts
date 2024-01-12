import { restFetcher } from "@/hooks/fetcher";
import { revalidatePath } from "next/cache";

export default async function getPostsByRecommend() {
  const res = await restFetcher({
    path: "api/posts",
    method: "GET",
    next: {
      tags: ["posts", "recommends"],
    },
    query: ["fetchType"],
    queryValue: ["recommends"]
  });

  if (!res?.ok) {
    throw new Error("Failed to fetch posts...");
  }

  revalidatePath("/home");

  return res.json();
}
