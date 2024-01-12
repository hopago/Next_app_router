import { restFetcher } from "@/hooks/fetcher";
import { Post } from "@/model/Post"
import { QueryFunction } from "@tanstack/react-query"

export const getSearchResult: QueryFunction<
  Post[],
  [_1: string, _2: string, searchParams: { q?: string; f?: string; pf?: string }]
> = async ({
  queryKey,
}: {
  queryKey: [
    _1: string,
    _2: string,
    searchParams: { q?: string; f?: string; pf?: string }
  ];
}) => {
  const [_1, _2, searchParams] = queryKey;

  if (!searchParams.q) {
    throw new Error("Search term required...");
  }

  const res = await restFetcher({
    path: "/api/post",
    method: "GET",
    next: {
      tags: ["posts", "search", searchParams.q],
    },
    query: ["search"],
    queryValue: [`${searchParams.q}`],
  });

  if (!res?.ok) {
    throw new Error("Failed to fetch search result...");
  }

  return res.json();
};
