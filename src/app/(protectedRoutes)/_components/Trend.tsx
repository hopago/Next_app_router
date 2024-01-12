import Link from 'next/link';
import styles from './trend.module.css';
import { Trend } from '@/model/Trend';

export default function Trend({ trend }: { trend: Trend }) {
  return (
    <Link href={`/search?q=${trend.title}`} className={styles.container}>
      <div className={styles.count}>실시간 트랜드</div>
      <div className={styles.title}>{trend.title}</div>
      <div className={styles.count}>{trend.count.toLocaleString()} posts</div>
    </Link>
  );
}
