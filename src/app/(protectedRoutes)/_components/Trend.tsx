import Link from 'next/link';
import styles from './trend.module.css';

export default function Trend() {
  const trend = {
    title: "타이틀",
    count: 3
  }

  return (
    <Link href={`/search?q=트랜드`} className={styles.container}>
      <div className={styles.count}>실시간 트랜드</div>
      <div className={styles.title}>{trend.title}</div>
      <div className={styles.count}>{trend.count.toLocaleString()} posts</div>
    </Link>
  );
}
