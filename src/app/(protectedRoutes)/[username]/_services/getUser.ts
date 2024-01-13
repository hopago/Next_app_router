import { restFetcher } from "@/hooks/fetcher";

export const getUser = async ({ userId }: { userId: string }) => {
  const res = await restFetcher({
    path: `api/users/${userId}`,
    method: "GET",
    next: {
      tags: ["users", userId],
    },
  });

  if (!res?.ok) {
    throw new Error("Failed to fetch search result...");
  }

  return res.json();
};
