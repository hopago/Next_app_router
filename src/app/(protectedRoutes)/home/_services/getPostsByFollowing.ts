import { restFetcher } from "@/hooks/fetcher";
import { revalidatePath } from "next/cache";

export default async function getPostsByFollowing({
  userId,
}: {
  userId: string;
}) {
  const res = await restFetcher({
    path: "api/posts",
    method: "GET",
    next: {
      tags: ["posts", "following"],
    },
    query: ["fetchType", "userId"],
    queryValue: ["following", `${userId}`],
  });

  if (!res?.ok) {
    throw new Error("Failed to fetch posts...");
  }

  return res.json();
}
