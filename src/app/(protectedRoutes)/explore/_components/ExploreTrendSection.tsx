"use client";

import { Trend as TTrend } from "@/model/Trend";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getTrends } from "../../_services/getTrends";
import Trend from "../../_components/Trend";

export default function ExploreTrendSection() {
  const { data: session } = useSession();

  const { data } = useQuery<TTrend[]>({
    queryKey: ["trends"],
    queryFn: getTrends,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    enabled: !!session?.user,
  });

  return data?.map((trend) => <Trend trend={trend} key={trend.tagId} />);
}
