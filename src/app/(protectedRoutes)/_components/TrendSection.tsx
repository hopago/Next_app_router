"use client"

import { usePathname } from 'next/navigation';
import Trend from './Trend';
import styles from './trendSection.module.css';
import { useQuery } from '@tanstack/react-query';
import { getTrends } from '../_services/getTrends';
import { Trend as TTrend } from '@/model/Trend';
import { useSession } from 'next-auth/react';

export default function TrendSection() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const { data } = useQuery<TTrend[]>({
    queryKey: ["trends"],
    queryFn: getTrends,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    enabled: !!session?.user,
  });

  if (!session?.user) return null;
  if (pathname === "/explore") return null;
  if (pathname === "/search") return null;

  return (
    <div className={styles.trendBg}>
      <div className={styles.trend}>
        <h3>나를 위한 트랜드</h3>
        {data?.map((trend) => (
          <Trend trend={trend} key={trend.tagId} />
        ))}
      </div>
    </div>
  );
}
