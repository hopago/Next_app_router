"use client"

import { useQuery } from "@tanstack/react-query";
import { getFollowRecommend } from "../_services/getFollowRecommend";
import { User } from "@/model/User";
import FollowRecommendItem from "./FollowRecommendItem";

export default function FollowRecommend() {
  const { data } = useQuery<User[]>({
    queryKey: ["users", "recommend"],
    queryFn: getFollowRecommend,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return data?.map((user) => <FollowRecommendItem user={user} key={user.id} />);
}
