import { restFetcher } from "@/hooks/fetcher";

export const getPostsByUserId = async ({ userId }: { userId: string }) => {
  const res = await restFetcher({
    path: `api/users/${userId}/posts`,
    method: "GET",
    next: {
      tags: ["posts", userId],
    },
  });

  if (!res?.ok) {
    throw new Error("Failed to fetch search result...");
  }

  return res.json();
};
