import { restFetcher } from "@/hooks/fetcher";

export const getComments = async ({ postId }: { postId: string }) => {
  const res = await restFetcher({
    path: `api/posts/${postId}/comments`,
    method: "GET",
    next: {
      tags: ["comments", postId],
    },
  });

  if (!res?.ok) {
    throw new Error("Failed to fetch search result...");
  }

  console.log("Get comments...");

  return res.json();
};
