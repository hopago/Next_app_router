import { restFetcher } from "@/hooks/fetcher";
import { Post } from "@/model/Post";
import { QueryFunction } from "@tanstack/react-query";

export const getSearchResult: QueryFunction<
  Post[],
  [
    _1: string,
    _2: string,
    searchParams: { q?: string; f?: string; pf?: string },
    userId?: string
  ]
> = async ({
  queryKey,
}: {
  queryKey: [
    _1: string,
    _2: string,
    searchParams: { q?: string; f?: string; pf?: string },
    userId?: string
  ];
}) => {
  const [_1, _2, searchParams, userId] = queryKey;
  const { q, f, pf } = searchParams;

  const fetchPosts = async ({
    query,
    queryValue,
  }: {
    query: ("q" | "f" | "pf" | "userId")[];
    queryValue: (typeof searchParams["q" | "f" | "pf"] | typeof userId)[];
  }) => {
    if (!query || !queryValue) throw new Error("Invalid query...");
    if (query.length !== queryValue.length) throw new Error("Invalid request...");
  
    const res = await restFetcher({
      path: "api/posts",
      method: "GET",
      next: {
        tags: ["posts", "search", ...queryValue],
      },
      query: query.map((q) => `${q}`),
      queryValue: queryValue.map((qv) => `${qv}`),
    });
  
    if (!res?.ok) {
      throw new Error("Failed to fetch search result...");
    }
  
    return res.json();
  };

  if (q) {
    if (f && userId) {
      return await fetchPosts({ query: ["q", "f", "userId"], queryValue: [q, f, userId]});
    }

    if (f && pf && userId) {
      return await fetchPosts({
        query: ["q", "f", "pf", "userId"],
        queryValue: [q, f, pf, userId],
      });
    }

    return await fetchPosts({ query: ["q"], queryValue: [q]});
  }
};
