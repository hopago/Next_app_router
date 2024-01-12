import { restFetcher } from "@/hooks/fetcher";

export const getFollowRecommend = async () => {
  const res = await restFetcher({
    path: "api/users/recommend",
    method: "GET",
    next: {
      tags: ["users", "recommend"],
    },
  });

  if (!res?.ok) {
    throw new Error("Failed to fetch search result...");
  }

  return res.json();
};
