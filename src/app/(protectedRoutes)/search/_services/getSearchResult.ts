import { restFetcher } from "@/hooks/fetcher";
import { Post } from "@/model/Post";
import { QueryFunction } from "@tanstack/react-query";

export const getSearchResult: QueryFunction<
  Post[],
  [
    _1: string,
    _2: string,
    searchParams: { q?: string; f?: string; pf?: string }
  ]
> = async ({
  queryKey,
  userId,
}: {
  queryKey: [
    _1: string,
    _2: string,
    searchParams: { q?: string; f?: string; pf?: string }
  ];
  userId?: string;
}) => {
  const [_1, _2, searchParams] = queryKey;
  const { q, f, pf } = searchParams;

  // 시나리오 -> 트랜드 섹션 클릭 -> q에 트랜드 타이틀 ( 모든 유저 게시글 q 사용해 fetching )
  // -> 이 상태에서 내가 팔로우 하는 사람들 ( q 유지, 팔로우 유저의 게시글 불러옴 )
  // 검색어만 있는 경우 -> q를 검색어로 활용 -> q에 따라 다시 시나리오 시작
  // q가 비어있는 상태 -> 기본적으로 모든 유저 혹은 팔로우 게시글
  // 팔로우 유저 게시글은 홈에서도 띄워줌

  // 검색어 O, 팔로우 X

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
      query: query.map(q => `${q}`),
      queryValue: queryValue.map(qv => `${qv}`),
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

    return await fetchPosts({ query: ["q"], queryValue: [q]});
  }

  if (pf) {
    return await fetchPosts({ query: ["pf"], queryValue: [pf] });
  }

  if (f && userId) {
    return await fetchPosts({ query: ["f", "userId"], queryValue: [f, userId] });
  }
};
