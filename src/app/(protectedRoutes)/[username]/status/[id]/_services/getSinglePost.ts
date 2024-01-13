import { restFetcher } from "@/hooks/fetcher";

export const getSinglePost = async ({ postId }: { postId: string }) => {
  const res = await restFetcher({
    path: `api/posts/${postId}`,
    method: "GET",
    next: {
      tags: ["posts", postId],
    },
  });

  if (!res?.ok) {
    throw new Error("Failed to fetch search result...");
  }

  console.log("Get Single Post...");

  return res.json();
};
