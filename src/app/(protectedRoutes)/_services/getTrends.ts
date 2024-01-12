import { restFetcher } from "@/hooks/fetcher";

export const getTrends = async () => {
  const res = await restFetcher({
    path: "api/trends",
    method: "GET",
    next: {
      tags: ["trends"],
    },
  });

  if (!res?.ok) {
    throw new Error("Failed to fetch search result...");
  }

  return res.json();
};
