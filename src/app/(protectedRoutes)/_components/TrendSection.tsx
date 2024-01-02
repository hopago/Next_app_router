"use client"

import { usePathname } from 'next/navigation';
import Trend from './Trend';
import styles from './trendSection.module.css';

export default function TrendSection() {
  const pathname = usePathname();

  if (pathname === "/explore") return null;
  if (pathname === "/search") return null;

  return (
    <div className={styles.trendBg}>
      <div className={styles.trend}>
        <h3>나를 위한 트랜드</h3>
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
      </div>
    </div>
  )
}
